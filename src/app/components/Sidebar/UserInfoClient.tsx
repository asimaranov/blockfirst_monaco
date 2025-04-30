import { Skeleton } from '../shared/Skeleton';
import { IUser } from '~/app/lib/types/IUser';
import { SubscriptionLabel } from './assets/SubscriptionLabel';
import { api } from '~/trpc/react';
import { planTypeToSubscriptionType } from '~/app/lib/utils';
import { authClient } from '~/server/auth/client';

export function UserInfoClient() {
  const userData = api.userData.getUserData.useQuery(undefined, {
    throwOnError: false,
  });
  const session = authClient.useSession();

  if (!session.data ) {
    return null;
  }

  return (
    <div className={'flex flex-row border-t border-[#282D33] px-8 py-4.5 sticky bottom-0 mt-auto justify-between'}>
      {session?.data?.user?.name?.[0] ? (
        <div
          className={
            'flex h-5 w-5 flex-col items-center justify-center rounded-full bg-[#195AF4]'
          }
        >
          <span
            className={'font-roboto text-xxs text-[#F2F2F2] uppercase'}
          >
            {session?.data?.user?.name?.[0]}
          </span>
        </div>
      ) : (
        <Skeleton className="h-6 w-6 rounded-full" />
      )}
      <div className={'ml-3 flex flex-col gap-2'}>
        {session?.data?.user?.name ? (
          <span
            className={
              'font-roboto line-clamp-1 text-sm leading-5 font-medium text-[#F2F2F2]'
            }
          >
            {session?.data?.user?.name.split(' ')[0]}
          </span>
        ) : (
          <Skeleton className="h-6 w-22 rounded-full" />
        )}
        
      </div>
      <div className="ml-auto">
        {userData?.data?.plan != undefined ? (
          <SubscriptionLabel
            type={planTypeToSubscriptionType(userData.data?.plan || 'free')}
          />
        ) : (
          <Skeleton className="h-6 w-25 rounded-full" />
        )}
      </div>
    </div>
  );
}
