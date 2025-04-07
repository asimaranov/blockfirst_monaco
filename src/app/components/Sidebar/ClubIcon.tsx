'use client';

import { cn } from '~/helpers';
import { SubscriptionType } from '~/app/lib/constants/subsctiptions';

interface ClubIconProps {
  subscriptionType: SubscriptionType;
}

export function ClubIcon({ subscriptionType }: ClubIconProps) {
  return (
    <svg
      width="0.93vw"
      height="0.93vw"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'h-4 w-4',
        'min-h-4 min-w-4',
        subscriptionType !== SubscriptionType.Pro ? 'opacity-60' : undefined
      )}
    >
      <g clipPath="url(#clip0_650_6475)">
        <rect width="16" height="16" rx="3.2" fill="#9AA6B5" />
        <path
          d="M9.82826 9.41391L12.15 7.93374V6.10949L7.09367 9.49735L12.15 12.8149V11.0384L9.82889 9.58295L9.6949 9.49893L9.82826 9.41391Z"
          fill="#01050D"
          stroke="#01050D"
          strokeWidth="0.2"
        />
        <path
          d="M6.17174 6.49179L3.85 5.01162V3.18737L8.90633 6.57523L3.85 9.89274V8.11632L6.17111 6.66083L6.3051 6.57681L6.17174 6.49179Z"
          fill="#01050D"
          stroke="#01050D"
          strokeWidth="0.2"
        />
      </g>
      <defs>
        <clipPath id="clip0_650_6475">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
