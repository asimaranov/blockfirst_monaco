import {
  Topbar as UnifiedTopbar,
  LastUpdateInfo,
  TabNavigation,
  TabItem,
} from '~/app/components/shared/Topbar';

export function Topbar({
  lastestUpdate,
  items,
}: {
  lastestUpdate: string;
  items: TabItem[];
}) {
  return (
    <UnifiedTopbar
      leftContent={<TabNavigation items={items} />}
      rightContent={<LastUpdateInfo lastUpdate={lastestUpdate} />}
      showBorder={false}
      mobileNav={true}
    />
  );
}
