'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '~/helpers';
import Image, { StaticImageData } from 'next/image';
import FireIcon from '../assets/Fire.png';
import SparklesIcon from '../assets/Sparkles.png';
import FireGrey from '../assets/FireGrey.png';
import FirePremium from '../assets/FirePremium.png';
import PremiumBorder from '../assets/PremiumBorder.svg';

import { InfoPopoverIcon } from '../../shared/InfoPopover';
import { api } from '~/trpc/react';
import { auth, Session } from '~/server/auth';
import { Stat } from './Cover';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';


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


export const StreakAndXp = ({
  session,
  streakAndXpServer,
}: {
  session: Session | null,
  streakAndXpServer: {
    streak: { count: number; maxCount: number };
    xp: { total: number };
    lastLoginDate: Date;
  }
}) => {
  // State for popover
  const [statPopoverOpen, setStatPopoverOpen] = useState<string | null>(null);
  const statRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>(
    {}
  );

  // Use tRPC to get streak and XP data
  const { data: streakAndXp, isLoading: isLoadingStats } =
    api.userData.getStreakAndXp.useQuery(undefined, {
      enabled: !!session?.user,
      // Don't refetch while user is on the page
      refetchOnWindowFocus: false,
      initialData: streakAndXpServer,
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
  const glassStyle =
    'bg-foreground/1 border-[0.026vw] border-foreground/20 backdrop-blur-lg';

  return (
    <div className="flex items-center gap-3">
      {stats.map((stat) => (
        <div
          key={stat.alt}
          ref={statRefs.current[stat.alt]}
          className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 pr-5 ${glassStyle} hover:border-foreground hover:bg-foreground/10 z-10 border`}
          onClick={() =>
            setStatPopoverOpen(statPopoverOpen === stat.alt ? null : stat.alt)
          }
        >
          <Image src={stat.icon} alt={stat.alt} className="h-5 w-5" />
          <span className="text-sm">
            {stat.value}
            <span className="text-foreground/50"> — {stat.label}</span>
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
                  Ежедневно заходите на платформу, что бы попасть в лидерборд и
                  получать бонусы!
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
                                <stop offset="1" stop-color="#FF5B20" />
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
  );
};