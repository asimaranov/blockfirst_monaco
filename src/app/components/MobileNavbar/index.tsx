'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CoursesIcon } from './assets/courses-icon';
import DiplomaIcon from './assets/diploma-icon';
import ReferralsIcon from './assets/referrals-icon';
import TariffsIcon from './assets/tariffs-icon';
import PremiumIcon from './assets/premium-icon.png';
import Image from 'next/image';


interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isActive }) => {
  return (
    <Link
      href={href}
      className="relative flex flex-1 flex-col items-center justify-center py-4"
    >
      <div
        className={`mb-2 flex justify-center ${isActive ? 'text-foreground' : 'text-secondary'}`}
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

  const navItems = [
    { href: '/courses', icon: <CoursesIcon />, label: 'Курсы' },
    { href: '/diploma', icon: <DiplomaIcon />, label: 'Диплом' },
    { href: '/referrals', icon: <ReferralsIcon />, label: 'Рефералы' },
    { href: '/tariff', icon: <TariffsIcon />, label: 'Тариф' },
    { href: '/premium', icon: <Image src={PremiumIcon} alt="Premium" width={20} height={20} />, label: 'Премиум' },
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="bg-background fixed right-0 bottom-0 left-0 z-[999999] flex h-[70px] shadow-lg"
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
              isActive={pathname === item.href}
            />
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MobileNavbar;
