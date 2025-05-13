'use server';

import { ReactNode, Suspense, useState } from 'react';
import { MenuItem } from './MenuItem';
import { MenuLink } from './MenuLink';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NotificationsModal } from '../Notifications/NotificationsModal';
import { useNotificationsModalStore } from '~/store/notificationsModal';
import { api } from '~/trpc/server';
import { getSidebarSectionsData } from './SidebarSectionsData';
import { authClient } from '~/server/auth/client';
import { auth } from '~/server/auth';
import { headers } from 'next/headers';

export interface SidebarSection {
  title: string;
  isPro: boolean;
  items: ISidebarItem[];
}

export interface ISidebarItem {
  title: string;
  href: string;
  otherHref?: string;
  icon: ReactNode;
  type?: 'notifications';
  locked?: boolean;
  notificationCount?: number;
}

async function SidebarSection({
  section,
}: {
  section: {
    title: string;
    isPro: boolean;
    items: ISidebarItem[];
  };
}) {
  // TODO: it fails if no auth
  const unreadCount = await api.notifications.getUnreadCount();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <MenuItem
      key={section.title}
      title={section.title}
      isPro={section.isPro && session?.user?.tariff !== 'pro'}
    >
      {section.items.map((item) => (
        <MenuLink
          key={item.title}
          type={item.type ?? 'default'}
          title={item.title}
          href={item.href}
          otherHref={item.otherHref}
          locked={item.locked && session?.user?.tariff !== 'pro'}
          notificationCount={
            item.type === 'notifications' ? unreadCount : item.notificationCount
          }
        >
          <div className="h-4 w-4">
            {/* Check if the icon is a react node */}
            {typeof item.icon === 'object' ? (
              item.icon
            ) : (
              <Image
                src={item.icon as any}
                alt={item.title}
                className="h-4 w-4"
              />
            )}
          </div>
        </MenuLink>
      ))}
    </MenuItem>
  );
}

async function SidebarSectionStatic({
  section,
}: {
  section: {
    title: string;
    isPro: boolean;
    items: ISidebarItem[];
  };
}) {
  return (
    <MenuItem key={section.title} title={section.title} isPro={false}>
      {section.items.map((item) => (
        <MenuLink
          key={item.title}
          type={item.type ?? 'default'}
          title={item.title}
          href={item.href}
          otherHref={item.otherHref}
          locked={item.locked}
          notificationCount={0}
        >
          <div className="h-4 w-4">
            {/* Check if the icon is a react node */}
            {typeof item.icon === 'object' ? (
              item.icon
            ) : (
              <Image
                src={item.icon as any}
                alt={item.title}
                className="h-4 w-4"
              />
            )}
          </div>
        </MenuLink>
      ))}
    </MenuItem>
  );
}

export async function SidebarSections() {
  const sections = getSidebarSectionsData({ unreadCount: 0 });

  return (
    <>
      {sections.map((section) => (
        <Suspense
          key={section.title}
          fallback={
            <SidebarSectionStatic key={section.title} section={section} />
          }
        >
          <SidebarSection key={section.title} section={section} />
        </Suspense>
      ))}
    </>
  );
}
