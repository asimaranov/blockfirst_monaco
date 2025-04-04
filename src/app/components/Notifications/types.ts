// Notification type definitions
interface BaseNotification {
  id: string;
  timestamp: string;
  category: string;
  isRead: boolean;
  isArchived: boolean;
  avatar: any;
}

interface SystemNotification extends BaseNotification {
  type: 'system';
  title: string;
  message: string;
  highlightedBorder?: boolean;
}

interface CommentNotification extends BaseNotification {
  type: 'comment';
  username: string;
  course: string;
  message: string;
}

interface LikeNotification extends BaseNotification {
  type: 'like';
  username: string;
  course: string;
}

interface PromoNotification extends BaseNotification {
  type: 'promo';
  title: string;
  category: string;
  description: string;
  image: any;
}

type Notification =
  | SystemNotification
  | CommentNotification
  | LikeNotification
  | PromoNotification;

export interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultEnabled: boolean;
}

export enum NotificationSettings {
  NEWS = 'news',
  COMMENTS = 'comments',
  JOBS = 'jobs',
}

export const defaultNotificationSettings: Record<NotificationSettings, {
  defaultEnabled: boolean;
}> = {
  [NotificationSettings.NEWS]: ({
    defaultEnabled: true,
  }),
  [NotificationSettings.COMMENTS]: {
    defaultEnabled: true,
  },
  [NotificationSettings.JOBS]: {
    defaultEnabled: false,
  },
};

export const AllNotificationSettingTypes = [
  NotificationSettings.NEWS,
  NotificationSettings.COMMENTS,
  NotificationSettings.JOBS,
];

export type {
  Notification,
  SystemNotification,
  CommentNotification,
  LikeNotification,
  PromoNotification,
};
