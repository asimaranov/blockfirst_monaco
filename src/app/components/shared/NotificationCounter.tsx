import { Skeleton } from './Skeleton';

export function NotificationCounter({ count }: { count?: number }) {
  return (
    <div className="flex h-[1.157vw] w-[1.157vw] flex-col items-center justify-center rounded-full bg-[#E83B3B] px-[0.347vw] py-[0.174vw]">
      {count ? (
        <span className="font-roboto text-[0.694vw] font-medium text-[#F2F2F2]">
          {count}
        </span>
      ) : (
        <Skeleton className={'h-[0.694vw] w-full'} />
      )}
    </div>
  );
}
