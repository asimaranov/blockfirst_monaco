'use client';

import Image from 'next/image';
import LogoSvg from './assets/logo-dashboard.svg';
import logoutImg from './assets/logout.svg';
import logoutHoverImg from './assets/logout-hover.svg';
import Link from 'next/link';
import { NotificationCounter } from '../shared/NotificationCounter';
import { MenuItem } from './MenuItem';
import { MenuLink } from './MenuLink';
import starterIMG from 'public/subscriptions/starter.svg';
import { UserInfo } from './UserInfo';
import { IUser } from '~/app/lib/types/IUser';
import { authClient } from '~/server/auth/client';
import { Socials } from './Socials';
import courseImg from './assets/links/course.svg';
import courseHoverImg from './assets/links/course-hover.svg';
import tariffImg from './assets/links/tariff.svg';
import tariffHoverImg from './assets/links/tariff-hover.svg';
import certImg from './assets/links/cert.svg';
import certHoverImg from './assets/links/cert-hover.svg';
import curatorImg from './assets/links/curator.svg';
import curatorHoverImg from './assets/links/curator-hover.svg';
import cvImg from './assets/links/cv.svg';
import cvHoverImg from './assets/links/cv-hover.svg';
import jobImg from './assets/links/job.svg';
import jobHoverImg from './assets/links/job-hover.svg';
import referralImg from './assets/links/referral.svg';
import referralHoverImg from './assets/links/referral-hover.svg';
import notificationImg from './assets/links/notification.svg';
import notificationHoverImg from './assets/links/notification-hover.svg';
import { cn } from '~/helpers';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SubscriptionType } from '~/app/lib/constants/subsctiptions';

interface SidebarSection {
  title: string;
  isPro: boolean;
  items: SidebarItem[];
}
interface SidebarItem {
  title: string;
  href: string;
  icon: string;
  iconHover: string;
  locked?: boolean;
  notificationCount?: number;
}

const sidebarSections: SidebarSection[] = [
  {
    title: 'Основное',
    isPro: false,
    items: [
      {
        title: 'Мои Курсы',
        href: '/dashboard',
        icon: courseImg,
        iconHover: courseHoverImg,
      },
      {
        title: 'Тариф',
        href: '/pricing',
        icon: tariffImg,
        iconHover: tariffHoverImg,
      },
      {
        title: 'Диплом',
        href: '/diploma',
        icon: certImg,
        iconHover: certHoverImg,
      },
    ],
  },
  {
    title: 'Персонально',
    isPro: true,
    items: [
      {
        title: 'Твой куратор',
        href: '#',
        icon: curatorImg,
        iconHover: curatorHoverImg,
        locked: true,
      },
      {
        title: 'Подготовка резюме',
        href: '#',
        icon: cvImg,
        iconHover: cvHoverImg,
        locked: true,
      },
      {
        title: 'Трудоустройство',
        href: '#',
        icon: jobImg,
        iconHover: jobHoverImg,
        locked: true,
      },
    ],
  },
  {
    title: 'Аккаунт',
    isPro: false,
    items: [
      {
        title: 'Реферальная программа',
        href: '#',
        icon: referralImg,
        iconHover: referralHoverImg,
        locked: false,
      },
      {
        title: 'Уведомления',
        href: '#',
        icon: notificationImg,
        iconHover: notificationHoverImg,
        notificationCount: 3,
        locked: false,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const session = authClient.useSession();
  useEffect(() => {
    // Issue https://github.com/better-auth/better-auth/issues/1006
    session.refetch();
  }, []);

  const user: IUser = {
    name: session.data?.user?.name ?? '',
    startTimestamp: Date.now(),
    createdAt: new Date().toISOString(),
    subscriptionType: SubscriptionType.Starter,
  };

  return (
    <section className="z-10 flex h-screen w-full max-w-86 flex-col">
      <nav className={'flex w-full flex-col'}>
        <div className="mx-8 mt-[1.97vw] flex flex-row items-center justify-between">
          <Link href="/dashboard" className="hover:opacity-80">
            <Image src={LogoSvg} alt="logo" className="w-[9.664vw]" />
          </Link>
          <div
            className={
              'group cursor-pointer rounded-full border border-[#282D33] py-[0.58vw] pl-[0.64vw] pr-[0.52vw] hover:border-transparent hover:bg-[#F2F2F2]'
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
            />
            <Image
              src={logoutHoverImg}
              alt="logout"
              className="hidden h-4 w-4 group-hover:block group-data-[active=true]:block"
            />
          </div>
        </div>
        {sidebarSections.map((section) => (
          <MenuItem
            key={section.title}
            title={section.title}
            isPro={section.isPro}
          >
            {section.items.map((item) => (
              <MenuLink
                key={item.title}
                title={item.title}
                href={item.href}
                isCurrentPage={pathname === item.href}
                locked={item.locked}
                notificationCount={item.notificationCount}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="h-4 w-4 group-hover:hidden group-data-[active=true]:hidden"
                />
                <Image
                  src={item.iconHover}
                  alt={item.title}
                  className="hidden h-4 w-4 group-hover:inline-block group-data-[active=true]:block"
                />
              </MenuLink>
            ))}
          </MenuItem>
        ))}
      </nav>
      <div className={'mt-auto flex flex-col border-t border-[#282D33]'}>
        <Link href="#" className={'flex flex-row items-center px-8 py-6'}>
          <svg
            width="0.93vw"
            height="0.93vw"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              'min-h-[16px] min-w-[16px]',
              user.subscriptionType !== SubscriptionType.Pro
                ? 'opacity-60'
                : undefined
            )}
          >
            <g clipPath="url(#clip0_650_6475)">
              <rect width="16" height="16" rx="3.2" fill="#9AA6B5" />
              <path
                d="M9.82826 9.41391L12.15 7.93374V6.10949L7.09367 9.49735L12.15 12.8149V11.0384L9.82889 9.58295L9.6949 9.49893L9.82826 9.41391Z"
                fill="#01050D"
                stroke="#01050D"
                strokeWidth="0.2"
              />
              <path
                d="M6.17174 6.49179L3.85 5.01162V3.18737L8.90633 6.57523L3.85 9.89274V8.11632L6.17111 6.66083L6.3051 6.57681L6.17174 6.49179Z"
                fill="#01050D"
                stroke="#01050D"
                strokeWidth="0.2"
              />
            </g>
            <defs>
              <clipPath id="clip0_650_6475">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span
            className={cn(
              'ml-4 mr-8 text-nowrap text-center font-roboto text-[0.75vw] leading-4 text-secondary',
              user.subscriptionType !== SubscriptionType.Pro && 'opacity-60'
            )}
          >
            Закрытый клуб BlockFirst
          </span>
          {user.subscriptionType !== SubscriptionType.Pro && (
            <Image
              src={starterIMG}
              alt="Starter subscription"
              className="h-[1.157vw] w-[3.414vw]"
            />
          )}
        </Link>
        <UserInfo user={user} />
        <Socials />
      </div>
    </section>
  );
}
