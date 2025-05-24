import { ISidebarSection } from './SidebarSection';
import LightningIcon from './assets/section_icons/lightning';
import TariffIcon from './assets/section_icons/tariff';
import CertIcon from './assets/section_icons/cert';
import MentorIcon from './assets/section_icons/mentor';
import CvIcon from './assets/section_icons/cv';
import JobIcon from './assets/section_icons/job';
import ReferralIcon from './assets/section_icons/referral';
import NotificationsIcon from './assets/section_icons/notifications';

interface SidebarSectionsDataProps {
  unreadCount: number;
}

// This is a regular function, not a hook, so it can be used in server components
export function getSidebarSectionsData({
  unreadCount,
}: SidebarSectionsDataProps): ISidebarSection[] {
  const sidebarSections: ISidebarSection[] = [
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

  return sidebarSections;
}
