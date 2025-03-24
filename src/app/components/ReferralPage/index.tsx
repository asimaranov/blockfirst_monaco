'use client';

import { useState, useRef, useEffect } from 'react';
import { Topbar } from './Topbar';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
// import CallIcon from './assets/calls.png';
// import TextIcon from './assets/text.png';
// import GridSvg from './assets/grid.svg';
// import TopGridSvg from './assets/top-grid.svg';
import UserIcon from '../input-legends/user';
import TelegramSvg from '../input-legends/telegram';
import StatsIcon from './assets/stats-icon.svg';
import TaskSquareSvg from '../input-legends/task_square';
import { InfoPopover } from '~/app/components/shared/InfoPopover';
import { Modal } from '../shared/Modal';
import { ArrowUpRight, ChevronDown, Wallet } from 'lucide-react';

// Add new types
type TimePeriod = '7d' | '30d' | '90d' | 'all';

// Add new components
const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  badgeText,
  badgeColor = 'bg-dark',
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  badgeText?: string;
  badgeColor?: string;
}) => (
  <div className="flex flex-col gap-6 p-8">
    <div
      className={`${badgeColor} inline-flex h-[30px] w-fit items-center rounded-lg px-3 py-2`}
    >
      <span
        className={`${badgeColor === 'bg-success/10' ? 'text-success' : 'text-secondary'} text-sm`}
      >
        {badgeText || title}
      </span>
    </div>
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#010514]">
          {icon}
        </div>
        <span className="text-foreground text-2xl">{value}</span>
      </div>
      <span className="text-secondary text-sm opacity-50">{subtitle}</span>
    </div>
  </div>
);

