import {
  Topbar as UnifiedTopbar,
  LastUpdateInfo,
} from '~/app/components/shared/Topbar';

export function Topbar({ lastestUpdate }: { lastestUpdate: string }) {
  return (
    <UnifiedTopbar
      leftContent={
        <div className="flex flex-row text-xl">Кураторы BlockFirst</div>
      }
      rightContent={<LastUpdateInfo lastUpdate={lastestUpdate} />}
    />
  );
}
