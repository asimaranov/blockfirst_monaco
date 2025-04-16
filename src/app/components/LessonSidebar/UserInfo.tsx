import { Skeleton } from '../shared/Skeleton';
import { IUser } from '~/app/lib/types/IUser';
import { SubscriptionLabel } from './assets/SubscriptionLabel';
import { api } from '~/trpc/server';
import { planTypeToSubscriptionType } from '~/app/lib/utils';

export async function UserInfo({ user }: { user?: IUser }) {
  const userData = await api.userData.getUserData();

  return (
    <div className={'flex flex-row border-t border-[#282D33] px-8 py-5'}>
      {user?.name?.[0] ? (
        <div
          className={
            'my-auto flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#195AF4]'
          }
        >
          <span
            className={'font-roboto text-[0.87vw] text-[#F2F2F2] uppercase'}
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
              'font-roboto line-clamp-1 text-base font-medium text-[#F2F2F2]'
            }
          >
            {user.name.split(' ')[0]}
          </span>
        ) : (
          <Skeleton className="h-5 w-[5.21vw] rounded-full" />
        )}
        {user?.startTimestamp ? (
          <span className="font-roboto text-xs text-[#9AA6B5]">
            Старт —{' '}
            <span className="font-roboto text-xs text-[#F2F2F2]">
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
          <SubscriptionLabel
            type={planTypeToSubscriptionType(userData?.plan || 'free')}
          />
        ) : (
          <Skeleton className="h-6 w-34 rounded-full" />
        )}
      </div>
    </div>
  );
}
