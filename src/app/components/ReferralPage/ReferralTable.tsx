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

type ReferralData = {
  id: number;
  name: string;
  registrationDate: string;
  plan: string;
  earnings: string;
  learningTime: string;
};

const referrals: ReferralData[] = [
  {
    id: 1,
    name: 'Андрей',
    registrationDate: '23.05.2025',
    plan: 'Starter',
    earnings: '12 570 ₽',
    learningTime: '2д 16ч',
  },
  {
    id: 2,
    name: 'Виталий',
    registrationDate: '12.04.2025',
    plan: 'Pro',
    earnings: '5 720 ₽',
    learningTime: '12ч',
  },
  {
    id: 3,
    name: 'Valve_Gaben',
    registrationDate: '02.03.2025',
    plan: 'Free',
    earnings: '0.00 ₽',
    learningTime: '1д 3ч',
  },
  {
    id: 4,
    name: 'Никитос',
    registrationDate: '18.12.2025',
    plan: 'Starter',
    earnings: '4 120 ₽',
    learningTime: '5м',
  },
];

const UserAvatar = ({ name }: { name: string }) => (
  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#282d33]">
    <span className="text-foreground text-xs">{name[0]}</span>
  </div>
);

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
  return (
    <div className="border-accent flex flex-col gap-6 border-b pb-8">
      {/* Table Header */}
      <div className="flex h-9 items-center bg-[#14171C] px-8">
        <div className="grid w-full grid-cols-[28px_1fr_1fr_1fr_1fr_1fr] gap-8">
          <span className="text-secondary/50 text-xs uppercase">#</span>
          <span className="text-secondary/50 text-xs uppercase">имя</span>
          <span className="text-secondary/50 text-xs uppercase">
            регистрация
          </span>
          <span className="text-secondary/50 text-xs uppercase">тариф</span>
          <div className="flex items-center gap-1">
            <span className="text-secondary/50 text-xs uppercase">Доход</span>
            <ArrowUpRight className="text-secondary h-3.5 w-3.5" />
          </div>
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
        {referrals.map((referral) => (
          <motion.div
            key={referral.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid w-full grid-cols-[28px_1fr_1fr_1fr_1fr_1fr] gap-8"
          >
            <span className="text-secondary text-sm">{referral.id}.</span>
            <div className="flex items-center gap-3">
              <UserAvatar name={referral.name} />
              <span className="text-foreground text-sm">{referral.name}</span>
            </div>
            <span className="text-secondary text-sm">
              {referral.registrationDate}
            </span>
            <PlanBadge plan={referral.plan} />
            <span className="text-foreground text-sm">{referral.earnings}</span>
            <LearningTime time={referral.learningTime} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
