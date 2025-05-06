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
  TElement,
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
import { BaseIndentPlugin } from '@udecode/plate-indent';
import { BaseIndentListPlugin } from '@udecode/plate-indent-list';
import { BaseTogglePlugin } from '@udecode/plate-toggle';

import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import { getDocumentWithFields } from '~/server/utils/document';

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

// Function to generate an array of field names for questions and answers
const generateQuestionAnswerFields = (count: number): string[] => {
  const fields: string[] = ['First message'];

  for (let i = 1; i <= count; i++) {
    fields.push(`Question ${i}`, `Answer ${i}`);
  }

  return fields;
};

// Maximum number of questions to support
const MAX_QUESTIONS = 20;

const getInitialMessages = async (data: {
  'First message': string;
  [key: string]: string;
}) => {
  return [
    {
      role: 'assistant' as const,
      content: 'Приветствую! Рад видеть тебя на экзамене!',
      timestamp: new Date(),
      delay: 1000,
    },
    {
      role: 'assistant' as const,
      content: data['First message'],
      timestamp: new Date(),
      delay: 3000,
    },
    {
      role: 'assistant' as const,
      content: `Вопрос 1: ${data['Question 1']}`,
      timestamp: new Date(),
      delay: 5000,
    },
  ];
};

// Function to evaluate answer correctness without using system role
async function evaluateAnswer(
  userAnswer: string,
  correctAnswer: string
): Promise<{ isCorrect: boolean; explanation: string }> {
  try {
    // Create conversation for AI to check answer correctness
    const messages: Message[] = [
      {
        role: 'assistant',
        content:
          'Я могу помочь оценить правильность ответов на экзамене. Пожалуйста, дайте мне ответ студента и правильный ответ для сравнения.',
        timestamp: new Date(),
      },
      {
        role: 'user',
        content: `Пожалуйста, оцени семантическую правильность ответа студента, по сравнению с эталонным ответом:
        
Ответ студента: "${userAnswer}"
Правильный ответ: "${correctAnswer}"

Будь снисходителен к форматированию и небольшим различиям, но строг к основным концепциям. 
Ответь в формате JSON с двумя полями: "isCorrect" (boolean) и "explanation" (string с кратким объяснением).`,
        timestamp: new Date(),
      },
    ];

    // Use the admin user ID to avoid using student's tokens
    const aiResponse = await getAiCompletion(messages, 'admin-evaluation');

    try {
      // Try to parse JSON response
      const result = JSON.parse(aiResponse);
      if (
        typeof result.isCorrect === 'boolean' &&
        typeof result.explanation === 'string'
      ) {
        return result;
      }
    } catch (error) {
      console.error('Error parsing AI evaluation response as JSON:', error);
    }

    // Fallback if JSON parsing fails
    return {
      isCorrect:
        aiResponse.toLowerCase().includes('правильно') ||
        aiResponse.toLowerCase().includes('correct'),
      explanation:
        'Система не смогла правильно оценить ответ в структурированном формате.',
    };
  } catch (error) {
    console.error('Error during answer evaluation:', error);
    return {
      isCorrect: false,
      explanation:
        'Произошла ошибка при оценке ответа. Пожалуйста, попробуйте еще раз.',
    };
  }
}

// Function to get the next question
const getNextQuestion = (
  currentQuestionId: number,
  data: Record<string, any>
): string | null => {
  const nextQuestionKey = `Question ${currentQuestionId + 1}`;
  const nextQuestion = data[nextQuestionKey];

  console.log('nextQuestion data', data);

  // Add logging for debugging purposes
  console.log(
    `Getting next question: currentQuestionId=${currentQuestionId}, nextQuestionKey=${nextQuestionKey}, found=${nextQuestion ? 'yes' : 'no'}`
  );

  if (typeof nextQuestion !== 'string') {
    console.log('Next question not found or not a string:', nextQuestion);
    return null;
  }

  return nextQuestion;
};

// Function to safely access string data fields
const getDataField = (
  data: Record<string, any>,
  field: string
): string | null => {
  const value = data[field];
  return typeof value === 'string' ? value : null;
};

