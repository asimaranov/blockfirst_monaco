import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { sendVerificationRequest } from './lib/authSendRequests';
import { emailOTP } from 'better-auth/plugins';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data, request) {
      // Send an email to the user with a link to reset their password
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    vk: {
      clientId: process.env.VK_CLIENT_ID!,
      clientSecret: process.env.VK_CLIENT_SECRET!,
    },
  },

  plugins: [
    emailOTP({
      otpLength: 5,
      expiresIn: 10 * 60, // 10 minutes
      async sendVerificationOTP({
        email,
        otp,
        type,
      }: {
        email: string;
        otp: string;
        type: string;
      }) {
        console.log('sendVerificationOTP', email, otp, type);
        if (type === 'sign-in') {
          // Send the OTP for sign-in
        } else if (type === 'email-verification') {
          console.log('sendVerificationOTP', email, otp, type);
          await sendVerificationRequest({
            to: email,
            from: 'noreply@blockfirst.io',
            url: `https://app.blockfirst.io/api/auth/verify-email`,
            codeDigits: otp,
          });
          // Send the OTP for email verification
        } else {
          // Send the OTP for password reset
        }
      },
    }),
  ],
});
