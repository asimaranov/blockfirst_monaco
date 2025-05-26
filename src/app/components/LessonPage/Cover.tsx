'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '~/helpers';
import Image, { StaticImageData } from 'next/image';
import FireIcon from './assets/Fire.png';
import SparklesIcon from './assets/Sparkles.png';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import FireGrey from './assets/FireGrey.png';
import FirePremium from './assets/FirePremium.png';
import PremiumBorder from './assets/PremiumBorder.svg';
import { motion, AnimatePresence } from 'motion/react';

import { InfoPopover, InfoPopoverIcon } from '../shared/InfoPopover';
import { authClient } from '~/server/auth/client';
import { api } from '~/trpc/react';
import MobileHeader from '../mobile/MobileHeader';
import MobileCoins from './assets/mobile-coins.png';
import { useNotificationsModalStore } from '~/store/notificationsModal';
import MobileBurgerMenu from '../mobile/MobileBurgerMenu';

// Helper Icon Components (moved from LessonPage.tsx)
const ChevronRightIcon = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
  >
    <path
      d="M14.2305 4.43162C14.5292 4.14484 15.0042 4.15441 15.291 4.45311L19.9062 9.2617C20.1848 9.55191 20.1848 10.0106 19.9062 10.3008L15.291 15.1094C15.0042 15.4082 14.5293 15.4177 14.2305 15.1308C13.9319 14.844 13.9222 14.369 14.209 14.0703L18.3262 9.78123L14.209 5.49217C13.9222 5.19338 13.9317 4.71846 14.2305 4.43162Z"
      fill="#F2F2F2"
    />
  </svg>
);
const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
  >
    <path
      d="M14.3551 10.6183C14.2484 10.4383 13.9484 10.1583 13.2018 10.2916C12.7884 10.365 12.3684 10.3983 11.9484 10.3783C10.3951 10.3116 8.98842 9.59829 8.00843 8.49829C7.14176 7.53162 6.60842 6.27162 6.60176 4.91162C6.60176 4.15162 6.74842 3.41829 7.04842 2.72495C7.34176 2.05162 7.13509 1.69829 6.98842 1.55162C6.83509 1.39829 6.47509 1.18495 5.76842 1.47829C3.04176 2.62495 1.35509 5.35829 1.55509 8.28495C1.75509 11.0383 3.68843 13.3916 6.24843 14.2783C6.86176 14.4916 7.50843 14.6183 8.17509 14.645C8.28176 14.6516 8.38842 14.6583 8.49509 14.6583C10.7284 14.6583 12.8218 13.605 14.1418 11.8116C14.5884 11.1916 14.4684 10.7983 14.3551 10.6183Z"
      fill="#01050D"
      className="group-hover:fill-foreground transition-colors duration-100"
    />
  </svg>
);
const ShareIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
  >
    <path
      d="M9.85603 1.50049V5.21477C2.42746 5.21477 0.570312 9.02192 0.570312 14.5005C1.53603 10.8233 4.2846 8.92906 7.99888 8.92906H9.85603V12.6433L15.4275 6.77477L9.85603 1.50049Z"
      fill="#01050D"
      className="group-hover:fill-foreground transition-colors duration-100"
    />
  </svg>
);
const VerifyIcon = ({ className }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('h-4.5 w-4.5', className)}
  >
    <path
      d="M17.6045 7.86628L16.3804 6.44464C16.1464 6.17471 15.9574 5.67083 15.9574 5.31092V3.7813C15.9574 2.82754 15.1743 2.04474 14.2203 2.04474H12.6902C12.3392 2.04474 11.8261 1.85579 11.5561 1.62184L10.134 0.39815C9.513 -0.132717 8.49593 -0.132717 7.86589 0.39815L6.45281 1.63084C6.18279 1.85579 5.66976 2.04474 5.31874 2.04474H3.76164C2.80758 2.04474 2.02453 2.82754 2.02453 3.7813V5.31992C2.02453 5.67083 1.83552 6.17471 1.61051 6.44464L0.395431 7.87528C-0.126602 8.49613 -0.126602 9.50387 0.395431 10.1247L1.61051 11.5554C1.83552 11.8253 2.02453 12.3292 2.02453 12.6801V14.2187C2.02453 15.1725 2.80758 15.9553 3.76164 15.9553H5.31874C5.66976 15.9553 6.18279 16.1442 6.45281 16.3782L7.87489 17.6019C8.49593 18.1327 9.513 18.1327 10.143 17.6019L11.5651 16.3782C11.8351 16.1442 12.3392 15.9553 12.6992 15.9553H14.2293C15.1833 15.9553 15.9664 15.1725 15.9664 14.2187V12.6891C15.9664 12.3382 16.1554 11.8253 16.3894 11.5554L17.6135 10.1337C18.1355 9.51287 18.1355 8.48713 17.6045 7.86628Z"
      fill="#010101"
    />
    <ellipse cx="9.5" cy="9.4986" rx="4.5" ry="4.4986" fill="#F2F2F2" />
    <path
      d="M15.6933 8.11822L14.7412 7.0125C14.5592 6.80255 14.4122 6.41065 14.4122 6.13072V4.94101C14.4122 4.1992 13.8031 3.59035 13.0611 3.59035H11.871C11.598 3.59035 11.199 3.44339 10.989 3.26143L9.8829 2.30967C9.39987 1.89678 8.60882 1.89678 8.11879 2.30967L7.01972 3.26843C6.8097 3.44339 6.41068 3.59035 6.13766 3.59035H4.92659C4.18454 3.59035 3.5755 4.1992 3.5755 4.94101V6.13772C3.5755 6.41065 3.42849 6.80255 3.25348 7.0125L2.30843 8.12522C1.9024 8.6081 1.9024 9.3919 2.30843 9.87478L3.25348 10.9875C3.42849 11.1975 3.5755 11.5894 3.5755 11.8623V13.059C3.5755 13.8008 4.18454 14.4096 4.92659 14.4096H6.13766C6.41068 14.4096 6.8097 14.5566 7.01972 14.7386L8.12579 15.6903C8.60882 16.1032 9.39987 16.1032 9.8899 15.6903L10.996 14.7386C11.206 14.5566 11.598 14.4096 11.878 14.4096H13.0681C13.8101 14.4096 14.4192 13.8008 14.4192 13.059V11.8693C14.4192 11.5964 14.5662 11.1975 14.7482 10.9875L15.7003 9.88178C16.1063 9.3989 16.1063 8.6011 15.6933 8.11822ZM11.913 7.67733L8.53181 11.0575C8.4338 11.1555 8.3008 11.2114 8.16079 11.2114C8.02078 11.2114 7.88777 11.1555 7.78977 11.0575L6.09566 9.36391C5.89265 9.16096 5.89265 8.82504 6.09566 8.62209C6.29867 8.41915 6.63469 8.41915 6.83771 8.62209L8.16079 9.94476L11.171 6.93552C11.374 6.73257 11.71 6.73257 11.913 6.93552C12.116 7.13847 12.116 7.47438 11.913 7.67733Z"
      fill="#195AF4"
    />
  </svg>
);

