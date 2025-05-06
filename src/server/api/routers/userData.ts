import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import UserDataModel, { IUserData, PlanType } from '~/server/models/userData';
import dbConnect from '~/server/mongodb';

/**
 * Helper function to check and update user streak
 */
const updateUserStreak = async (userId: string) => {
  await dbConnect();

  const userData = await UserDataModel.findOne({ userId });
  if (!userData) return null;

  const now = new Date();
  const lastLogin = userData.streak?.lastLoginDate || new Date(0);

  // Check if last login was yesterday or today
  const lastLoginDate = new Date(lastLogin);
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday =
    lastLoginDate.getDate() === now.getDate() &&
    lastLoginDate.getMonth() === now.getMonth() &&
    lastLoginDate.getFullYear() === now.getFullYear();

  const isYesterday =
    lastLoginDate.getDate() === yesterday.getDate() &&
    lastLoginDate.getMonth() === yesterday.getMonth() &&
    lastLoginDate.getFullYear() === yesterday.getFullYear();

  let newStreak = userData.streak?.count || 0;
  let updatedMaxStreak = userData.streak?.maxCount || 0;
  let earnedXp = 0;

  // Only increment streak if this is a new day and we haven't already logged in today
  if (!isToday) {
    if (isYesterday) {
      // Increment streak if login was yesterday
      newStreak += 1;
    } else {
      // Reset streak if login was not yesterday
      newStreak = 1;
    }

    // Calculate XP earned based on streak milestones
    if (newStreak % 5 === 0) {
      // Bonus XP for every 5 days
      earnedXp = 50;
    } else {
      // Base XP for daily login
      earnedXp = 10;
    }

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

  // Update curator assignment status
  updateCuratorAssigningStatus: protectedProcedure
    .input(z.object({ isAssigning: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await dbConnect();

      const userData = await UserDataModel.findOneAndUpdate(
        { userId: ctx.session.user.id },
        {
          $set: { 'curator.isAssigning': input.isAssigning },
          $setOnInsert: {
            userId: ctx.session.user.id,
            coursesProgress: [],
          },
        },
        { upsert: true, new: true } // Create if doesn't exist, return updated doc
      );

      return userData.curator || { isAssigning: input.isAssigning };
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

  // Get user streak and XP
  getStreakAndXp: protectedProcedure.query(async ({ ctx }) => {
    await dbConnect();

    const userData = await UserDataModel.findOne(
      { userId: ctx.session.user.id },
      { streak: 1, xp: 1 } // Only return the streak and xp fields
    );

    if (!userData) {
      return {
        streak: { count: 0, maxCount: 0 },
        xp: { total: 0 },
      };
    }

    return {
      streak: {
        count: userData.streak?.count || 0,
        maxCount: userData.streak?.maxCount || 0,
      },
      xp: {
        total: userData.xp?.total || 0,
      },
    };
  }),

  // Update user streak (call this when user logs in)
  updateStreak: protectedProcedure.mutation(async ({ ctx }) => {
    return await updateUserStreak(ctx.session.user.id);
  }),

  // Add XP to user
  addXp: protectedProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        source: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await dbConnect();

      const now = new Date();

      const userData = await UserDataModel.findOneAndUpdate(
        { userId: ctx.session.user.id },
        {
          $inc: { 'xp.total': input.amount },
          $push: {
            'xp.history': {
              date: now,
              amount: input.amount,
              source: input.source,
            },
          },
          $setOnInsert: {
            userId: ctx.session.user.id,
            streak: { count: 0, lastLoginDate: now, maxCount: 0 },
          },
        },
        { upsert: true, new: true } // Create if doesn't exist, return updated doc
      );

      return {
        totalXp: userData.xp?.total || input.amount,
        addedXp: input.amount,
      };
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

  // Mark lesson as completed and award XP
  completeLessonAndAwardXp: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        lessonId: z.string(),
        xpAmount: z.number().default(50), // Default XP for completing a lesson
      })
    )
    .mutation(async ({ ctx, input }) => {
      await dbConnect();

      const now = new Date();

      // First, find the user data
      const userData = await UserDataModel.findOne({
        userId: ctx.session.user.id,
      });

      if (!userData) {
        // Create new user data if it doesn't exist
        const defaultUserData: Partial<IUserData> = {
          userId: ctx.session.user.id,
          plan: 'free',
          coursesProgress: [
            {
              courseId: input.courseId,
              progress: 0,
              completed: false,
              startedAt: now,
              lastAccessedAt: now,
              lessons: [
                {
                  lessonId: input.lessonId,
                  completed: true,
                  lastAccessedAt: now,
                },
              ],
            },
          ],
          streak: { count: 0, lastLoginDate: now, maxCount: 0 },
          xp: {
            total: input.xpAmount,
            history: [
              {
                date: now,
                amount: input.xpAmount,
                source: `lesson_completion:${input.courseId}:${input.lessonId}`,
              },
            ],
          },
        };

        const newUserData = await UserDataModel.create(defaultUserData);
        return {
          success: true,
          xpAwarded: input.xpAmount,
          totalXp: input.xpAmount,
          courseProgress: newUserData.coursesProgress.find(
            (c) => c.courseId === input.courseId
          ),
        };
      }

      // Check if course exists in user progress
      let courseProgress = userData.coursesProgress.find(
        (course) => course.courseId === input.courseId
      );

      if (!courseProgress) {
        // Add new course progress if it doesn't exist
        courseProgress = {
          courseId: input.courseId,
          progress: 0,
          completed: false,
          startedAt: now,
          lastAccessedAt: now,
          lessons: [],
        };
        userData.coursesProgress.push(courseProgress);
      }

      // Check if lesson exists in course progress
      let lessonProgress = courseProgress.lessons.find(
        (lesson) => lesson.lessonId === input.lessonId
      );

      // Only award XP if lesson wasn't completed before
      let xpAwarded = 0;

      if (!lessonProgress) {
        // Add new lesson progress if it doesn't exist
        lessonProgress = {
          lessonId: input.lessonId,
          completed: true,
          lastAccessedAt: now,
        };
        courseProgress.lessons.push(lessonProgress);
        xpAwarded = input.xpAmount;
      } else if (!lessonProgress.completed) {
        // Lesson exists but wasn't completed before
        lessonProgress.completed = true;
        lessonProgress.lastAccessedAt = now;
        xpAwarded = input.xpAmount;
      }

      // Update course progress percentage
      if (courseProgress.lessons.length > 0) {
        const completedLessons = courseProgress.lessons.filter(
          (l) => l.completed
        ).length;
        courseProgress.progress = Math.round(
          (completedLessons / courseProgress.lessons.length) * 100
        );

        // Check if all lessons are completed
        courseProgress.completed =
          completedLessons === courseProgress.lessons.length;
        if (courseProgress.completed && !courseProgress.completedAt) {
          courseProgress.completedAt = now;

          // Extra XP for completing the whole course
          xpAwarded += 100;
        }
      }

      // Update user data
      if (xpAwarded > 0) {
        // Award XP and update user data
        userData.xp = userData.xp || { total: 0, history: [] };
        userData.xp.total = (userData.xp.total || 0) + xpAwarded;
        userData.xp.history = userData.xp.history || [];
        userData.xp.history.push({
          date: now,
          amount: xpAwarded,
          source: `lesson_completion:${input.courseId}:${input.lessonId}`,
        });
      }

      // Update last accessed time
      courseProgress.lastAccessedAt = now;

      // Save updates
      await userData.save();

      return {
        success: true,
        xpAwarded,
        totalXp: userData.xp?.total || 0,
        courseProgress,
      };
    }),
});
