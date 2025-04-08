import Sidebar from '~/app/components/Sidebar/Sidebar';
import MobileNavbar from '~/app/components/mobile/MobileNavbar';
import { api } from '~/trpc/server';
import { HydrateClient } from '~/trpc/server';
import { NotificationsModal } from '../components/Notifications/NotificationsModal';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getServerSession } from '~/server/auth';

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
