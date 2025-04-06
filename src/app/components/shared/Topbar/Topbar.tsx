'use client';
import React, { ReactNode, useState } from 'react';
import { cn } from '~/helpers';
import MobileHeader from '../../mobile/MobileHeader';
import { IUser } from '~/app/lib/types/IUser';
import { authClient } from '~/server/auth/client';
import { SubscriptionType } from '~/app/lib/constants/subsctiptions';
import MobileBurgerMenu from '../../mobile/MobileBurgerMenu';
import MobilePremiumTopbar from './MobilePremiumTopbar';
import { useNotificationsModalStore } from '~/store/notificationsModal';
export interface TopbarProps {
  /**
   * Left side content
   */
  leftContent: ReactNode;

  /**
   * Right side content
   */
  rightContent?: ReactNode;

  /**
   * Whether to show the bottom border
   * @default true
   */
  showBorder?: boolean;

  /**
   * Additional className to apply to the nav element
   */
  className?: string;

  mobileNav?: boolean;
  mobilePremiumText?: string;
}

export function Topbar({
  leftContent,
  rightContent,
  showBorder = true,
  className,
  mobileNav = false,
  mobilePremiumText,
}: TopbarProps) {
  const session = authClient.useSession();

  const user: IUser = {
    name: session.data?.user?.name ?? '',
    startTimestamp: Date.now(),
    createdAt: new Date().toISOString(),
    subscriptionType: SubscriptionType.Starter,
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggle } = useNotificationsModalStore();
   

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {mobilePremiumText && (
        <MobilePremiumTopbar text={mobilePremiumText} />
      )}

      {mobileNav && (
        <div className="relative sm:hidden">
          <MobileHeader
            hasNotifications={true}
            onNotificationClick={() =>
              toggle('mobile')
            }
            username={user.name}
            startDate={new Date(user?.startTimestamp).toLocaleDateString(
              'ru-RU',
              {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              }
            )}
            onMenuClick={handleMenuToggle}
            isMenuOpen={isMenuOpen}
          />

          <MobileBurgerMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
        </div>
      )}

      <nav
        className={cn(
          'flex w-full flex-row items-center justify-between px-5 py-6 sm:px-8',
          showBorder && 'border-b-0 border-[#282D33] sm:border-b',
          className
        )}
      >
        {leftContent}
        {rightContent}
      </nav>
    </>
  );
}
