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

import { InfoPopover, InfoPopoverIcon } from '../shared/InfoPopover';

// Helper Icon Components (moved from LessonPage.tsx)
const ChevronRightIcon = () => (
  <svg
    className="text-foreground h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
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
      d="M9.85603 1.5V5.21429C2.42746 5.21429 0.570312 9.02143 0.570312 14.5C1.53603 10.8229 4.2846 8.92857 7.99888 8.92857H9.85603V12.6429L15.4275 6.77429L9.85603 1.5Z"
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

const stats: Stat[] = [
  { icon: FireIcon, alt: 'Fire', value: 12, label: 'Стрик' },
  { icon: SparklesIcon, alt: 'Sparkles', value: 12, label: 'XP' },
];

interface Action {
  id: string;
  type: 'button' | 'icon';
  content: React.ReactNode | string; // For icon or text
  icon?: () => JSX.Element; // For icon buttons
}

// Define actions - adjust content/icons as needed
const actions: Action[] = [
  { id: 'theme', type: 'icon', content: <MoonIcon /> },
  { id: 'share', type: 'icon', content: <ShareIcon /> },
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
        top: rect.bottom + window.scrollY + 10, // 10px below the trigger
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

  if (!isOpen) return null;

  // Only render in browser environment
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={popoverRef}
      className="fixed z-50 flex flex-col rounded-[0.4167vw] bg-[#1D2026] p-7 shadow-lg"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)',
      }}
    >
      {children}
    </div>,
    document.body
  );
};

// --- Component ---
const Cover = () => {
  // Glassmorphism style
  const glassStyle =
    'bg-foreground/1 border-[0.026vw] border-foreground/20 backdrop-blur-lg';

  // State for popover
  const [statPopoverOpen, setStatPopoverOpen] = useState<string | null>(null);
  const statRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>(
    {}
  );

  const activeDay = 3;

  // Initialize refs for stat items
  useEffect(() => {
    stats.forEach((stat) => {
      statRefs.current[stat.alt] = React.createRef();
    });
  }, []);

  return (
    <div className="bg-background text-foreground border-accent relative h-62.5 w-full overflow-hidden border-x">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/images/covers/LessonCover.png')] bg-cover bg-center bg-no-repeat">
        <div className="from-background/0 via-background/50 to-background absolute inset-0 bg-gradient-to-t"></div>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-16 py-8">
        {/* Top Row */}
        <div className="flex items-start justify-between">
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
                  className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 ${glassStyle} hover:border-foreground hover:bg-foreground/10 z-10 border`}
                  onClick={() =>
                    setStatPopoverOpen(
                      statPopoverOpen === stat.alt ? null : stat.alt
                    )
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
                      <div className="mb-6 flex w-77.25 flex-col gap-3">
                        <span className="text-xl">Стрик & Опыт</span>
                        <span className="text-secondary text-sm">
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
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
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
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
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
                            <span
                              className={cn(
                                i < activeDay
                                  ? 'text-success group-last:text-[#FE20A2]'
                                  : '',
                                'text-sm leading-4'
                              )}
                            >
                              {50 * (i + 1)}
                              <span
                                className={cn(
                                  i < activeDay
                                    ? 'text-success/50 group-last:text-[#FE20A2]/50'
                                    : 'text-secondary/50'
                                )}
                              >
                                {' '}
                                – XP
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center gap-2 pt-6 text-xs leading-3.5">
                        <InfoPopoverIcon empty={true} />
                        {/* <InfoPopover title={''} content={''}></InfoPopover> */}
                        <span className="text-secondary">
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
                <button className="bg-primary flex cursor-pointer items-center gap-1 rounded-full px-6 py-2.5 text-sm transition-colors hover:bg-[#1242B2]">
                  Премиум тариф
                  <ChevronRightIcon />
                </button>
              </Link>
              {/* Icon Buttons */}
              {actions.map((action) => (
                <button
                  key={action.id}
                  className={`border-foreground bg-foreground hover:bg-background group cursor-pointer rounded-full border p-3 transition-colors duration-100`}
                  // Add onClick handlers here if needed: onClick={() => handleAction(action.id)}
                >
                  {action.content}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          {/* User Info */}
          <div className="flex items-center gap-5">
            <div className="relative h-12 w-12 flex-shrink-0">
              <img
                src={user.avatarUrl}
                alt={`${user.name}'s Avatar`}
                className="h-full w-full rounded-full object-cover"
              />
              <VerifyIcon className="absolute right-0 bottom-0" />
            </div>
            <div className="flex flex-col">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-2xl leading-6 font-medium">
                  {user.name}
                </span>
                <span
                  className={`border-foreground/20 font-delight rounded-full border px-3 pt-1 pb-1.25 text-xs leading-3.75 ${glassStyle}`}
                >
                  {user.badge}
                </span>
              </div>
              <div className="text-secondary text-xxs flex items-center gap-3 uppercase">
                {user.tags.map((tag, index) => (
                  <div key={tag} className="flex items-center gap-3">
                    <span key={tag} className="leading-3">
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
          <div className="flex items-center gap-2">
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
  );
};

export default Cover;
