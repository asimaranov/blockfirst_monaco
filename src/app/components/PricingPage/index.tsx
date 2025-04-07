import { Topbar } from './Topbar';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import { TARIFFS } from '~/app/lib/constants/tariff';
import TariffCard from './TariffCard';
import { api } from '~/trpc/server';
import { planTypeToSubscriptionType } from '~/app/lib/utils';

export default async function PricingPage({ session }: { session: Session }) {
  const userData = await api.userData.getUserData();
  const userPlan = planTypeToSubscriptionType(userData.plan);
  const userTariff = TARIFFS.find(x => x.name == userPlan);

  const tariffs = TARIFFS.map((x) =>
    x.name == userPlan
      ? { ...x, isActive: true, unlocked: (userTariff?.price?.total || 0) >= (x?.price?.total || 0) }
      : { ...x, isActive: false, unlocked: (userTariff?.price?.total || 0) >= (x?.price?.total || 0) }
  );

  console.log(tariffs);

  return (
    <main className="border-accent border-r-0 border-l-0 sm:border-r sm:border-l">
      <div className="flex h-auto w-full flex-col sm:h-screen">
        <Topbar />
        <div className="grid w-full grow grid-cols-1 gap-10 divide-x-0 divide-[#282D33] sm:grid-cols-3 sm:gap-0 sm:divide-x">
          {tariffs.map((tariff, index) => (
            <TariffCard key={index} tariff={tariff} />
          ))}
        </div>
      </div>
      <Footer className="border-accent border-t sm:border-t-0" />
    </main>
  );
}
