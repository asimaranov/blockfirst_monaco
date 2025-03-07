'use client';

import Sidebar from '~/app/components/Dashboard/Sidebar';

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
