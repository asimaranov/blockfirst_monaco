import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import UserDataModel, { IUserData, PlanType } from '~/server/models/userData';
import dbConnect from '~/server/mongodb';

export const userDataRouter = createTRPCRouter({
  // Get user data for current user
  getUserData: protectedProcedure.query(async ({ ctx }) => {
    await dbConnect();

    const userData = await UserDataModel.findOne({
      userId: ctx.session.user.id,
    });

    // Return user data or create default if doesn't exist
    if (!userData) {
      const defaultUserData: Partial<IUserData> = {
        userId: ctx.session.user.id,
        plan: 'free',
        coursesProgress: [],
      };

      // Create default user data
      const newUserData = await UserDataModel.create(defaultUserData);
      return newUserData.toJSON();
    }

    return userData.toJSON();
  }),

  // Get only the user plan
  getUserPlan: protectedProcedure.query(async ({ ctx }) => {
    await dbConnect();

    const userData = await UserDataModel.findOne(
      { userId: ctx.session.user.id },
      { plan: 1 } // Only return the plan field
    );

    // Return user plan or default if doesn't exist
    if (!userData) {
      return { plan: 'free' as PlanType };
    }

    return { plan: userData.plan };
  }),

  // Update user plan
  updateUserPlan: protectedProcedure
    .input(z.object({ plan: z.enum(['free', 'starter', 'pro']) }))
    .mutation(async ({ ctx, input }) => {
      await dbConnect();

      const userData = await UserDataModel.findOneAndUpdate(
        { userId: ctx.session.user.id },
        {
          $set: { plan: input.plan },
          $setOnInsert: {
            userId: ctx.session.user.id,
            coursesProgress: [],
          },
        },
        { upsert: true, new: true } // Create if doesn't exist, return updated doc
      );

      return userData;
    }),
});
