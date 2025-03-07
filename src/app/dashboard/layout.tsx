'use client';

import Sidebar from '~/app/components/Sidebar/Sidebar';

export default function AuthPageBase({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-row overflow-hidden bg-background">
      <Sidebar />

      {children}
    </div>
  );
}
