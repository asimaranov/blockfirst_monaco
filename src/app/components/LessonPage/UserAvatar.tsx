// 'use server';
import { auth } from '~/server/auth';
import { Skeleton } from '../shared/Skeleton';
import { cn } from '~/helpers';
import { headers } from 'next/headers';

export async function UserAvatar({ className }: { className?: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
