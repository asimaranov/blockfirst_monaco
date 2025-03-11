import { cn } from '~/helpers';
import { Skeleton } from '../shared/Skeleton';
import { IUser } from '~/app/lib/types/IUser';
import { SubscriptionLabel } from './assets/SubscriptionLabel';

export function UserInfo({ user }: { user?: IUser }) {
  return (
    <div
      className={'flex flex-row border-t border-[#282D33] px-[32px] py-[20px]'}
    >
      {user?.name?.[0] ? (
        <div
          className={
            'my-auto flex h-[40px] w-[40px] flex-col items-center justify-center rounded-full bg-[#195AF4]'
          }
        >
          <span className={'font-roboto text-[15px] uppercase text-[#F2F2F2]'}>
            {user.name[0]}
          </span>
        </div>
      ) : (
        <Skeleton className="my-auto h-[40px] w-[40px] rounded-full" />
      )}
      <div className={'ml-[16px] flex flex-col gap-[8px]'}>
        {user?.name ? (
          <span
            className={'font-roboto text-[16px] font-medium text-[#F2F2F2]'}
          >
            {user.name}
          </span>
        ) : (
          <Skeleton className="h-[16px] w-[90px] rounded-full" />
        )}
        {user?.startTimestamp ? (
          <span className="font-roboto text-[12px] text-[#9AA6B5]">
            Старт —{' '}
            <span className="font-roboto text-[12px] text-[#F2F2F2]">
              {new Date(user?.startTimestamp).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              })}
            </span>
          </span>
        ) : (
          <Skeleton className="h-[12px] w-[70px] rounded-full" />
        )}
      </div>
      <div className="ml-[62px]">
        {user?.subscriptionType != undefined ? (
          <SubscriptionLabel type={user.subscriptionType} />
        ) : (
          <Skeleton className="h-[24px] w-[67px] rounded-full" />
        )}
      </div>
    </div>
  );
}
