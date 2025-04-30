import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import {
  defaultNotifications,
  initialNotifications,
  promoNotifications,
} from '~/app/components/Notifications/constants';
import {
  Notification,
  PromoNotification,
} from '~/app/components/Notifications/types';
import NotificationModel, { INotification } from '~/server/models/notification';
import NotificationSettingModel from '~/server/models/notificationSetting';
import dbConnect from '~/server/mongodb';
import { getServerSession } from '~/server/auth';
import { formatRelativeTime } from '~/app/lib/utils';

export const notificationsRouter = createTRPCRouter({
  // Get all notifications for a user
  getAll: publicProcedure.query(async ({ ctx }) => {
    const session = ctx.session;
    if (!session) {
      const notifications = [
        ...defaultNotifications.map((notification) => ({
          ...notification,
          // userId: ctx.session!.user.id,
          timestamp: formatRelativeTime(new Date()),
        })),
        ...promoNotifications.map((notification) => ({
          ...notification,
          // userId: ctx.session!.user.id,
          timestamp: formatRelativeTime(new Date()),
        })),
      ];

      return notifications as INotification[];
    }

    await dbConnect();

    const notifications = await NotificationModel.find({
      userId: session.user.id,
    }).sort({ _id: -1 }); // descending order

    // If no notifications found in MongoDB, seed with initial ones from constants
    if (notifications.length === 0) {
      try {
        // Create initial notifications in MongoDB with proper type handling
        await NotificationModel.insertMany(
          initialNotifications.map((notification) => ({
            ...notification,
            userId: ctx.session!.user.id,
            timestamp: new Date(),
          }))
        );
        await NotificationModel.insertMany(
          promoNotifications.map((notification) => ({
            ...notification,
            userId: ctx.session!.user.id,
            timestamp: new Date(),
          }))
        );
        return initialNotifications as INotification[];
      } catch (error) {
        console.error('Error seeding notifications:', error);
        return [] as INotification[];
      }
    }

    const r = notifications.map((notification) => notification.toJSON());
    console.log(r);
    return r;
  }),

  // Get only unread notifications count
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    await dbConnect();

    const count = await NotificationModel.countDocuments({
      type: { $ne: 'promo' },
      userId: ctx.session.user.id,
      isRead: false,
      isArchived: false,
    });

    return count;
  }),

  // Mark a notification as read
  markAsRead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await dbConnect();

      return NotificationModel.findOneAndUpdate(
        {
          _id: input.id,
          userId: ctx.session.user.id,
        },
        {
          isRead: true,
        },
        { new: true } // return the updated document
      );
    }),

  // Mark a notification as archived
  markAsArchived: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await dbConnect();

      return NotificationModel.findOneAndUpdate(
        {
          _id: input.id,
          userId: ctx.session.user.id,
        },
        {
          isArchived: true,
          isRead: true,
        },
        { new: true } // return the updated document
      );
    }),

  // Archive all notifications
  archiveAll: protectedProcedure.mutation(async ({ ctx }) => {
    await dbConnect();

    return NotificationModel.updateMany(
      {
        userId: ctx.session.user.id,
        isArchived: false,
        type: { $ne: 'promo' }, // Don't archive promo notifications
      },
      {
        isArchived: true,
        isRead: true,
      }
    );
  }),

  // Get notification settings
  getSettings: protectedProcedure.query(async ({ ctx }) => {
    await dbConnect();

    const settings = await NotificationSettingModel.findOne({
      userId: ctx.session.user.id,
    });

    return (
      settings || {
        userId: ctx.session.user.id,
        settings: {
          news: true,
          comments: true,
          jobs: false,
        },
      }
    );
  }),

  // Update notification setting
  updateSetting: protectedProcedure
    .input(
      z.object({
        settingType: z.string(),
        enabled: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await dbConnect();

      const updateField = `settings.${input.settingType}`;
      const update = { [updateField]: input.enabled };

      return NotificationSettingModel.findOneAndUpdate(
        {
          userId: ctx.session.user.id,
        },
        {
          $set: update,
          $setOnInsert: { userId: ctx.session.user.id },
        },
        { upsert: true, new: true } // create if it doesn't exist, return the updated document
      );
    }),
});
