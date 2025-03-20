'use client';

import { ReactNode } from 'react';

interface InfoPopoverProps {
  title: string;
  content: string;
  children?: ReactNode;
}

export const InfoPopover = ({ title, content, children }: InfoPopoverProps) => {
  return (
    <div className="group relative">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-secondary cursor-pointer transition delay-100 duration-300 ease-in-out group-hover:text-[#F2F2F2]"
      >
        <circle cx="8" cy="8" r="6.66667" stroke="currentColor" />
        <path d="M8 7.33333V10.6667" stroke="currentColor" />
        <circle cx="8" cy="5.33333" r="0.666667" fill="currentColor" />
      </svg>
      <div className="relative z-50">
        <div className="invisible absolute top-4 -right-8 flex w-112 flex-col bg-[#1D2026] p-6 opacity-0 transition-all transition-discrete delay-100 duration-300 ease-in-out group-hover:visible group-hover:opacity-100">
          <div className="text-sm pb-3">{title}</div>
          <div className="text-secondary text-xs">{content}</div>
          {children}
        </div>
      </div>
    </div>
  );
};
