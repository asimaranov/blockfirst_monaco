import Dashboard from '../components/Dashboard';
import { getServerSession } from '~/server/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/signin');
  }

  return <Dashboard session={session} />;
}
