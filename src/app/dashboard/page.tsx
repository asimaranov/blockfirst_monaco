'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '~/server/auth/client';

export default function DashboardPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session.data && !session.isPending) {
      router.push('/signin');
    }
  }, [session]);
  
  return (
    <main className={'h-screen w-full'}>
      <div>Dashboard</div>
    </main>
  );
}
