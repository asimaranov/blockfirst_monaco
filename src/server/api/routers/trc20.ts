import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import { TARIFFS } from '~/app/lib/constants/tariff';
import TronWalletModel from '~/server/models/tronWallet';
import {
  generateWallet,
  encryptPrivateKey,
  formatAddressForQR,
  checkForTransaction,
} from '~/server/utils/tronUtils';
import dbConnect from '~/server/mongodb';
import UserDataModel from '~/server/models/userData';

// Amount of time a wallet is valid (24 hours)
const WALLET_VALIDITY_HOURS = 24;

// Exchange rate USDT/RUB
const USDT_TO_RUB_RATE = 90;

export const trc20Router = createTRPCRouter({
  // Generate or get an existing payment wallet for the user and specified tariff
  getPaymentWallet: protectedProcedure
    .input(z.object({ tariffName: z.string() }))
    .query(async ({ ctx, input }) => {
      await dbConnect();

      // Find the tariff
      const tariff = TARIFFS.find((t) => t.name === input.tariffName);
      if (!tariff || !tariff.price) {
        throw new Error('Invalid tariff');
      }

      // Calculate amount in USDT
      const amountInUsdt = Math.ceil(tariff.price.total / USDT_TO_RUB_RATE);

      // Check if there's an existing pending wallet for this user and tariff
      let wallet = await TronWalletModel.findOne({
        userId: ctx.session.user.id,
        tariffName: input.tariffName,
        status: 'pending',
        expiresAt: { $gt: new Date() }, // Not expired
      });

      // If no wallet exists, create one
      if (!wallet) {
        // Generate new wallet
        const newWallet = await generateWallet();

        // Set expiration time (24 hours from now)
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + WALLET_VALIDITY_HOURS);

        // Create wallet record
        wallet = await TronWalletModel.create({
          userId: ctx.session.user.id,
          tariffName: input.tariffName,
          address: newWallet.address,
          privateKey: encryptPrivateKey(newWallet.privateKey),
          amount: amountInUsdt,
          status: 'pending',
          expiresAt,
        });
      }

      // Format data for frontend
      return {
        address: wallet.address,
        amount: wallet.amount,
        expiresAt: wallet.expiresAt,
        status: wallet.status,
        qrCodeUri: formatAddressForQR(wallet.address, wallet.amount),
      };
    }),

  // Check payment status
  checkPaymentStatus: protectedProcedure
    .input(z.object({ tariffName: z.string() }))
    .query(async ({ ctx, input }) => {
      await dbConnect();

      // Find the wallet
      const wallet = await TronWalletModel.findOne({
        userId: ctx.session.user.id,
        tariffName: input.tariffName,
        expiresAt: { $gt: new Date() }, // Not expired
      });

      if (!wallet) {
        return { status: 'no_wallet' };
      }

      // If already paid, return status
      if (wallet.status === 'paid') {
        return { status: 'paid', transactionId: wallet.transactionId };
      }

      // Check for payment transaction
      const result = await checkForTransaction(
        wallet.address,
        wallet.amount,
        wallet.createdAt
      );

      // If transaction found, update wallet and user data
      if (result.found && result.txId) {
        // Update wallet status
        wallet.status = 'paid';
        wallet.transactionId = result.txId;
        await wallet.save();

        // Update user plan
        await UserDataModel.findOneAndUpdate(
          { userId: ctx.session.user.id },
          {
            plan: input.tariffName.toLowerCase(),
            premiumStartDate: new Date(),
            premiumEndDate: (() => {
              const endDate = new Date();
              endDate.setFullYear(endDate.getFullYear() + 1); // Premium for 1 year
              return endDate;
            })(),
          },
          { upsert: true }
        );

        return { status: 'paid', transactionId: result.txId };
      }

      // If no transaction found, return pending status
      return { status: wallet.status };
    }),

  // Get all pending wallets (admin only)
  getAllPendingWallets: protectedProcedure.query(async ({ ctx }) => {
    // Check if user is admin (this is just a placeholder, implement proper admin check)
    if (!ctx.session.user.email?.includes('admin')) {
      throw new Error('Unauthorized');
    }

    await dbConnect();

    const wallets = await TronWalletModel.find({
      status: 'pending',
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    return wallets.map((wallet) => wallet.toJSON());
  }),
});
