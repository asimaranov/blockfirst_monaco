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
// import UserIcon from '../input-legends/user';
import TelegramSvg from '../input-legends/telegram';
import StatsIcon from './assets/stats-icon.svg';
import TaskSquareSvg from './assets/shop-icon.svg';
import UserSvg from './assets/user-icon.svg';
import PercentSvg from './assets/percent-icon.svg';
import BankIcon from './assets/bank-icons.png';
import TelegramFlatIcon from './assets/telegram-flat-icon.svg';

import { InfoPopover } from '~/app/components/shared/InfoPopover';
import { Modal } from '../shared/Modal';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Lock,
  Wallet,
} from 'lucide-react';
import { ReferralTable } from './ReferralTable';
import { WithdrawForm } from './WithdrawForm';
import { Progress } from '../shared/Progress';

// Add new types
type TimePeriod = any;

// Add new components
const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  badgeText,
  badgeColor = 'bg-[#14171C]',
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  badgeText?: string;
  badgeColor?: string;
}) => (
  <div className="flex flex-col gap-5 px-8 pt-6">
    <div
      className={`${badgeColor} inline-flex w-fit items-center rounded-lg px-3 py-2`}
    >
      <span
        className={`${badgeColor === 'bg-success/10' ? 'text-success' : 'text-secondary'} text-xs uppercase`}
      >
        {badgeText || title}
      </span>
    </div>
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#010514]">
          {icon}
        </div>
        <span className="text-foreground text-3xl">{value}</span>
      </div>
      <span className="text-secondary text-xs opacity-50">{subtitle}</span>
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
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const periods: { label: string; value: TimePeriod }[] = [
    { label: 'Все время', value: 'all' },
    { label: 'Последнюю неделю', value: '7d' },
    { label: 'Текущий месяц', value: '30d' },
    { label: 'Прошлый месяц', value: '90d' },
    { label: 'Позапрошлый месяц', value: 'lm' },
    { label: 'Последний год', value: 'year' },
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
        className="flex h-8 cursor-pointer items-center gap-2 rounded-[5.787vw] bg-[#14171C] px-4 py-2.25 transition-colors hover:bg-[#1c2026]"
      >
        <span className="text-foreground text-xs">
          {periods.find((p) => p.value === value)?.label}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.67353 4.55205C2.92093 4.31134 3.31662 4.31676 3.55733 4.56415L7.00127 8.10376L10.4452 4.56415C10.6859 4.31676 11.0816 4.31134 11.329 4.55205C11.5764 4.79276 11.5818 5.18845 11.3411 5.43585L7.44922 9.43585C7.33156 9.55678 7.17 9.625 7.00127 9.625C6.83254 9.625 6.67098 9.55678 6.55331 9.43585L2.66142 5.43585C2.42071 5.18845 2.42613 4.79276 2.67353 4.55205Z"
            fill="#195AF4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-10 mt-2 w-45.5 rounded-lg bg-[#14171C] py-2 shadow-lg">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => {
                onChange(period.value);
                setIsOpen(false);
              }}
              className={`flex w-45.5 cursor-pointer flex-row items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-[#1c2026] ${
                value === period.value ? 'text-foreground' : 'text-secondary'
              } text-xs`}
            >
              {period.value == value ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                >
                  <path
                    d="M2.44922 7.65L5.04922 10.25L11.5492 3.75"
                    stroke="#195AF4"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <div className="w-3.5"></div>
              )}

              {period.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Components for CV Page
const StageCard = ({
  title,
  completed,
  salaryRange,
  position,
  progressValue,
}: {
  title: string;
  completed: boolean;
  salaryRange: string;
  position: string;
  progressValue: number;
}) => (
  <div className="flex flex-col gap-5 p-8">
    <div
      className={`inline-flex w-fit items-center rounded-full border-[0.5px] px-3 py-1.5 ${completed ? 'border-success text-success' : 'border-secondary/50 text-secondary'}`}
    >
      <span className="text-xs">{title}</span>
    </div>

    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-foreground text-2xl font-normal">{salaryRange}</h3>
        <p className="text-secondary text-xs">{position}</p>
      </div>

      <div className="relative">
        <Progress
          value={progressValue}
          className="h-4 rounded-full"
          inactive={!completed && progressValue === 0}
        />
        {progressValue > 0 && (
          <div className="bg-background absolute top-1/2 left-0.5 z-10 h-3 w-3 -translate-y-1/2 rounded-full"></div>
        )}
        <div className="absolute top-1/2 right-0 z-10 flex -translate-y-1/2 items-center">
          <div className="bg-dark-bg flex h-7 w-7 items-center justify-center rounded-full">
            {completed ? (
              <div className="bg-primary rounded-full p-1.5">
                <Check size={10} className="text-dark-bg" />
              </div>
            ) : progressValue === 0 ? (
              <div className="border-secondary rounded-full border p-1.5">
                <Lock size={10} className="text-secondary" />
              </div>
            ) : (
              <div className="rounded-full border border-[#FF974C] p-1.5">
                {/* Empty circle for in-progress */}
              </div>
            )}
          </div>
        </div>
        {progressValue > 0 && (
          <div className="absolute top-[-18px] right-[14px] h-[72px] w-px bg-[#FF974C]"></div>
        )}
      </div>
    </div>
  </div>
);

const CourseItem = ({
  title,
  lessons,
  duration,
  completed,
}: {
  title: string;
  lessons: string;
  duration: string;
  completed: boolean;
}) => (
  <div className="flex items-start gap-4">
    <div
      className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full ${completed ? 'bg-primary' : 'border-secondary/50 border'}`}
    >
      {completed && <Check size={12} className="text-background" />}
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-foreground text-sm">{title}</p>
      <div className="text-secondary flex items-center gap-3 text-xs">
        <span>{lessons}</span>
        {duration && (
          <>
            <div className="bg-secondary/20 h-3 w-px"></div>
            <span>{duration}</span>
          </>
        )}
      </div>
    </div>
  </div>
);

const CourseSection = ({
  title,
  courses,
  footerText,
  buttonText,
  isDisabled = false,
}: {
  title: string;
  courses: {
    title: string;
    lessons: string;
    duration: string;
    completed: boolean;
  }[];
  footerText: string;
  buttonText: string;
  isDisabled?: boolean;
}) => (
  <div className="flex flex-1 flex-col">
    <div className="bg-dark-bg border-accent border-b px-8 py-4">
      <h4 className="text-secondary text-sm">{title}</h4>
    </div>

    <div className="flex flex-col gap-4 px-8 py-7">
      {courses.map((course, index) => (
        <CourseItem
          key={index}
          title={course.title}
          lessons={course.lessons}
          duration={course.duration}
          completed={course.completed}
        />
      ))}
    </div>

    <div className="mt-auto flex flex-col gap-6">
      <button
        className={`mx-8 flex items-center justify-center rounded-full py-3 ${isDisabled ? 'bg-secondary/10 text-secondary' : 'bg-primary text-foreground'}`}
        disabled={isDisabled}
      >
        <span className="text-sm">{buttonText}</span>
        <ChevronRight size={16} className="ml-2" />
      </button>

      <div className="bg-dark-bg border-accent border-t py-2">
        <p className="text-secondary text-center text-xs">{footerText}</p>
      </div>
    </div>
  </div>
);

export default function CVPage() {
  return (
    <main className="border-accent bg-background border-r border-l">
      <div className="flex min-h-screen w-full flex-col">
        <Topbar lastestUpdate={'18 марта 2025'} />

        {/* CV Progress Grid */}
        <div className="mt-4 grid grid-cols-1 gap-0 md:grid-cols-3">
          {/* First Column - Junior */}
          <div className="border-accent flex flex-col border-r">
            <StageCard
              title="Этап завершен"
              completed={true}
              salaryRange="$1500 — $2000"
              position="Junior"
              progressValue={100}
            />

            <CourseSection
              title="курсы этапа"
              courses={[
                {
                  title: 'Путешествие по Solidity & DeFi',
                  lessons: '24 урока',
                  duration: '1 месяц',
                  completed: true,
                },
                {
                  title: 'Продвинутый Uniswap курс',
                  lessons: '16 урока',
                  duration: '2 месяца',
                  completed: true,
                },
              ]}
              footerText="Закончены 2 курса"
              buttonText="Подготовить резюме"
            />
          </div>

          {/* Second Column - Middle */}
          <div className="border-accent flex flex-col border-r">
            <StageCard
              title="Этап в процессе"
              completed={false}
              salaryRange="$2000 — $5000"
              position="Middle"
              progressValue={30}
            />

            <CourseSection
              title="курсы этапа"
              courses={[
                {
                  title: 'EVM assembler & YUL',
                  lessons: 'Курс в разработке',
                  duration: '',
                  completed: false,
                },
                {
                  title: 'Криптография и математика',
                  lessons: 'Курс в разработке',
                  duration: '',
                  completed: false,
                },
                {
                  title: 'Безопасность смарт контрактов',
                  lessons: 'Курс в разработке',
                  duration: '',
                  completed: false,
                },
              ]}
              footerText="Закончите 3 курса"
              buttonText="Недоступно"
              isDisabled={true}
            />
          </div>

          {/* Third Column - Senior */}
          <div className="flex flex-col">
            <StageCard
              title="Этап недоступен"
              completed={false}
              salaryRange="$5000 — $15000"
              position="Senior"
              progressValue={0}
            />

            <CourseSection
              title="курсы этапа"
              courses={[
                {
                  title: 'Изучение другого блокчейна (Solana, Sui)',
                  lessons: 'Курс в разработке',
                  duration: '',
                  completed: false,
                },
              ]}
              footerText="Закончите 1 курс"
              buttonText="Недоступно"
              isDisabled={true}
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
