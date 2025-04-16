'use client';

import Link from 'next/link';
import { CourseProgress } from '../CourseInfoTopCard/CourseProgress';
import { NotificationsModal } from '../Notifications/NotificationsModal';
import { useNotificationsModalStore } from '~/store/notificationsModal';

const NotificationButton = ({ className }: { className: string }) => {
  const { toggle } = useNotificationsModalStore();

  return (
    <div onClick={() => toggle('desktop')} className="cursor-pointer">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <g clip-path="url(#clip0_3474_11810)">
          <path
            d="M14.668 18.666H18.0013"
            stroke="#F2F2F2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.668 21.334H20.668"
            stroke="#F2F2F2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.332 11.334H15.9987C12.6654 11.334 11.332 12.6673 11.332 16.0007V20.0007C11.332 23.334 12.6654 24.6673 15.9987 24.6673H19.9987C23.332 24.6673 24.6654 23.334 24.6654 20.0007V16.6673"
            stroke="#F2F2F2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="23.5992" cy="12.4" r="2.4" fill="#CF3336" />
        </g>
        <rect
          x="0.5"
          y="0.5"
          width="35"
          height="35"
          rx="17.5"
          stroke="#282D33"
        />
        <defs>
          <clipPath id="clip0_3474_11810">
            <rect width="36" height="36" rx="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

const BackButton = () => {
  return (
    <Link href="/dashboard" className="hover:opacity-50">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 cursor-pointer hover:opacity-80"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.099 6.46967C10.8061 6.17678 10.3312 6.17678 10.0383 6.46967L5.03831 11.4696C4.89766 11.6103 4.81864 11.801 4.81864 11.9999C4.81864 12.1989 4.89766 12.3896 5.03831 12.5303L10.0383 17.5303C10.3312 17.8232 10.8061 17.8232 11.099 17.5303C11.3919 17.2374 11.3919 16.7625 11.099 16.4696L7.3793 12.75H18.4258C18.84 12.75 19.1758 12.4142 19.1758 12C19.1758 11.5857 18.84 11.25 18.4258 11.25H7.37931L11.099 7.53033C11.3919 7.23744 11.3919 6.76257 11.099 6.46967Z"
          fill="#F2F2F2"
        />
      </svg>
    </Link>
  );
};
export default function LessonSidebarHeader() {
  return (
    <>
      <div className="bg-background sticky top-0 z-10 flex flex-row items-center gap-2 px-8 pt-8 pb-5 text-base font-medium">
        <BackButton />
        <span className="line-clamp-1 flex-1 overflow-hidden wrap-break-word text-ellipsis">
          Путешествие Solidity & DeFi
        </span>
        <NotificationButton className="ml-8 h-9 w-9" />
      </div>
      <div className="relative flex flex-col">
        <div className="">
          <CourseProgress
            progress={40}
            className="rounded-lg bg-[#0B0D12] px-8 py-5"
          />
        </div>

        <NotificationsModal />
      </div>
    </>
  );
}
