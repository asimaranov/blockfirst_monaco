'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '~/app/components/Sidebar/Sidebar';

export default function AuthPageBase({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="relative flex min-h-screen flex-row bg-background">
      <Sidebar curentPage={pathname.split('/').pop() ?? ''} />

      <div className="w-full bg-[#0F1217] px-[64px]">{children}</div>
    </div>
  );
}
