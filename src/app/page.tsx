import { getServerSession } from '~/server/auth';
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession();

  if (session?.user) {
    redirect('/dashboard');
  } else {
    redirect('/signin');
  }
}