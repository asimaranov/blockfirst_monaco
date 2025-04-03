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
    <div className={'mx-4 mt-6 nth-[2]:mt-8 flex flex-col'}>
      <div className={'flex flex-row items-center justify-between mb-3'}>
        <span
          className={
            'ml-4 font-roboto text-xs uppercase text-secondary opacity-50 flex items-center justify-center leading-5'
          }
        >
          {title}
        </span>
        {isPro && (
          <Image src={proIMG} alt="Pro" className="h-5 w-8.25 mr-4" />
        )}
        {/* {isBase && <Image src={baseIMG} alt="Base" />} */}
      </div>
      <div className={'flex flex-col gap-2'}>{children}</div>
    </div>
  );
}
