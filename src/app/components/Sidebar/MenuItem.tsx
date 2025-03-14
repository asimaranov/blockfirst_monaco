'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import proIMG from 'public/subscriptions/pro.svg';
import baseIMG from 'public/subscriptions/starter.svg';

export function MenuItem({
  title,
  children,
  isPro,
  // isBase,
}: {
  title: string;
  children: ReactNode;
  isPro?: boolean;
  // isBase?: boolean;
}) {
  return (
    <div className={'mx-4 mt-[1.85vw] flex flex-col'}>
      <div className={'flex flex-row items-center justify-between'}>
        <span
          className={
            'mb-[0.69vw] ml-4 font-roboto text-[0.69vw] uppercase leading-[1.16vw] text-secondary opacity-50 flex items-center justify-center'
          }
        >
          {title}
        </span>
        {isPro && (
          <Image src={proIMG} alt="Pro" className="h-[1.157vw] w-[1.91vw]" />
        )}
        {/* {isBase && <Image src={baseIMG} alt="Base" />} */}
      </div>
      <div className={'flex flex-col gap-2'}>{children}</div>
    </div>
  );
}
