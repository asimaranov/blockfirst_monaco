import Image from 'next/image';
import Link from 'next/link';
import { InfoPopover } from '../shared/InfoPopover';
import Token10K from './assets/token-10k.svg';
import Clock from './assets/clock.svg';
import { TARIFFS } from '~/app/lib/constants/tariff';
import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
import { SubscriptionType } from '~/app/lib/constants/subsctiptions';
import { planTypeToSubscriptionType } from '~/app/lib/utils';

export default function AiTokensInfo() {
  const [timeToReset, setTimeToReset] = useState<string>('--ч --м --с');
  const { data: userData } = api.userData.getUserData.useQuery();
  const userSubscription = userData
    ? planTypeToSubscriptionType(userData.plan)
    : SubscriptionType.Free;

  useEffect(() => {
    function calculateTimeToNoon() {
      const now = new Date();
      const target = new Date(now);

      // Set target to midnight today
      target.setHours(0, 0, 0, 0);

      // If it's already past midnight, set target to midnight tomorrow
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }

      // Calculate the difference in milliseconds
      const diff = target.getTime() - now.getTime();

      // Convert to hours, minutes and seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return `${hours}ч ${minutes}м ${seconds}с`;
    }

    // Update the time immediately
    setTimeToReset(calculateTimeToNoon());

    // Set up an interval to update every second
    const intervalId = setInterval(() => {
      setTimeToReset(calculateTimeToNoon());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Determine which tariff should be active and which should show the upgrade button
  const tariffData = [
    {
      id: 0,
      name: '10K /день',
      label: 'Free',
      icon: TARIFFS[0].bigIcon,
      isActive: userSubscription === SubscriptionType.Free,
      showUpgradeButton: userSubscription === SubscriptionType.Free,
    },
    {
      id: 1,
      name: '100K /день',
      label: 'Starter',
      icon: TARIFFS[1].bigIcon,
      isActive: userSubscription === SubscriptionType.Starter,
      showUpgradeButton: userSubscription === SubscriptionType.Free,
    },
    {
      id: 2,
      name: '1М /день',
      label: 'Pro',
      icon: TARIFFS[2].bigIcon,
      isActive: userSubscription === SubscriptionType.Pro,
      showUpgradeButton:
        userSubscription === SubscriptionType.Free ||
        userSubscription === SubscriptionType.Starter,
    },
  ];

  return (
    <div className="flex flex-row items-center gap-2">
      <InfoPopover
        popoverClassName="w-150 p-8"
        offsetTop={4}
        offsetSide={-56}
        title=""
        position="top"
        content=""
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-row gap-6">
            <div className="relative h-18.75 w-18.75 shrink-0">
              <Image
                src={Token10K}
                alt="Token"
                width={75}
                height={75}
                className="h-18.75 w-18.75"
              />
              {/* Centered block */}
              <div className="font-delight absolute inset-0 flex items-center justify-center bg-[linear-gradient(98deg,#FF20A2_1.97%,#FF5B20_104.5%)] bg-clip-text leading-8 text-transparent text-2xl">
                {userSubscription === SubscriptionType.Free
                  ? '10k'
                  : userSubscription === SubscriptionType.Starter
                    ? '100k'
                    : '1М'}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between">
                <span className="text-xl">AI токены</span>
                <div className="flex flex-row gap-0.5">
                  <span className="text-secondary/50 text-xs">
                    До ресета —{' '}
                  </span>
                  <div className="flex flex-row gap-1">
                    <Image
                      src={Clock}
                      alt="Clock"
                      width={16}
                      height={17}
                      className="h-4.25 w-4"
                    />
                    <span className="text-foreground text-xs">
                      {timeToReset}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-secondary text-xs">
                Каждая буква в вашем запросе учитывается как отдельный токен.
                Количество доступных токенов обновляется автоматически
                ежедневно.
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {tariffData.map((tariff) => (
              <div key={tariff.id} className="flex flex-col gap-6">
                {tariff.isActive ? (
                  <span className="text-success bg-success/10 rounded-[0.4167vw] py-2.25 pl-3 text-sm">
                    Активный тариф
                  </span>
                ) : tariff.showUpgradeButton ? (
                  <Link
                    href="/tariffs"
                    className="outline-primary flex items-center justify-between rounded-[0.4167vw] bg-[#195AF4]/10 px-3 py-2.25 text-sm hover:outline-[0.026vw]"
                  >
                    Апгрейд
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.73278 2.48409C7.97198 2.24489 8.35979 2.24489 8.59899 2.48408L12.6823 6.56737C12.7972 6.68224 12.8617 6.83803 12.8617 7.00048C12.8617 7.16292 12.7972 7.31872 12.6823 7.43358L8.59899 11.5169C8.35979 11.7561 7.97198 11.7561 7.73278 11.5169C7.49359 11.2777 7.49359 10.8899 7.73278 10.6507L10.7705 7.61298H1.74922C1.41094 7.61298 1.13672 7.33875 1.13672 7.00048C1.13672 6.66221 1.41094 6.38798 1.74922 6.38798H10.7705L7.73278 3.35029C7.49359 3.1111 7.49359 2.72328 7.73278 2.48409Z"
                        fill="#195AF4"
                      />
                    </svg>
                  </Link>
                ) : (
                  <span className="rounded-[0.4167vw] bg-[#9AA6B5]/10 py-2.25 pl-3 text-sm text-[#9AA6B5]">
                    Активный тариф
                  </span>
                )}
                <div className="flex flex-row gap-4">
                  <Image
                    src={tariff.icon}
                    alt="Tariff"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-base leading-5">{tariff.name}</span>
                    <span className="text-secondary/50 text-xs">
                      {tariff.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </InfoPopover>
      <span className="text-secondary/50 text-sm leading-4">
        AI токены –{' '}
        <span className="font-delight bg-[linear-gradient(98deg,#FF20A2_1.97%,#FF5B20_104.5%)] bg-clip-text leading-4 text-transparent">
          {userSubscription === SubscriptionType.Free
            ? '10k'
            : userSubscription === SubscriptionType.Starter
              ? '100k'
              : '1М'}
        </span>
      </span>
    </div>
  );
}
