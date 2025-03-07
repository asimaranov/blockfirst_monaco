import { SubscriptionType } from '~/app/lib/types/IUser';

export function SubscriptionLabel({ type }: { type: SubscriptionType }) {
  if (type == SubscriptionType.Premium) {
    return (
      <div className="flex h-[24px] w-[67px] flex-row items-center justify-center gap-[5px] rounded-full border border-[#282D33] p-[5px]">
        {/* <Image src={PremiumSvg} alt="Free" /> */}
        <span className="font-roboto text-[12px] uppercase text-[#F2F2F2]">
          Free
        </span>
      </div>
    );
  } else
    return (
      <div className="flex h-[24px] w-[67px] flex-row items-center justify-center gap-[5px] rounded-full border border-[#282D33] p-[5px]">
        {/* <Image src={FreeSvg} alt="Free" /> */}
        <span className="font-roboto text-[12px] uppercase text-[#F2F2F2]">
          Free
        </span>
      </div>
    );
}
