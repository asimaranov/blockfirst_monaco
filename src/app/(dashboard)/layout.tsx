import Sidebar from '~/app/components/Sidebar/Sidebar';

export default function AuthPageBase({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex max-h-screen flex-col sm:flex-row bg-background">
      <Sidebar />
      <div className="w-full bg-dark-bg px-0 sm:px-8 overflow-scroll" id='content-view'>{children}</div>
    </div>
  );
}
