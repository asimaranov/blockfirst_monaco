import { SubscriptionType } from '~/app/lib/types/IUser';
import freeSubImg from 'public/subscriptions/bage/coin-free.svg';
import baseSubImg from 'public/subscriptions/bage/coin-base.svg';
import proSubImg from 'public/subscriptions/bage/coin-pro.svg';
import Image from 'next/image';

export function SubscriptionLabel({ type }: { type: SubscriptionType }) {
  if (type == SubscriptionType.Free) {
    return (
      <div className="flex h-[24px] w-[67px] flex-row items-center justify-center gap-[8px] rounded-full border border-[#282D33] py-[5px] pl-[5px] pr-[12px]">
        <Image src={freeSubImg} alt="Free" />
        <span className="font-roboto text-[12px] uppercase text-[#F2F2F2]">
          Free
        </span>
      </div>
    );
  } else if (type == SubscriptionType.Base) {
    return (
      <div className="flex h-[24px] w-[67px] flex-row items-center justify-center gap-[8px] rounded-full border border-[#282D33] py-[5px] pl-[5px] pr-[12px]">
        <Image src={baseSubImg} alt="Base" />
        <span className="font-roboto text-[12px] uppercase text-[#F2F2F2]">
          Base
        </span>
      </div>
    );
  } else if (type == SubscriptionType.Pro) {
    return (
      <div className="flex h-[24px] w-[67px] flex-row items-center justify-center gap-[8px] rounded-full border border-[#282D33] py-[5px] pl-[5px] pr-[12px]">
        <Image src={proSubImg} alt="Pro" />
        <span className="font-roboto text-[12px] uppercase text-[#F2F2F2]">
          Pro
        </span>
      </div>
    );
  }
}
