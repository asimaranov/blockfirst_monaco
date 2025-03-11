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
import { IUser, SubscriptionType } from '~/app/lib/types/IUser';
import { signOut, useSession } from '~/server/auth/client';
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

export default function Sidebar({ curentPage }: { curentPage: string }) {
  const session = useSession();

  const user: IUser = {
    name: session.data?.user?.name ?? '',
    startTimestamp: Date.now(),
    createdAt: new Date().toISOString(),
    subscriptionType: SubscriptionType.Base,
  };

  return (
    <section className="relative z-10 flex w-full max-w-[344px] flex-col outline outline-[1px] outline-accent">
      <nav className={'flex w-full flex-col'}>
        <div className="mx-[32px] mt-[34px] flex flex-row items-center justify-between">
          <Link href="/dashboard" className="hover:opacity-80">
            <Image src={LogoSvg} alt="logo" />
          </Link>
          <div
            className={
              'group cursor-pointer rounded-full border border-[#282D33] py-[10px] pl-[11px] pr-[9px] hover:border-transparent hover:bg-[#F2F2F2]'
            }
            onClick={() => signOut()}
          >
            <Image
              src={logoutImg}
              alt="logout"
              className="group-hover:hidden group-data-[active=true]:hidden"
            />
            <Image
              src={logoutHoverImg}
              alt="logout"
              className="hidden group-hover:block group-data-[active=true]:block"
            />
          </div>
        </div>
        <MenuItem title="Основное">
          <MenuLink
            title="Мои Курсы"
            href="/dashboard"
            isCurrentPage={curentPage === 'dashboard'}
          >
            <Image
              src={courseImg}
              alt="course"
              className="group-hover:hidden group-data-[active=true]:hidden"
            />
            <Image
              src={courseHoverImg}
              alt="course"
              className="hidden group-hover:inline-block group-data-[active=true]:block"
            />
          </MenuLink>
          <MenuLink
            title="Тариф"
            href="/pricing"
            isCurrentPage={curentPage === 'pricing'}
          >
            <Image
              src={tariffImg}
              alt="tariff"
              className="group-hover:hidden group-data-[active=true]:hidden"
            />
            <Image
              src={tariffHoverImg}
              alt="tariff"
              className="hidden group-hover:inline-block group-data-[active=true]:block"
            />
          </MenuLink>
          <MenuLink
            title="Диплом"
            href="/diploma"
            isCurrentPage={curentPage === 'diploma'}
          >
            <Image
              src={certImg}
              alt="cert"
              className="group-hover:hidden group-data-[active=true]:hidden"
            />
            <Image
              src={certHoverImg}
              alt="cert"
              className="hidden group-hover:inline-block group-data-[active=true]:block"
            />
          </MenuLink>
        </MenuItem>
        <MenuItem
          title="Персонально"
          isPro={user.subscriptionType !== SubscriptionType.Pro}
        >
          <MenuLink
            title="Твой куратор"
            href="#"
            locked={user.subscriptionType !== SubscriptionType.Pro}
            isCurrentPage={curentPage === 'not-implemented'}
          >
            <Image
              src={curatorImg}
              alt="curator"
              className="group-hover:hidden group-data-[active=true]:hidden"
            />
            <Image
              src={curatorHoverImg}
              alt="curator"
              className="hidden group-hover:inline-block group-data-[active=true]:block"
            />
          </MenuLink>
          <MenuLink
            title="Подготовка резюме"
            href="#"
            locked={user.subscriptionType !== SubscriptionType.Pro}
            isCurrentPage={curentPage === 'not-implemented'}
          >
            <Image
              src={cvImg}
              alt="cv"
              className="group-hover:hidden group-data-[active=true]:hidden"
            />
            <Image
              src={cvHoverImg}
              alt="cv"
              className="hidden group-hover:inline-block group-data-[active=true]:block"
            />
          </MenuLink>
          <MenuLink
            title="Трудоустройство"
            href="#"
            locked={user.subscriptionType !== SubscriptionType.Pro}
            isCurrentPage={curentPage === 'not-implemented'}
          >
            <Image
              src={jobImg}
              alt="job"
              className="group-hover:hidden group-data-[active=true]:hidden"
            />
            <Image
              src={jobHoverImg}
              alt="job"
              className="hidden group-hover:inline-block group-data-[active=true]:block"
            />
          </MenuLink>
        </MenuItem>
        <MenuItem title="Аккаунт">
          <MenuLink
            title="Реферальная программа"
            href="#"
            isCurrentPage={curentPage === 'not-implemented'}
          >
            <Image
              src={referralImg}
              alt="referral"
              className="group-hover:hidden group-data-[active=true]:hidden"
            />
            <Image
              src={referralHoverImg}
              alt="referral"
              className="hidden group-hover:inline-block group-data-[active=true]:block"
            />
          </MenuLink>
          <Link
            href={'#'}
            className={
              'group flex cursor-pointer flex-row items-center gap-[19px] border-b border-transparent px-[16px] py-[14px] hover:border-[#F2F2F2]'
            }
          >
            <Image
              src={notificationImg}
              alt="notification"
              className="group-hover:hidden group-data-[active=true]:hidden"
            />
            <Image
              src={notificationHoverImg}
              alt="notification"
              className="hidden group-hover:inline-block group-data-[active=true]:block"
            />
            <div
              className={'flex w-full flex-row items-center justify-between'}
            >
              <span
                className={
                  'font-roboto text-[16px] leading-[16px] text-[#9AA6B5] group-hover:text-[#F2F2F2]'
                }
              >
                Уведомления
              </span>
              <NotificationCounter count={3} />
            </div>
          </Link>
        </MenuItem>
      </nav>
      <div className={'mt-auto flex flex-col border-t border-[#282D33]'}>
        <Link
          href="#"
          className={'flex flex-row items-center px-[32px] py-[20px]'}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={
              user.subscriptionType !== SubscriptionType.Pro
                ? 'opacity-60'
                : undefined
            }
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
              'ml-[16px] mr-[32px] text-center font-roboto text-[13px] leading-[16px] text-[#9AA6B5]',
              user.subscriptionType !== SubscriptionType.Pro && 'opacity-60'
            )}
          >
            Закрытый клуб BlockFirst
          </span>
          {user.subscriptionType !== SubscriptionType.Pro && (
            <Image src={starterIMG} alt="Starter subscription" />
          )}
        </Link>
        <UserInfo user={user} />
        <Socials />
      </div>
    </section>
  );
}
