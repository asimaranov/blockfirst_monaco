'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import proIMG from 'public/subscriptions/pro.svg';
import baseIMG from 'public/subscriptions/starter.svg';

export function MenuItem({
  title,
  children,
  isPro,
  isBase,
}: {
  title: string;
  children: ReactNode;
  isPro?: boolean;
  isBase?: boolean;
}) {
  return (
    <div className={'mx-[16px] mt-[32px] flex flex-col'}>
      <div className={'mr-[16px] flex flex-row items-center justify-between'}>
        <span
          className={
            'mb-[12px] ml-[16px] font-roboto text-[12px] uppercase leading-[20px] text-[#9AA6B5]'
          }
        >
          {title}
        </span>
        {isPro && <Image src={proIMG} alt="Pro" />}
        {isBase && <Image src={baseIMG} alt="Base" />}
      </div>
      <div className={'flex flex-col gap-[8px]'}>{children}</div>
    </div>
  );
}
