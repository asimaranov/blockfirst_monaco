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
    <div className="relative flex min-h-screen flex-row overflow-hidden bg-background">
      <Sidebar curentPage={pathname.split('/').pop() ?? ''} />

      {children}
    </div>
  );
}
