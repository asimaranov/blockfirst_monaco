'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import LightningIcon from '../../Sidebar/assets/section_icons/lightning';
import TariffIcon from '../../Sidebar/assets/section_icons/tariff';
import CertIcon from '../../Sidebar/assets/section_icons/cert';
import ReferralIcon from '../../Sidebar/assets/section_icons/referral';
import PremiumIcon from './assets/premium-icon.png';
import { useNotificationsModalStore } from '~/store/notificationsModal';

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
  const { toggle } = useNotificationsModalStore();

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
    // Function to handle document scrolling instead of content-view
    const setupScrollListener = () => {
      let debounceTimer: NodeJS.Timeout | null = null;

      // Shared handler logic for both scroll and touch events
      const handleScrollOrTouch = () => {
        // Clear any pending debounce
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }

        const currentScrollY = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        // Calculate if we're near the bottom (within 20px)
        const isNearBottom =
          scrollHeight - (currentScrollY + clientHeight) < 20;

        let newVisibility = isVisible;

        // Show navbar at the top of the document
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
          // Only show when scrolling up significantly (at least 10px)
          const scrollingUp = currentScrollY < lastScrollY;
          const scrollingDown = currentScrollY > lastScrollY;

          if (scrollingDown) {
            newVisibility = false;
          } else if (scrollingUp && lastScrollY - currentScrollY > 10) {
            newVisibility = true;
          }
          // Otherwise keep current visibility state
        }

        // Debounce the visibility change to prevent flickering
        debounceTimer = setTimeout(() => {
          setVisibilityDebounced(newVisibility);
        }, 50);

        setLastScrollY(currentScrollY);
      };

      // For standard scrolling
      window.addEventListener('scroll', handleScrollOrTouch, {
        passive: true,
      });

      // For iOS momentum scrolling
      document.addEventListener('touchmove', handleScrollOrTouch, {
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
      document.addEventListener('touchend', handleTouchEnd, {
        passive: true,
      });

      return () => {
        window.removeEventListener('scroll', handleScrollOrTouch);
        document.removeEventListener('touchmove', handleScrollOrTouch);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    };

    // Start the setup process
    const cleanup = setupScrollListener();

    return () => {
      if (cleanup) cleanup();
    };
  }, [lastScrollY, setVisibilityDebounced, isVisible]);

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
                  item.type === 'notifications' ? () => toggle('mobile') : undefined
                }
              />
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
