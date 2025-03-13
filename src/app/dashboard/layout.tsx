import Sidebar from '~/app/components/Sidebar/Sidebar';

export default function AuthPageBase({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-dvh flex-row bg-background">
      <Sidebar />
      <div className="w-full bg-[#0F1217] px-[3.704vw]">{children}</div>
    </div>
  );
}
