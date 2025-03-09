'use client'
import { useSession } from "~/app/lib/auth-client";

export default function DashboardPage() {
  const { data: session } = useSession();
  console.log(session)
  
  return (
    <main className={'h-screen w-full'}>
      <div>Dashboard</div>
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </main>
  );
}
