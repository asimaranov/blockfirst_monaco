import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI, admin } from "better-auth/plugins";
import { headers } from "next/headers";
import { cache } from "react";
import { env } from "~/env";
import {
  sendChangeEmailVerification,
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "~/server/auth/email";
import { PrismaClient } from "@prisma/client";
import { auth } from "./config";

const prisma = new PrismaClient();

export const getServerSession = cache(
  async () =>
    await auth.api.getSession({
      headers: await headers(),
    }),
);

export { auth };
export type Session = typeof auth.$Infer.Session;
export type AuthUserType = Session["user"];