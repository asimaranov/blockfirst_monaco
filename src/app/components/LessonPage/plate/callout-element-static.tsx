import React from 'react';

import type { SlateElementProps } from '@udecode/plate';

import { cn } from '@udecode/cn';
import { SlateElement } from '@udecode/plate';
import CalloutBadge from './assets/callout-badge.svg';
import Image from 'next/image';
export function CalloutElementStatic({
  children,
  className,
  ...props
}: SlateElementProps) {
  return (
    <SlateElement
      className={cn('my-1 flex rounded-sm bg-[#14171C]', className)}
      style={{
        backgroundColor: props.element.backgroundColor as any,
      }}
      {...props}
    >
      <div className="flex flex-col w-full rounded-md">
        <div className="w-full h-24 relative bg-[url('/images/covers/callout-cover.png')] bg-no-repeat bg-cover">
          <Image src={CalloutBadge} alt="Callout Badge" className='absolute top-8 left-8 w-32.25 h-8' />
        </div>
        {/* Second child span text is sm  */}
        <div className="w-full p-8 [&_span]:text-base [&>*]:leading-6">{children}</div>
      </div>
    </SlateElement>
  );
}
