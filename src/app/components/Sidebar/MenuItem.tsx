import PremiumSvg from 'public/premium.svg';
import { ReactNode } from 'react';
import Image from 'next/image';

export function MenuItem({
  title,
  children,
  premiumSection,
}: {
  title: string;
  children: ReactNode;
  premiumSection?: boolean;
}) {
  return (
    <div className={'mx-[16px] mt-[32px] flex flex-col'}>
      <div
        className={
          'mb-[12px] flex w-full flex-row items-center justify-between px-[16px]'
        }
      >
        <span
          className={
            'font-roboto text-[12px] uppercase leading-[20px] text-[#9AA6B5]'
          }
        >
          {title}
        </span>
        {premiumSection && <Image src={PremiumSvg} alt="premium" />}
      </div>

      <div className={'flex flex-col gap-[8px]'}>{children}</div>
    </div>
  );
}
