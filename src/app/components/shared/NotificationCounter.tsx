import { Skeleton } from './Skeleton';

export function NotificationCounter({ count }: { count: number }) {
  return (
    <>
      {count ? (
        <div className="flex h-5 w-5 flex-col items-center justify-center rounded-full bg-[#E83B3B] px-[0.347vw] py-[0.174vw]">
          <span className="font-roboto text-xs font-medium text-[#F2F2F2]">
            {count}
          </span>
        </div>
      ) : (
        <div className="h-5 w-5"></div>
      )}
    </>
  );
}
