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
import { planTypeToSubscriptionType } from '~/app/lib/utils';
import { api } from '~/trpc/react';
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
    startTimestamp: new Date('2025-04-25').getTime(),
    createdAt: new Date('2025-04-25').toISOString(),
    subscriptionType: SubscriptionType.Starter,
    tariff: planTypeToSubscriptionType(session?.data?.user?.tariff ?? 'free'),
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggle } = useNotificationsModalStore();
  const notifications = api.notifications.getUnreadCount.useQuery();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {mobilePremiumText && <MobilePremiumTopbar text={mobilePremiumText} />}

      {mobileNav && (
        <div className="relative sm:hidden">
          <MobileHeader
            leftContent={
              <div className="flex items-center gap-4">
                <div className="bg-primary text-foreground relative flex h-10 w-10 items-center justify-center rounded-full">
                  <span className="text-base font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-foreground text-base">{user.name}</h2>
                  <div className="flex items-center gap-[3px]">
                    <span className="text-secondary text-xs">Старт —</span>
                    <span className="text-foreground text-xs">
                      {new Date(user?.startTimestamp).toLocaleDateString(
                        'ru-RU',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit',
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            }
            hasNotifications={(notifications.data || 0) > 0}
            onNotificationClick={() => toggle('mobile')}
            onMenuClick={handleMenuToggle}
            isMenuOpen={isMenuOpen}
          />

          <MobileBurgerMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
        </div>
      )}

      <nav
        className={cn(
          'flex w-full flex-row items-center justify-between px-5 py-5 pt-10 pb-5 sm:px-8 sm:pt-6 sm:pb-6',
          '',
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
