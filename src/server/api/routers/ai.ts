import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import {
  getAiCompletion,
  messageSchema,
  Message,
  getRemainingTokens,
  TOKEN_LIMITS,
} from '../services/ai';
import { TRPCError } from '@trpc/server';
import {
  BaseParagraphPlugin,
  createEditor,
  createSlateEditor,
} from '@udecode/plate';
import {
  MarkdownPlugin,
  remarkMdx,
  remarkMention,
} from '@udecode/plate-markdown';
import {
  BaseEquationPlugin,
  BaseInlineEquationPlugin,
} from '@udecode/plate-math';
import { BaseColumnItemPlugin, BaseColumnPlugin } from '@udecode/plate-layout';
import {
  BaseHeadingPlugin,
  BaseTocPlugin,
  HEADING_LEVELS,
} from '@udecode/plate-heading';
import {
  BaseAudioPlugin,
  BaseFilePlugin,
  BaseImagePlugin,
  BaseMediaEmbedPlugin,
  BaseVideoPlugin,
} from '@udecode/plate-media';
import {
  BaseBoldPlugin,
  BaseCodePlugin,
  BaseItalicPlugin,
  BaseStrikethroughPlugin,
  BaseSubscriptPlugin,
  BaseSuperscriptPlugin,
  BaseUnderlinePlugin,
} from '@udecode/plate-basic-marks';
import { BaseBlockquotePlugin } from '@udecode/plate-block-quote';
import { BaseDatePlugin } from '@udecode/plate-date';
import { BaseCalloutPlugin } from '@udecode/plate-callout';
import { BaseCodeBlockPlugin } from '@udecode/plate-code-block';
import { createLowlight } from 'lowlight';
import { BaseIndentPlugin } from '@udecode/plate-indent';
import { BaseIndentListPlugin } from '@udecode/plate-indent-list';
import { BaseTogglePlugin } from '@udecode/plate-toggle';
import { BaseLinkPlugin } from '@udecode/plate-link';
import {
  BaseTableCellPlugin,
  BaseTablePlugin,
  BaseTableRowPlugin,
} from '@udecode/plate-table';
import { BaseHorizontalRulePlugin } from '@udecode/plate-horizontal-rule';
import {
  BaseFontBackgroundColorPlugin,
  BaseFontColorPlugin,
  BaseFontSizePlugin,
} from '@udecode/plate-font';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';

const editor = createSlateEditor({
  plugins: [
    BaseEquationPlugin,
    BaseColumnPlugin,
    BaseColumnItemPlugin,
    BaseTocPlugin,
    BaseVideoPlugin,
    BaseAudioPlugin,
    BaseParagraphPlugin,
    BaseHeadingPlugin,
    BaseMediaEmbedPlugin,
    BaseInlineEquationPlugin,
    BaseBoldPlugin,
    BaseCodePlugin,
    BaseItalicPlugin,
    BaseStrikethroughPlugin,
    BaseSubscriptPlugin,
    BaseSuperscriptPlugin,
    BaseUnderlinePlugin,
    BaseBlockquotePlugin,
    BaseDatePlugin,
    BaseCalloutPlugin,
    BaseCodeBlockPlugin.configure({
      options: {
        // lowlight: createLowlight(all),
      },
    }),
    BaseIndentPlugin.extend({
      inject: {
        targetPlugins: [
          BaseParagraphPlugin.key,
          BaseBlockquotePlugin.key,
          BaseCodeBlockPlugin.key,
        ],
      },
    }),
    BaseIndentListPlugin.extend({
      inject: {
        targetPlugins: [
          BaseParagraphPlugin.key,
          ...HEADING_LEVELS,
          BaseBlockquotePlugin.key,
          BaseCodeBlockPlugin.key,
          BaseTogglePlugin.key,
        ],
      },

      // options: {
      //   listStyleTypes: {
      //     todo: {
      //       liComponent: TodoLiStatic,
      //       markerComponent: TodoMarkerStatic,
      //       type: 'todo',
      //     },
      //   },
      // },
    }),

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
          .lean()
          .exec();

        if (!chatHistory) {
          return {
            messages: [
              {
                role: 'assistant' as const,
                content:
                  'Привет! Я ваш персональный AI-ментор. Как я могу помочь?',
                timestamp: new Date(),
                feedback: null,
              },
            ],
          };
        }

        // Ensure all timestamps are proper Date objects
        const parsedMessages = chatHistory.messages.map((msg: any) => ({
          ...msg,
          md: editor.getApi(MarkdownPlugin).markdown.deserialize(msg.content),
          timestamp: new Date(msg.timestamp),
          feedback: msg.feedback || null,
        }));

        return {
          ...chatHistory,
          messages: parsedMessages,
        };
      } catch (error) {
        console.error('Error fetching chat history:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch chat history',
        });
      }
    }),

  // Get remaining tokens for the current user
  getRemainingTokens: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userId = ctx.session.user.id;

      // Get user data to determine plan
      const userData = await ctx.mongo.models.userData.findOne({ userId });
      const plan = userData?.plan || 'free';

      // Get remaining tokens
      const remainingTokens = await getRemainingTokens(userId);
      const totalLimit = TOKEN_LIMITS[plan];

      return {
        remaining: remainingTokens,
        total: totalLimit,
        used: totalLimit - remainingTokens,
        plan,
      };
    } catch (error) {
      console.error('Error getting remaining tokens:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to get token information',
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
        const aiResponse = await getAiCompletion(chatHistory.messages, userId);

        // Add AI response to history
        const assistantMessage: Message = {
          role: 'assistant' as const,
          content: aiResponse,
          timestamp: new Date(),
          feedback: null,
        };

        chatHistory.messages.push(assistantMessage);

        // Save to database
        await chatHistory.save();

        const md = editor
          .getApi(MarkdownPlugin)
          .markdown.deserialize(aiResponse);

        return {
          message: { ...assistantMessage, md: md },
        };
      } catch (error) {
        console.error('Error sending message to AI:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get AI response',
        });
      }
    }),

  // Update message feedback (upvote/downvote)
  updateMessageFeedback: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        messageIndex: z.number(),
        feedback: z.enum(['upvote', 'downvote', 'none']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;

        // Find chat history
        const chatHistory = await ctx.mongo.models.chatHistory
          .findOne({
            userId,
            taskId: input.taskId,
          })
          .exec();

        if (
          !chatHistory ||
          !chatHistory.messages ||
          chatHistory.messages.length <= input.messageIndex
        ) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Message not found',
          });
        }

        // Update the feedback on the specific message
        // Convert 'none' to null to remove feedback
        const feedbackValue = input.feedback === 'none' ? null : input.feedback;
        chatHistory.messages[input.messageIndex].feedback = feedbackValue;

        // Save the updated chat history
        await chatHistory.save();

        return {
          success: true,
          messageIndex: input.messageIndex,
          feedback: feedbackValue,
        };
      } catch (error) {
        console.error('Error updating message feedback:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update message feedback',
        });
      }
    }),
});
