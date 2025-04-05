'use client';

import { motion, useMotionValue, PanInfo, useTransform } from 'motion/react';

import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '~/helpers';
import {
  AllNotificationSettingTypes,
  defaultNotificationSettings,
  Notification,
  PromoNotification,
  NotificationSetting as UINotificationSetting,
  SystemNotification,
  CommentNotification,
  LikeNotification,
} from './types';
import { SwipeableNotification } from './SwipeableNotification';
import { promoNotifications, initialNotifications } from './constants';
import {
  NotificationContent,
  NotificationContentPromo,
  ArchievedNotificationContent,
  NoArchievedNotifications,
} from './NotificationContent';
import { NoNewNotifications } from './NotificationsModal';
import NotificationsSettings from './NotificationsSettings';
import { NotificationsTopbar } from './NotificationsTopbar';
import NotificationsTabs from './NotificationsTabs';
import PromoCarousel from './PromoCarousel';
import { api } from '~/trpc/react';

interface NotificationsProps {
  onClose?: () => void;
  notificationsNum: number;
}

// Define DB notification type
interface DBNotification {
  id: string;
  userId: string;
  type: string;
  title: string | null;
  message: string | null;
  username: string | null;
  course: string | null;
  timestamp?: Date;
  category: string;
  isRead: boolean;
  isArchived: boolean;
  avatar: string | null;
  highlightedBorder?: boolean | null;
  description: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Define DB notification setting type
interface DBNotificationSetting {
  id: string;
  userId: string;
  settingType: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Adapter function to convert DB notification to frontend Notification type
const adaptNotification = (dbNotification: DBNotification): Notification => {
  const baseNotification = {
    id: dbNotification.id,
    timestamp:
      dbNotification.timestamp?.toISOString() ||
      dbNotification.createdAt.toISOString(),
    category: dbNotification.category,
    isRead: dbNotification.isRead,
    isArchived: dbNotification.isArchived,
    avatar: dbNotification.avatar,
  };

  switch (dbNotification.type) {
    case 'promo':
      return {
        ...baseNotification,
        type: 'promo' as const,
        title: dbNotification.title || '',
        description: dbNotification.description || '',
        image: dbNotification.imageUrl,
      } as PromoNotification;
    case 'system':
      return {
        ...baseNotification,
        type: 'system' as const,
        title: dbNotification.title || '',
        message: dbNotification.message || '',
        highlightedBorder: dbNotification.highlightedBorder || false,
      } as SystemNotification;
    case 'comment':
      return {
        ...baseNotification,
        type: 'comment' as const,
        username: dbNotification.username || '',
        course: dbNotification.course || '',
        message: dbNotification.message || '',
      } as CommentNotification;
    case 'like':
      return {
        ...baseNotification,
        type: 'like' as const,
        username: dbNotification.username || '',
        course: dbNotification.course || '',
      } as LikeNotification;
    default:
      // Default to system notification
      return {
        ...baseNotification,
        type: 'system' as const,
        title: dbNotification.title || 'System Notification',
        message: dbNotification.message || '',
      } as SystemNotification;
  }
};

const Notifications = ({ onClose }: NotificationsProps) => {
  const [activeTab, setActive] = useState<'incoming' | 'archieve' | 'settings'>(
    'incoming'
  );

  // Fetch notifications using tRPC
  const { data: allNotifications, refetch: refetchNotifications } =
    api.notifications.getAll.useQuery();
  const markAsRead = api.notifications.markAsRead.useMutation({
    onSuccess: () => refetchNotifications(),
  });
  const markAsArchived = api.notifications.markAsArchived.useMutation({
    onSuccess: () => refetchNotifications(),
  });
  const archiveAllMutation = api.notifications.archiveAll.useMutation({
    onSuccess: () => refetchNotifications(),
  });
  const { data: notificationSettings } =
    api.notifications.getSettings.useQuery();
  const updateSetting = api.notifications.updateSetting.useMutation({
    onSuccess: () => refetchNotifications(),
  });

  // Derived states from fetched data
  const incomingNotifications =
    allNotifications?.map(adaptNotification).filter((n) => !n.isArchived) || [];
  const archivedNotifications =
    allNotifications?.map(adaptNotification).filter((n) => n.isArchived) || [];
  const [inArchived, setInArchived] = useState(false);

  // Convert notification settings from DB to format used by the component
  const [settings, setSettings] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (notificationSettings && notificationSettings.length > 0) {
      const settingsMap: Record<string, boolean> = {};
      notificationSettings.forEach((setting: DBNotificationSetting) => {
        settingsMap[setting.settingType] = setting.enabled;
      });
      setSettings(settingsMap);
    } else {
      // Fallback to default settings if none found
      const initialSettings: Record<string, boolean> = {};
      AllNotificationSettingTypes.forEach((setting) => {
        initialSettings[setting] =
          defaultNotificationSettings[setting].defaultEnabled;
      });
      setSettings(initialSettings);
    }
  }, [notificationSettings]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile]);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Dismiss notification (move to archive)
  const dismissNotification = (id: string) => {
    markAsArchived.mutate({ id });
  };

  // Archive all notifications
  const archiveAll = () => {
    archiveAllMutation.mutate();
    setInArchived(true);
  };

  // Toggle setting
  const toggleSetting = (settingId: string) => {
    setSettings((prev) => ({
      ...prev,
      [settingId]: !prev[settingId],
    }));

    // Persist setting to backend
    updateSetting.mutate({
      settingType: settingId,
      enabled: !settings[settingId],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="scrollbar max-w-auto flex min-w-auto flex-grow flex-col overflow-y-auto overscroll-none border-0 border-[#282D33]/40 bg-[#0F1217] sm:h-screen sm:max-w-105 sm:min-w-105 sm:border"
    >
      <div className="flex flex-grow flex-col">
        <NotificationsTopbar archiveAll={archiveAll} inArchived={inArchived} />

        <NotificationsTabs
          activeTab={activeTab}
          setActive={setActive}
          incomingNotifications={incomingNotifications}
        />

        {/* Scrollable content */}
        <div className="flex flex-1 flex-col">
          {activeTab === 'incoming' && (
            <>
              {/* Embla Carousel for promo notifications */}
              <PromoCarousel
                incomingNotifications={incomingNotifications.filter(
                  (n) => n.type === 'promo'
                )}
                dismissNotification={dismissNotification}
              />

              {/* Regular notifications */}
              {incomingNotifications.filter(
                (notification) => notification.type !== 'promo'
              ).length > 0 ? (
                incomingNotifications
                  .filter((notification) => notification.type !== 'promo')
                  .map((notification) => (
                    <SwipeableNotification
                      key={notification.id}
                      notification={notification}
                      isArchived={false}
                      isMobile={isMobile}
                      dismissNotification={dismissNotification}
                    >
                      <NotificationContent
                        notification={notification}
                        dismissNotification={dismissNotification}
                      />
                    </SwipeableNotification>
                  ))
              ) : (
                <NoNewNotifications />
              )}
            </>
          )}

          {/* Archived notifications */}
          {activeTab === 'archieve' && (
            <>
              {archivedNotifications.length === 0 ? (
                <NoArchievedNotifications />
              ) : (
                archivedNotifications.map((notification) => (
                  <SwipeableNotification
                    key={notification.id}
                    notification={notification}
                    isArchived={true}
                    isMobile={isMobile}
                    dismissNotification={dismissNotification}
                  >
                    <ArchievedNotificationContent notification={notification} />
                  </SwipeableNotification>
                ))
              )}
            </>
          )}

          {/* Settings tab content */}
          {activeTab === 'settings' && (
            <NotificationsSettings
              settings={settings}
              toggleSetting={toggleSetting}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Notifications;
