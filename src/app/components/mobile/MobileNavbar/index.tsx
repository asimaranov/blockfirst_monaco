'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import LightningIcon from '../../Sidebar/assets/section_icons/lightning';
import TariffIcon from '../../Sidebar/assets/section_icons/tariff';
import CertIcon from '../../Sidebar/assets/section_icons/cert';
import ReferralIcon from '../../Sidebar/assets/section_icons/referral';
import NotificationsIcon from '../../Sidebar/assets/section_icons/notifications';
import {
  NotificationsModal,
  NotificationsModalMobile,
} from '../../Notifications/NotificationsModal';
import PremiumIcon from './assets/premium-icon.png';
interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  icon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <Link
      href={href !== '#' ? href : ''}
      className="relative flex flex-1 flex-col items-center justify-center py-4"
      onClick={(e) => {
        if (href === '#' && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div
        className={`group mb-2 flex justify-center ${isActive ? 'text-foreground' : 'text-secondary'}`}
        data-active={isActive}
      >
        {icon}
      </div>
      <span
        className={`text-xs ${isActive ? 'text-foreground' : 'text-secondary'}`}
      >
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="bg-primary absolute bottom-0 left-0 h-0.5 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  );
};

const MobileNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Debounce the visibility updates to prevent flickering
  const setVisibilityDebounced = useCallback(
    (value: boolean) => {
      // Only update if the value is changing
      if (value !== isVisible) {
        setIsVisible(value);
      }
    },
    [isVisible]
  );

  const navItems = [
    {
      href: '/dashboard',
      icon: <LightningIcon />,
      label: 'Курсы',
      otherHref: '/course',
    },
    { href: '/diploma', icon: <CertIcon />, label: 'Диплом' },
    { href: '/referral', icon: <ReferralIcon />, label: 'Рефералы' },
    { href: '/pricing', icon: <TariffIcon />, label: 'Тариф' },
    {
      href: '/premium',
      icon: <Image src={PremiumIcon} alt="Notifications" className="h-5 w-5" />,
      label: 'Премиум',
      type: 'premium',
    },
  ];

  useEffect(() => {
    // Function to find and set up the content view element
    const setupScrollListener = () => {
      const contentView = document.getElementById('content-view');

      if (!contentView) {
        // If content-view isn't ready yet, try again after a short delay
        const timeoutId = setTimeout(setupScrollListener, 100);
        return () => clearTimeout(timeoutId);
      }

      let debounceTimer: NodeJS.Timeout | null = null;

      // Shared handler logic for both scroll and touch events
      const handleScrollOrTouch = () => {
        // Clear any pending debounce
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }

        const currentScrollY = contentView.scrollTop;
        const scrollHeight = contentView.scrollHeight;
        const clientHeight = contentView.clientHeight;

        // Calculate if we're near the bottom (within 20px)
        const isNearBottom =
          scrollHeight - (currentScrollY + clientHeight) < 20;

        let newVisibility = isVisible;

        // Show navbar at the top of the content
        if (currentScrollY < 20) {
          newVisibility = true;
        }
        // Always hide navbar when at the bottom (for footer visibility)
        else if (isNearBottom) {
          newVisibility = false;
        }
        // Otherwise use standard scroll direction logic
        else {
          // Hide when scrolling down, show when scrolling up
          newVisibility = currentScrollY < lastScrollY;
        }

        // Debounce the visibility change to prevent flickering
        debounceTimer = setTimeout(() => {
          setVisibilityDebounced(newVisibility);
        }, 50);

        setLastScrollY(currentScrollY);
      };

      // For standard scrolling
      contentView.addEventListener('scroll', handleScrollOrTouch, {
        passive: true,
      });

      // For iOS momentum scrolling
      contentView.addEventListener('touchmove', handleScrollOrTouch, {
        passive: true,
      });

      // For iOS momentum scrolling with timeout
      const handleTouchEnd = () => {
        // Small delay to catch final position after momentum scrolling
        // Use a longer delay for touchend to account for iOS momentum scrolling
        setTimeout(() => {
          handleScrollOrTouch();

          // Check again after momentum scrolling completes
          setTimeout(handleScrollOrTouch, 300);
        }, 100);
      };
      contentView.addEventListener('touchend', handleTouchEnd, {
        passive: true,
      });

      return () => {
        contentView.removeEventListener('scroll', handleScrollOrTouch);
        contentView.removeEventListener('touchmove', handleScrollOrTouch);
        contentView.removeEventListener('touchend', handleTouchEnd);
      };
    };

    // Start the setup process
    const cleanup = setupScrollListener();

    return () => {
      if (cleanup) cleanup();
    };
  }, [lastScrollY, setVisibilityDebounced]);

  // Determine if a route is active, checking both exact match and otherHref
  const isRouteActive = (item: any) => {
    return (
      pathname === item.href ||
      (item.otherHref && pathname.startsWith(item.otherHref)) ||
      (item.href !== '#' && pathname.startsWith(item.href))
    );
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            className="bg-background fixed right-0 bottom-0 left-0 z-[999999] flex h-[70px] shadow-lg sm:hidden"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={isRouteActive(item)}
                onClick={
                  item.type === 'notifications'
                    ? () => setIsNotificationsOpen(true)
                    : undefined
                }
              />
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Use the NotificationsModal component */}
      <NotificationsModalMobile
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
};

export default MobileNavbar;
