import { cn } from '~/helpers';
import { Skeleton } from '../shared/Skeleton';
import { IUser } from '~/app/lib/types/IUser';
import { SubscriptionLabel } from './assets/SubscriptionLabel';

export function UserInfo({ user }: { user?: IUser }) {
  return (
    <div
      className={
        'flex flex-row border-t border-[#282D33] px-[1.85vw] py-[1.16vw]'
      }
    >
      {user?.name?.[0] ? (
        <div
          className={
            'my-auto flex h-[2.31vw] w-[2.31vw] flex-col items-center justify-center rounded-full bg-[#195AF4]'
          }
        >
          <span
            className={'font-roboto text-[0.87vw] uppercase text-[#F2F2F2]'}
          >
            {user.name[0]}
          </span>
        </div>
      ) : (
        <Skeleton className="my-auto h-[2.31vw] w-[2.31vw] rounded-full" />
      )}
      <div className={'ml-[0.93vw] flex flex-col gap-[0.46vw]'}>
        {user?.name ? (
          <span
            className={'font-roboto text-[0.93vw] font-medium text-[#F2F2F2] line-clamp-1'}
          >
            {user.name.split(' ')[0]}
          </span>
        ) : (
          <Skeleton className="h-[0.93vw] w-[5.21vw] rounded-full" />
        )}
        {user?.startTimestamp ? (
          <span className="font-roboto text-[0.69vw] text-[#9AA6B5]">
            Старт —{' '}
            <span className="font-roboto text-[0.69vw] text-[#F2F2F2]">
              {new Date(user?.startTimestamp).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              })}
            </span>
          </span>
        ) : (
          <Skeleton className="h-[0.69vw] w-[4.05vw] rounded-full" />
        )}
      </div>
      <div className="ml-auto">
        {user?.subscriptionType != undefined ? (
          <SubscriptionLabel type={user.subscriptionType} />
        ) : (
          <Skeleton className="h-[1.39vw] w-[3.88vw] rounded-full" />
        )}
      </div>
    </div>
  );
}
