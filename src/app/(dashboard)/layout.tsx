import Sidebar from '~/app/components/Sidebar/Sidebar';
import MobileNavbar from '~/app/components/mobile/MobileNavbar';
export default function AuthPageBase({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background relative flex max-h-screen flex-col sm:flex-row">
      <MobileNavbar />
      <Sidebar />
      <div
        className="bg-dark-bg w-full px-0 sm:px-16 overflow-visible sm:overflow-scroll"
        id="content-view"
      >
        {children}
      </div>
    </div>
  );
}
