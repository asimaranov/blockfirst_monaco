import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import {
  initialNotifications,
  promoNotifications,
} from '~/app/components/Notifications/constants';
import {
  Notification,
  PromoNotification,
} from '~/app/components/Notifications/types';

export const notificationsRouter = createTRPCRouter({
  // Get all notifications for a user
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const notifications = await ctx.db.notification.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    // If no notifications found in DB, seed with initial ones from constants
    if (notifications.length === 0) {
      try {
        // Check if user exists first
        const user = await ctx.db.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
        });

        if (!user) {
          console.error('User not found when creating notification settings');
          return [];
        }

        // First create default notification settings
        await Promise.all([
          ctx.db.notificationSetting.upsert({
            where: {
              userId_settingType: {
                userId: ctx.session.user.id,
                settingType: 'news',
              },
            },
            update: {},
            create: {
              userId: ctx.session.user.id,
              settingType: 'news',
              enabled: true,
            },
          }),
          ctx.db.notificationSetting.upsert({
            where: {
              userId_settingType: {
                userId: ctx.session.user.id,
                settingType: 'comments',
              },
            },
            update: {},
            create: {
              userId: ctx.session.user.id,
              settingType: 'comments',
              enabled: true,
            },
          }),
          ctx.db.notificationSetting.upsert({
            where: {
              userId_settingType: {
                userId: ctx.session.user.id,
                settingType: 'jobs',
              },
            },
            update: {},
            create: {
              userId: ctx.session.user.id,
              settingType: 'jobs',
              enabled: true,
            },
          }),
        ]);

        // Create initial notifications in DB with proper type handling
        const dbNotifications = await Promise.all([
          ...initialNotifications.map((notification) => {
            // Common notification fields
            const baseData = {
              userId: ctx.session.user.id,
              type: notification.type,
              category: notification.category,
              isRead: notification.isRead,
              isArchived: notification.isArchived,
              avatar: notification.avatar || null,
              timestamp: new Date(),
            };

            // Add type-specific fields
            let specificData = {};

            if (notification.type === 'system') {
              specificData = {
                title: notification.title,
                message: notification.message,
                highlightedBorder: notification.highlightedBorder || false,
              };
            } else if (notification.type === 'comment') {
              specificData = {
                username: notification.username,
                course: notification.course,
                message: notification.message,
              };
            } else if (notification.type === 'like') {
              specificData = {
                username: notification.username,
                course: notification.course,
              };
            }

            return ctx.db.notification.create({
              data: {
                ...baseData,
                ...specificData,
              },
            });
          }),
          ...promoNotifications.map((notification: PromoNotification) =>
            ctx.db.notification.create({
              data: {
                userId: ctx.session.user.id,
                type: notification.type,
                title: notification.title,
                category: notification.category,
                isRead: notification.isRead,
                isArchived: notification.isArchived,
                avatar: notification.avatar || null,
                imageUrl: notification.image || null,
                description: notification.description || null,
                timestamp: new Date(),
              },
            })
          ),
        ]);

        return dbNotifications;
      } catch (error) {
        console.error('Error seeding notifications:', error);
        return [];
      }
    }

    return notifications;
  }),

  // Get only unread notifications count
  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    const count = await ctx.db.notification.count({
      where: {
        userId: ctx.session.user.id,
        isRead: false,
        isArchived: false,
      },
    });

    return count;
  }),

  // Mark a notification as read
  markAsRead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.notification.update({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: {
          isRead: true,
        },
      });
    }),

  // Mark a notification as archived
  markAsArchived: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.notification.update({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: {
          isArchived: true,
          isRead: true,
        },
      });
    }),

  // Archive all notifications
  archiveAll: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.notification.updateMany({
      where: {
        userId: ctx.session.user.id,
        isArchived: false,
        type: { not: 'promo' }, // Don't archive promo notifications
      },
      data: {
        isArchived: true,
        isRead: true,
      },
    });
  }),

  // Get notification settings
  getSettings: protectedProcedure.query(async ({ ctx }) => {
    const settings = await ctx.db.notificationSetting.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return settings;
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
      return ctx.db.notificationSetting.upsert({
        where: {
          userId_settingType: {
            userId: ctx.session.user.id,
            settingType: input.settingType,
          },
        },
        update: {
          enabled: input.enabled,
        },
        create: {
          userId: ctx.session.user.id,
          settingType: input.settingType,
          enabled: input.enabled,
        },
      });
    }),
});
