import { z } from "zod";
import { sendVerificationRequest } from "~/app/lib/authSendRequests";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  requestSignupEmailCode: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const { email } = input;
      const user = await ctx.db.user.findUnique({
        where: { email },
      });
      if (user) {
        throw new Error("user_already_exists");
      }

      const randomFiveNumbers = Math.floor(10000 + Math.random() * 90000);

      await sendVerificationRequest({
        to: email,
        from: "noreply@blockfirst.io",
        url: `https://app.blockfirst.io/api/auth/verify-email`,
        codeDigits: randomFiveNumbers.toString(),
      });      

      const code = await ctx.db.emailCode.create({
        data: {
          code: Math.random().toString(36).substring(2, 15),
          expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
          confirmation_type: "signup",
          email: email,
          attempts: 0,
          sent_at: new Date().toISOString(),
        },
      });

      return {
        success: true,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