// Function to determine total number of questions in a document
const getTotalQuestions = (data: Record<string, any>): number => {
  let count = 0;
  for (let i = 1; i <= MAX_QUESTIONS; i++) {
    const questionKey = `Question ${i}`;
    if (data[questionKey] && typeof data[questionKey] === 'string') {
      count = i;
    } else {
      break;
    }
  }
  return count;
};

export const examAiRouter = createTRPCRouter({
  // Get chat history for a task or user
  getChatHistory: protectedProcedure
    .input(
      z.object({
        examId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;

        const filter: {
          userId: string;
          examId?: string;
        } = { userId };

        if (input.examId) {
          filter.examId = input.examId;
        }

        // Generate field names for all questions and answers
        const fields = generateQuestionAnswerFields(MAX_QUESTIONS);

        const { document, data, headings } = await getDocumentWithFields<{
          'First message': string;
          [key: string]: string;
        }>(input.examId, fields);

        // Calculate total questions in the document
        const totalQuestions = getTotalQuestions(data);

        // Find existing chat history with the specified user and exam
        const chatHistory = await ctx.mongo.models.examChatHistory
          .findOne(filter)
          .lean()
          .exec();

        if (!chatHistory) {
          const messages = await getInitialMessages(data);

          // Find or create
          const newChatHistory =
            await ctx.mongo.models.examChatHistory.findOneAndUpdate(
              filter,
              {
                userId,
                examId: input.examId,
                messages,
                totalLives: 5,
                currentLives: 5,
                currentQuestionId: 1,
                totalQuestions,
                isCompleted: false,
                isFailed: false,
                correctAnswers: 0,
              },
              {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
              }
            );

          return {
            messages,
            totalLives: 5,
            currentLives: 5,
            currentQuestionId: 1,
            totalQuestions,
            isCompleted: false,
            isFailed: false,
            correctAnswers: 0,
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
          totalQuestions,
          isCompleted: chatHistory.isCompleted || false,
          isFailed: chatHistory.isFailed || false,
          correctAnswers: chatHistory.correctAnswers || 0,
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
        examId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;
        const { examId } = input;

        // Generate field names for all questions and answers
        const fields = generateQuestionAnswerFields(MAX_QUESTIONS);

        const { document, data, headings } = await getDocumentWithFields<{
          Title: string;
          Hero: string;
          Description: string;
          'Problem Statement': string;
          'Problem StatementElements': TElement[];
          'First message'?: string;
          [key: string]: any;
        }>(examId, fields);

        // Calculate total questions in the document
        const totalQuestions = getTotalQuestions(data);

        const filter = {
          userId,
          examId,
        };

        // Find or create chat history using findOneAndUpdate with upsert
        let chatHistory = await ctx.mongo.models.examChatHistory
          .findOne(filter)
          .exec();

        if (!chatHistory) {
          // Create initial messages using data from the fetched fields
          const initialData = {
            'First message': data['First message'] || '',
            'Question 1': data['Question 1'] || '',
            'Answer 1': data['Answer 1'] || '',
          };

          const initialMessages = await getInitialMessages(initialData);

          chatHistory = await ctx.mongo.models.examChatHistory.findOneAndUpdate(
            filter,
            {
              userId,
              examId,
              messages: initialMessages,
              totalLives: 5,
              currentLives: 5,
              currentQuestionId: 1,
              totalQuestions,
              isCompleted: false,
              isFailed: false,
              correctAnswers: 0,
            },
            {
              upsert: true,
              new: true,
              setDefaultsOnInsert: true,
            }
          );

          if (!chatHistory) {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to create chat history',
            });
          }
        }

        // Add user message
        const userMessage = {
          role: 'user' as const,
          content: input.content,
          timestamp: new Date(),
        };

        chatHistory.messages.push(userMessage);

        let aiResponse;
        let assistantMessage;

        // Check if we still have lives left
        if (chatHistory.currentLives <= 0) {
          assistantMessage = {
            role: 'assistant' as const,
            content: 'У вас закончились попытки. Экзамен завершен.',
            timestamp: new Date(),
            feedback: null,
            messageType: 'error' as const,
            messageTypeExplanation: 'NO_LIVES_LEFT',
          };
        } else {
          let messageType: 'error' | 'success' = 'success';
          let messageTypeExplanation: string | null = null;

          try {
            // Get the current question being answered
            const currentQuestionId = chatHistory.currentQuestionId;
            const answerKey = `Answer ${currentQuestionId}`;
            const questionKey = `Question ${currentQuestionId}`;
            const correctAnswer = getDataField(data, answerKey);
            const currentQuestion = getDataField(data, questionKey);

            if (correctAnswer) {
              // Check if the answer is correct using our new function
              const answerFeedback = await evaluateAnswer(
                input.content,
                correctAnswer
              );

              // Update user message with feedback
              const lastMessageIndex = chatHistory.messages.length - 1;
              if (
                chatHistory.messages[lastMessageIndex] &&
                chatHistory.messages[lastMessageIndex].role === 'user'
              ) {
                chatHistory.messages[lastMessageIndex].feedback = {
                  isCorrect: answerFeedback.isCorrect,
                  explanation: answerFeedback.explanation,
                };
              }

              // If answer is incorrect, reduce lives
              if (!answerFeedback.isCorrect) {
                chatHistory.currentLives = Math.max(
                  0,
                  chatHistory.currentLives - 1
                );
              } else {
                // If answer is correct, increment the correctAnswers count
                chatHistory.correctAnswers =
                  (chatHistory.correctAnswers || 0) + 1;
              }

              // Get next question regardless of whether the answer is correct or not
              let nextQuestion = null;
              if (answerFeedback.isCorrect || chatHistory.currentLives > 0) {
                nextQuestion = getNextQuestion(currentQuestionId, data);
                if (nextQuestion) {
                  chatHistory.currentQuestionId = currentQuestionId + 1;
                }
              }

              // Generate AI response based on answer correctness
              if (answerFeedback.isCorrect) {
                if (nextQuestion) {
                  // Format with "Вопрос N: " prefix to make it clearer this is a new question
                  const nextQuestionNumber = currentQuestionId + 1;
                  const formattedNextQuestion = `Вопрос ${nextQuestionNumber}: ${nextQuestion}`;
                  aiResponse = `Верно! ${answerFeedback.explanation}\n\nПереходим к следующему вопросу:\n\n${formattedNextQuestion}`;
                  messageType = 'success';
                  messageTypeExplanation = 'CORRECT_ANSWER';
                } else {
                  aiResponse = `Верно! ${answerFeedback.explanation}\n\nПоздравляю! Вы успешно завершили все вопросы экзамена.`;
                  messageType = 'success';
                  messageTypeExplanation = 'EXAM_COMPLETED';
                  // Mark exam as completed
                  chatHistory.isCompleted = true;
                }
              } else {
                if (chatHistory.currentLives > 0) {
                  if (nextQuestion) {
                    const nextQuestionNumber = currentQuestionId + 1;
                    const formattedNextQuestion = `Вопрос ${nextQuestionNumber}: ${nextQuestion}`;
                    aiResponse = `Ответ неверный. ${answerFeedback.explanation}\n\nУ вас осталось ${chatHistory.currentLives} попыток.\n\nПереходим к следующему вопросу:\n\n${formattedNextQuestion}`;
                    messageType = 'error';
                    messageTypeExplanation = 'INCORRECT_ANSWER';
                  } else {
                    aiResponse = `Ответ неверный. ${answerFeedback.explanation}\n\nУ вас осталось ${chatHistory.currentLives} попыток.\n\nПоздравляю! Вы дошли до конца экзамена.`;
                    messageType = 'error';
                    messageTypeExplanation = 'INCORRECT_ANSWER';
                    // Mark exam as completed even with wrong answers at the end
                    chatHistory.isCompleted = true;
                  }
                } else {
                  aiResponse = `Ответ неверный. ${answerFeedback.explanation}\n\nУ вас закончились попытки. Экзамен завершен.`;
                  messageType = 'error';
                  messageTypeExplanation = 'NO_LIVES_LEFT';
                  // Mark exam as failed
                  chatHistory.isCompleted = true;
                  chatHistory.isFailed = true;
                }
              }
            } else {
              // If no correct answer found, proceed with normal AI conversation
              // Create compatible messages array for AI
              const aiMessages = chatHistory.messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
                timestamp: new Date(msg.timestamp),
              }));

              aiResponse = await getAiCompletion(aiMessages, userId);
            }

            // Add AI response to history
            assistantMessage = {
              role: 'assistant' as const,
              content: aiResponse,
              messageType: messageType,
              messageTypeExplanation: messageTypeExplanation,
              timestamp: new Date(),
              feedback: null,
            };
          } catch (error) {
            console.error('Error getting AI response:', error);
            if (error instanceof Error && error.message === 'NO_TOKENS_LEFT') {
              assistantMessage = {
                role: 'assistant' as const,
                content: 'NO_TOKENS',
                timestamp: new Date(),
                feedback: null,
                messageType: 'error' as const,
                messageTypeExplanation: 'NO_TOKENS',
              };
            } else {
              assistantMessage = {
                role: 'assistant' as const,
                content: 'UNKNOWN_ERROR',
                timestamp: new Date(),
                feedback: null,
                messageType: 'error' as const,
                messageTypeExplanation: 'UNKNOWN_ERROR',
              };
            }
          }
        }

        chatHistory.messages.push(assistantMessage);

        // Save to database
        await chatHistory.save();

        const md = editor
          .getApi(MarkdownPlugin)
          .markdown.deserialize(assistantMessage.content);

        return {
          message: { ...assistantMessage, md },
          currentLives: chatHistory.currentLives,
          totalLives: chatHistory.totalLives,
          currentQuestionId: chatHistory.currentQuestionId,
          totalQuestions,
          isCompleted: chatHistory.isCompleted || false,
          isFailed: chatHistory.isFailed || false,
          correctAnswers: chatHistory.correctAnswers || 0,
        };
      } catch (error) {
        console.error('Error sending message to AI:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to get AI response',
        });
      }
    }),

  // Add a new endpoint to restart an exam
  restartExam: protectedProcedure
    .input(
      z.object({
        examId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;
        const { examId } = input;

        // Generate field names for all questions and answers
        const fields = generateQuestionAnswerFields(MAX_QUESTIONS);

        const { document, data, headings } = await getDocumentWithFields<{
          'First message': string;
          [key: string]: string;
        }>(examId, fields);

        // Calculate total questions in the document
        const totalQuestions = getTotalQuestions(data);

        // Generate initial messages for the restarted exam
        const initialMessages = await getInitialMessages(data);

        // Find and update the exam chat history
        const chatHistory =
          await ctx.mongo.models.examChatHistory.findOneAndUpdate(
            { userId, examId },
            {
              userId,
              examId,
              messages: initialMessages,
              totalLives: 5,
              currentLives: 5,
              currentQuestionId: 1,
              totalQuestions,
              isCompleted: false,
              isFailed: false,
              correctAnswers: 0,
            },
            {
              upsert: true,
              new: true,
              setDefaultsOnInsert: true,
            }
          );

        if (!chatHistory) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to restart exam',
          });
        }

        return {
          success: true,
          messages: chatHistory.messages.map((msg: any) => ({
            ...msg,
            md: editor.getApi(MarkdownPlugin).markdown.deserialize(msg.content),
            timestamp: new Date(msg.timestamp),
            feedback: msg.feedback || null,
          })),
          currentLives: chatHistory.currentLives,
          totalLives: chatHistory.totalLives,
          currentQuestionId: chatHistory.currentQuestionId,
          totalQuestions,
          isCompleted: chatHistory.isCompleted || false,
          isFailed: chatHistory.isFailed || false,
          correctAnswers: chatHistory.correctAnswers || 0,
        };
      } catch (error) {
        console.error('Error restarting exam:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to restart exam',
        });
      }
    }),
});
