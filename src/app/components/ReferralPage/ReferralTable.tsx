import { motion } from 'framer-motion';
import { InfoPopover } from '~/app/components/shared/InfoPopover';
import { ArrowUpRight } from 'lucide-react';

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
    plan: 'STARTER',
    earnings: '12 570 ₽',
    learningTime: '2д 16ч',
  },
  {
    id: 2,
    name: 'Виталий',
    registrationDate: '12.04.2025',
    plan: 'PRO',
    earnings: '5 720 ₽',
    learningTime: '12ч',
  },
  {
    id: 3,
    name: 'Valve_Gaben',
    registrationDate: '02.03.2025',
    plan: 'FREE',
    earnings: '0.00 ₽',
    learningTime: '1д 3ч',
  },
  {
    id: 4,
    name: 'Никитос',
    registrationDate: '18.12.2025',
    plan: 'STARTER',
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
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13.6667C10.6819 13.6667 13.6667 10.6819 13.6667 7C13.6667 3.3181 10.6819 0.333333 7 0.333333C3.3181 0.333333 0.333333 3.3181 0.333333 7C0.333333 10.6819 3.3181 13.6667 7 13.6667Z"
          stroke="#9AA6B5"
          strokeWidth="1.5"
        />
        <path
          d="M4.66667 7L6.33333 8.66667L9.33333 5.33333"
          stroke="#9AA6B5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <span className="text-foreground text-xs">{plan}</span>
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
    <div className="flex flex-col gap-6 pb-8 border-b border-accent">
      {/* Table Header */}
      <div className="flex h-9 items-center px-8 bg-[#14171C]">
        <div className="grid w-full grid-cols-[28px_1fr_1fr_1fr_1fr_1fr] gap-8">
          <span className="text-secondary/50 text-xs uppercase">#</span>
          <span className="text-secondary/50 text-xs uppercase">имя</span>
          <span className="text-secondary/50 text-xs uppercase">регистрация</span>
          <span className="text-secondary/50 text-xs uppercase">тариф</span>
          <div className="flex items-center gap-1">
            <span className="text-secondary/50 text-xs uppercase">Доход</span>
            <ArrowUpRight className="text-secondary h-3.5 w-3.5" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-secondary/50 text-xs uppercase">Обучается</span>
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
