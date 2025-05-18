import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import SyncedDocument from '~/app/models/SyncedDocument';

export const syncedDocumentsRouter = createTRPCRouter({
  // Get synced documents for a specific task
  getByTaskId: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      const result = await SyncedDocument.findOne({
        taskId: input.taskId,
        userId,
      });

      return result?.documents || [];
    }),

  // Save synced documents for a task
  save: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        documents: z.array(
          z.object({
            key: z.string(),
            value: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      // Upsert - update if exists, or create new document
      const result = await SyncedDocument.findOneAndUpdate(
        { taskId: input.taskId, userId },
        {
          taskId: input.taskId,
          userId,
          documents: input.documents,
        },
        { upsert: true, new: true }
      );

      return result;
    }),
});
