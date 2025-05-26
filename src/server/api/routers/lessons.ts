import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { ReactionType } from '../../models/lessonReaction';

export const lessonsRouter = createTRPCRouter({
  // Get lesson statistics (rating, reactions count)
  getStats: publicProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { lessonId } = input;

      if (!ctx.session) {
        return {
          averageRating: 0,
          totalRatings: 0,
          likes: 0,
          dislikes: 0,
          totalReactions: 0,
        };
      }

      // Get average rating
      const ratingStats = await ctx.mongo.models.lessonRating.aggregate([
        { $match: { lessonId } },
        {
          $group: {
            _id: null,
            averageRating: { $avg: '$rating' },
            totalRatings: { $sum: 1 },
          },
        },
      ]);

      // Get reaction counts
      const reactionStats = await ctx.mongo.models.lessonReaction.aggregate([
        { $match: { lessonId } },
        {
          $group: {
            _id: '$reactionType',
            count: { $sum: 1 },
          },
        },
      ]);

      const averageRating = ratingStats[0]?.averageRating || 0;
      const totalRatings = ratingStats[0]?.totalRatings || 0;

      const likes =
        reactionStats.find((r) => r._id === ReactionType.LIKE)?.count || 0;
      const dislikes =
        reactionStats.find((r) => r._id === ReactionType.DISLIKE)?.count || 0;
      const totalReactions = likes + dislikes;

      return {
        averageRating: Number(averageRating.toFixed(2)),
        totalRatings,
        likes,
        dislikes,
        totalReactions,
      };
    }),

  // Get user's rating and reaction for a lesson
  getUserRatingAndReaction: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { lessonId } = input;
      const userId = ctx.session.user.id;

      const [userRating, userReaction] = await Promise.all([
        ctx.mongo.models.lessonRating.findOne({ userId, lessonId }),
        ctx.mongo.models.lessonReaction.findOne({ userId, lessonId }),
      ]);

      return {
        userRating: userRating?.rating || null,
        userReaction: userReaction?.reactionType || null,
      };
    }),

  // Rate a lesson
  rateLesson: protectedProcedure
    .input(
      z.object({
        lessonId: z.string(),
        rating: z.number().min(1).max(5),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { lessonId, rating } = input;
      const userId = ctx.session.user.id;

      try {
        // Use upsert to create or update the rating
        const result = await ctx.mongo.models.lessonRating.findOneAndUpdate(
          { userId, lessonId },
          { rating },
          {
            upsert: true,
            new: true,
          }
        );

        return {
          success: true,
          rating: result.rating,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to save rating',
        });
      }
    }),

  // Remove user's rating
  removeRating: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { lessonId } = input;
      const userId = ctx.session.user.id;

      await ctx.mongo.models.lessonRating.deleteOne({ userId, lessonId });

      return { success: true };
    }),

  // Add or update a reaction to a lesson
  reactToLesson: protectedProcedure
    .input(
      z.object({
        lessonId: z.string(),
        reactionType: z.nativeEnum(ReactionType),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { lessonId, reactionType } = input;
      const userId = ctx.session.user.id;

      try {
        // Use upsert to create or update the reaction
        const result = await ctx.mongo.models.lessonReaction.findOneAndUpdate(
          { userId, lessonId },
          { reactionType },
          {
            upsert: true,
            new: true,
          }
        );

        return {
          success: true,
          reactionType: result.reactionType,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to save reaction',
        });
      }
    }),

  // Remove user's reaction
  removeReaction: protectedProcedure
    .input(z.object({ lessonId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { lessonId } = input;
      const userId = ctx.session.user.id;

      await ctx.mongo.models.lessonReaction.deleteOne({ userId, lessonId });

      return { success: true };
    }),
});
