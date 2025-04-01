'use client';

import React, { useState, useEffect } from 'react';
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
  const [touchStart, setTouchStart] = useState(0);

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
    // Track touch events for iOS
    const handleTouchStart = (e: TouchEvent) => {
      const touchY = e.touches[0]?.clientY;
      if (touchY !== undefined) {
        setTouchStart(touchY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStart) return;

      const touchEnd = e.touches[0]?.clientY;
      if (touchEnd === undefined) return;

      const diff = touchStart - touchEnd;

      // If scrolling down (positive diff), hide the navbar
      // If scrolling up (negative diff), show the navbar
      if (Math.abs(diff) > 5) {
        // Small threshold to avoid jitter
        setIsVisible(diff < 0);
        setTouchStart(touchEnd);
      }
    };

    // Function to handle scroll events
    const handleScroll = () => {
      // Try to get the content view, but fallback to window if not available
      const contentView = document.getElementById('content-view');
      const currentScrollY = contentView
        ? contentView.scrollTop
        : window.scrollY;

      // Show navbar at the top of the content regardless of scroll direction
      if (currentScrollY < 20) {
        setIsVisible(true);
      } else {
        // Hide when scrolling down, show when scrolling up
        setIsVisible(currentScrollY < lastScrollY);
      }

      setLastScrollY(currentScrollY);
    };

    // Set up scroll and touch event listeners
    const contentView = document.getElementById('content-view');

    // Add event listeners to both window and content-view (if it exists)
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (contentView) {
      contentView.addEventListener('scroll', handleScroll, { passive: true });
      contentView.addEventListener('touchstart', handleTouchStart, {
        passive: true,
      });
      contentView.addEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
    }

    return () => {
      // Clean up event listeners
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);

      if (contentView) {
        contentView.removeEventListener('scroll', handleScroll);
        contentView.removeEventListener('touchstart', handleTouchStart);
        contentView.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, []); // Empty dependency array to prevent recreating listeners

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