// --- Data Structures ---
const user = {
  name: 'Алекс',
  avatarUrl: '/images/avatars/alex-avatar.png', // Placeholder
  tags: ['Стартапер', 'самоучка'],
  badge: 'BF Heroes',
};

interface Stat {
  icon: StaticImageData;
  alt: string;
  value: number;
  label: string;
}

interface Action {
  id: string;
  type: 'button' | 'icon';
  content: React.ReactNode | string; // For icon or text
  icon?: () => JSX.Element; // For icon buttons
  onClick?: () => void; // For button actions
}

// Define actions - adjust content/icons as needed
const actions: Action[] = [
  // { id: 'theme', type: 'icon', content: <MoonIcon />, onClick: () => {} },
  {
    id: 'share',
    type: 'icon',
    content: <ShareIcon />,
    onClick: () => {
      navigator.share({
        title: document.title,
        url: window.location.href,
        text: 'Посмотри урок по web3 рабоботке ',
      });
    },
  },
];

const tags = ['Economy', 'DEFI', 'TOKENS'];

// Popover component using Portal
const Popover = ({
  isOpen,
  onClose,
  triggerRef,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 20,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  // Only render in browser environment
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popoverRef}
          className="fixed z-50 flex flex-col items-center justify-center rounded-[0.4167vw] bg-[#1D2026] p-7 shadow-lg"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
          initial={{ opacity: 0, y: -20, scale: 0.95, x: '-50%' }}
          animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
          exit={{ opacity: 0, y: -20, scale: 0.95, x: '-50%' }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const BackButton = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
    >
      <path
        d="M9.1001 4.97106C8.82562 4.69672 8.39169 4.67939 8.09717 4.9193L8.03955 4.97106L3.03955 9.97106C2.89918 10.1117 2.81983 10.3026 2.81982 10.5013C2.81993 10.7 2.89906 10.8911 3.03955 11.0316L8.03955 16.0316C8.3323 16.3243 8.80719 16.324 9.1001 16.0316C9.39297 15.7387 9.39292 15.264 9.1001 14.9711L5.38037 11.2513H16.4272C16.8413 11.2513 17.177 10.9154 17.1772 10.5013C17.1772 10.0871 16.8415 9.75133 16.4272 9.75133H5.38037L9.1001 6.0316L9.15186 5.97496C9.39226 5.68041 9.37467 5.24571 9.1001 4.97106Z"
        fill="#F2F2F2"
      />
    </svg>
  );
};

