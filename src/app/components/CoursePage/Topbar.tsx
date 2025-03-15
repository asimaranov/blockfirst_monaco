import Link from 'next/link';
import { cn } from '~/helpers';
import Image from 'next/image';

export function Topbar({
  courseAuthor,
  courseAuthorAvatar,
}: {
  courseAuthor: string;
  courseAuthorAvatar: string;
}) {
  return (
    <nav
      className={cn(
        'flex w-full flex-row items-center justify-between border-b border-[#282D33] px-8 py-6'
      )}
    >
      <Link
        href={`/dashboard`}
       className="flex flex-row items-center justify-center gap-2 text-sm">
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
            d="M11.099 6.46967C10.8061 6.17678 10.3312 6.17678 10.0383 6.46967L5.03831 11.4696C4.89766 11.6103 4.81864 11.801 4.81864 11.9999C4.81864 12.1989 4.89766 12.3896 5.03831 12.5303L10.0383 17.5303C10.3312 17.8232 10.8061 17.8232 11.099 17.5303C11.3919 17.2374 11.3919 16.7625 11.099 16.4696L7.3793 12.75H18.4258C18.84 12.75 19.1758 12.4142 19.1758 12C19.1758 11.5857 18.84 11.25 18.4258 11.25H7.37931L11.099 7.53033C11.3919 7.23744 11.3919 6.76257 11.099 6.46967Z"
            fill="#F2F2F2"
          />
        </svg>
        Подробности курса
      </Link>
      <div className="flex flex-col gap-2 items-end">
        <div className="flex flex-row items-center justify-end gap-2 text-sm">
          <Image
            src={courseAuthorAvatar}
            alt={courseAuthor}
            width={16}
            height={16}
          />
          {courseAuthor}
        </div>
        <span className="font-roboto text-secondary text-xs opacity-50">
          Автор курса
        </span>
      </div>
    </nav>
  );
}
