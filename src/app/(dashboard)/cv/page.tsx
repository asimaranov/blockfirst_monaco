import CVPage from '~/app/components/CVPage';
import { getServerSession } from '~/server/auth';
import { redirect } from 'next/navigation';

type Params = Promise<{ courseId: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function DashboardPage(props: { params: Params }) {
  const session = await getServerSession();
  const params = await props.params;
  if (!session) {
    redirect('/signin');
  }

  return <CVPage session={session} />;
}
