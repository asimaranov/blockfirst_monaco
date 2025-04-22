// 'use server';
import { getServerSession } from '~/server/auth';
import { api } from '~/trpc/react';
import { Skeleton } from '../shared/Skeleton';
import { authClient } from '~/server/auth/client';
import PlateEditor from './PlateEditor';

export function UserAvatar() {
  const session = authClient.useSession();

  const user = {
    name: session?.data?.user?.name ?? '',
    startTimestamp: Date.now(),
    createdAt: new Date().toISOString(),
  };

  return (
    <div className={'flex flex-row pr-5'}>
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
      <div className="flex flex-col"></div>
    </div>
  );
}
