import Link from 'next/link';
import { ReactNode } from 'react';
import { NotificationCounter } from '../shared/NotificationCounter';

export function MenuLink({
  title,
  children,
  href,
  locked,
  isCurrentPage,
  notificationCount,
}: {
  title: string;
  children: ReactNode;
  href: string;
  locked?: boolean;
  isCurrentPage: boolean;
  notificationCount?: number;
}) {
  return (
    <Link
      href={href}
      className={
        'group flex cursor-pointer flex-row items-center gap-4 border-b border-transparent px-4 py-[0.81vw] hover:border-[#282D33] data-[active=true]:border-[#F2F2F2]'
      }
      data-active={isCurrentPage}
    >
      {children}
      <div className={'flex w-full flex-row items-center justify-between'}>
        <span
          className={
            'font-roboto text-[0.81vw] leading-3 text-[#9AA6B5] group-hover:text-[#F2F2F2] group-data-[active=true]:text-[#F2F2F2]'
          }
        >
          {title}
        </span>
        {notificationCount && <NotificationCounter count={notificationCount} />}
        {locked && (
          <svg
            width="0.926vw"
            height="0.926vw"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00161 11.1209C8.52675 11.1209 8.95245 10.6952 8.95245 10.1701C8.95245 9.64494 8.52675 9.21924 8.00161 9.21924C7.47648 9.21924 7.05078 9.64494 7.05078 10.1701C7.05078 10.6952 7.47648 11.1209 8.00161 11.1209Z"
              fill="#F2F2F2"
            />
            <path
              d="M11.6607 6.55925V5.83008C11.6607 4.25508 11.2816 2.16675 7.9974 2.16675C4.71323 2.16675 4.33406 4.25508 4.33406 5.83008V6.55925C2.70073 6.76341 2.16406 7.59175 2.16406 9.62758V10.7126C2.16406 13.1042 2.89323 13.8334 5.2849 13.8334H10.7099C13.1016 13.8334 13.8307 13.1042 13.8307 10.7126V9.62758C13.8307 7.59175 13.2941 6.76341 11.6607 6.55925ZM7.9974 11.9317C7.02323 11.9317 6.23573 11.1384 6.23573 10.1701C6.23573 9.19591 7.02906 8.40841 7.9974 8.40841C8.96573 8.40841 9.75906 9.20175 9.75906 10.1701C9.75906 11.1442 8.97156 11.9317 7.9974 11.9317ZM5.2849 6.50675C5.23823 6.50675 5.1974 6.50675 5.15073 6.50675V5.83008C5.15073 4.12091 5.6349 2.98341 7.9974 2.98341C10.3599 2.98341 10.8441 4.12091 10.8441 5.83008V6.51258C10.7974 6.51258 10.7566 6.51258 10.7099 6.51258H5.2849V6.50675Z"
              fill="#F2F2F2"
            />
          </svg>
        )}
      </div>
    </Link>
  );
}
