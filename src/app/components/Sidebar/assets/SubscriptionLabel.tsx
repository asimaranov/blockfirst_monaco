import Image from 'next/image';
import {
  SubscriptionType,
  subscriptionTypeIcons,
  subscriptionTypeLabels,
} from '~/app/lib/constants/subsctiptions';

export function SubscriptionLabel({ type }: { type: SubscriptionType }) {
  return (
    <div className="flex flex-row items-center justify-center gap-2 rounded-[5.79vw] border border-[#282D33] py-[0.17vw] font-[500]">
      <div className="ml-1.25 h-3.5 w-3.5">
        <Image src={subscriptionTypeIcons[type]} alt={subscriptionTypeLabels[type]} className="w-3.5 h-3.5" loading='eager' />
      </div>
      <span className="text-xs mr-3 font-roboto uppercase text-[#F2F2F2]">
        {subscriptionTypeLabels[type]}
      </span>
    </div>
  );
}
