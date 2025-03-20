'use client';

import Image from 'next/image';
import LogoSvg from './assets/logo-dashboard.svg';
import logoutImg from './assets/logout.svg';
import logoutHoverImg from './assets/logout-hover.svg';
import Link from 'next/link';
import { MenuItem } from './MenuItem';
import { MenuLink } from './MenuLink';
import starterIMG from 'public/subscriptions/starter.svg';
import { UserInfo } from './UserInfo';
import { IUser } from '~/app/lib/types/IUser';
import { authClient } from '~/server/auth/client';
import { Socials } from './Socials';
import { cn } from '~/helpers';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SubscriptionType } from '~/app/lib/constants/subsctiptions';
import { NotificationsModal } from '../Notifications/NotificationsModal';
import LightningIcon from './assets/section_icons/lightning';
import TariffIcon from './assets/section_icons/tariff';
import CertIcon from './assets/section_icons/cert';
import MentorIcon from './assets/section_icons/mentor';
import CvIcon from './assets/section_icons/cv';
import JobIcon from './assets/section_icons/job';
import ReferralIcon from './assets/section_icons/referral';
import NotificationsIcon from './assets/section_icons/notifications';
interface SidebarSection {
  title: string;
  isPro: boolean;
  items: SidebarItem[];
}
interface SidebarItem {
  title: string;
  href: string;
  otherHref?: string;
  icon: () => JSX.Element;
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
        icon: LightningIcon,
        otherHref: '/course',
      },
      {
        title: 'Тариф',
        href: '/pricing',
        icon: TariffIcon,
      },
      {
        title: 'Диплом',
        href: '/diploma',
        icon: CertIcon,
      },
    ],
  },
  {
    title: 'Персонально',
    isPro: true,
    items: [
      {
        title: 'Твой куратор',
        href: '/mentor',
        icon: MentorIcon,

        locked: true,
      },
      {
        title: 'Подготовка резюме',
        href: '#',
        icon: CvIcon,
        locked: true,
      },
      {
        title: 'Трудоустройство',
        href: '/employment',
        icon: JobIcon,

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
        icon: ReferralIcon,

        locked: false,
      },
      {
        title: 'Уведомления',
        href: '#',
        icon: NotificationsIcon,

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
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const user: IUser = {
    name: session.data?.user?.name ?? '',
    startTimestamp: Date.now(),
    createdAt: new Date().toISOString(),
    subscriptionType: SubscriptionType.Starter,
  };

  // Handle notification click
  const handleNotificationClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // If it's the notifications menu item
    if (href === '#' && sidebarSections[2]?.items[1]?.title === 'Уведомления') {
      e.preventDefault();
      setIsNotificationsOpen(true);
    }
  };

  return (
    <>
      <section className="relative z-10 flex h-screen w-full max-w-86 flex-col">
        <nav className={'flex w-full flex-col'}>
          <div className="mx-8 mt-8 flex flex-row items-center justify-between">
            <Link href="/dashboard" className="hover:opacity-80">
              <Image src={LogoSvg} alt="logo" className="w-[9.664vw]" />
            </Link>
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
                  isCurrentPage={
                    pathname.startsWith(item.href) ||
                    (!!item.otherHref && pathname.startsWith(item.otherHref))
                  }
                  locked={item.locked}
                  notificationCount={item.notificationCount}
                  onClick={(e) => handleNotificationClick(e, item.href)}
                >
                  <div className="group-data-[active=true] h-4 w-4">
                    {typeof item.icon === 'function' ? (
                      <item.icon />
                    ) : (
                      <Image
                        src={item.icon}
                        alt={item.title}
                        className="h-4 w-4"
                      />
                    )}
                  </div>
                </MenuLink>
              ))}
            </MenuItem>
          ))}
        </nav>
        <div className={'mt-auto flex flex-col border-t border-[#282D33]'}>
          <Link href="#" className={'flex flex-row items-center px-8 py-5'}>
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
                'font-roboto text-secondary mr-8 ml-4 text-center text-[0.75vw] leading-4 text-nowrap',
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

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}