const TimePeriodSelector = ({
  value,
  onChange,
}: {
  value: TimePeriod;
  onChange: (period: TimePeriod) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const periods: { label: string; value: TimePeriod }[] = [
    { label: '7 дней', value: '7d' },
    { label: '30 дней', value: '30d' },
    { label: '90 дней', value: '90d' },
    { label: 'Все время', value: 'all' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 items-center gap-2 rounded-[100px] bg-[#14171C] px-4 py-[9px] transition-colors hover:bg-[#1c2026]"
      >
        <span className="text-foreground text-sm">
          {periods.find((p) => p.value === value)?.label}
        </span>
        <ChevronDown
          size={14}
          className={`text-[#186EF2] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-10 mt-2 w-full rounded-lg bg-[#14171C] py-2 shadow-lg">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => {
                onChange(period.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[#1c2026] ${
                value === period.value ? 'text-foreground' : 'text-secondary'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ComingSoon = () => {
  return (
    <svg
      width="103"
      height="24"
      viewBox="0 0 103 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-25"
    >
      <rect
        x="0.25"
        y="0.25"
        width="102.5"
        height="23.5"
        rx="11.75"
        stroke="url(#paint0_linear_1147_15805)"
        stroke-opacity="0.5"
        stroke-width="0.5"
      />
      <path
        d="M12.36 11.716C12.36 8.992 13.956 7.276 16.356 7.276C18.396 7.276 19.848 8.464 20.244 10.456H19.14C18.792 9.052 17.772 8.236 16.344 8.236C14.604 8.236 13.44 9.568 13.44 11.716C13.44 13.852 14.604 15.184 16.356 15.184C17.844 15.184 18.888 14.272 19.188 12.748H20.292C19.968 14.872 18.492 16.144 16.356 16.144C13.956 16.144 12.36 14.44 12.36 11.716ZM22.0644 12.76C22.0644 14.224 22.8444 15.208 24.1524 15.208C25.4604 15.208 26.2284 14.224 26.2284 12.76C26.2284 11.308 25.4604 10.324 24.1524 10.324C22.8444 10.324 22.0644 11.308 22.0644 12.76ZM21.0084 12.76C21.0084 10.756 22.2564 9.388 24.1524 9.388C26.0484 9.388 27.2844 10.756 27.2844 12.76C27.2844 14.764 26.0484 16.144 24.1524 16.144C22.2564 16.144 21.0084 14.764 21.0084 12.76ZM29.0605 12.76C29.0605 14.224 29.8405 15.208 31.1485 15.208C32.4565 15.208 33.2245 14.224 33.2245 12.76C33.2245 11.308 32.4565 10.324 31.1485 10.324C29.8405 10.324 29.0605 11.308 29.0605 12.76ZM28.0045 12.76C28.0045 10.756 29.2525 9.388 31.1485 9.388C33.0445 9.388 34.2805 10.756 34.2805 12.76C34.2805 14.764 33.0445 16.144 31.1485 16.144C29.2525 16.144 28.0045 14.764 28.0045 12.76ZM35.1926 16V9.532H36.1286L36.1646 10.684C36.4766 9.868 37.2086 9.388 38.1686 9.388C39.1766 9.388 39.8966 9.904 40.2086 10.768C40.5086 9.904 41.2646 9.388 42.2846 9.388C43.6646 9.388 44.5286 10.324 44.5286 11.836V16H43.4966V12.22C43.4966 10.972 43.0286 10.324 42.0806 10.324C41.0606 10.324 40.3766 11.08 40.3766 12.22V16H39.3446V12.22C39.3446 10.972 38.8766 10.324 37.9286 10.324C36.9086 10.324 36.2246 11.08 36.2246 12.22V16H35.1926ZM45.6352 16V9.532H46.6432V16H45.6352ZM45.5872 8.584V7.264H46.6912V8.584H45.5872ZM47.8023 16V9.532H48.7383L48.7743 10.696C49.1103 9.868 49.8783 9.388 50.8983 9.388C52.3383 9.388 53.2263 10.324 53.2263 11.836V16H52.1943V12.22C52.1943 10.972 51.6903 10.324 50.6703 10.324C49.5663 10.324 48.8343 11.08 48.8343 12.22V16H47.8023ZM55.1465 12.592C55.1465 14.032 55.8425 14.848 57.0905 14.848C58.3625 14.848 59.1305 14.008 59.1305 12.592C59.1305 11.188 58.3625 10.324 57.0905 10.324C55.8425 10.324 55.1465 11.14 55.1465 12.592ZM54.3305 15.976H55.3865C55.4705 16.924 56.3105 17.38 57.2465 17.38C58.2665 17.38 59.1065 16.828 59.1065 15.328V14.608C58.7105 15.364 57.8825 15.784 56.9225 15.784C55.2305 15.784 54.0905 14.488 54.0905 12.58C54.0905 10.672 55.2305 9.388 56.9105 9.388C57.8825 9.388 58.7825 9.808 59.1665 10.636L59.2025 9.532H60.1385V15.328C60.1385 17.452 58.8665 18.316 57.2345 18.316C55.7345 18.316 54.4745 17.584 54.3305 15.976ZM63.204 13.036H64.272C64.416 14.392 65.328 15.184 66.816 15.184C68.088 15.184 68.868 14.608 68.868 13.684C68.868 12.58 67.8 12.352 66.432 12.076C64.968 11.788 63.408 11.44 63.408 9.724C63.408 8.248 64.548 7.276 66.408 7.276C68.46 7.276 69.66 8.536 69.792 10.18H68.712C68.592 9.088 67.776 8.236 66.384 8.236C65.256 8.236 64.488 8.836 64.488 9.688C64.488 10.708 65.616 10.936 66.852 11.188C68.436 11.5 69.948 11.848 69.948 13.612C69.948 15.208 68.628 16.144 66.792 16.144C64.62 16.144 63.288 14.848 63.204 13.036ZM71.6699 12.76C71.6699 14.224 72.4499 15.208 73.7579 15.208C75.0659 15.208 75.8339 14.224 75.8339 12.76C75.8339 11.308 75.0659 10.324 73.7579 10.324C72.4499 10.324 71.6699 11.308 71.6699 12.76ZM70.6139 12.76C70.6139 10.756 71.8619 9.388 73.7579 9.388C75.6539 9.388 76.8899 10.756 76.8899 12.76C76.8899 14.764 75.6539 16.144 73.7579 16.144C71.8619 16.144 70.6139 14.764 70.6139 12.76ZM78.666 12.76C78.666 14.224 79.446 15.208 80.754 15.208C82.062 15.208 82.83 14.224 82.83 12.76C82.83 11.308 82.062 10.324 80.754 10.324C79.446 10.324 78.666 11.308 78.666 12.76ZM77.61 12.76C77.61 10.756 78.858 9.388 80.754 9.388C82.65 9.388 83.886 10.756 83.886 12.76C83.886 14.764 82.65 16.144 80.754 16.144C78.858 16.144 77.61 14.764 77.61 12.76ZM84.8101 16V9.532H85.7461L85.7821 10.696C86.1181 9.868 86.8861 9.388 87.9061 9.388C89.3461 9.388 90.2341 10.324 90.2341 11.836V16H89.2021V12.22C89.2021 10.972 88.6981 10.324 87.6781 10.324C86.5741 10.324 85.8421 11.08 85.8421 12.22V16H84.8101Z"
        fill="url(#paint1_linear_1147_15805)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1147_15805"
          x1="8.20354"
          y1="35.0769"
          x2="106.26"
          y2="-15.5989"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F46919" />
          <stop offset="1" stop-color="#F419AB" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1147_15805"
          x1="18.292"
          y1="25.9231"
          x2="86.252"
          y2="-17.178"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F46919" />
          <stop offset="1" stop-color="#F419AB" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default function ReferralPage({ session }: { session: Session }) {
  const [index, setIndex] = useState(0);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('7d');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="border-accent flex h-screen flex-col border-x">
      <div className="flex flex-1 flex-col">
        <Topbar lastestUpdate={'18 марта 2025'} />

        <div className="flex flex-row">
          {/* Statistics Section */}
          <div className="border-accent flex flex-col border-b">
            {/* Header */}
            <div className="border-accent flex h-[112px] flex-col justify-center border-b px-8">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center">
                      <Image src={StatsIcon} alt="stats" className='h-5 w-5' />
                    </div>
                    <span className="text-foreground text-base">
                      Статистика
                    </span>
                  </div>
                  <TimePeriodSelector
                    value={timePeriod}
                    onChange={setTimePeriod}
                  />
                </div>
                <span className="text-secondary text-sm opacity-50">
                  Ниже предоставлена информация по вашим рефералам
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="divide-accent grid grid-cols-3 divide-x">
              {/* Referrals Card */}
              <StatCard
                title="рефералы"
                value="24"
                subtitle="Приглашенных пользователей"
                icon={<UserIcon active={true} />}
              />

              {/* Purchases Card */}
              <StatCard
                title="Покупки"
                value="12"
                subtitle="Приобретённых тарифов"
                icon={<TaskSquareSvg active={true} />}
              />

              {/* Earnings Card */}
              <StatCard
                title="Процент"
                value="56 012 ₽"
                subtitle="Доход от рефералов"
                icon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 11.333V4.667c0-1.4 1-2.334 2.333-2.334h7.334c1.333 0 2.333.934 2.333 2.334v6.666c0 1.4-1 2.334-2.333 2.334H4.333C3 13.667 2 12.733 2 11.333z"
                      stroke="#F2F2F2"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.333 6h7.334M6 9h4"
                      stroke="#F2F2F2"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                badgeText="Процент — 3%"
                badgeColor="bg-success/10"
              />
            </div>
          </div>

          {/* Balance Card */}
          <div className="border-accent flex w-[401px] flex-col border-l bg-[#14171C]">
            <div className="flex flex-col px-8 py-8">
              {/* Top section with avatars and info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[18px]">
                  <div className="flex">
                    <div className="border-dark relative h-5 w-5 rounded-full border-[1.67px]">
                      <img
                        src="/path/to/avatar1.jpg"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <div className="border-dark relative -ml-[9px] h-5 w-5 rounded-full border-[1.67px]">
                      <img
                        src="/path/to/avatar2.jpg"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <div className="border-dark relative -ml-[9px] h-5 w-5 rounded-full border-[1.67px] bg-[#FFDE2A]">
                      <svg
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        width="10"
                        height="9"
                        viewBox="0 0 10 9"
                        fill="none"
                      >
                        <path
                          d="M5.154 5.625v3.125M7.217 4.375l-2.063 1.25-2.063-1.25M5.154 5.625L3.091 4.375M5.154 5.625l2.063-1.25M5.154 0v3.125"
                          stroke="#0F1217"
                          strokeWidth="0.807"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <InfoPopover
                    title="Дополнительно"
                    content="Информация о балансе и выплатах"
                  />
                </div>
              </div>

              {/* Balance section */}
              <div className="mt-[26px] flex flex-col gap-3">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-[#F46919] to-[#F419AB] bg-clip-text">
                    <span className="inline-flex rounded-full bg-[#14171C]/10 px-3 py-1.5 text-sm text-transparent">
                      Текущий баланс
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-foreground text-[42px] leading-[42px]">
                    157 910 ₽
                  </span>
                </div>
              </div>
            </div>

            {/* Withdrawal section */}
            <div className="flex flex-col gap-6 px-8 pb-8">
              <div className="flex items-center justify-between">
                <span className="text-secondary text-base">
                  Вывод от — 2 000 ₽
                </span>
                <button className="bg-primary flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105">
                  <Wallet className="text-foreground h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Monthly payment notice */}
            <div className="flex h-8 items-center justify-center bg-[#14171C]">
              <span className="text-secondary text-sm">
                Выплата производится 1 раз в месяц
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
