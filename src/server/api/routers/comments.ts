import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { type SortOrder } from 'mongoose';

const commentImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
});

// Define types for our app's usage
interface CommentImage {
  id: string;
  url: string;
}

interface CommentAuthor {
  id: string;
  name: string;
  avatarInitial: string;
}

// Simple type for formatted comment
interface FormattedComment {
  id: string;
  lessonId: string;
  parentId: string | null;
  author: CommentAuthor;
  text: string;
  images?: CommentImage[];
  likes: string[];
  createdAt: Date;
  isLiked: boolean;
  replies: number;
  answers?: FormattedComment[];
}

export const commentsRouter = createTRPCRouter({
  getByLessonId: publicProcedure
    .input(
      z.object({
        lessonId: z.string(),
        sort: z.enum(['new', 'popular', 'old']).default('new'),
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(), // for pagination
      })
    )
    .query(async ({ ctx, input }) => {
      const { lessonId, sort, limit, cursor } = input;
      const userId = ctx.session?.user?.id;

      // Get root comments
      const query: any = { lessonId, parentId: null };
      if (cursor) {
        query._id = { $lt: cursor };
      }

      let sortOptions: { [key: string]: SortOrder } = {};
      switch (sort) {
        case 'new':
          sortOptions = { createdAt: -1 };
          break;
        case 'old':
          sortOptions = { createdAt: 1 };
          break;
        case 'popular':
          sortOptions = { 'likes.length': -1, createdAt: -1 };
          break;
      }

      const comments = await ctx.mongo.models.comment
        .find(query)
        .sort(sortOptions)
        .limit(limit + 1) // get one more to check if there are more results
        .lean();

      let nextCursor: string | null = null;
      if (comments.length > limit) {
        const nextItem = comments.pop();
        nextCursor = nextItem?._id?.toString() || null;
      }

      // Get all child comments for these parent comments
      const parentIds = comments.map((comment: any) => comment._id.toString());
      const childComments = await ctx.mongo.models.comment
        .find({ parentId: { $in: parentIds } })
        .sort({ createdAt: 1 })
        .lean();

      // Group child comments by parent
      const childCommentsByParent: Record<string, any[]> = {};
      childComments.forEach((comment: any) => {
        const parentId = comment.parentId?.toString() || '';
        if (!childCommentsByParent[parentId]) {
          childCommentsByParent[parentId] = [];
        }
        childCommentsByParent[parentId].push({
          ...comment,
          id: comment._id.toString(),
          isLiked: comment.likes?.includes(userId || ''),
          replies: 0, // Child comments don't have replies in this implementation
        });
      });

      // Format the response
      const formattedComments = comments.map((comment: any) => {
        const commentId = comment._id.toString();
        return {
          ...comment,
          id: commentId,
          isLiked: comment.likes?.includes(userId || ''),
          replies: (childCommentsByParent[commentId] || []).length,
          answers: childCommentsByParent[commentId] || [],
        };
      });

      return {
        comments: formattedComments,
        nextCursor,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        lessonId: z.string(),
        parentId: z.string().optional(),
        text: z.string().min(1),
        images: z.array(commentImageSchema).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { lessonId, parentId, text, images } = input;
      const userId = ctx.session.user.id;
      const userName = ctx.session.user.name || 'User';

      // Get avatar initial from name
      const avatarInitial = userName.charAt(0).toUpperCase();

      // Check if parent comment exists (if parentId is provided)
      if (parentId) {
        const parentComment = await ctx.mongo.models.comment.findById(parentId);
        if (!parentComment) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Parent comment not found',
          });
        }
      }

      const newComment = await ctx.mongo.models.comment.create({
        lessonId,
        parentId: parentId || null,
        author: {
          id: userId,
          name: userName,
          avatarInitial,
        },
        text,
        images,
        likes: [],
      });

      return {
        ...newComment.toObject(),
        id: newComment._id.toString(),
        isLiked: false,
        replies: 0,
      };
    }),

  toggleLike: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { commentId } = input;
      const userId = ctx.session.user.id;

      const comment = await ctx.mongo.models.comment.findById(commentId);
      if (!comment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Comment not found',
        });
      }

      const isLiked = comment.likes?.includes(userId);
      let updateOperation;

      if (isLiked) {
        // Unlike
        updateOperation = { $pull: { likes: userId } };
      } else {
        // Like
        updateOperation = { $addToSet: { likes: userId } };
      }

      const updatedComment = await ctx.mongo.models.comment.findByIdAndUpdate(
        commentId,
        updateOperation,
        { new: true }
      );

      return {
        isLiked: !isLiked,
        likes: updatedComment?.likes?.length || 0,
      };
    }),

  delete: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { commentId } = input;
      const userId = ctx.session.user.id;

      const comment = await ctx.mongo.models.comment.findById(commentId);
      if (!comment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Comment not found',
        });
      }

      // Only allow users to delete their own comments
      if (comment.author?.id !== userId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only delete your own comments',
        });
      }

      // Delete the comment and all its replies
      await ctx.mongo.models.comment.deleteMany({
        $or: [{ _id: commentId }, { parentId: commentId }],
      });

      return { success: true };
    }),

  update: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        text: z.string().min(1),
        images: z.array(commentImageSchema).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { commentId, text, images } = input;
      const userId = ctx.session.user.id;

      const comment = await ctx.mongo.models.comment.findById(commentId);
      if (!comment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Comment not found',
        });
      }

      // Only allow users to update their own comments
      if (comment.author?.id !== userId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only update your own comments',
        });
      }

      const updatedComment = await ctx.mongo.models.comment.findByIdAndUpdate(
        commentId,
        { text, images },
        { new: true }
      );

      return {
        ...updatedComment?.toObject(),
        id: updatedComment?._id.toString(),
        isLiked: updatedComment?.likes?.includes(userId) || false,
      };
    }),
});
