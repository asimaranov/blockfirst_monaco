import { UserInfo } from './UserInfo';
import { Socials } from './Socials';
import { IUser } from '~/app/lib/types/IUser';
import { ClubLink } from './ClubLink';
import { auth, getServerSession } from '~/server/auth';
import { headers } from 'next/headers';
import { planTypeToSubscriptionType } from '~/app/lib/utils';
import { api } from '~/trpc/server';
import { redirect } from 'next/navigation';

interface SidebarFooterProps {
  user: IUser;
}

export async function SidebarFooter() {
  const session = await getServerSession();
  if (!session) {
    redirect('/signin');
  }

  const userData = await api.userData.getUserData();

  const user: IUser = {
    name: session?.user?.name ?? '',
    startTimestamp: Date.now(),
    createdAt: new Date().toISOString(),
    subscriptionType: planTypeToSubscriptionType(userData.plan),
  };

  // // Get sidebar sections data
  // const sidebarSections = getSidebarSectionsData({ unreadCount });

  return (
    <div className={'mt-auto flex flex-col border-t border-[#282D33]'}>
      <ClubLink subscriptionType={user.subscriptionType} />
      <UserInfo user={user} />
      <Socials />
    </div>
  );
}
