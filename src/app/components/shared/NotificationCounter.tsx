import { Skeleton } from './Skeleton';

export function NotificationCounter({ count }: { count?: number }) {
  return (
    <div className="flex h-[20px] w-[20px] flex-col items-center justify-center rounded-full bg-[#E83B3B] px-[6px] py-[3px]">
      {count ? (
        <span className="font-roboto text-[12px] font-medium text-[#F2F2F2]">
          {count}
        </span>
      ) : (
        <Skeleton className={'h-[12px] w-full'} />
      )}
    </div>
  );
}
