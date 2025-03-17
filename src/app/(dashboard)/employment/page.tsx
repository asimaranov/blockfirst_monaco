import EmploymentPage from '~/app/components/EmploymentPage';
import { getServerSession } from '~/server/auth';
import { redirect } from 'next/navigation';

export default async function Employment() {
  // const session = await getServerSession();

  // if (!session) {
  //   redirect('/signin');
  // }

  return <EmploymentPage session={{} as any} />;
}
