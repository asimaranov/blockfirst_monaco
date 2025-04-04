'use client';

import { motion, useMotionValue, PanInfo, useTransform } from 'motion/react';

import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '~/helpers';
import {
  AllNotificationSettingTypes,
  defaultNotificationSettings,
  Notification,
  PromoNotification,
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
import { NotificationSetting } from './types';
import { NotificationsTopbar } from './NotificationsTopbar';
import NotificationsTabs from './NotificationsTabs';
import PromoCarousel from './PromoCarousel';
interface NotificationsProps {
  onClose?: () => void;
  notificationsNum: number;
}

// Settings type definition

const Notifications = ({ onClose }: NotificationsProps) => {
  const [activeTab, setActive] = useState<'incoming' | 'archieve' | 'settings'>(
    'incoming'
  );
  const [incomingNotifications, setIncomingNotifications] = useState<
    Notification[]
  >([...promoNotifications, ...initialNotifications]);

  const [archivedNotifications, setArchivedNotifications] = useState<
    Notification[]
  >([]);
  const [inArchived, setInArchived] = useState(false);
  // Settings state
  const [settings, setSettings] = useState<Record<string, boolean>>({});

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
    const notification = incomingNotifications.find((n) => n.id === id);
    if (notification) {
      // Remove from incoming
      setIncomingNotifications((prev) => prev.filter((n) => n.id !== id));
      // Add to archived
      setArchivedNotifications((prev) => [
        ...prev,
        { ...notification, isArchived: true, isRead: true },
      ]);
    }
  };

  // Archive all notifications
  const archiveAll = () => {
    setArchivedNotifications((prev) => [
      ...prev,
      ...incomingNotifications
        .filter((n) => n.type !== 'promo')
        .map((n) => ({
          ...n,
          isArchived: true,
          isRead: true,
        })),
    ]);
    setIncomingNotifications(
      incomingNotifications.filter((n) => n.type === 'promo')
    );
    setInArchived(true);
  };

  // Initialize settings state
  useEffect(() => {
    const initialSettings: Record<string, boolean> = {};
    AllNotificationSettingTypes.forEach((setting) => {
      initialSettings[setting] =
        defaultNotificationSettings[setting].defaultEnabled;
    });
    setSettings(initialSettings);
  }, []);

  // Toggle setting
  const toggleSetting = (settingId: string) => {
    setSettings((prev) => ({
      ...prev,
      [settingId]: !prev[settingId],
    }));
  };



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="scrollbar max-w-auto flex h-[calc(100dvh-60px)] sm:h-screen min-w-auto flex-col overflow-y-auto border border-[#282D33]/40 bg-[#0F1217] sm:max-w-105 sm:min-w-105 overscroll-none"
    >
      <div className="flex h-fit flex-col">
        <NotificationsTopbar archiveAll={archiveAll} inArchived={inArchived} />

        <NotificationsTabs
          activeTab={activeTab}
          setActive={setActive}
          incomingNotifications={incomingNotifications}
        />

        {/* Scrollable content */}
        <div className="flex-1">
          {activeTab === 'incoming' && (
            <>
              {/* Embla Carousel for promo notifications */}
              <PromoCarousel
                incomingNotifications={incomingNotifications}
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
