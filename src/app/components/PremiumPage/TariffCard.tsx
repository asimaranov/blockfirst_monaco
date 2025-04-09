import Image from 'next/image';
import CoinIcon from './assets/coin-icon.png';
import NotPaidBadge from './assets/not-paid-badge.svg';
import PaidBadge from './assets/paid-badge.svg';
import { ReactNode } from 'react';

interface TariffCardProps {
  title: string;
  subtitle: string;
  subtitleWhite?: string;
  isPaid?: boolean;
  badgeText?: string;
  image: ReactNode;
}

export default function TariffCard({
  title,
  subtitle,
  subtitleWhite = '',
  isPaid = false,
  badgeText = 'Maximum features',
  image,
}: TariffCardProps) {
  return (
    <div className="hidden w-full flex-row gap-5 bg-cover bg-right-bottom bg-no-repeat px-8 pt-10 pb-8 sm:flex">
      {image}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-3">
          <span className="text-2xl font-medium  leading-6">{title}</span>
          <span className="text-secondary border-secondary/50 font-delight self-start rounded-full border px-3 py-1 text-xs whitespace-nowrap -mt-1">
            {badgeText}
          </span>
        </div>

        <span className="text-secondary/50 text-xs leading-3.5">
          {subtitle}
          <span className="text-foreground"> {subtitleWhite}</span>
        </span>
      </div>
      <div className="ml-auto self-center">
        {isPaid ? (
          <Image src={PaidBadge} alt="Paid" className="h-8 w-24.75" />
        ) : (
          <Image src={NotPaidBadge} alt="Not paid" className="h-8 w-28.75" />
        )}
      </div>
    </div>
  );
}
