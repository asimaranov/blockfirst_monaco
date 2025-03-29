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
import { NotificationsModal, NotificationsModalMobile } from '../../Notifications/NotificationsModal';
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

      const handleScroll = () => {
        const currentScrollY = contentView.scrollTop;

        // Show navbar at the top of the content regardless of scroll direction
        if (currentScrollY < 20) {
          setIsVisible(true);
        } else {
          // Hide when scrolling down, show when scrolling up
          setIsVisible(currentScrollY < lastScrollY);
        }

        setLastScrollY(currentScrollY);
      };

      contentView.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        contentView.removeEventListener('scroll', handleScroll);
      };
    };

    // Start the setup process
    const cleanup = setupScrollListener();

    return () => {
      if (cleanup) cleanup();
    };
  }, [lastScrollY]);

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
            className="bg-background fixed right-0 bottom-0 left-0 z-[999999] h-[70px] shadow-lg flex sm:hidden"
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
