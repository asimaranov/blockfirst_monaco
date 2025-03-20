import { cn } from '~/helpers';
import { Skeleton } from '../shared/Skeleton';
import { IUser } from '~/app/lib/types/IUser';
import { SubscriptionLabel } from './assets/SubscriptionLabel';

export function UserInfo({ user }: { user?: IUser }) {
  return (
    <div className={'flex flex-row border-t border-[#282D33] px-8 py-5'}>
      {user?.name?.[0] ? (
        <div
          className={
            'my-auto flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#195AF4]'
          }
        >
          <span
            className={'font-roboto text-[0.87vw] uppercase text-[#F2F2F2]'}
          >
            {user.name[0]}
          </span>
        </div>
      ) : (
        <Skeleton className="my-auto h-10 w-10 rounded-full" />
      )}
      <div className={'ml-4 flex flex-col gap-2'}>
        {user?.name ? (
          <span
            className={
              'text-base line-clamp-1 font-roboto font-medium text-[#F2F2F2]'
            }
          >
            {user.name.split(' ')[0]}
          </span>
        ) : (
          <Skeleton className="h-5 w-[5.21vw] rounded-full" />
        )}
        {user?.startTimestamp ? (
          <span className="text-xs font-roboto text-[#9AA6B5]">
            Старт —{' '}
            <span className="text-xs font-roboto text-[#F2F2F2]">
              {new Date(user?.startTimestamp).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              })}
            </span>
          </span>
        ) : (
          <Skeleton className="h-3 w-[4.05vw] rounded-full" />
        )}
      </div>
      <div className="ml-auto">
        {user?.subscriptionType != undefined ? (
          <SubscriptionLabel type={user.subscriptionType} />
        ) : (
          <Skeleton className="w-34 h-6 rounded-full" />
        )}
      </div>
    </div>
  );
}
