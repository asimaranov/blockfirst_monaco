'use client';

import { ReactNode, useState } from 'react';
import { MenuItem } from './MenuItem';
import { MenuLink } from './MenuLink';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NotificationsModal } from '../Notifications/NotificationsModal';
import { useNotificationsModalStore } from '~/store/notificationsModal';

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

function SidebarSection({
  section,
  notificationsState,
}: {
  section: {
    title: string;
    isPro: boolean;
    items: ISidebarItem[];
  };
  notificationsState: {
    setIsNotificationsOpen: (isOpen: boolean) => void;
  };
}) {
  const pathname = usePathname();

  return (
    <MenuItem key={section.title} title={section.title} isPro={section.isPro}>
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
          onClick={() => {
            if (item.type === 'notifications') {
              notificationsState.setIsNotificationsOpen(true);
            }
          }}
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

export function SidebarSections({ sections }: { sections: SidebarSection[] }) {
  const { toggle } = useNotificationsModalStore();

  return (
    <>
      {sections.map((section) => (
        <SidebarSection
          key={section.title}
          section={section}
          notificationsState={{
            setIsNotificationsOpen: (isOpen: boolean) => toggle('desktop'),
          }}
        />
      ))}
      <NotificationsModal />
    </>
  );
}
