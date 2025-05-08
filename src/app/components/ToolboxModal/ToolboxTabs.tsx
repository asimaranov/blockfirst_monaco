import { cn } from '~/helpers';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { INotification } from '~/server/models/notification';

interface NotificationsTabsProps {
  activeTab: string;
  setActive: (tab: 'utils' | 'constants' | 'terminal') => void;
}

export default function NotificationsTabs({
  activeTab,
  setActive,
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

      if (activeTab === 'utils') {
        activeTabRef = incomingTabRef;
      } else if (activeTab === 'constants') {
        activeTabRef = archieveTabRef;
      } else if (activeTab === 'terminal') {
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
    <div className="sticky top-[-1px] z-[1000000] flex-shrink-0 bg-[#0F1217]">
      <div className="relative flex w-full flex-row bg-[#14171C]">
        <div
          ref={incomingTabRef}
          className={cn(
            'opacity-50 hover:opacity-100',
            'flex cursor-pointer flex-row items-center justify-center gap-1 px-5 py-4 text-sm sm:px-8',
            activeTab == 'utils' && 'opacity-100',
            'w-38.75 text-sm'
          )}
          onClick={() => setActive('utils')}
        >
          Утилиты
        </div>
        <div
          ref={archieveTabRef}
          className={cn(
            'opacity-50 hover:opacity-100',
            'flex cursor-pointer flex-row items-center justify-center gap-1 px-5 py-4 text-sm sm:px-8',
            activeTab == 'constants' && 'opacity-100'
          )}
          onClick={() => setActive('constants')}
        >
          Константы
        </div>
        <div className="ml-auto" />
        <div
          ref={settingsTabRef}
          className={cn(
            'group opacity-50 hover:opacity-100',
            activeTab == 'terminal' && 'active',
            'flex cursor-pointer flex-row items-center justify-center gap-1 px-5 py-4 text-sm sm:px-8',
            activeTab == 'terminal' && 'opacity-100'
          )}
          onClick={() => setActive('terminal')}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M5.74219 7.5C6.55885 7.90833 7.25885 8.525 7.76719 9.29167C8.05885 9.725 8.05885 10.2833 7.76719 10.7167C7.25885 11.475 6.55885 12.0917 5.74219 12.5"
              stroke="#9AA6B5"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.832 12.5H14.1654"
              stroke="#9AA6B5"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5013 18.3346H12.5013C16.668 18.3346 18.3346 16.668 18.3346 12.5013V7.5013C18.3346 3.33464 16.668 1.66797 12.5013 1.66797H7.5013C3.33464 1.66797 1.66797 3.33464 1.66797 7.5013V12.5013C1.66797 16.668 3.33464 18.3346 7.5013 18.3346Z"
              stroke="#9AA6B5"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
