'use client';

import { MobileHeader } from '../../mobile/MobileHeader';

import { MobileBackNav } from '../../mobile/MobileBackNav';
import { useState } from 'react';
import MobileBurgerMenu from '../../mobile/MobileBurgerMenu';
import LessonSidebar from '../../LessonSidebar';
import { useNotificationsModalStore } from '~/store/notificationsModal';
import MobileCourseProgress from './MobileCourseProgress';
import { UserInfo } from '../../Sidebar/UserInfo';
import { Session } from '~/server/auth';
import { planTypeToSubscriptionType } from '~/app/lib/utils';
import { UserInfoClient } from '../../Sidebar/UserInfoClient';
import { Skeleton } from '../../shared/Skeleton';
import { SubscriptionLabel } from '../../Sidebar/assets/SubscriptionLabel';
import { PlanType } from '~/server/models/userData';

export function UserInfoClientMobile({
  userName,
  tariff,
}: {
  userName: string;
  tariff: PlanType;
}) {
  console.log('[tariff]', tariff);
  return (
    <div
      className={
        'sticky bottom-0 z-10000 mt-auto flex flex-row justify-between border-t border-r border-[#282D33] px-5 py-6'
      }
    >
      <div
        className={
          'flex h-5 w-5 flex-col items-center justify-center rounded-full bg-[#195AF4]'
        }
      >
        <span className={'font-roboto text-xxs text-[#F2F2F2] uppercase'}>
          {userName[0]}
        </span>
      </div>

      <div className={'ml-3 flex flex-col gap-3'}>
        <span
          className={
            'font-roboto line-clamp-1 text-sm leading-5 font-medium text-[#F2F2F2]'
          }
        >
          {userName.split(' ')[0]}
        </span>
      </div>
      <div className="ml-auto">
        <SubscriptionLabel
          type={planTypeToSubscriptionType(tariff || 'free')}
        />
      </div>
    </div>
  );
}

export const MobileNavbar = ({
  session,
  notifications,
  courseTitle,
  sidebar,
}: {
  session: Session | null;
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

  console.log('[session user]', session?.user);

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
            <UserInfoClientMobile
              userName={session?.user?.name || ''}
              tariff={((session?.user as any)?.tariff || 'free') as PlanType}
            />
            <MobileCourseProgress />
            {sidebar}
          </div>
        }
      />
    </>
  );
};
