import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { openAPI, admin, customSession } from 'better-auth/plugins';
import { emailOTP } from 'better-auth/plugins';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import { env } from '~/env';
import UserDataModel, { IUserData } from '../models/userData';
import dbConnect from '../mongodb';

const client = new MongoClient(env.MONGODB_URI!);
const db = client.db(env.DATABASE_NAME!);

const options = {
  secret: env.AUTH_SECRET,
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain:
        process.env.NODE_ENV === 'production'
          ? `.${process.env.NEXT_PUBLIC_BLOCKFIRST_WILDCARD_DOMAIN}`
          : 'localhost', // Domain with leading period for production, localhost for dev
    },
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax', // Allows CORS-based cookie sharing across subdomains in production
      partitioned: env.NODE_ENV === 'production', // New browser standards will mandate this for foreign cookies
    },
    useSecureCookies: true,
  },
  trustedOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    `https://app.${process.env.NEXT_PUBLIC_BLOCKFIRST_WILDCARD_DOMAIN}`,
    `https://dev.${process.env.NEXT_PUBLIC_BLOCKFIRST_WILDCARD_DOMAIN}`,
    `https://editor.${process.env.NEXT_PUBLIC_BLOCKFIRST_WILDCARD_DOMAIN}`,
    `https://blog.${process.env.NEXT_PUBLIC_BLOCKFIRST_WILDCARD_DOMAIN}`,
    `https://vscode.${process.env.NEXT_PUBLIC_BLOCKFIRST_WILDCARD_DOMAIN}`,
  ],
  database: mongodbAdapter(db),
  plugins: [
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
      },
    },
  },
  rateLimit: {
    window: 10, // time window in seconds
    max: 100, // max requests in the window
  },
  socialProviders: {
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

    autoSignIn: true,
  },
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,
  plugins: [
    ...(options.plugins ?? []),
    customSession(async ({ user, session }) => {
      await dbConnect();

      const userData = await UserDataModel.findOne({
        userId: user.id,
      });

      return {
        user: {
          ...user,
          tariff: userData?.plan || 'free',
        },
        session,
      };
    }, options),
  ],
});
