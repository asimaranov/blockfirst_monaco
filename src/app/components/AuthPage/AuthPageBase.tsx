'use client';

import RightFiller from './RightFiller';
import Image from 'next/image';
import AuthButton from './button';
import BackIcon from './assets/back_icon';
import CrossIcon from './assets/cross_icon';
import GridLeftSvg from './assets/grid_left.svg';

export default function AuthPageBase({
  children,
  topButtonState,
  onTopButtonClick,
}: {
  children: React.ReactNode;
  topButtonState?: 'back' | 'cross' | undefined;
  onTopButtonClick?: () => void;
}) {
  return (
    <div className="bg-background relative flex h-dvh flex-row overflow-hidden">
      <div className="outline-accent relative z-10 flex h-full flex-col overflow-y-scroll px-5 py-8 outline-[0.0579vw] sm:max-w-117 sm:min-w-117 sm:p-16">
        <Image
          src={GridLeftSvg}
          alt="grid"
          className="absolute -top-6 left-0 -z-10 w-full md:top-0"
        />
        <div className="relative z-10 mb-10 flex w-full items-center justify-center md:mb-16">
          {topButtonState && (
            <button
              className="absolute top-0 left-0 pt-2.5"
              onClick={onTopButtonClick}
            >
              {topButtonState === 'back' ? (
                <BackIcon />
              ) : topButtonState === 'cross' ? (
                <CrossIcon />
              ) : null}
            </button>
          )}
          <Image
            src={'/images/logo/form-logo.svg'}
            alt="logo"
            className="w-31 sm:w-38"
            width={152}
            height={44}
          />
        </div>
        <div className="flex min-h-fit h-full w-full flex-col">{children}</div>
      </div>

      <RightFiller />
    </div>
  );
}
