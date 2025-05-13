import { auth } from '~/server/auth';
import { redirect } from 'next/navigation'
import { headers } from 'next/headers';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect('/dashboard');
  } else {
    redirect('/signin');
  }
}