'use client';

import Link from 'next/link';

interface TakeTestButtonProps {
  href: string;
  finalTestStatus: 'available' | 'upcoming' | 'locked';
}

export function TakeTestButton({ href, finalTestStatus }: TakeTestButtonProps) {
  return (
    <Link href={href} className="mt-auto block w-full px-4">
      <button className="flex h-11 w-full items-center justify-center rounded-full bg-[#1859F4]">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-white">Пройти зачет</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.75 4.22385L14 9.78279L8.75 15.2238"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </Link>
  );
}
