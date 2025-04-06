import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { openAPI, admin } from 'better-auth/plugins';
import { emailOTP } from 'better-auth/plugins';
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {
  sendChangeEmailVerification,
  sendResetPasswordEmail,
  sendVerificationEmail,
} from '~/server/auth/email';
import { MongoClient } from "mongodb";
import { env } from '~/env';

const client = new MongoClient(env.MONGODB_URI!);
const db = client.db(env.DATABASE_NAME!);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  plugins: [
    emailOTP({
      sendVerificationOnSignUp: true,
      sendVerificationOTP: async ({ email, otp, type }) => {
        const { error } = await sendVerificationEmail({
          otp: otp,
          email,
        });
      },
      otpLength: 5,
    }),

    openAPI(), // /api/auth/reference
    admin({
      impersonationSessionDuration: 60 * 60 * 24 * 7, // 7 days
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 7 days
    updateAge: 60 * 60 * 24 * 7, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 30, // Cache duration in seconds
    },
  },
  user: {
    additionalFields: {
      plan: {
        type: 'string',
        defaultValue: 'free',
        required: true,
      },
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ newEmail, url }, _request) => {
        const { error } = await sendChangeEmailVerification({
          email: newEmail,
          verificationUrl: url,
        });

        if (error)
          return console.log('sendChangeEmailVerification Error: ', error);
      },
    },
  },
  rateLimit: {
    window: 10, // time window in seconds
    max: 100, // max requests in the window
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
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'vk'],
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    
    // autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      const { error } = await sendResetPasswordEmail({
        email: user.email,
        verificationUrl: url,
      });

      if (error) return console.log('sendResetPasswordEmail Error: ', error);
    },
  },
} satisfies BetterAuthOptions);
