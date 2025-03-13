'use client';

import RightFiller from './RightFiller';
import Image from 'next/image';
import LogoSvg from './assets/logo.svg';
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
    <div className="relative flex h-dvh flex-row overflow-hidden bg-background">
      <div className="relative h-full z-10 flex md:min-w-[468px] md:max-w-[468px] min-w-full max-w-full flex-col md:p-[64px] p-[32px] outline outline-[1px] outline-accent">
      <Image src={GridLeftSvg} alt="grid" className="absolute left-0 top-[-24px] md:top-0 w-full -z-10" />
        <div className="relative md:mb-[64px] mb-10 flex w-full items-center justify-center z-10">
          {topButtonState && (
            <button
              className="absolute left-0 top-0 pt-[10px]"
              onClick={onTopButtonClick}
            >
              {topButtonState === 'back' ? (
                <BackIcon />
              ) : topButtonState === 'cross' ? (
                <CrossIcon />
              ) : null}
            </button>
          )}
          <Image src={LogoSvg} alt="logo" className="w-[124px] md:w-[152px]" />
        </div>
        <div className="flex h-full w-full flex-col">{children}</div>
      </div>

      <RightFiller />
    </div>
  );
}
