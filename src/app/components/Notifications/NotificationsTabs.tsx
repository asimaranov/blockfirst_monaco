import { cn } from '~/helpers';
import { useEffect, useRef, useState } from 'react';
import { Notification } from './types';
import { motion } from 'motion/react';
import SettingIcon from './assets/settings';

interface NotificationsTabsProps {
  activeTab: string;
  setActive: (tab: 'incoming' | 'archieve' | 'settings') => void;
  incomingNotifications: Notification[];
}

export default function NotificationsTabs({
  activeTab,
  setActive,
  incomingNotifications,
}: NotificationsTabsProps) {
  const incomingTabRef = useRef<HTMLDivElement>(null);
  const archieveTabRef = useRef<HTMLDivElement>(null);
  const settingsTabRef = useRef<HTMLDivElement>(null);

  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    left: 0,
  });

  useEffect(() => {
    const updateUnderline = () => {
      let activeTabRef;

      if (activeTab === 'incoming') {
        activeTabRef = incomingTabRef;
      } else if (activeTab === 'archieve') {
        activeTabRef = archieveTabRef;
      } else if (activeTab === 'settings') {
        activeTabRef = settingsTabRef;
      }

      if (activeTabRef?.current) {
        const { width, left } = activeTabRef.current.getBoundingClientRect();
        const parentLeft =
          activeTabRef.current.parentElement?.getBoundingClientRect().left || 0;
        setUnderlineStyle({
          width,
          left: left - parentLeft,
        });
      }
    };

    updateUnderline();
    window.addEventListener('resize', updateUnderline);
    return () => window.removeEventListener('resize', updateUnderline);
  }, [activeTab]);

  return (
    <div className="sticky top-0 z-[1000000] flex-shrink-0 bg-[#0F1217]">
      <div className="relative flex w-full flex-row bg-[#14171C]">
        <div
          ref={incomingTabRef}
          className={cn(
            'opacity-50 hover:opacity-100',
            'flex cursor-pointer flex-row items-center justify-center gap-1 px-8 py-4 text-sm',
            activeTab == 'incoming' && 'opacity-100'
          )}
          onClick={() => setActive('incoming')}
        >
          Входящие
          {incomingNotifications.filter((n) => n.type !== 'promo').length >
            0 && (
            <div className="bg-error flex h-5 w-5 items-center justify-center rounded-full text-xs">
              {
                incomingNotifications.filter(
                  (notification) => notification.type !== 'promo'
                ).length
              }
            </div>
          )}
        </div>
        <div
          ref={archieveTabRef}
          className={cn(
            'opacity-50 hover:opacity-100',
            'flex cursor-pointer flex-row items-center justify-center gap-1 px-8 py-4 text-sm',
            activeTab == 'archieve' && 'opacity-100'
          )}
          onClick={() => setActive('archieve')}
        >
          Архив
        </div>
        <div className="ml-auto" />
        <div
          ref={settingsTabRef}
          className={cn(
            'group opacity-50 hover:opacity-100',
            activeTab == 'settings' && 'active',
            'flex cursor-pointer flex-row items-center justify-center gap-1 px-8 py-4 text-sm',
            activeTab == 'settings' && 'opacity-100'
          )}
          onClick={() => setActive('settings')}
        >
          <SettingIcon />
        </div>

        {/* Animated underline */}
        <motion.div
          className="bg-primary absolute bottom-0 h-[1px]"
          initial={false}
          animate={{
            width: underlineStyle.width,
            left: underlineStyle.left,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>
    </div>
  );
}
