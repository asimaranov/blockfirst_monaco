import alumniAvatarsImg from 'public/misc/alumni-avatars.svg';
import Image from 'next/image';

export function AlumniCounter({ count }: { count: number }) {
  return (
    <div className="flex flex-row items-center gap-[4px] rounded-full bg-[#01050D] py-[4px] pl-[6px] pr-[12px]">
      <Image src={alumniAvatarsImg} alt="alumni" width={30} height={16} />
      <span className="font-roboto text-[12px] font-medium leading-[16px] text-[#F2F2F2]">
        {count}+
      </span>
    </div>
  );
}
