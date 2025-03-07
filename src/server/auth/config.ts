import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import VkProvider from "next-auth/providers/vk";
import ResendProvider from "next-auth/providers/resend";
import { db } from "~/server/db";
import { sendVerificationRequest } from "~/app/lib/authSendRequests";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "~/app/lib/zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  public readonly kind = 'signIn';

  constructor(message: string) {
    super(message);
    this.name = "CustomAuthError";
    this.message = message;
    this.type = 'CredentialsSignin';

  }
}

export function saltAndHashPassword(password: any) {
  const saltRounds = 10; // Adjust the cost factor according to your security requirements
  const salt = bcrypt.genSaltSync(saltRounds); // Synchronously generate a salt
  const hash = bcrypt.hashSync(password, salt); // Synchronously hash the password
  return hash; // Return the hash directly as a string
}
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    DiscordProvider,
    GoogleProvider({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    VkProvider({
      clientId: process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET,
      checks: [],
      token: {
        url: "https://oauth.vk.com/access_token?v=5.131",
        conform: async (response: { json: () => any; status: any }) => {
          const data = await response.json();
          return new Response(
            // Fix: OperationProcessingError: "response" body "token_type" property must be a string
            JSON.stringify({
              token_type: "dpop",
              ...data,
            }),
            // Fix: OperationProcessingError: "response" content-type must be application/json
            {
              headers: { "content-type": "application/json" },
              status: response.status,
            },
          );
        },
      },
    }),
    ResendProvider({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "noreply@blockfirst.io",
      sendVerificationRequest: sendVerificationRequest,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
        email_code: { label: "EmailCode", type: "text" },
      },
      authorize: async (credentials) => {
        let email: string;
        let password: string;
        let email_code: string;

        try {
          const parseData = await signInSchema.parseAsync(credentials);
          email = parseData.email;
          password = parseData.password;
          email_code = parseData.email_code ?? "";
        } catch (error) {
          console.error("Error", error);
          throw new CustomAuthError("Invalid credentials");
        }

        const hash = saltAndHashPassword(password);

        let user: any = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          if (!credentials.email_code) {
            throw new CustomAuthError("No email code provided.");
          }
          const code = await db.emailCode.findFirst({
            where: {
              code: credentials.email_code,
            },
          });

          if (!code) {
            throw new CustomAuthError("Invalid email code.");
          }

          if (code.expires_at < new Date()) {
            throw new CustomAuthError("Email code expired.");
          }

          if (code.attempts >= 3) {
            throw new CustomAuthError("Email code attempts limit reached.");
          }

          if (code.code !== credentials.email_code) {
            throw new CustomAuthError("Invalid email code");
          }

          await db.emailCode.update({
            where: {
              id: code.id,
            },
            data: {
              attempts: code.attempts + 1,
            },
          });

          user = await db.user.create({
            data: {
              email,
              hashedPassword: hash,
            },
          });
        } else {
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            user.hashedPassword,
          );
          if (!isMatch) {
            throw new CustomAuthError("Incorrect password.");
          }
        }

        return user;
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    signIn({ account, profile }) {
      if (account?.provider === "google") {
        return profile?.email_verified ?? false;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },

    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthConfig;
