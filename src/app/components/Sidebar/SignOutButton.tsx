'use client';
import Image from 'next/image';
import logoutImg from './assets/logout.svg';
import logoutHoverImg from './assets/logout-hover.svg';
import { authClient } from '~/server/auth/client';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();

  return (
    <div
      className={
        'group cursor-pointer rounded-full border border-[#282D33] py-[0.58vw] pr-[0.52vw] pl-[0.64vw] hover:border-transparent hover:bg-[#F2F2F2]'
      }
      onClick={async () => {
        try {
          await authClient.signOut();
        } catch (error) {
          console.error('Sign out error', error);
        } finally {
          router.push('/signin');
        }
      }}
    >
      <Image
        src={logoutImg}
        alt="logout"
        className="h-4 w-4 group-hover:hidden group-data-[active=true]:hidden"
        loading='eager'
      />
      <Image
        src={logoutHoverImg}
        alt="logout"
        className="hidden h-4 w-4 group-hover:block group-data-[active=true]:block"
      />
    </div>
  );
}
