import { Topbar } from './Topbar';
import { auth } from '~/server/auth';
import Footer from '~/app/components/Footer';
import { TARIFFS, UpgradeTariff } from '~/app/lib/constants/tariff';
import TariffCard from './TariffCard';
import { api } from '~/trpc/server';
import { planTypeToSubscriptionType } from '~/app/lib/utils';
import { cookies, headers } from 'next/headers';

export default async function PricingPage() {
  const userData = await api.userData.getUserData();
  const userPlan = planTypeToSubscriptionType(userData.plan);
  const userTariff = TARIFFS.find((x) => x.name == userPlan);

  // Check for referral cookies and apply them if present
  const cookieStore = await cookies();
  const referralCode = cookieStore.get('referral_code')?.value;
  const referrerId = cookieStore.get('referrer_id')?.value;

  // Get current user session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If user is authenticated and referral cookies exist, apply the referral
  if (session?.user && referralCode && referrerId) {
    try {
      // Check if user already has a referral by trying to apply it
      // The API will handle the duplicate check internally
      await api.referrals.applyReferralCode({
        code: referralCode,
        userId: session.user.id,
        name: session.user.name || 'User',
        avatar: session.user.image || '',
      });

      console.log(
        `Applied referral code ${referralCode} for user ${session.user.id}`
      );

      // // Remove the cookies after processing
      // cookieStore.delete('referral_code');
      // cookieStore.delete('referrer_id');
    } catch (error) {
      console.error('Error applying referral:', error);
      // Remove cookies even if there was an error
      // cookieStore.delete('referral_code');
      // cookieStore.delete('referrer_id');
    }
  }

  const tariffs = TARIFFS.map((x) =>
    x.name == userPlan
      ? {
          ...x,
          isActive: true,
          unlocked: (userTariff?.price?.total || 0) >= (x?.price?.total || 0),
        }
      : x.name == 'Pro' && userTariff?.name == 'Starter'
        ? {
            ...UpgradeTariff,
            isActive: false,
            unlocked: (userTariff?.price?.total || 0) >= (x?.price?.total || 0),
          }
        : {
            ...x,
            isActive: false,
            unlocked: (userTariff?.price?.total || 0) >= (x?.price?.total || 0),
          }
  );

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
