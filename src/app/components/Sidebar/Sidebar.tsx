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
import { SidebarSection, SidebarSections } from './SidebarSection';
import { auth } from '~/server/auth';
import { headers } from 'next/headers';
import { planTypeToSubscriptionType } from '~/app/lib/utils';

export default async function Sidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Get unread notification count
  // const { data: unreadCount } = api.notifications.getUnreadCount.useQuery();
  const unreadCount = await api.notifications.getUnreadCount();
  const userData = await api.userData.getUserData();

  const user: IUser = {
    name: session?.user?.name ?? '',
    startTimestamp: Date.now(),
    createdAt: new Date().toISOString(),
    subscriptionType: planTypeToSubscriptionType(userData.plan),
  };

  const sidebarSections: SidebarSection[] = [
    {
      title: 'Основное',
      isPro: false,
      items: [
        {
          title: 'Мои Курсы',
          href: '/dashboard',
          icon: <LightningIcon />,
          otherHref: '/course',
        },
        {
          title: 'Тариф',
          href: '/pricing',
          icon: <TariffIcon />,
        },
        {
          title: 'Диплом',
          href: '/diploma',
          icon: <CertIcon />,
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
          icon: <MentorIcon />,

          locked: true,
        },
        {
          title: 'Подготовка резюме',
          href: '/cv',
          icon: <CvIcon />,
          locked: true,
        },
        {
          title: 'Трудоустройство',
          href: '/employment',
          icon: <JobIcon />,

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
          href: '/referral',
          icon: <ReferralIcon />,

          locked: false,
        },
        {
          title: 'Уведомления',
          href: '#',
          icon: <NotificationsIcon />,
          notificationCount: unreadCount || 0,
          locked: false,
          type: 'notifications',
        },
      ],
    },
  ];


  return (
    <>
      <section className="relative z-10 hidden h-screen w-full max-w-86 flex-col sm:flex">
        <nav className={'flex w-full flex-col'}>
          <div className="mx-8 mt-8 flex flex-row items-center justify-between">
            <Link href="/dashboard" className="hover:opacity-80">
              <Image src={LogoSvg} alt="logo" className="w-[9.664vw]" />
            </Link>
            <SignOutButton />
          </div>
          <SidebarSections sections={sidebarSections} />
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
                'h-4 w-4',
                'min-h-4 min-w-4',
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
                user.subscriptionType === SubscriptionType.Free && 'opacity-60'
              )}
            >
              Закрытый клуб BlockFirst
            </span>
            {user.subscriptionType === SubscriptionType.Free && (
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
    </>
  );
}
