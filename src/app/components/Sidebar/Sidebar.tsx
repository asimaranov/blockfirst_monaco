import Image from 'next/image';
import LogoSvg from './assets/logo-dashboard.svg';
import Link from 'next/link';
import starterIMG from 'public/subscriptions/starter.svg';
import { UserInfo } from './UserInfo';
import { IUser } from '~/app/lib/types/IUser';
import { Socials } from './Socials';
import { cn } from '~/helpers';
import { SubscriptionType } from '~/app/lib/constants/subsctiptions';
import LightningIcon from './assets/section_icons/lightning';
import TariffIcon from './assets/section_icons/tariff';
import CertIcon from './assets/section_icons/cert';
import MentorIcon from './assets/section_icons/mentor';
import CvIcon from './assets/section_icons/cv';
import JobIcon from './assets/section_icons/job';
import ReferralIcon from './assets/section_icons/referral';
import NotificationsIcon from './assets/section_icons/notifications';
import { api } from '~/trpc/server';
import SignOutButton from './SignOutButton';
import { ISidebarSection, SidebarSections } from './SidebarSection';
import { auth } from '~/server/auth';
import { headers } from 'next/headers';
import { planTypeToSubscriptionType } from '~/app/lib/utils';
import { SidebarHeader } from './SidebarHeader';
import { SidebarFooter } from './SidebarFooter';
import { getSidebarSectionsData } from './SidebarSectionsData';
import { Suspense } from 'react';

export default async function Sidebar() {
  return (
    <>
      <section className="relative z-10 hidden h-screen w-full max-w-86 flex-col sm:flex">
        <nav className={'flex w-full flex-col'}>
          <SidebarHeader />
          <Suspense>
            <SidebarSections />
          </Suspense>
        </nav>
        <Suspense>
          <SidebarFooter />
        </Suspense>
      </section>
    </>
  );
}
