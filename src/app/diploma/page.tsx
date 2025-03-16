import DiplomaPage from '../components/DiplomaPage';
import { getServerSession } from '~/server/auth';
import { redirect } from 'next/navigation';

export default async function Pricing() {
  // const session = await getServerSession();

  // if (!session) {
  //   redirect('/signin');
  // }

  return <DiplomaPage session={{} as any} />;
}
