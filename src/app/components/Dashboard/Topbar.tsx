import Link from 'next/link';
import { cn } from '~/helpers';

interface TopbarItem {
  label: string;
  href: string;
}

export function Topbar({
  pathname,
  lastestUpdate,
  items,
}: {
  pathname: string;
  lastestUpdate: string;
  items: TopbarItem[];
}) {
  return (
    <nav
      className={cn(
        'flex w-full flex-row items-center justify-between border-b border-[#282D33] px-8 py-5'
      )}
    >
      <div className="flex flex-row rounded-[100px] bg-[#01050D]">
        {items.map((item) => (
          <Link
            href={item.href}
            className={cn(
              'flex items-center justify-center px-8 py-3 font-roboto text-sm font-medium hover:opacity-80',
              'shrink-0',
              pathname === item.href
                ? 'rounded-[100px] bg-[#F2F2F2] text-[#01050D]'
                : 'bg-transparent text-[#F2F2F2]'
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-row items-center justify-end gap-[8px]">
          <div className="h-[6px] w-[6px] rounded-full bg-[#54EDB7]" />
          <span className="font-roboto text-sm font-medium text-[#F2F2F2]">
            {lastestUpdate}
          </span>
        </div>
        <span className="font-roboto text-xs text-secondary opacity-50">
          Последнее обновление
        </span>
      </div>
    </nav>
  );
}
