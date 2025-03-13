import { SubscriptionType } from '~/app/lib/types/IUser';
import freeSubImg from 'public/subscriptions/bage/coin-free.svg';
import starterSubImg from 'public/subscriptions/bage/coin-base.svg';
import proSubImg from 'public/subscriptions/bage/coin-pro.svg';
import Image from 'next/image';

export function SubscriptionLabel({ type }: { type: SubscriptionType }) {
  if (type == SubscriptionType.Free) {
    return (
      <div className="flex h-[1.389vw] w-[3.877vw] flex-row items-center justify-center gap-[0.463vw] rounded-full border border-[#282D33] py-[0.289vw] pl-[0.289vw] pr-[0.694vw]">
        <Image src={freeSubImg} alt="Free" className="h-[0.81vw] w-[0.81vw]" />
        <span className="font-roboto text-[0.694vw] uppercase text-[#F2F2F2]">
          Free
        </span>
      </div>
    );
  } else if (type == SubscriptionType.Starter) {
    return (
      <div className="flex h-[1.389vw] w-[3.877vw] flex-row items-center justify-center gap-[0.463vw] rounded-full border border-[#282D33] py-[0.289vw] pl-[0.289vw] pr-[0.694vw]">
        <Image src={starterSubImg} alt="Base" className="h-[0.81vw] w-[0.81vw]" />
        <span className="font-roboto text-[0.694vw] uppercase text-[#F2F2F2]">
          Starter
        </span>
      </div>
    );
  } else if (type == SubscriptionType.Pro) {
    return (
      <div className="flex h-[1.389vw] w-[3.877vw] flex-row items-center justify-center gap-[0.463vw] rounded-full border border-[#282D33] py-[0.289vw] pl-[0.289vw] pr-[0.694vw]">
        <Image src={proSubImg} alt="Pro" className="h-[0.81vw] w-[0.81vw]" />
        <span className="font-roboto text-[0.694vw] uppercase text-[#F2F2F2]">
          Pro
        </span>
      </div>
    );
  }
}
