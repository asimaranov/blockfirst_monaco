import Image from 'next/image';
import { TARIFFS } from '~/app/lib/constants/tariff';
import LockImage from './assets/lock.svg';

interface PremiumFeatureCardProps {
  id: string;
  title: string;
  description: string;
  image: any;
  bgColor: string;
  tariff: string;
  tariffIcon: any;
  icon: React.ReactNode;
  label: string;
  href?: string;
  isLocked?: boolean;
}

export default function PremiumFeatureCard({
  id,
  title,
  description,
  image,
  bgColor,
  tariff,
  tariffIcon,
  icon,
  label,
  href,
  isLocked = false,
}: PremiumFeatureCardProps) {
  return (
    <div
      key={id}
      className={`${bgColor} hidden rounded-xl p-5 transition-transform duration-200 hover:scale-102 nth-[-n+3]:block sm:rounded-none sm:px-8 ease-in-out`}
    >
      <div className="mb-5 flex items-center justify-between sm:hidden">
        <div className="flex items-center">
          <div className="bg-foreground flex items-center justify-center rounded-full p-1.5 pr-4">
            <Image
              src={tariffIcon}
              alt={tariff}
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="text-background ml-2 text-sm font-medium">
              {tariff}
            </span>
          </div>
        </div>
        {isLocked && (
          <div className="flex items-center">
            <Image src={LockImage} alt="Lock" width={20} height={20} />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <Image src={image} alt={title} />

        <div className="text-foreground">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-foreground/90 mt-4 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
