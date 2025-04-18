'use client';

import { useState } from 'react';
import { cn } from '~/helpers';

const LessonStates = {
  completed: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.44922 10.65L8.04922 13.25L14.5492 6.75"
        stroke="#195AF4"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  completedNoExtra: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_3422_12315)">
        <path
          d="M5.44922 10.65L8.04922 13.25L14.5492 6.75"
          stroke="#195AF4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="17" cy="5.5" r="4.5" fill="#01050D" />
        <path
          d="M14.8662 7.72559L16.2402 5.83887L14.1758 5.22363L14.4971 4.19824L16.5615 4.95703L16.5 2.60547H17.5391L17.4707 4.99805L19.5078 4.23926L19.8223 5.28516L17.7236 5.90723L19.0703 7.75977L18.2227 8.39551L16.958 6.42676L15.7207 8.34766L14.8662 7.72559Z"
          fill="#F48E19"
        />
      </g>
      <defs>
        <clipPath id="clip0_3422_12315">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  skipped: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.41696 5.60005C9.13349 5.95624 8.81546 6.50324 8.35917 7.29139L5.98954 11.3844C5.53161 12.1753 5.21438 12.7256 5.04603 13.1503C4.87912 13.5713 4.908 13.7489 4.97503 13.8651C5.04206 13.9814 5.18123 14.0953 5.62923 14.1618C6.0811 14.2289 6.71628 14.2301 7.63024 14.2301H12.3695C13.2835 14.2301 13.9186 14.2289 14.3705 14.1618C14.8185 14.0953 14.9577 13.9814 15.0247 13.8651C15.0917 13.7489 15.1206 13.5713 14.9537 13.1503C14.7854 12.7256 14.4681 12.1753 14.0102 11.3844L11.6406 7.29139C11.1843 6.50324 10.8662 5.95624 10.5828 5.60005C10.3018 5.24705 10.134 5.18359 9.99987 5.18359C9.86578 5.18359 9.69789 5.24705 9.41696 5.60005ZM8.73231 5.05518C9.06843 4.63282 9.46131 4.30859 9.99987 4.30859C10.5384 4.30859 10.9313 4.63282 11.2674 5.05518C11.5962 5.4683 11.9461 6.07264 12.3787 6.82001L12.3978 6.85298L14.7674 10.946L14.7865 10.9789C15.2209 11.7291 15.572 12.3355 15.7671 12.8278C15.9666 13.331 16.0524 13.8345 15.7827 14.3022C15.5131 14.7699 15.0343 14.9479 14.499 15.0274C13.9752 15.1051 13.2744 15.1051 12.4076 15.1051H12.3695H7.63024H7.59212C6.72531 15.1051 6.02457 15.1051 5.50074 15.0274C4.9654 14.9479 4.48664 14.7698 4.217 14.3022C3.94735 13.8345 4.03316 13.331 4.23261 12.8278C4.42777 12.3355 4.77888 11.7291 5.21321 10.9789L5.23229 10.946L7.60192 6.85298L7.62099 6.82003L7.621 6.82002C8.05367 6.07264 8.40354 5.4683 8.73231 5.05518ZM9.99987 7.81342C10.2415 7.81342 10.4374 8.00929 10.4374 8.25092V10.5843C10.4374 10.8259 10.2415 11.0218 9.99987 11.0218C9.75824 11.0218 9.56237 10.8259 9.56237 10.5843V8.25092C9.56237 8.00929 9.75824 7.81342 9.99987 7.81342ZM9.99987 12.9176C10.322 12.9176 10.5832 12.6564 10.5832 12.3343C10.5832 12.0121 10.322 11.7509 9.99987 11.7509C9.6777 11.7509 9.41654 12.0121 9.41654 12.3343C9.41654 12.6564 9.6777 12.9176 9.99987 12.9176Z"
        fill="#F48E19"
      />
    </svg>
  ),
};

interface CourseModuleProps {
  title: string;
  icon: React.ReactNode;
  lessons: {
    title: string;
    status?: 'available' | 'skipped' | 'completed' | 'completedNoExtra';
  }[];
  progress: number;
  status: 'available' | 'upcoming' | 'locked';
  total: number;
}

export function CourseModule({
  title,
  icon,
  lessons,
  progress,
  total,
  status,
}: CourseModuleProps) {
  return (
    <div className="flex w-full flex-col">
      <div
        className={cn(
          'w-full rounded-lg px-4 py-2',
          status === 'available' ? 'bg-[#0B0D12]' : 'hover:bg-[#0B0D12]/50'
        )}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-5 w-5 items-center justify-center">
              {icon}
            </div>
            <span className={cn('text-secondary/50 text-xs uppercase')}>
              {title}
            </span>
          </div>
          <div>
            <span className="text-foreground text-sm">{progress}</span>
            <span className="text-secondary text-xs">/{total}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 ml-6 mr-4 flex">
        <div className="w-4 pt-1.25 pb-2.5 pl-0.5">
          <div className="border-accent left-1/2 h-full w-4 rounded-bl-lg border-b-[0.5px] border-l-[0.5px]"></div>
        </div>
        <div className="flex flex-1 flex-col gap-5 pl-3">
          {lessons.map((lesson, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    'text-sm text-gray-400',
                    lesson.status === 'available' && 'text-white'
                  )}
                >
                  {lesson.title}
                </span>
              </div>
              {lesson.status === 'completed' && <>{LessonStates.completed}</>}
              {lesson.status === 'completedNoExtra' && (
                <>{LessonStates.completedNoExtra}</>
              )}
              {lesson.status === 'skipped' && <>{LessonStates.skipped}</>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
