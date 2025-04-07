import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import ReferralModel, { IReferral } from '~/server/models/referral';
import UserDataModel, { PlanType } from '~/server/models/userData';
import ReferralCodeModel from '~/server/models/referralCode';
import dbConnect from '~/server/mongodb';
import { nanoid } from 'nanoid';

export const referralsRouter = createTRPCRouter({
  // Get referrals for current user
  getUserReferrals: protectedProcedure.query(async ({ ctx }) => {
    await dbConnect();

    const referrals = await ReferralModel.find({
      referrerId: ctx.session.user.id,
    }).sort({ registrationDate: -1 });

    return referrals.map((referral) => referral.toJSON());
  }),

  // Get referral stats
  getReferralStats: protectedProcedure.query(async ({ ctx }) => {
    await dbConnect();

    const [totalReferrals, totalEarnings, activePlans] = await Promise.all([
      // Count total referrals
      ReferralModel.countDocuments({ referrerId: ctx.session.user.id }),

      // Calculate total earnings
      ReferralModel.aggregate([
        { $match: { referrerId: ctx.session.user.id } },
        { $group: { _id: null, total: { $sum: '$earnings' } } },
      ]),

      // Count referrals by plan type
      ReferralModel.aggregate([
        { $match: { referrerId: ctx.session.user.id } },
        { $group: { _id: '$plan', count: { $sum: 1 } } },
      ]),
    ]);

    const earnings = totalEarnings.length > 0 ? totalEarnings[0].total : 0;

    // Organize plan counts
    const planCounts = {
      free: 0,
      starter: 0,
      pro: 0,
    };

    activePlans.forEach((plan) => {
      if (plan._id && typeof plan._id === 'string' && plan._id in planCounts) {
        planCounts[plan._id as PlanType] = plan.count;
      }
    });

    return {
      totalReferrals,
      earnings,
      formattedEarnings: `${earnings.toLocaleString('ru-RU')} ₽`,
      planCounts,
    };
  }),

  // Add a referral (this would be used when a user registers with a referral code)
  addReferral: protectedProcedure
    .input(
      z.object({
        referrerId: z.string(),
        userId: z.string(),
        name: z.string(),
        avatar: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await dbConnect();

      // Get user data to get plan
      const userData = await UserDataModel.findOne({ userId: input.userId });
      const plan = userData?.plan || 'free';

      const newReferral = await ReferralModel.create({
        userId: input.userId,
        referrerId: input.referrerId,
        name: input.name,
        avatar: input.avatar,
        plan,
        registrationDate: new Date(),
        earnings: 0,
        learningTimeMinutes: 0,
      });

      return newReferral.toJSON();
    }),

  // Update referral earnings
  updateReferralEarnings: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        earnings: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await dbConnect();

      const updatedReferral = await ReferralModel.findOneAndUpdate(
        { userId: input.userId },
        { $set: { earnings: input.earnings } },
        { new: true }
      );

      if (!updatedReferral) {
        throw new Error('Referral not found');
      }

      return updatedReferral.toJSON();
    }),

  // Update referral learning time
  updateReferralLearningTime: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        learningTimeMinutes: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await dbConnect();

      const updatedReferral = await ReferralModel.findOneAndUpdate(
        { userId: input.userId },
        { $set: { learningTimeMinutes: input.learningTimeMinutes } },
        { new: true }
      );

      if (!updatedReferral) {
        throw new Error('Referral not found');
      }

      return updatedReferral.toJSON();
    }),

  // Create or get referral code
  createReferralCode: protectedProcedure
    .input(
      z.object({
        customCode: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await dbConnect();

      // Check if user already has a referral code
      let existingCode = await ReferralCodeModel.findOne({
        userId: ctx.session.user.id,
      });

      if (existingCode) {
        return existingCode.toJSON();
      }

      // Generate a unique code if customCode is not provided
      const code = input.customCode || `ref${nanoid(6)}`;

      // Check if the code is already taken
      const codeExists = await ReferralCodeModel.findOne({ code });

      if (codeExists && input.customCode) {
        throw new Error(
          'This referral code is already taken. Please choose another one.'
        );
      }

      // If code exists but was auto-generated, try again with a new code
      if (codeExists) {
        const newCode = `ref${nanoid(6)}`;
        const newReferralCode = await ReferralCodeModel.create({
          userId: ctx.session.user.id,
          code: newCode,
          usageCount: 0,
        });

        return newReferralCode.toJSON();
      }

      // Create the new referral code
      const newReferralCode = await ReferralCodeModel.create({
        userId: ctx.session.user.id,
        code,
        usageCount: 0,
      });

      return newReferralCode.toJSON();
    }),

  // Get referral code for current user
  getUserReferralCode: protectedProcedure.query(async ({ ctx }) => {
    await dbConnect();

    const referralCode = await ReferralCodeModel.findOne({
      userId: ctx.session.user.id,
    });

    if (!referralCode) {
      // Auto-generate a code if user doesn't have one
      const code = `ref${nanoid(6)}`;
      const newReferralCode = await ReferralCodeModel.create({
        userId: ctx.session.user.id,
        code,
        usageCount: 0,
      });

      return newReferralCode.toJSON();
    }

    return referralCode.toJSON();
  }),

  // Apply a referral code (when a user uses someone's referral link)
  applyReferralCode: publicProcedure
    .input(
      z.object({
        code: z.string(),
        userId: z.string(),
        name: z.string(),
        avatar: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await dbConnect();

      // Find the referral code
      const referralCode = await ReferralCodeModel.findOne({
        code: input.code,
      });

      if (!referralCode) {
        throw new Error('Invalid referral code');
      }

      // Make sure user is not referring themselves
      if (referralCode.userId === input.userId) {
        throw new Error('You cannot use your own referral code');
      }

      // Check if this user has already been referred
      const existingReferral = await ReferralModel.findOne({
        userId: input.userId,
      });

      if (existingReferral) {
        throw new Error('This user has already been referred');
      }

      // Get user data to get plan
      const userData = await UserDataModel.findOne({ userId: input.userId });
      const plan = userData?.plan || 'free';

      // Create the referral
      const newReferral = await ReferralModel.create({
        userId: input.userId,
        referrerId: referralCode.userId,
        name: input.name,
        avatar: input.avatar,
        plan,
        registrationDate: new Date(),
        earnings: 0,
        learningTimeMinutes: 0,
      });

      // Increment the referral code usage count
      await ReferralCodeModel.findByIdAndUpdate(referralCode.id, {
        $inc: { usageCount: 1 },
      });

      return newReferral.toJSON();
    }),

  // Get referral by code (for checking if code is valid)
  validateReferralCode: publicProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .query(async ({ input }) => {
      await dbConnect();

      const referralCode = await ReferralCodeModel.findOne({
        code: input.code,
      });

      if (!referralCode) {
        return { valid: false };
      }

      return {
        valid: true,
        referrerId: referralCode.userId,
      };
    }),

  // Get referral stats with time period filtering
  getReferralStatsByPeriod: protectedProcedure
    .input(
      z.object({
        timePeriod: z.enum(['all', '7d', '30d', '90d', 'lm', 'year']),
      })
    )
    .query(async ({ ctx, input }) => {
      await dbConnect();

      // Calculate date range based on time period
      const now = new Date();
      let startDate = new Date(0); // Default to epoch time for "all"

      switch (input.timePeriod) {
        case '7d': // Last 7 days
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d': // Current month
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case '90d': // Previous month
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const lastDayPrevMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            0
          ).getDate();
          now.setDate(lastDayPrevMonth);
          now.setMonth(now.getMonth() - 1);
          break;
        case 'lm': // Month before previous
          startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
          const lastDayBeforePrevMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            0
          ).getDate();
          now.setDate(lastDayBeforePrevMonth);
          now.setMonth(now.getMonth() - 2);
          break;
        case 'year': // Last year
          startDate = new Date(
            now.getFullYear() - 1,
            now.getMonth(),
            now.getDate()
          );
          break;
        default: // 'all' - no filtering needed
          break;
      }

      // Create date filter if not "all"
      const dateFilter =
        input.timePeriod !== 'all'
          ? { registrationDate: { $gte: startDate, $lte: now } }
          : {};

      // Prepare the base query
      const baseQuery = {
        referrerId: ctx.session.user.id,
        ...dateFilter,
      };

      // Execute queries in parallel for better performance
      const [totalReferrals, totalEarnings, activePlans, totalBalance] =
        await Promise.all([
          // Count total referrals
          ReferralModel.countDocuments(baseQuery),

          // Calculate total earnings for the period
          ReferralModel.aggregate([
            { $match: baseQuery },
            { $group: { _id: null, total: { $sum: '$earnings' } } },
          ]),

          // Count referrals by plan type
          ReferralModel.aggregate([
            { $match: baseQuery },
            { $group: { _id: '$plan', count: { $sum: 1 } } },
          ]),

          // Calculate total balance (sum of all earnings across all time periods)
          ReferralModel.aggregate([
            { $match: { referrerId: ctx.session.user.id } }, // No date filter for total balance
            { $group: { _id: null, total: { $sum: '$earnings' } } },
          ]),
        ]);

      const earnings = totalEarnings.length > 0 ? totalEarnings[0].total : 0;
      const balance = totalBalance.length > 0 ? totalBalance[0].total : 0;

      // Calculate count of purchased plans (non-free)
      const planCounts = {
        free: 0,
        starter: 0,
        pro: 0,
      };

      activePlans.forEach((plan) => {
        if (
          plan._id &&
          typeof plan._id === 'string' &&
          plan._id in planCounts
        ) {
          planCounts[plan._id as PlanType] = plan.count;
        }
      });

      // Calculate total purchased plans (excluding free)
      const totalPurchases = planCounts.starter + planCounts.pro;

      return {
        totalReferrals,
        totalPurchases,
        earnings,
        balance,
        formattedEarnings: `${earnings.toLocaleString('ru-RU')} ₽`,
        formattedBalance: `${balance.toLocaleString('ru-RU')} ₽`,
        planCounts,
      };
    }),
});
