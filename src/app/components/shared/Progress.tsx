import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '~/helpers';

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    useFlag?: boolean;
    inactive?: boolean;
    locked?: boolean;
  }
>(({ className, value, useFlag, locked, inactive, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-3 w-full rounded-full bg-[url(/misc/progress-bg.svg)] bg-no-repeat bg-cover',
      inactive && 'bg-[url(/misc/progress-bg-inactive.svg)]',
      className,
    )}
    {...props}
  >

    {!locked && (
      <div className="absolute top-0.5 bottom-0.5 left-0.5 z-1 aspect-square w-auto rounded-full bg-[#01050D]" />
    )}

    <div
      className={cn(
        'h-full w-full flex-1 overflow-hidden rounded-full',
        value === 100 && 'rounded-r-none'
      )}
    >
      {!inactive && (
        <ProgressPrimitive.Indicator
          className={cn(
            'h-full w-full flex-1 rounded-full bg-linear-to-r from-[#FFF93E] to-[#FF974C] transition-all',
          value === 100 && 'rounded-r-none'
        )}
        style={{
          transform: `translateX(-${100 - (value ? (value <= 5 ? 5 : value) : 5)}%)`,
          }}
        />
      )}
      {inactive && !locked && (
        <ProgressPrimitive.Indicator
          className={cn(
            'h-full w-full flex-1 rounded-full bg-[#9AA6B5] transition-all',
          value === 100 && 'rounded-r-none'
        )}
        style={{
          transform: `translateX(-${100 - 5}%)`,
          }}
        />
      )}
    </div>
    {useFlag && (
      <div className="absolute right-0 bottom-0 z-1">
        <svg
          width="12"
          height="52"
          viewBox="0 0 12 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-13 w-3"
        >
          <path
            d="M12 0.511049C12 0.228804 11.7758 0 11.4992 0C11.2226 0 10.9984 0.228804 10.9984 0.511049V0.888276L0.602341 8.61411C-0.301724 9.28596 -0.163636 10.7023 0.852426 11.1792L6.55633 13.8564C8.66009 14.8438 10.2368 16.6398 10.9984 18.7856L10.9984 52H12L12 0.511049Z"
            fill="url(#paint0_linear_1090_2791)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1090_2791"
              x1="-3.49097"
              y1="23"
              x2="11.9984"
              y2="23"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFF93E" />
              <stop offset="1" stopColor="#FF974C" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )}
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
