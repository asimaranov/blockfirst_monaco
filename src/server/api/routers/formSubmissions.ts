import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import FormSubmissionModel from '~/server/models/formSubmission';
import UserDataModel from '~/server/models/userData';
import dbConnect from '~/server/mongodb';

// Define Zod schemas for validation
const studentFormSchema = z.object({
  formType: z.literal('student'),
  name: z.string().min(1, 'Имя обязательно'),
  telegram: z.string().min(1, 'Telegram обязателен'),
  motivation: z.string().min(1, 'Мотивационное письмо обязательно'),
});

const usdtFormSchema = z.object({
  formType: z.literal('usdt'),
  transactionId: z.string().optional(),
  amountPaid: z.number().optional(),
});

const promoCodeFormSchema = z.object({
  formType: z.literal('promoCode'),
  promoCode: z.string().min(1, 'Промокод обязателен'),
});

const cvApplyFormSchema = z.object({
  formType: z.literal('cvApply'),
  name: z.string().min(1, 'Имя обязательно'),
  telegram: z.string().min(1, 'Telegram обязателен'),
  motivation: z.string().min(1, 'Дополнительная информация обязательна'),
  jobTitle: z.string().min(1, 'Название вакансии обязательно'),
});

const mentorFormSchema = z.object({
  formType: z.literal('mentor'),
  name: z.string().min(1, 'Имя обязательно'),
  telegram: z.string().min(1, 'Telegram обязателен'),
  course: z.string().min(1, 'Курс обязателен'),
});

const changeCuratorFormSchema = z.object({
  formType: z.literal('changeCurator'),
  name: z.string().min(1, 'Имя обязательно'),
  telegram: z.string().min(1, 'Telegram обязателен'),
  motivation: z.string().min(1, 'Причина смены куратора обязательна'),
});

// Union type for all form types
const formSubmissionSchema = z.discriminatedUnion('formType', [
  studentFormSchema,
  usdtFormSchema,
  promoCodeFormSchema,
  cvApplyFormSchema,
  mentorFormSchema,
  changeCuratorFormSchema,
]);

export const formSubmissionsRouter = createTRPCRouter({
  // Submit a form (public)
  submitForm: publicProcedure
    .input(formSubmissionSchema)
    .mutation(async ({ input, ctx }) => {
      await dbConnect();

      try {
        const formSubmission = await FormSubmissionModel.create({
          ...input,
          status: 'pending',
          // For CV submissions, map motivation to additionalInfo for consistency
          ...(input.formType === 'cvApply' && {
            additionalInfo: input.motivation,
          }),
        });

        // If it's a mentor form submission and user is authenticated, update user data
        if (input.formType === 'mentor' && ctx.session?.user?.id) {
          await UserDataModel.findOneAndUpdate(
            { userId: ctx.session.user.id },
            {
              $set: { 'curator.isAssigning': true },
              $setOnInsert: {
                userId: ctx.session.user.id,
                coursesProgress: [],
              },
            },
            { upsert: true }
          );
        }

        return {
          success: true,
          message: 'Форма успешно отправлена',
          data: formSubmission,
        };
      } catch (error) {
        console.error('Failed to submit form:', error);
        return {
          success: false,
          message: 'Не удалось отправить форму. Пожалуйста, попробуйте позже.',
        };
      }
    }),

  // Get form submissions (admin only)
  getFormSubmissions: protectedProcedure
    .input(
      z.object({
        formType: z
          .enum([
            'student',
            'usdt',
            'promoCode',
            'cvApply',
            'mentor',
            'changeCurator',
          ])
          .optional(),
        status: z.enum(['pending', 'processed', 'rejected']).optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input, ctx }) => {
      console.log(ctx.session);
      // Ensure the user has admin role (you may need to adjust this based on your auth system)
      if (!ctx.session?.user?.role?.includes('admin')) {
        throw new Error('Недостаточно прав для просмотра заявок');
      }

      await dbConnect();

      try {
        const filter: Record<string, any> = {};

        if (input.formType) {
          filter.formType = input.formType;
        }

        if (input.status) {
          filter.status = input.status;
        }

        const submissions = await FormSubmissionModel.find(filter)
          .sort({ createdAt: -1 })
          .skip(input.offset)
          .limit(input.limit);

        const total = await FormSubmissionModel.countDocuments(filter);

        return {
          success: true,
          data: submissions,
          pagination: {
            total,
            limit: input.limit,
            offset: input.offset,
          },
        };
      } catch (error) {
        console.error('Failed to fetch form submissions:', error);
        throw new Error(
          'Не удалось загрузить заявки. Пожалуйста, попробуйте позже.'
        );
      }
    }),

  // Update a form submission status (admin only)
  updateFormStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(['pending', 'processed', 'rejected']),
        adminNotes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Ensure the user has admin role
      if (!ctx.session?.user?.role?.includes('admin')) {
        throw new Error('Недостаточно прав для обновления статуса заявки');
      }

      await dbConnect();

      try {
        const formSubmission = await FormSubmissionModel.findById(input.id);

        if (!formSubmission) {
          return {
            success: false,
            message: 'Заявка не найдена',
          };
        }

        formSubmission.status = input.status;

        if (input.status === 'processed' || input.status === 'rejected') {
          formSubmission.processedAt = new Date();

          // If it's a mentor form, update the user's curator assignment status
          if (formSubmission.formType === 'mentor' && formSubmission.telegram) {
            // Find the user by telegram and update isAssigning to false
            // Note: This assumes that telegram usernames are unique and used as identifiers
            await UserDataModel.updateMany(
              { 'telegramAccount.username': formSubmission.telegram },
              { $set: { 'curator.isAssigning': false } }
            );

            // If processed, also set the assignedAt date
            if (input.status === 'processed') {
              await UserDataModel.updateMany(
                { 'telegramAccount.username': formSubmission.telegram },
                {
                  $set: {
                    'curator.assignedAt': new Date(),
                  },
                }
              );
            }
          }
        }

        if (input.adminNotes) {
          formSubmission.adminNotes = input.adminNotes;
        }

        await formSubmission.save();

        return {
          success: true,
          message: 'Статус заявки успешно обновлен',
          data: formSubmission,
        };
      } catch (error) {
        console.error('Failed to update form status:', error);
        return {
          success: false,
          message:
            'Не удалось обновить статус заявки. Пожалуйста, попробуйте позже.',
        };
      }
    }),
});
