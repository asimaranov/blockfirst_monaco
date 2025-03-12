import alumniAvatarsImg from 'public/misc/alumni-avatars.svg';
import Image from 'next/image';

export function AlumniCounter({ count }: { count: number }) {
  return (
    <div className="flex flex-row items-center gap-[0.231vw] rounded-full bg-[#01050D] py-[0.231vw] pl-[0.347vw] pr-[0.694vw]">
      <Image
        src={alumniAvatarsImg}
        alt="alumni"
        className="h-[0.926vw] w-[1.736vw]"
      />
      <span className="font-roboto text-[0.694vw] font-medium leading-[0.926vw] text-[#F2F2F2]">
        {count}+
      </span>
    </div>
  );
}
