'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '~/helpers';
import { SubscriptionType } from '~/app/lib/constants/subsctiptions';
import starterIMG from 'public/subscriptions/starter.svg';
import ClubIcon from './assets/section_icons/club';

interface ClubLinkProps {
  subscriptionType: SubscriptionType;
}

export function ClubLink({ subscriptionType }: ClubLinkProps) {
  return (
    <Link href="#" className={'flex flex-row items-center px-8 py-5 group'}>
      <ClubIcon
        className={
          subscriptionType !== SubscriptionType.Pro
            ? 'opacity-60'
            : 'group-hover:opacity-50'
        }
      />
      <span
        className={cn(
          'font-roboto text-secondary mr-8 ml-4 text-center text-sm leading-4 text-nowrap',
          subscriptionType === SubscriptionType.Free
            ? 'opacity-60'
            : 'text-foreground group-hover:text-foreground/50'
        )}
      >
        Закрытый клуб BlockFirst
      </span>
      {subscriptionType === SubscriptionType.Free && (
        <Image
          src={starterIMG}
          alt="Starter subscription"
          className="h-[1.157vw] w-[3.414vw]"
        />
      )}
    </Link>
  );
}
