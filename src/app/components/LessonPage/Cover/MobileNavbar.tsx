'use client';

import { MobileHeader } from '../../mobile/MobileHeader';

import { MobileBackNav } from '../../mobile/MobileBackNav';
import { useState } from 'react';
import MobileBurgerMenu from '../../mobile/MobileBurgerMenu';
import LessonSidebar from '../../LessonSidebar';
import { useNotificationsModalStore } from '~/store/notificationsModal';

export const MobileNavbar = ({
  notifications,
  courseTitle,
  sidebar,
}: {
  notifications: number;
  courseTitle: string;
  lessonId: string;
  courseInfo: any;
  sidebar: React.ReactNode;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  const { toggle } = useNotificationsModalStore();

  return (
    <>
      <MobileHeader
        leftContent={<MobileBackNav href={`/`} label={courseTitle} />}
        hasNotifications={(notifications || 0) > 0}
        onNotificationClick={() => toggle('mobile')}
        onMenuClick={handleMenuToggle}
        isMenuOpen={isMenuOpen}
      />
      <MobileBurgerMenu
        className=""
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        menu={
          <div className="flex h-[calc(100dvh-69px)] flex-col overflow-y-auto">
            {sidebar}
          </div>
        }
      />
    </>
  );
};
