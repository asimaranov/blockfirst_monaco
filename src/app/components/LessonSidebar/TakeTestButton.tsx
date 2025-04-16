'use client';

import Link from 'next/link';

interface TakeTestButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isCompleted?: boolean;
}

export function TakeTestButton({
  disabled,
  onClick,
  isCompleted,
}: TakeTestButtonProps) {
  if (isCompleted) {
    return (
      <button className="bg-success/10 flex h-11 w-full items-center justify-center gap-1 rounded-full">
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          <path
            d="M5.94922 10.65L8.54922 13.25L15.0492 6.75"
            stroke="#33CF8E"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <span className="text-success text-sm">Зачет пройден</span>
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="not-disabled:hover:bg-primary bg-background border-primary flex h-11 w-full items-center justify-center rounded-full border transition-all duration-100 not-disabled:cursor-pointer disabled:opacity-50"
    >
      <div className="flex items-center">
        <span className="text-sm text-white">Пройти зачет</span>
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          <path
            d="M14.2305 4.43162C14.5292 4.14484 15.0042 4.15441 15.291 4.45311L19.9062 9.2617C20.1848 9.55191 20.1848 10.0106 19.9062 10.3008L15.291 15.1094C15.0042 15.4082 14.5293 15.4177 14.2305 15.1308C13.9319 14.844 13.9222 14.369 14.209 14.0703L18.3262 9.78123L14.209 5.49217C13.9222 5.19338 13.9317 4.71846 14.2305 4.43162Z"
            fill="#F2F2F2"
          />
        </svg>
      </div>
    </button>
  );
}
