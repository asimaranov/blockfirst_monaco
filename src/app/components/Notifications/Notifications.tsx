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
import { authClient } from '~/server/auth/client';
import { redirect } from 'next/navigation';

interface NotificationsProps {
  onClose?: () => void;
  notificationsNum: number;
}

const Notifications = ({ onClose }: NotificationsProps) => {
  const [activeTab, setActive] = useState<'incoming' | 'archieve' | 'settings'>(
    'incoming'
  );

  // Fetch notifications using tRPC
  const { data: allNotifications, refetch: refetchNotifications } =
    api.notifications.getAll.useQuery(undefined, {
      refetchInterval: 10000, // Refetch every 10 seconds
    });
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
    allNotifications?.filter((n) => !n.isArchived) || [];
  const archivedNotifications =
    allNotifications?.filter((n) => n.isArchived) || [];
  const [inArchived, setInArchived] = useState(false);

  // Convert notification settings from DB to format used by the component
  const [settings, setSettings] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (notificationSettings) {
      // With the new structure, notificationSettings will be a single object
      const settingsMap: Record<string, boolean> = {};
      if (notificationSettings.settings) {
        // Map settings from the object to our Record
        AllNotificationSettingTypes.forEach((settingType) => {
          settingsMap[settingType] =
            notificationSettings.settings[
              settingType as keyof typeof notificationSettings.settings
            ] ??
            defaultNotificationSettings[
              settingType as keyof typeof defaultNotificationSettings
            ].defaultEnabled;
        });
      } else {
        // Fallback to default settings if none found
        AllNotificationSettingTypes.forEach((setting) => {
          settingsMap[setting] =
            defaultNotificationSettings[setting].defaultEnabled;
        });
      }
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

  // Mark notification as read
  const markNotificationAsRead = (id: string) => {
    // Only mark as read if not already read
    const notification = allNotifications?.find((n) => n.id === id);
    if (notification && !notification.isRead) {
      markAsRead.mutate({ id });
    }
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

  const { data: session } = authClient.useSession();

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
                      <div
                        onClick={() => {
                          if (session) {
                            markNotificationAsRead(notification.id);
                          } else {
                            redirect('/signin');
                          }
                        }}
                      >
                        <NotificationContent
                          notification={notification}
                          dismissNotification={dismissNotification}
                          className={cn(!session && 'cursor-pointer')}
                        />
                      </div>
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
