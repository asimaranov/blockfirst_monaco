import React from 'react';
import { cn } from '~/helpers';
import Image from 'next/image';
import FireIcon from './assets/Fire.png';
import SparklesIcon from './assets/Sparkles.png';
// import { motion } from 'framer-motion'; // Uncomment if using animations

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

const LessonPage = () => {
  // NOTE: Replace placeholder image URLs and icons with actual assets
  const avatarUrl = '/images/avatars/alex-avatar.png'; // Placeholder

  // Glassmorphism style for rounded elements
  // Ensure 'foreground' color is defined in your Tailwind config
  const glassStyle =
    'bg-foreground/5 border-[0.026vw] border-foreground/20 backdrop-blur-lg';

  return (
    // Use provided color: background: #01050d; foreground: #f2f2f2;
    <div className="bg-background text-foreground relative h-[250px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/images/covers/LessonCover.png)` }}
      >
        {/* Use provided color: background: #01050d */}
        <div className="from-background/0 via-background/50 to-background absolute inset-0 bg-gradient-to-t"></div>
        {/* Optional: Grid Overlay could be another div or pseudo-element */}
      </div>

      {/* Main Content - Positioned above background */}
      {/* Using p-8 based on Figma x:64, y:32 offset from parent container */}
      <div className="relative z-10 flex h-full flex-col justify-between px-16 py-8">
        {/* Top Row */}
        <div className="flex items-start justify-between">
          {/* Left Section: Last Updated */}
          {/* Use provided color: success: #48cc9e; foreground: #f2f2f2; secondary: #9aa6b5 */}
          {/* Use provided font size: xs: 12px */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-success h-1.5 w-1.5 rounded-full"></div>
              <span className="text-foreground text-sm">08.03.2025</span>
            </div>
            <span className="text-secondary/50 text-xs">
              Последнее обновление
            </span>
          </div>

          {/* Right Section: Stats & Actions */}
          <div className="flex items-center gap-8">
            {/* Stats */}
            {/* Use provided font size: sm: 14px */}
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 ${glassStyle}`}
              >
                <Image src={FireIcon} alt="Fire" className="h-5 w-5" />

                <span className="text-sm">
                  12<span className="text-foreground/50"> — Стрик</span>
                </span>
              </div>
              <div
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 ${glassStyle}`}
              >
                <Image src={SparklesIcon} alt="Sparkles" className="h-5 w-5" />
                {/* Placeholder color */}
                <span className="text-sm">
                  12<span className="text-foreground/50"> — XP</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            {/* Use provided color: primary: #195af4 */}
            {/* Use provided font size: sm: 14px */}
            <div className="flex items-center gap-3">
              <button className="bg-primary hover:bg-primary/90 flex cursor-pointer items-center gap-1 rounded-full px-6 py-2.5 text-sm transition-colors">
                Премиум тариф
                <ChevronRightIcon />
              </button>
              <button
                className={`border-foreground bg-foreground hover:bg-background group cursor-pointer rounded-full border p-3 transition-colors duration-100`}
              >
                <MoonIcon />
              </button>
              <button
                className={`border-foreground bg-foreground hover:bg-background group cursor-pointer rounded-full border p-3 transition-colors duration-100`}
              >
                <ShareIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-end justify-between">
          {/* User Info */}
          <div className="flex items-center gap-5">
            <div className="relative h-12 w-12 flex-shrink-0">
              {' '}
              {/* Added fixed size to parent for absolute positioning of VerifyIcon */}
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="h-full w-full rounded-full object-cover"
              />
              <VerifyIcon className="absolute right-0 bottom-0" />
            </div>
            {/* Use provided font size: xl: 20px; xxs: 10px; xs: 12px */}
            {/* Use provided color: secondary: #9aa6b5 */}
            <div className="flex flex-col">
              <div className="mb-1 flex items-center gap-3">
                <span className="text-2xl font-medium">Алекс</span>
                <span
                  className={`border-foreground/20 font-delight rounded-full border px-3 pt-1 pb-1.25 text-xs leading-3.75 ${glassStyle}`}
                >
                  BF Heroes
                </span>
              </div>
              <div className="text-secondary text-xxs flex items-center gap-3 uppercase">
                <span>Стартапер</span>
                <span className="bg-secondary/20 h-3 w-px"></span>
                <span>самоучка</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {/* Use provided font size: sm: 14px */}
          <div className="flex items-center gap-2">
            <span className={`rounded-lg px-4 py-2 text-xs ${glassStyle}`}>
              Economy
            </span>
            <span className={`rounded-lg px-4 py-2 text-xs ${glassStyle}`}>
              DEFI
            </span>
            <span className={`rounded-lg px-4 py-2 text-xs ${glassStyle}`}>
              TOKENS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
