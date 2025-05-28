import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import UserDataModel, { IUserData, PlanType } from '~/server/models/userData';
import dbConnect from '~/server/mongodb';

export function getStreakAction(lastLogin: Date) {
  const now = new Date();

  // Normalize dates to start of day (midnight) for proper comparison
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastLoginStart = new Date(lastLogin);
  lastLoginStart.setHours(0, 0, 0, 0);

  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);

  // Check if last login was today or yesterday
  const isToday = lastLoginStart.getTime() === todayStart.getTime();
  const isYesterday = lastLoginStart.getTime() === yesterdayStart.getTime();

  // Only increment streak if this is a new day and we haven't already logged in today
  if (!isToday) {
    if (isYesterday) {
      // Increment streak if login was yesterday
      return 'increment';
    } else {
      return 'reset';
    }
  }
  return 'noop';
}
/**
 * Helper function to check and update user streak
 */
export async function updateUserStreak(userId: string) {
  await dbConnect();

  const userData = await UserDataModel.findOne({ userId });
  if (!userData) return null;

  const now = new Date();
  const lastLogin = userData.streak?.lastLoginDate || new Date(0);


  let newStreak = userData.streak?.count || 0;
  let updatedMaxStreak = userData.streak?.maxCount || 0;
  let earnedXp = 0;

  const action = getStreakAction(lastLogin);

  // Only increment streak if this is a new day and we haven't already logged in today
  if (action === 'increment' || action === 'reset') {
    if (action === 'increment') {
      // Increment streak if login was yesterday
      newStreak += 1;
    } else {
      // Reset streak if login was not yesterday
      newStreak = 1;
    }

    earnedXp = 50 * (newStreak + 1);

    // Update max streak if needed
    updatedMaxStreak = Math.max(newStreak, updatedMaxStreak);

    // Update user data with new streak info and add XP
    await UserDataModel.findOneAndUpdate(
      { userId },
      {
        $set: {
          'streak.count': newStreak,
          'streak.lastLoginDate': now,
          'streak.maxCount': updatedMaxStreak,
        },
        $inc: { 'xp.total': earnedXp },
        $push: {
          'xp.history': {
            date: now,
            amount: earnedXp,
            source: 'daily_login',
          },
        },
      }
    );
  }

  return {
    streak: newStreak,
    maxStreak: updatedMaxStreak,
    xpEarned: earnedXp,
    totalXp: (userData.xp?.total || 0) + earnedXp,
  };
};

export const userDataRouter = createTRPCRouter({
  // Get user data for current user
  getUserData: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      return {
        userId: null,
        plan: 'free' as PlanType,
        coursesProgress: [],
        curator: { isAssigning: false },
        premiumEndDate: null,
      };
    }

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
        curator: { isAssigning: false },
        streak: { count: 0, lastLoginDate: new Date(), maxCount: 0 },
        xp: { total: 0, history: [] },
      };

      // Create default user data
      const newUserData = await UserDataModel.create(defaultUserData);
      return newUserData.toJSON();
    }

    return userData.toJSON();
  }),

  // Get curator assignment status
  getCuratorStatus: protectedProcedure.query(async ({ ctx }) => {
    await dbConnect();

    const userData = await UserDataModel.findOne(
      { userId: ctx.session.user.id },
      { curator: 1 } // Only return the curator field
    );

    // Return default if doesn't exist
    if (!userData || !userData.curator) {
      return { isAssigning: false, curatorId: null, assignedAt: null };
    }

    return {
      isAssigning: userData.curator.isAssigning || false,
      curatorId: userData.curator.curatorId || null,
      assignedAt: userData.curator.assignedAt || null,
    };
  }),

  // Get user streak and XP
  getStreakAndXp: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) {
      return {
        streak: { count: 0, maxCount: 0 },
        xp: { total: 0 },
        lastLoginDate: new Date()
      };
    }
    
    await dbConnect();

    const userData = await UserDataModel.findOne(
      { userId: ctx.session.user.id },
      { streak: 1, xp: 1 } // Only return the streak and xp fields
    );

    if (!userData) {
      console.log('[userData not found]');
      return {
        streak: { count: 0, maxCount: 0 },
        xp: { total: 0 },
        lastLoginDate: new Date()
      };
    }

    console.log('[userData found]', userData);

    return {
      streak: {
        count: userData.streak?.count || 0,
        maxCount: userData.streak?.maxCount || 0,
      },
      xp: {
        total: userData.xp?.total || 0,
      },
      lastLoginDate: userData?.streak?.lastLoginDate || new Date(0)
    };
  }),

  // Update user streak (call this when user logs in)
  updateStreak: protectedProcedure.mutation(async ({ ctx }) => {
    return await updateUserStreak(ctx.session.user.id);
  }),

  // Get streak leaderboard (top streaks)
  getStreakLeaderboard: publicProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ input }) => {
      await dbConnect();

      const leaderboard = await UserDataModel.find(
        { 'streak.count': { $gt: 0 } },
        { userId: 1, 'streak.count': 1, 'xp.total': 1 }
      )
        .sort({ 'streak.count': -1, 'xp.total': -1 })
        .limit(input.limit);

      return leaderboard.map((user) => ({
        userId: user.userId,
        streak: user.streak?.count || 0,
        xp: user.xp?.total || 0,
      }));
    }),
});
