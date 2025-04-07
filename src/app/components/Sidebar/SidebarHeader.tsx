'use client';

import Image from 'next/image';
import Link from 'next/link';
import LogoSvg from './assets/logo-dashboard.svg';
import SignOutButton from './SignOutButton';

export function SidebarHeader() {
  return (
    <div className="mx-8 mt-8 flex flex-row items-center justify-between">
      <Link href="/dashboard" className="hover:opacity-80">
        <Image src={LogoSvg} alt="logo" className="w-[9.664vw]" />
      </Link>
      <SignOutButton />
    </div>
  );
}
