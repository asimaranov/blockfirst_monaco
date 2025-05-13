import { UserInfo } from './UserInfo';
import { Socials } from './Socials';
import { IUser } from '~/app/lib/types/IUser';
import { ClubLink } from './ClubLink';
import { auth } from '~/server/auth';
import { headers } from 'next/headers';
import { planTypeToSubscriptionType } from '~/app/lib/utils';
import { api } from '~/trpc/server';
import { redirect } from 'next/navigation';


export async function SidebarFooter() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/signin');
  }

  const user: IUser = {
    name: session?.user?.name ?? '',
    startTimestamp: new Date('2025-04-25').getTime(),
    createdAt: new Date('2025-04-25').toISOString(),
    tariff: planTypeToSubscriptionType(session?.user?.tariff ?? 'free'),
    subscriptionType: planTypeToSubscriptionType(session?.user?.tariff ?? 'free'),
  };


  return (
    <div className={'mt-auto flex flex-col border-t border-[#282D33]'}>
      <ClubLink subscriptionType={user.subscriptionType} />
      <UserInfo user={user} />
      <Socials />
    </div>
  );
}
