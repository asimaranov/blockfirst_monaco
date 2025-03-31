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
import { ArrowUpRight, ChevronDown, Wallet } from 'lucide-react';
import { ReferralTable } from './ReferralTable';
import { WithdrawForm } from './WithdrawForm';

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
  <div className="flex flex-col gap-5 px-5 py-6 sm:px-8 sm:pb-0">
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
      <span className="text-secondary text-sm opacity-50 sm:text-xs">
        {subtitle}
      </span>
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
        className="flex h-auto cursor-pointer items-center justify-end gap-2 rounded-[5.787vw] bg-transparent px-0 py-0 transition-colors hover:bg-[#1c2026] sm:h-8 sm:bg-[#14171C] sm:px-4 sm:py-2.25"
      >
        <span className="text-foreground hidden text-xs sm:block">
          {periods.find((p) => p.value === value)?.label}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden h-3.5 w-3.5 sm:block"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.67353 4.55205C2.92093 4.31134 3.31662 4.31676 3.55733 4.56415L7.00127 8.10376L10.4452 4.56415C10.6859 4.31676 11.0816 4.31134 11.329 4.55205C11.5764 4.79276 11.5818 5.18845 11.3411 5.43585L7.44922 9.43585C7.33156 9.55678 7.17 9.625 7.00127 9.625C6.83254 9.625 6.67098 9.55678 6.55331 9.43585L2.66142 5.43585C2.42071 5.18845 2.42613 4.79276 2.67353 4.55205Z"
            fill="#195AF4"
          />
        </svg>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-5 w-5 sm:hidden"
        >
          <path
            d="M18.3255 14.582H12.4922"
            stroke="#9AA6B5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.16406 14.582H1.66406"
            stroke="#9AA6B5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.3359 5.41797H15.8359"
            stroke="#9AA6B5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.4974 5.41797H1.66406"
            stroke="#9AA6B5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.83073 12.082H10.8307C11.7474 12.082 12.4974 12.4987 12.4974 13.7487V15.4154C12.4974 16.6654 11.7474 17.082 10.8307 17.082H5.83073C4.91406 17.082 4.16406 16.6654 4.16406 15.4154V13.7487C4.16406 12.4987 4.91406 12.082 5.83073 12.082Z"
            stroke="#9AA6B5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.15885 2.91797H14.1589C15.0755 2.91797 15.8255 3.33464 15.8255 4.58464V6.2513C15.8255 7.5013 15.0755 7.91797 14.1589 7.91797H9.15885C8.24219 7.91797 7.49219 7.5013 7.49219 6.2513V4.58464C7.49219 3.33464 8.24219 2.91797 9.15885 2.91797Z"
            stroke="#9AA6B5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
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

