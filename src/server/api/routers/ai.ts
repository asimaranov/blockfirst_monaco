import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import { getAiCompletion, messageSchema, Message } from '../services/ai';
import { TRPCError } from '@trpc/server';
import { createEditor, createSlateEditor } from '@udecode/plate';
import { MarkdownPlugin, remarkMention } from '@udecode/plate-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';

const editor = createSlateEditor({
  plugins: [
    // MarkdownPlugin(),
    MarkdownPlugin.configure({
      options: {
        remarkPlugins: [remarkMath, remarkGfm, remarkMdx, remarkMention],
      },
    }),
  ],
});

export const aiRouter = createTRPCRouter({
  // Get chat history for a task or user
  getChatHistory: protectedProcedure
    .input(
      z.object({
        taskId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;

        const filter: {
          userId: string;
          taskId?: string;
        } = { userId };

        if (input.taskId) {
          filter.taskId = input.taskId;
        }

        const chatHistory = await ctx.mongo.models.chatHistory
          .findOne(filter)
          .sort({ updatedAt: -1 })
          .exec();

        if (!chatHistory) {
          return {
            messages: [
              {
                role: 'assistant' as const,
                content:
                  'Привет! Я ваш персональный AI-ментор. Как я могу помочь?',
                timestamp: new Date(),
              },
            ],
          };
        }

        return chatHistory;
      } catch (error) {
        console.error('Error fetching chat history:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch chat history',
        });
      }
    }),

  // Send a message to the AI and get a response
  sendMessage: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        taskId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;

        const filter: {
          userId: string;
          taskId?: string;
        } = { userId };

        if (input.taskId) {
          filter.taskId = input.taskId;
        }

        // Find or create chat history
        let chatHistory = await ctx.mongo.models.chatHistory
          .findOne(filter)
          .exec();

        if (!chatHistory) {
          chatHistory = new ctx.mongo.models.chatHistory({
            userId,
            taskId: input.taskId,
            messages: [
              {
                role: 'assistant' as const,
                content:
                  'Привет! Я ваш персональный AI-ментор. Как я могу помочь?',
                timestamp: new Date(),
              },
            ],
          });
        }

        // Add user message
        const userMessage: Message = {
          role: 'user' as const,
          content: input.content,
          timestamp: new Date(),
        };

        chatHistory.messages.push(userMessage);

        // Get AI response
        const aiResponse = await getAiCompletion(chatHistory.messages);

        

        // Add AI response to history
        const assistantMessage: Message = {
          role: 'assistant' as const,
          content: aiResponse,
          
          timestamp: new Date(),
        };

        chatHistory.messages.push(assistantMessage);

        // Save to database
        await chatHistory.save();

        const md = editor.getApi(MarkdownPlugin).markdown.deserialize(aiResponse);


        return {
          message: {...assistantMessage, md: md},
        };
      } catch (error) {
        console.error('Error sending message to AI:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get AI response',
        });
      }
    }),
});
