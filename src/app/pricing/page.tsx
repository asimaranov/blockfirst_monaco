import PricingPage from '../components/PricingPage';
import { getServerSession } from '~/server/auth';
import { redirect } from 'next/navigation';

export default async function Pricing() {
  const session = await getServerSession();

  if (!session) {
    redirect('/signin');
  }

  return <PricingPage session={session} />;
}