const MobilePremiumTariffs = () => {
  return (
    <Link href="/premium">
      <div className="flex h-12 items-center gap-3 rounded-lg bg-[linear-gradient(98deg,_rgba(255,_32,_162,_0.10)_1.97%,_rgba(255,_91,_32,_0.10)_104.5%)] px-5 py-3.5 sm:hidden">
        <Image src={MobileCoins} alt="MobileCoins" className="h-5 w-9.5" />
        <span className="bg-[linear-gradient(90deg,_#FF20A2_0.2%,_#FF5B20_102.13%)] bg-clip-text text-sm text-transparent">
          Премиум тарифы
        </span>

        <div className="ml-auto flex gap-1">
          <div className="pt-1.125 text-xxs rounded-[100px] bg-[#CF3336] px-2 pt-1 pb-0.75 uppercase">
            Sale 16%
          </div>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M14.2305 4.4327C14.5107 4.16382 14.9458 4.15525 15.2354 4.40145L15.2911 4.45419L19.9063 9.26278C20.1848 9.55299 20.1848 10.0116 19.9063 10.3018L15.2911 15.1104C15.0042 15.4093 14.5294 15.4187 14.2305 15.1319C13.932 14.8451 13.9223 14.3701 14.209 14.0714L18.3252 9.78231L14.209 5.49325L14.1583 5.43466C13.9245 5.13528 13.9506 4.70148 14.2305 4.4327Z"
              fill="#F2F2F2"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

// --- Component ---
const Cover = ({
  courseTitle,
  moduleTitle,
  sectionTitle,
  lessonTitle,
}: {
  courseTitle: string;
  moduleTitle: string;
  sectionTitle: string;
  lessonTitle: string;
}) => {
  // Glassmorphism style
  const glassStyle =
    'bg-foreground/1 border-[0.026vw] border-foreground/20 backdrop-blur-lg';

  // State for popover
  const [statPopoverOpen, setStatPopoverOpen] = useState<string | null>(null);
  const statRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>(
    {}
  );

  const { data: session } = authClient.useSession();

  // Use tRPC to get streak and XP data
  const { data: streakAndXp, isLoading: isLoadingStats } =
    api.userData.getStreakAndXp.useQuery(undefined, {
      enabled: !!session?.user,
      // Don't refetch while user is on the page
      refetchOnWindowFocus: false,
    });

  // Get the tRPC utils for invalidation
  const utils = api.useUtils();

  // tRPC mutation for updating streak
  const updateStreakMutation = api.userData.updateStreak.useMutation({
    onSuccess: () => {
      // Invalidate and refetch the streak data after successful mutation
      utils.userData.getStreakAndXp.invalidate();
    },
  });

  // Update streak when component mounts (user visits the page)
  useEffect(() => {
    if (session?.user && !updateStreakMutation.isPending) {
      updateStreakMutation.mutate();
    }
  }, [session?.user]);

  const stats: Stat[] = [
    {
      icon: FireIcon,
      alt: 'Fire',
      value: session?.user ? streakAndXp?.streak.count || 0 : 0,
      label: 'Стрик',
    },
    {
      icon: SparklesIcon,
      alt: 'Sparkles',
      value: session?.user ? streakAndXp?.xp.total || 0 : 0,
      label: 'XP',
    },
  ];

  // Calculate active day based on streak count
  const activeDay = session
    ? Math.min(5, streakAndXp?.streak.count || 0)
    : (0 as number);

  // Initialize refs for stat items
  useEffect(() => {
    stats.forEach((stat) => {
      statRefs.current[stat.alt] = React.createRef();
    });
  }, []);

  const notifications = api.notifications.getUnreadCount.useQuery();
  const { toggle } = useNotificationsModalStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const userData = api.userData.getUserData.useQuery();
  return (
    <>
      <div className="relative sm:hidden">
        <MobileHeader
          leftContent={
            <div className="flex items-center gap-2">
              <BackButton />
              <span className="line-clamp-1 max-w-45 overflow-hidden text-base wrap-break-word text-ellipsis">
                {courseTitle}
              </span>
            </div>
          }
          hasNotifications={(notifications.data || 0) > 0}
          onNotificationClick={() => toggle('mobile')}
          onMenuClick={handleMenuToggle}
          isMenuOpen={isMenuOpen}
        />
        <MobileBurgerMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
        {userData.data?.plan === 'free' && <MobilePremiumTariffs />}
      </div>
      <div className="bg-background text-foreground border-accent relative w-full overflow-hidden sm:border-x sm:h-62.5">
        {/* <MobileHeader></MobileHeader> */}
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/images/covers/LessonCoverMobile.png')] bg-cover bg-center bg-no-repeat sm:bg-[url('/images/covers/LessonCover.png')]">
          <div className="from-background/0 via-background/50 to-background absolute inset-0 bg-gradient-to-t"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between px-5 py-8 sm:px-16">
          {/* Top Row */}
          <div className="hidden items-start justify-between sm:flex">
            {/* Left Section: Last Updated */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-success h-1.5 w-1.5 rounded-full"></div>
                <span className="text-foreground text-sm leading-4">
                  08.03.2025
                </span>{' '}
                {/* Example Date */}
              </div>
              <span className="text-secondary/50 text-xs leading-3.5">
                Последнее обновление
              </span>
            </div>

            {/* Right Section: Stats & Actions */}
            <div className="flex items-center gap-8">
              {/* Stats */}
              <div className="flex items-center gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.alt}
                    ref={statRefs.current[stat.alt]}
                    className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 pr-5 ${glassStyle} hover:border-foreground hover:bg-foreground/10 z-10 border`}
                    onClick={() =>
                      setStatPopoverOpen(
                        statPopoverOpen === stat.alt ? null : stat.alt
                      )
                    }
                  >
                    <Image src={stat.icon} alt={stat.alt} className="h-5 w-5" />
                    <span className="text-sm">
                      {stat.value}
                      <span className="text-foreground/50">
                        {' '}
                        — {stat.label}
                      </span>
                    </span>

                    {statRefs.current[stat.alt] && (
                      <Popover
                        isOpen={statPopoverOpen === stat.alt}
                        onClose={() => setStatPopoverOpen(null)}
                        triggerRef={statRefs.current[stat.alt]}
                      >
                        <div className="mb-6 flex w-77.25 flex-col items-center gap-3">
                          <span className="text-xl">Стрик & Опыт</span>
                          <span className="text-secondary text-center text-sm">
                            Ежедневно заходите на платформу, что бы попасть в
                            лидерборд и получать бонусы!
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <div
                              className={cn(
                                'group relative flex flex-col items-center justify-center gap-2 rounded-[0.4167vw] px-4 py-5',
                                i < activeDay
                                  ? 'not-last:bg-success/10 last:bg-[linear-gradient(98deg,_rgba(255,_32,_162,_0.10)_1.97%,_rgba(255,_91,_32,_0.10)_104.5%)]'
                                  : i != 5 &&
                                      'outline-accent rounded-[0.4167vw] outline-[0.1042vw]',
                                ''
                              )}
                              key={i}
                            >
                              {i == 5 && activeDay != 6 && (
                                <Image
                                  src={PremiumBorder}
                                  alt="PremiumBorder"
                                  className="absolute top-0 right-0 h-21 w-23.75"
                                />
                              )}
                              {i < activeDay && (
                                <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4">
                                  {i != 5 ? (
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4"
                                    >
                                      <rect
                                        width="16"
                                        height="16"
                                        rx="8"
                                        fill="#33CF8E"
                                      />
                                      <path
                                        d="M5.26953 8.39078L6.82953 9.95078L10.7295 6.05078"
                                        stroke="#01050D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4"
                                    >
                                      <rect
                                        width="16"
                                        height="16"
                                        rx="8"
                                        fill="url(#paint0_linear_3623_24863)"
                                      />
                                      <path
                                        d="M5.26953 8.39078L6.82953 9.95078L10.7295 6.05078"
                                        stroke="#01050D"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <defs>
                                        <linearGradient
                                          id="paint0_linear_3623_24863"
                                          x1="-1.95918"
                                          y1="16"
                                          x2="16.4375"
                                          y2="18.6683"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop stop-color="#FF20A2" />
                                          <stop
                                            offset="1"
                                            stop-color="#FF5B20"
                                          />
                                        </linearGradient>
                                      </defs>
                                    </svg>
                                  )}
                                </div>
                              )}

                              <Image
                                src={
                                  i == 5
                                    ? FirePremium
                                    : i < activeDay
                                      ? FireIcon
                                      : FireGrey
                                }
                                alt="fire"
                                className="h-5 w-5"
                              />
                              <div className="flex w-15.75 flex-row items-center justify-center">
                                <span
                                  className={cn(
                                    i < activeDay
                                      ? 'text-success group-last:text-[#FE20A2]'
                                      : '',
                                    'text-sm leading-4'
                                  )}
                                >
                                  {50 * (i + 1)}&nbsp;
                                </span>
                                <span
                                  className={cn(
                                    'text-sm leading-4',
                                    i < activeDay
                                      ? 'text-success/50 group-last:text-[#FE20A2]/50'
                                      : 'text-secondary/50'
                                  )}
                                >
                                  {' '}
                                  – XP
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-center gap-2 pt-6 text-xs leading-3.5">
                          <InfoPopoverIcon empty={true} />
                          {/* <InfoPopover title={''} content={''}></InfoPopover> */}
                          <span className="text-secondary text-xs">
                            Лидерборд в разработке, поинты сохранятся
                          </span>
                        </div>
                      </Popover>
                    )}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {/* Premium Button (kept separate due to unique styling/content) */}
                <Link href="/premium" target="_blank">
                  <button className="bg-primary flex cursor-pointer items-center rounded-full px-6 py-2.5 text-sm transition-colors hover:bg-[#1242B2]">
                    Премиум тариф
                    <ChevronRightIcon />
                  </button>
                </Link>
                {/* Icon Buttons */}
                {actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.onClick}
                    className={`border-foreground bg-foreground hover:bg-background group flex cursor-pointer items-center justify-center rounded-full border p-3 transition-colors duration-100`}
                  >
                    {action.content}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-8">
            <div className="flex items-center gap-3 sm:hidden">
              {stats.map((stat) => (
                <div className="border-foreground/20 rounded-[100px] border-[0.5px] bg-[foreground]/1 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Image src={stat.icon} alt={stat.alt} className="h-4 w-4" />
                    <span className="text-sm leading-4">{stat.value}</span>
                  </div>
                </div>
              ))}
              <div className="ml-auto flex">
                {actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.onClick}
                    className={`border-foreground bg-foreground hover:bg-background group h-10 w-10 shrink-0 cursor-pointer rounded-full border p-3 transition-colors duration-100`}
                  >
                    {action.content}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 sm:hidden">
                <div className="flex flex-col gap-3">
                  <span className="text-xl">{lessonTitle}</span>
                  <span className="text-secondary/50 text-xs">
                    {[moduleTitle, sectionTitle].join(', ')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:hidden">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-lg px-3 py-2 text-xxs font-delight ${glassStyle}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-start justify-between sm:items-center">
              {/* User Info */}
              <div className="flex w-full items-center gap-5 sm:w-auto">
                <div className="relative h-12 w-12 flex-shrink-0">
                  <img
                    src={user.avatarUrl}
                    alt={`${user.name}'s Avatar`}
                    className="h-full w-full rounded-full object-cover"
                  />
                  <VerifyIcon className="absolute right-0 bottom-0" />
                </div>
                <div className="flex w-full flex-col">
                  <div className="mb-3 flex w-full items-center gap-3">
                    <span className="text-2xl leading-6 font-medium">
                      {user.name}
                    </span>
                    <span
                      className={`border-foreground/20 font-delight ml-auto rounded-full border px-3 pt-1 pb-1 text-xs leading-3.75 ${glassStyle}`}
                    >
                      {user.badge}
                    </span>
                  </div>
                  <div className="text-secondary text-xxs flex items-center gap-3 uppercase">
                    {user.tags.map((tag, index) => (
                      <div key={tag} className="flex items-center gap-3">
                        <span
                          key={tag}
                          className="font-delight text-xxs leading-3"
                        >
                          {tag}
                        </span>
                        {index < user.tags.length - 1 && (
                          <span className="bg-secondary/20 h-3 w-px"></span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="hidden items-center gap-2 sm:flex">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-lg px-4 py-2 text-xs ${glassStyle}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cover;
