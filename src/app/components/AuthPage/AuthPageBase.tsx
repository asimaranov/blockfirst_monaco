'use client';

import RightFiller from './RightFiller';
import Image from 'next/image';
import LogoSvg from './assets/logo.svg';

const BackIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5303 4.46967C10.2374 4.17678 9.76257 4.17678 9.46967 4.46967L2.46967 11.4696C2.32902 11.6102 2.25 11.801 2.25 11.9999C2.25 12.1988 2.32902 12.3896 2.46967 12.5303L9.46967 19.5303C9.76256 19.8232 10.2374 19.8232 10.5303 19.5303C10.8232 19.2374 10.8232 18.7625 10.5303 18.4696L4.81066 12.7499H21C21.4142 12.7499 21.75 12.4141 21.75 11.9999C21.75 11.5857 21.4142 11.2499 21 11.2499H4.81067L10.5303 5.53033C10.8232 5.23744 10.8232 4.76257 10.5303 4.46967Z"
        fill="#F2F2F2"
      />
    </svg>
  );
};

const CrossIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5303 4.46967C10.2374 4.17678 9.76257 4.17678 9.46967 4.46967L2.46967 11.4696C2.32902 11.6102 2.25 11.801 2.25 11.9999C2.25 12.1988 2.32902 12.3896 2.46967 12.5303L9.46967 19.5303C9.76256 19.8232 10.2374 19.8232 10.5303 19.5303C10.8232 19.2374 10.8232 18.7625 10.5303 18.4696L4.81066 12.7499H21C21.4142 12.7499 21.75 12.4141 21.75 11.9999C21.75 11.5857 21.4142 11.2499 21 11.2499H4.81067L10.5303 5.53033C10.8232 5.23744 10.8232 4.76257 10.5303 4.46967Z"
        fill="#F2F2F2"
      />
    </svg>
  );
};

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
      <div className="relative z-10 flex min-w-[468px] flex-col p-[64px] outline outline-[1px] outline-accent">
        <div className="relative mb-[64px] flex w-full items-center justify-center">
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

        {children}
      </div>

      <RightFiller />
    </div>
  );
}
