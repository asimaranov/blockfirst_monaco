import {
  Topbar as UnifiedTopbar,
  LastUpdateInfo,
} from '~/app/components/shared/Topbar';
import Link from 'next/link';
export function Topbar({ lastestUpdate }: { lastestUpdate: string }) {
  return (
    <UnifiedTopbar
      mobilePremiumText="Кураторы BlockFirst"
      leftContent={
        <div className="flex flex-row items-center justify-center text-xl">
          Кураторы BlockFirst
        </div>
      }
      rightContent={<LastUpdateInfo lastUpdate={lastestUpdate} />}
      className='hidden sm:flex'
    />
  );
}
