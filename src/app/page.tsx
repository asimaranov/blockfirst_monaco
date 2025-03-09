'use client'
import Link from 'next/link';
import { useEffect } from 'react';
import { useSession } from '~/server/auth/client';
import { api } from '~/trpc/react';
import Sidebar from './components/Sidebar/Sidebar';
import { useRouter } from 'next/navigation';

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.data?.user) {
      router.push('/dashboard');
    }
  }, [session.data?.user]);

  return (
    <div className="relative flex min-h-screen flex-row overflow-hidden bg-background">
      <Sidebar />
    </div>
  );
}