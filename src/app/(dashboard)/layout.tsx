import Sidebar from '~/app/components/Sidebar/Sidebar';
import MobileNavbar from '~/app/components/mobile/MobileNavbar';
import { api } from '~/trpc/server';
import { HydrateClient } from '~/trpc/server';
import { NotificationsModal } from '../components/Notifications/NotificationsModal';

export default async function AuthPageBase({
  children,
}: {
  children: React.ReactNode;
}) {
  // Prefetch notifications data
  // await api.notifications.getAll.prefetch();
  // await api.notifications.getUnreadCount.prefetch();
  // await api.notifications.getSettings.prefetch();

  return (
    <div className="bg-background relative flex max-h-screen flex-col sm:flex-row">
      <HydrateClient>
        <MobileNavbar />
        
        <Sidebar />
        <NotificationsModal />
        <div
          className="bg-dark-bg w-full overflow-visible px-0 sm:overflow-scroll sm:px-16"
          id="content-view"
        >
          {children}
        </div>
      </HydrateClient>
    </div>
  );
}
