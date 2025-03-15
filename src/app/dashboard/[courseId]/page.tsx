import CoursePage from '../../components/CoursePage';
import { getServerSession } from '~/server/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage({ params }: { params: { courseId: string } }) {
  const session = await getServerSession();

  if (!session) {
    redirect('/signin');
  }

  return <CoursePage session={session} courseId={params.courseId} />;
}
