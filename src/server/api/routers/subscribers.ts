import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import SubscriberModel from '~/server/models/subscriber';
import dbConnect from '~/server/mongodb';

export const subscribersRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email({
          message: 'Пожалуйста, укажите корректный email',
        }),
      })
    )
    .mutation(async ({ input }) => {
      await dbConnect();

      try {
        // Check if subscriber already exists
        const existingSubscriber = await SubscriberModel.findOne({
          email: input.email.toLowerCase(),
        });

        if (existingSubscriber) {
          if (!existingSubscriber.isActive) {
            // Reactivate subscriber
            existingSubscriber.isActive = true;
            await existingSubscriber.save();
            return { success: true, message: 'Подписка успешно возобновлена' };
          }
          return {
            success: true,
            message: 'Вы уже подписаны на нашу рассылку',
          };
        }

        // Create new subscriber
        await SubscriberModel.create({
          email: input.email.toLowerCase(),
          isActive: true,
        });

        return {
          success: true,
          message: 'Вы успешно подписались на нашу рассылку',
        };
      } catch (error) {
        console.error('Failed to subscribe:', error);
        return {
          success: false,
          message:
            'Не удалось подписаться на рассылку. Пожалуйста, попробуйте позже.',
        };
      }
    }),

  unsubscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email({
          message: 'Пожалуйста, укажите корректный email',
        }),
      })
    )
    .mutation(async ({ input }) => {
      await dbConnect();

      try {
        const subscriber = await SubscriberModel.findOne({
          email: input.email.toLowerCase(),
        });

        if (!subscriber) {
          return {
            success: false,
            message: 'Email не найден в списке подписчиков',
          };
        }

        subscriber.isActive = false;
        await subscriber.save();

        return { success: true, message: 'Вы успешно отписались от рассылки' };
      } catch (error) {
        console.error('Failed to unsubscribe:', error);
        return {
          success: false,
          message:
            'Не удалось отписаться от рассылки. Пожалуйста, попробуйте позже.',
        };
      }
    }),
});
