import Link from 'next/link';
import { cn } from '~/helpers';

interface TopbarItem {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function Topbar({
  lastestUpdate,
  items,
}: {
  lastestUpdate: string;
  items: TopbarItem[];
}) {
  return (
    <nav
      className={cn(
        'flex w-full flex-row items-center justify-between border-[#282D33] px-8 py-6'
      )}
    >
      <div className="flex flex-row rounded-[100px] bg-[#01050D]">
        {items.map((item) => (
          <div
            onClick={item.onClick}
            key={item.label}
            className={cn(
              'font-roboto flex items-center justify-center px-8 py-3 text-sm font-medium',
              'shrink-0 cursor-pointer',
              item.active
                ? 'rounded-[100px] bg-[#F2F2F2] text-[#01050D]'
                : 'bg-transparent text-[#F2F2F2] hover:opacity-80'
            )}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-end gap-2">
          <div className="h-[6px] w-[6px] rounded-full bg-[#54EDB7]" />
          <span className="font-roboto text-sm font-medium text-[#F2F2F2]">
            {lastestUpdate}
          </span>
        </div>
        <span className="font-roboto text-secondary text-xs opacity-50">
          Последнее обновление
        </span>
      </div>
    </nav>
  );
}
