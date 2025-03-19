import { cn } from '~/helpers';

export function Topbar({ lastestUpdate }: { lastestUpdate: string }) {
  return (
    <nav
      className={cn(
        'flex w-full flex-row items-center justify-between border-b border-[#282D33] px-8 py-6'
      )}
    >
      <div className="flex flex-row text-xl">Кураторы BlockFirst</div>
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
