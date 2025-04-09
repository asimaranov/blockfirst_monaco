import { motion } from 'motion/react';
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
import { api } from '~/trpc/react';
import { IReferral } from '~/server/models/referral';
import { planTypeToSubscriptionType } from '~/app/lib/utils';
import { PlanType } from '~/server/models/userData';

// The shape of our referral data after transformations
type ReferralData = {
  id: string;
  name: string;
  avatar?: string;
  formattedRegistrationDate: string;
  plan: string;
  formattedEarnings: string;
  formattedLearningTime: string;
};

enum SortOption {
  EARNINGS_UP,
  EARNINGS_DOWN,
  REGISTRATION_UP,
  REGISTRATION_DOWN,
}

const PlanBadge = ({ plan }: { plan: string }) => (
  <div className="flex items-center gap-2">
    <div className="h-3.5 w-3.5">
      <Image
        src={subscriptionTypeIcons[planTypeToSubscriptionType(plan.toLowerCase() as PlanType) ]}
        alt={subscriptionTypeLabels[planTypeToSubscriptionType(plan.toLowerCase() as PlanType) as SubscriptionType]}
        className="h-3.5 w-3.5"
      />
    </div>
    <span className="text-foreground text-sm uppercase sm:text-xs">{plan}</span>
  </div>
);

const LearningTime = ({ time }: { time: string }) => (
  <div className="flex items-center gap-1">
    <div className="bg-secondary h-1 w-1 rounded-full" />
    <span className="text-secondary text-xs">{time}</span>
  </div>
);

// Mobile card component for referrals
const ReferralCard = ({ referral }: { referral: ReferralData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex w-full gap-7"
  >
    <div className="text-secondary text-sm">
      {Number(referral.id.slice(-4)) || 1}.
    </div>
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-start justify-between">
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
          <span className="text-foreground text-base">{referral.name}</span>
        </div>
        <PlanBadge plan={referral.plan} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-foreground text-base">
          {referral.formattedEarnings}
        </span>
        <div className="flex gap-2">
          <div className="flex h-7 items-center justify-center rounded-lg bg-[#14171C] px-2">
            <span className="text-secondary text-xs">
              {referral.formattedRegistrationDate}
            </span>
          </div>
          <div className="flex h-7 items-center justify-center rounded-lg bg-[#14171C] px-2">
            <span className="text-secondary text-xs">
              {referral.formattedLearningTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export const ReferralTable = () => {
  const [sortOption, setSortOption] = useState<SortOption | undefined>(
    undefined
  );

  // Fetch referrals using tRPC
  const { data: apiReferrals = [], isLoading } =
    api.referrals.getUserReferrals.useQuery();

  // Convert API response to our component's expected format
  const referrals: ReferralData[] = apiReferrals.map((referral) => ({
    id: referral.id || '',
    name: referral.name,
    avatar: referral.avatar,
    formattedRegistrationDate: referral.registrationDate.toLocaleDateString(),
    plan: referral.plan,
    formattedEarnings: referral.earnings.toString() || '',
    formattedLearningTime: referral.learningTimeMinutes.toString() || '',
  }));

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
          return (
            getEarningsValue(a.formattedEarnings) -
            getEarningsValue(b.formattedEarnings)
          );
        case SortOption.EARNINGS_DOWN:
          return (
            getEarningsValue(b.formattedEarnings) -
            getEarningsValue(a.formattedEarnings)
          );
        case SortOption.REGISTRATION_UP:
          return (
            getRegistrationDateValue(a.formattedRegistrationDate) -
            getRegistrationDateValue(b.formattedRegistrationDate)
          );
        case SortOption.REGISTRATION_DOWN:
          return (
            getRegistrationDateValue(b.formattedRegistrationDate) -
            getRegistrationDateValue(a.formattedRegistrationDate)
          );
        default:
          return 0;
      }
    });
  };

  const sortedReferrals = sortReferrals(referrals);

  // Show loading state or empty state if needed
  if (isLoading) {
    return (
      <div className="border-accent flex grow flex-col border-0 pt-8 pb-10 sm:border-b sm:pt-0 sm:pb-8">
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-secondary/50 text-sm">Загрузка...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border-accent flex grow flex-col gap-6 border-0 pt-8 pb-10 sm:border-b sm:pt-0 sm:pb-8">
      {referrals.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 py-16">
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
          {/* Table Header - visible only on desktop */}
          <div className="hidden h-9 items-center bg-[#14171C] px-8 sm:flex">
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

          {/* Mobile Cards - visible only on mobile */}
          <div className="flex flex-col gap-8 px-4 sm:hidden">
            {sortedReferrals.map((referral) => (
              <ReferralCard key={`mobile-${referral.id}`} referral={referral} />
            ))}
          </div>

          {/* Table Body - visible only on desktop */}
          <div className="hidden flex-col gap-8 px-8 sm:flex">
            {sortedReferrals.map((referral, index) => (
              <motion.div
                key={referral.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid w-full grid-cols-[calc(7*var(--spacing))_1fr_1fr_1fr_1fr_1fr] gap-8"
              >
                <span className="text-secondary text-sm">{index + 1}.</span>
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
                  {referral.formattedRegistrationDate}
                </span>
                <PlanBadge plan={referral.plan} />
                <span className="text-foreground text-sm">
                  {referral.formattedEarnings}
                </span>
                <LearningTime time={referral.formattedLearningTime} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
