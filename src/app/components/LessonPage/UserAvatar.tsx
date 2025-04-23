// 'use server';
import { getServerSession } from '~/server/auth';
import { api } from '~/trpc/react';
import { Skeleton } from '../shared/Skeleton';
import { authClient } from '~/server/auth/client';
import PlateEditor from './PlateEditor';
import { cn } from '~/helpers';

export async function UserAvatar({ className }: { className?: string }) {
  const session = await getServerSession();

  const user = {
    name: session?.user?.name ?? '',
  };

  return (
    <>
      {user?.name?.[0] ? (
        <div
          className={cn(
            'flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#195AF4]',
            className
          )}
        >
          <span
            className={'font-roboto text-sm leading-5 text-[#F2F2F2] uppercase'}
          >
            {user.name[0]}
          </span>
        </div>
      ) : (
        <div>
          <Skeleton className="my-auto h-10 w-10 rounded-full" />
        </div>
      )}
    </>
  );
}