export default function ReferralPage({ session }: { session: Session }) {
  const [index, setIndex] = useState(0);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('7d');
  const [isOpen, setIsOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <main className="border-accent border-r border-l">
      <div className="flex h-auto w-full flex-col sm:h-screen">
        <Topbar lastestUpdate={'18 марта 2025'} />

        <Modal
          isOpen={isWithdrawOpen}
          onClose={() => {
            setIsWithdrawOpen(false);
          }}
        >
          <WithdrawForm
            onClose={function (): void {
              setIsWithdrawOpen(false);
            }}
          />
        </Modal>
        <div className="mb-auto flex flex-col">
          <div className="flex flex-1 flex-col-reverse gap-16 sm:flex-row sm:gap-0">
            {/* Statistics Section */}
            <div className="border-accent flex flex-1 flex-col border-0 sm:border-b">
              {/* Header */}
              <div className="border-accent flex h-auto flex-row items-start justify-between border-b px-5 pb-6 sm:h-28 sm:items-center sm:px-8 sm:pb-0">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center">
                        <Image
                          src={StatsIcon}
                          alt="stats"
                          className="h-5 w-5"
                        />
                      </div>
                      <span className="text-foreground text-base">
                        Статистика
                      </span>
                    </div>
                  </div>
                  <span className="text-secondary text-sm opacity-50">
                    Ниже предоставлена информация по вашим рефералам
                  </span>
                </div>
                <TimePeriodSelector
                  value={timePeriod}
                  onChange={setTimePeriod}
                />
              </div>

              {/* Stats Grid */}
              <div className="divide-accent grid flex-1 grid-cols-1 divide-x-0 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {/* Referrals Card */}
                <StatCard
                  title="рефералы"
                  value="24"
                  subtitle="Приглашенных пользователей"
                  icon={<Image src={UserSvg} alt={''} className="h-9 w-9" />}
                />

                {/* Purchases Card */}
                <StatCard
                  title="Покупки"
                  value="12"
                  subtitle="Приобретённых тарифов"
                  icon={
                    <Image src={TaskSquareSvg} alt={''} className="h-9 w-9" />
                  }
                />

                {/* Earnings Card */}
                <StatCard
                  title="Процент"
                  value="56 012 ₽"
                  subtitle="Доход от рефералов"
                  icon={<Image src={PercentSvg} alt={''} className="h-9 w-9" />}
                  badgeText="Процент — 3%"
                  badgeColor="bg-success/10"
                />
              </div>
            </div>

            {/* Balance Card */}
            <div className="border-accent flex w-auto flex-col border-b border-l bg-[#14171C] sm:w-100.25">
              <div className="flex flex-col px-5 pt-10 pb-5 sm:px-8 sm:pt-8">
                {/* Top section with avatars and info */}
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <Image
                      src={BankIcon}
                      alt={''}
                      className="h-5 w-14.25"
                      quality={100}
                    />
                  </div>
                  <InfoPopover
                    title="Баланс средств"
                    content="Текущий баланс отражает все заработанные средства от всех ваших рефералов. После вывода средств ваш баланс будет обнулен."
                    className="ml-auto"
                  />
                </div>

                {/* Balance section */}
                <div className="mt-6.5 flex flex-col gap-3">
                  <div className="flex justify-center">
                    <svg
                      width="119"
                      height="24"
                      viewBox="0 0 119 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-29.75"
                    >
                      <rect
                        width="119"
                        height="24"
                        rx="12"
                        fill="url(#paint0_linear_1576_23626)"
                        fill-opacity="0.1"
                      />
                      <path
                        d="M15.876 16H14.796V8.38H12.12V7.432H18.54V8.38H15.876V16ZM21.3282 9.448C21.8802 9.448 22.3522 9.568 22.7442 9.808C23.1442 10.048 23.4482 10.388 23.6562 10.828C23.8722 11.26 23.9802 11.768 23.9802 12.352V12.988H19.5762C19.5922 13.716 19.7762 14.272 20.1282 14.656C20.4882 15.032 20.9882 15.22 21.6282 15.22C22.0362 15.22 22.3962 15.184 22.7082 15.112C23.0282 15.032 23.3562 14.92 23.6922 14.776V15.7C23.3642 15.844 23.0402 15.948 22.7202 16.012C22.4002 16.084 22.0202 16.12 21.5802 16.12C20.9722 16.12 20.4322 15.996 19.9602 15.748C19.4962 15.5 19.1322 15.132 18.8682 14.644C18.6122 14.148 18.4842 13.544 18.4842 12.832C18.4842 12.128 18.6002 11.524 18.8322 11.02C19.0722 10.516 19.4042 10.128 19.8282 9.856C20.2602 9.584 20.7602 9.448 21.3282 9.448ZM21.3162 10.312C20.8122 10.312 20.4122 10.476 20.1162 10.804C19.8282 11.124 19.6562 11.572 19.6002 12.148H22.8762C22.8762 11.78 22.8202 11.46 22.7082 11.188C22.5962 10.916 22.4242 10.704 22.1922 10.552C21.9682 10.392 21.6762 10.312 21.3162 10.312ZM29.4217 9.568H30.5737L27.8257 12.664L30.8017 16H29.5777L26.6737 12.736V16H25.6177V9.568H26.6737V12.688L29.4217 9.568ZM30.9612 9.568H32.0892L33.4812 13.228C33.5612 13.444 33.6332 13.652 33.6972 13.852C33.7692 14.052 33.8332 14.248 33.8892 14.44C33.9452 14.624 33.9892 14.804 34.0212 14.98H34.0692C34.1172 14.78 34.1932 14.52 34.2972 14.2C34.4012 13.872 34.5092 13.544 34.6212 13.216L35.9292 9.568H37.0692L34.2972 16.888C34.1452 17.288 33.9652 17.636 33.7572 17.932C33.5572 18.236 33.3092 18.468 33.0132 18.628C32.7252 18.796 32.3732 18.88 31.9572 18.88C31.7652 18.88 31.5972 18.868 31.4532 18.844C31.3092 18.828 31.1852 18.808 31.0812 18.784V17.944C31.1692 17.96 31.2732 17.976 31.3932 17.992C31.5212 18.008 31.6532 18.016 31.7892 18.016C32.0372 18.016 32.2492 17.968 32.4252 17.872C32.6092 17.784 32.7652 17.652 32.8932 17.476C33.0212 17.308 33.1292 17.108 33.2172 16.876L33.5532 16.024L30.9612 9.568ZM46.7984 9.568V15.124H47.7344V18.22H46.6784V16H38.0864V9.568H39.1424V15.112H41.9144V9.568H42.9704V15.112H45.7544V9.568H46.7984ZM49.9574 13.492C49.9574 13.564 49.9534 13.668 49.9454 13.804C49.9454 13.932 49.9414 14.072 49.9334 14.224C49.9254 14.368 49.9174 14.508 49.9094 14.644C49.9014 14.772 49.8934 14.876 49.8854 14.956L53.3294 9.568H54.6254V16H53.6414V12.208C53.6414 12.08 53.6414 11.912 53.6414 11.704C53.6494 11.496 53.6574 11.292 53.6654 11.092C53.6734 10.884 53.6814 10.728 53.6894 10.624L50.2694 16H48.9614V9.568H49.9574V13.492ZM61.8803 6.904C61.8483 7.304 61.7483 7.64 61.5803 7.912C61.4203 8.184 61.1803 8.388 60.8603 8.524C60.5403 8.66 60.1243 8.728 59.6123 8.728C59.0923 8.728 58.6723 8.66 58.3523 8.524C58.0403 8.388 57.8123 8.188 57.6683 7.924C57.5243 7.652 57.4363 7.312 57.4043 6.904H58.3883C58.4283 7.336 58.5403 7.628 58.7243 7.78C58.9163 7.924 59.2203 7.996 59.6363 7.996C60.0043 7.996 60.2923 7.92 60.5003 7.768C60.7163 7.608 60.8443 7.32 60.8843 6.904H61.8803ZM57.6683 13.492C57.6683 13.564 57.6643 13.668 57.6563 13.804C57.6563 13.932 57.6523 14.072 57.6443 14.224C57.6363 14.368 57.6283 14.508 57.6203 14.644C57.6123 14.772 57.6043 14.876 57.5963 14.956L61.0403 9.568H62.3363V16H61.3523V12.208C61.3523 12.08 61.3523 11.912 61.3523 11.704C61.3603 11.496 61.3683 11.292 61.3763 11.092C61.3843 10.884 61.3923 10.728 61.4003 10.624L57.9803 16H56.6723V9.568H57.6683V13.492ZM66.3559 12.136C66.3559 11.2 66.4479 10.404 66.6319 9.748C66.8239 9.084 67.1159 8.556 67.5079 8.164C67.9079 7.764 68.4199 7.496 69.0439 7.36C69.5639 7.248 70.0719 7.148 70.5679 7.06C71.0639 6.972 71.5279 6.892 71.9599 6.82L72.1399 7.744C71.9319 7.776 71.6999 7.816 71.4439 7.864C71.1879 7.904 70.9279 7.948 70.6639 7.996C70.3999 8.036 70.1439 8.08 69.8959 8.128C69.6559 8.168 69.4439 8.208 69.2599 8.248C68.9959 8.304 68.7599 8.4 68.5519 8.536C68.3439 8.664 68.1639 8.84 68.0119 9.064C67.8679 9.288 67.7519 9.564 67.6639 9.892C67.5759 10.22 67.5239 10.608 67.5079 11.056H67.5799C67.6919 10.904 67.8439 10.748 68.0359 10.588C68.2359 10.428 68.4719 10.292 68.7439 10.18C69.0239 10.068 69.3399 10.012 69.6919 10.012C70.2519 10.012 70.7159 10.136 71.0839 10.384C71.4599 10.624 71.7399 10.96 71.9239 11.392C72.1159 11.824 72.2119 12.328 72.2119 12.904C72.2119 13.616 72.0879 14.212 71.8399 14.692C71.5919 15.172 71.2479 15.532 70.8079 15.772C70.3679 16.004 69.8559 16.12 69.2719 16.12C68.8319 16.12 68.4319 16.036 68.0719 15.868C67.7119 15.692 67.4039 15.436 67.1479 15.1C66.8919 14.764 66.6959 14.348 66.5599 13.852C66.4239 13.356 66.3559 12.784 66.3559 12.136ZM69.3559 15.244C69.7079 15.244 70.0119 15.172 70.2679 15.028C70.5319 14.884 70.7359 14.648 70.8799 14.32C71.0239 13.992 71.0959 13.556 71.0959 13.012C71.0959 12.356 70.9719 11.84 70.7239 11.464C70.4839 11.08 70.0839 10.888 69.5239 10.888C69.1719 10.888 68.8519 10.968 68.5639 11.128C68.2759 11.28 68.0359 11.456 67.8439 11.656C67.6519 11.856 67.5159 12.024 67.4359 12.16C67.4359 12.552 67.4639 12.932 67.5199 13.3C67.5759 13.668 67.6719 14 67.8079 14.296C67.9519 14.584 68.1479 14.816 68.3959 14.992C68.6519 15.16 68.9719 15.244 69.3559 15.244ZM76.3115 9.46C77.0955 9.46 77.6755 9.632 78.0515 9.976C78.4275 10.32 78.6155 10.868 78.6155 11.62V16H77.8475L77.6435 15.088H77.5955C77.4115 15.32 77.2195 15.516 77.0195 15.676C76.8275 15.828 76.6035 15.94 76.3475 16.012C76.0995 16.084 75.7955 16.12 75.4355 16.12C75.0515 16.12 74.7035 16.052 74.3915 15.916C74.0875 15.78 73.8475 15.572 73.6715 15.292C73.4955 15.004 73.4075 14.644 73.4075 14.212C73.4075 13.572 73.6595 13.08 74.1635 12.736C74.6675 12.384 75.4435 12.192 76.4915 12.16L77.5835 12.124V11.74C77.5835 11.204 77.4675 10.832 77.2355 10.624C77.0035 10.416 76.6755 10.312 76.2515 10.312C75.9155 10.312 75.5955 10.364 75.2915 10.468C74.9875 10.564 74.7035 10.676 74.4395 10.804L74.1155 10.012C74.3955 9.86 74.7275 9.732 75.1115 9.628C75.4955 9.516 75.8955 9.46 76.3115 9.46ZM76.6235 12.892C75.8235 12.924 75.2675 13.052 74.9555 13.276C74.6515 13.5 74.4995 13.816 74.4995 14.224C74.4995 14.584 74.6075 14.848 74.8235 15.016C75.0475 15.184 75.3315 15.268 75.6755 15.268C76.2195 15.268 76.6715 15.12 77.0315 14.824C77.3915 14.52 77.5715 14.056 77.5715 13.432V12.856L76.6235 12.892ZM85.498 16H84.43V10.444H82.534C82.454 11.46 82.354 12.328 82.234 13.048C82.114 13.76 81.962 14.34 81.778 14.788C81.594 15.236 81.374 15.564 81.118 15.772C80.862 15.98 80.562 16.084 80.218 16.084C80.114 16.084 80.01 16.076 79.906 16.06C79.81 16.052 79.73 16.032 79.666 16V15.208C79.714 15.224 79.766 15.236 79.822 15.244C79.878 15.252 79.934 15.256 79.99 15.256C80.166 15.256 80.326 15.184 80.47 15.04C80.614 14.896 80.742 14.676 80.854 14.38C80.974 14.084 81.082 13.712 81.178 13.264C81.274 12.808 81.358 12.272 81.43 11.656C81.502 11.04 81.566 10.344 81.622 9.568H85.498V16ZM89.9755 9.46C90.7595 9.46 91.3395 9.632 91.7155 9.976C92.0915 10.32 92.2795 10.868 92.2795 11.62V16H91.5115L91.3075 15.088H91.2595C91.0755 15.32 90.8835 15.516 90.6835 15.676C90.4915 15.828 90.2675 15.94 90.0115 16.012C89.7635 16.084 89.4595 16.12 89.0995 16.12C88.7155 16.12 88.3675 16.052 88.0555 15.916C87.7515 15.78 87.5115 15.572 87.3355 15.292C87.1595 15.004 87.0715 14.644 87.0715 14.212C87.0715 13.572 87.3235 13.08 87.8275 12.736C88.3315 12.384 89.1075 12.192 90.1555 12.16L91.2475 12.124V11.74C91.2475 11.204 91.1315 10.832 90.8995 10.624C90.6675 10.416 90.3395 10.312 89.9155 10.312C89.5795 10.312 89.2595 10.364 88.9555 10.468C88.6515 10.564 88.3675 10.676 88.1035 10.804L87.7795 10.012C88.0595 9.86 88.3915 9.732 88.7755 9.628C89.1595 9.516 89.5595 9.46 89.9755 9.46ZM90.2875 12.892C89.4875 12.924 88.9315 13.052 88.6195 13.276C88.3155 13.5 88.1635 13.816 88.1635 14.224C88.1635 14.584 88.2715 14.848 88.4875 15.016C88.7115 15.184 88.9955 15.268 89.3395 15.268C89.8835 15.268 90.3355 15.12 90.6955 14.824C91.0555 14.52 91.2355 14.056 91.2355 13.432V12.856L90.2875 12.892ZM95.3221 9.568V12.244H98.8141V9.568H99.8701V16H98.8141V13.132H95.3221V16H94.2661V9.568H95.3221ZM104.487 16.12C103.919 16.12 103.411 16.004 102.963 15.772C102.523 15.54 102.175 15.18 101.919 14.692C101.671 14.204 101.547 13.58 101.547 12.82C101.547 12.028 101.679 11.384 101.943 10.888C102.207 10.392 102.563 10.028 103.011 9.796C103.467 9.564 103.983 9.448 104.559 9.448C104.887 9.448 105.203 9.484 105.507 9.556C105.811 9.62 106.059 9.7 106.251 9.796L105.927 10.672C105.735 10.6 105.511 10.532 105.255 10.468C104.999 10.404 104.759 10.372 104.535 10.372C104.103 10.372 103.747 10.464 103.467 10.648C103.187 10.832 102.979 11.104 102.843 11.464C102.707 11.824 102.639 12.272 102.639 12.808C102.639 13.32 102.707 13.756 102.843 14.116C102.979 14.476 103.183 14.748 103.455 14.932C103.727 15.116 104.067 15.208 104.475 15.208C104.827 15.208 105.135 15.172 105.399 15.1C105.671 15.028 105.919 14.94 106.143 14.836V15.772C105.927 15.884 105.687 15.968 105.423 16.024C105.167 16.088 104.855 16.12 104.487 16.12Z"
                        fill="url(#paint1_linear_1576_23626)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1576_23626"
                          x1="9.47788"
                          y1="35.0769"
                          x2="115.298"
                          y2="-28.1066"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#F46919" />
                          <stop offset="1" stop-color="#F419AB" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_1576_23626"
                          x1="19.5664"
                          y1="25.9231"
                          x2="92.0195"
                          y2="-29.3341"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#F46919" />
                          <stop offset="1" stop-color="#F419AB" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="text-center">
                    <span className="text-foreground text-4xl leading-10.5">
                      157 910 ₽
                    </span>
                  </div>
                </div>
              </div>

              {/* Withdrawal section */}
              <div className="flex flex-col gap-6 px-5 pb-6 sm:px-8">
                <div className="flex items-center justify-between">
                  <span className="text-secondary/50 flex gap-1 text-sm">
                    Вывод от —<span className="text-foreground">2 000 ₽</span>
                  </span>
                  <button
                    className="bg-primary flex h-10 w-10 items-center justify-center rounded-full transition-transform not-disabled:cursor-pointer hover:scale-105 not-disabled:hover:bg-[#1242B2] disabled:opacity-30"
                    onClick={() => {
                      setIsWithdrawOpen(true);
                    }}
                    // disabled={true}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <path
                        d="M7.76562 5.41654L9.89896 3.2832L12.0323 5.41654"
                        stroke="#F2F2F2"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.89844 11.8168V3.3418"
                        stroke="#F2F2F2"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.33203 10C3.33203 13.6833 5.83203 16.6667 9.9987 16.6667C14.1654 16.6667 16.6654 13.6833 16.6654 10"
                        stroke="#F2F2F2"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Monthly payment notice */}
              <div className="flex h-8 w-full items-center justify-center bg-[#0F1217]">
                <span className="text-secondary flex gap-1 bg-[#0F1217] text-xs">
                  Выплата производится
                  <span className="text-foreground">1 раз в месяц</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-accent hidden h-16 w-full shrink-0 sm:block"></div>
        <div className="text-secondary/50 mt-10 flex w-full shrink-0 gap-7.75 bg-[#14171C] px-5 py-4 sm:hidden">
          <span className="text-sm uppercase">#</span>
          <span className="text-sm uppercase">Список рефералов</span>
          <InfoPopover
            title="Таблица рефералов"
            content="Следите за активностью ваших рефералов, приобретенными тарифами и процентом дохода, который генерирует каждый реферал."
            className="ml-auto"
          />
        </div>
        <ReferralTable></ReferralTable>
      </div>
      <Footer className="border-accent border-t sm:border-t-0" />
    </main>
  );
}
