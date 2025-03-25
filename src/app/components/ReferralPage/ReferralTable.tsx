import { motion } from 'framer-motion';
import { InfoPopover } from '~/app/components/shared/InfoPopover';
import { ArrowUpRight } from 'lucide-react';
import { TARIFFS } from '~/app/lib/constants/tariff';
import {
  subscriptionTypeLabels,
  SubscriptionType,
  subscriptionTypeIcons,
} from '~/app/lib/constants/subsctiptions';
import Image from 'next/image';
import { useState } from 'react';
import { SortIcon } from '../EmploymentPage/assets/sort-icon';
import AvatarsIcon from './assets/avatars-icon.png';

type ReferralData = {
  id: number;
  name: string;
  avatar?: string;
  registrationDate: string;
  plan: string;
  earnings: string;
  learningTime: string;
};

enum SortOption {
  EARNINGS_UP,
  EARNINGS_DOWN,
  REGISTRATION_UP,
  REGISTRATION_DOWN,
}

const referrals: ReferralData[] = [
  {
    id: 1,
    name: 'Андрей',
    // avatar: 'https://i.pravatar.cc/300',
    registrationDate: '23.05.2025',
    plan: 'Starter',
    earnings: '12 570 ₽',
    learningTime: '2д 16ч',
  },
  {
    id: 2,
    name: 'Виталий',
    // avatar: 'https://i.pravatar.cc/301',
    registrationDate: '12.04.2025',
    plan: 'Pro',
    earnings: '5 720 ₽',
    learningTime: '12ч',
  },
  {
    id: 3,
    name: 'Valve_Gaben',
    avatar: 'https://i.pravatar.cc/302',
    registrationDate: '02.03.2025',
    plan: 'Free',
    earnings: '0.00 ₽',
    learningTime: '1д 3ч',
  },
  // {
  //   id: 4,
  //   name: 'Никитос',
  //   // avatar: 'https://i.pravatar.cc/303',
  //   registrationDate: '18.12.2025',
  //   plan: 'Starter',
  //   earnings: '4 120 ₽',
  //   learningTime: '5м',
  // },
];

const PlanBadge = ({ plan }: { plan: string }) => (
  <div className="flex items-center gap-2">
    <div className="h-3.5 w-3.5">
      <Image
        src={subscriptionTypeIcons[plan as SubscriptionType]}
        alt={subscriptionTypeLabels[plan as SubscriptionType]}
        className="h-3.5 w-3.5"
      />
    </div>
    <span className="text-foreground text-xs uppercase">{plan}</span>
  </div>
);

const LearningTime = ({ time }: { time: string }) => (
  <div className="flex items-center gap-1">
    <div className="bg-secondary h-1 w-1 rounded-full" />
    <span className="text-secondary text-xs">{time}</span>
  </div>
);

export const ReferralTable = () => {
  const [sortOption, setSortOption] = useState<SortOption | undefined>(
    undefined
  );

  const sortReferrals = (referralsToSort: ReferralData[]) => {
    if (referralsToSort.length === 0) return [];

    const getEarningsValue = (earnings: string) => {
      return parseFloat(earnings.replace(/[^0-9.-]+/g, '')) || 0;
    };

    const getRegistrationDateValue = (date: string) => {
      return new Date(date.split('.').reverse().join('-')).getTime();
    };

    return [...referralsToSort].sort((a, b) => {
      switch (sortOption) {
        case SortOption.EARNINGS_UP:
          return getEarningsValue(a.earnings) - getEarningsValue(b.earnings);
        case SortOption.EARNINGS_DOWN:
          return getEarningsValue(b.earnings) - getEarningsValue(a.earnings);
        case SortOption.REGISTRATION_UP:
          return (
            getRegistrationDateValue(a.registrationDate) -
            getRegistrationDateValue(b.registrationDate)
          );
        case SortOption.REGISTRATION_DOWN:
          return (
            getRegistrationDateValue(b.registrationDate) -
            getRegistrationDateValue(a.registrationDate)
          );
        default:
          return 0;
      }
    });
  };

  return (
    <div className="border-accent flex flex-col gap-6 border-b pb-8 grow">
      {referrals.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <Image
            src={AvatarsIcon}
            alt="Ничего не найдено"
            className="h-8 w-22.75"
          />
          <span className="text-secondary/50 text-sm">
            Нет зарегистрированных рефералов :(
          </span>
        </div>
      ) : (
        <>
          {/* Table Header */}
          <div className="flex h-9 items-center bg-[#14171C] px-8">
            <div className="grid w-full grid-cols-[calc(7*var(--spacing))_1fr_1fr_1fr_1fr_1fr] gap-8">
              <span className="text-secondary/50 text-xs uppercase">#</span>
              <span className="text-secondary/50 text-xs uppercase">имя</span>
              <button
                onClick={() => {
                  setSortOption(
                    sortOption === SortOption.REGISTRATION_UP
                      ? SortOption.REGISTRATION_DOWN
                      : SortOption.REGISTRATION_UP
                  );
                }}
                className="group flex cursor-pointer flex-row items-center gap-1"
              >
                <span className="text-secondary/50 text-xs uppercase group-hover:opacity-100">
                  регистрация
                </span>
                <SortIcon
                  className="mb-0.5 size-3"
                  arrow={
                    sortOption === SortOption.REGISTRATION_UP
                      ? 'up'
                      : sortOption === SortOption.REGISTRATION_DOWN
                        ? 'down'
                        : 'none'
                  }
                />
              </button>
              <span className="text-secondary/50 text-xs uppercase">тариф</span>
              <button
                onClick={() => {
                  setSortOption(
                    sortOption === SortOption.EARNINGS_UP
                      ? SortOption.EARNINGS_DOWN
                      : SortOption.EARNINGS_UP
                  );
                }}
                className="group flex cursor-pointer flex-row items-center gap-1"
              >
                <span className="text-secondary/50 text-xs uppercase group-hover:opacity-100">
                  Доход
                </span>
                <SortIcon
                  className="mb-0.5 size-3"
                  arrow={
                    sortOption === SortOption.EARNINGS_UP
                      ? 'up'
                      : sortOption === SortOption.EARNINGS_DOWN
                        ? 'down'
                        : 'none'
                  }
                />
              </button>
              <div className="flex items-center justify-between">
                <span className="text-secondary/50 text-xs uppercase">
                  Обучается
                </span>
                <InfoPopover
                  title="Таблица рефералов"
                  content="Следите за активностью ваших рефералов, приобретенными тарифами и процентом дохода, который генерирует каждый реферал."
                />
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col gap-8 px-8">
            {sortReferrals(referrals).map((referral) => (
              <motion.div
                key={referral.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid w-full grid-cols-[calc(7*var(--spacing))_1fr_1fr_1fr_1fr_1fr] gap-8"
              >
                <span className="text-secondary text-sm">{referral.id}.</span>
                <div className="flex items-center gap-3">
                  {referral.avatar ? (
                    <Image
                      src={referral.avatar}
                      alt={referral.name}
                      width={20}
                      height={20}
                      className="h-5 w-5 rounded-full"
                    />
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#282d33]">
                      <span className="text-foreground text-xs">
                        {referral.name[0]}
                      </span>
                    </div>
                  )}
                  <span className="text-foreground text-sm">
                    {referral.name}
                  </span>
                </div>
                <span className="text-secondary text-sm">
                  {referral.registrationDate}
                </span>
                <PlanBadge plan={referral.plan} />
                <span className="text-foreground text-sm">
                  {referral.earnings}
                </span>
                <LearningTime time={referral.learningTime} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
