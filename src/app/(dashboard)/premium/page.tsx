import PremiumPage from '../../components/PremiumPage';
import { redirect } from 'next/navigation';

export default async function Pricing() {
  // const session = await getServerSession();

  // if (!session) {
  //   redirect('/signin');
  // }

  return <PremiumPage session={{} as any} />;
}
