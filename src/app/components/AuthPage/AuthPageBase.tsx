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
    <div className="relative flex min-h-screen flex-row overflow-hidden bg-background">
      <div className="relative z-10 flex min-w-[468px] max-w-[468px] flex-col p-[64px] outline outline-[1px] outline-accent">
      <Image src={GridLeftSvg} alt="grid" className="absolute left-0 top-0 w-full -z-10" />

        <div className="relative mb-[64px] flex w-full items-center justify-center z-10">
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
          <Image src={LogoSvg} alt="logo" />
        </div>
        <div className="flex h-full w-full flex-col">{children}</div>
      </div>

      <RightFiller />
    </div>
  );
}
