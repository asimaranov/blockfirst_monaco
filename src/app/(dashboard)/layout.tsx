import Sidebar from '~/app/components/Sidebar/Sidebar';
import MobileNavbar from '~/app/components/mobile/MobileNavbar';
import { api } from '~/trpc/server';
import { HydrateClient } from '~/trpc/server';
import { NotificationsModal } from '../components/Notifications/NotificationsModal';
import { Suspense } from 'react';
import { cookies, headers } from 'next/headers';
import { auth } from '~/server/auth';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Prefetch notifications data
  // await api.notifications.getAll.prefetch();
  // await api.notifications.getUnreadCount.prefetch();
  // await api.userData.getUserData.prefetch();
  // await api.notifications.getSettings.prefetch();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // const session = await getServerSession();
  if (!session) {
    redirect('/signin');
  }

  return (
    <div className="bg-background relative flex max-h-screen flex-col sm:flex-row">
      <MobileNavbar />
      <Sidebar />
      <NotificationsModal />
      <Suspense>
        <div
          className="bg-dark-bg w-full overflow-visible px-0 sm:overflow-scroll sm:px-16"
          id="content-view"
        >
          {children}
        </div>
      </Suspense>
    </div>
  );
}
