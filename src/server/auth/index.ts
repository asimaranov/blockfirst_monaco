import { headers } from 'next/headers';
import { auth } from './config';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const getServerSession = async () => {
  try {
    return await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error(error);
    redirect('/signin');
    return null;
  }
};

export { auth };
export type SessionPromise = ReturnType<typeof auth.api.getSession>;
export type Session = NonNullable<Awaited<SessionPromise>>;
export type AuthUserType = Session['user'];
