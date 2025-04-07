import alumniAvatarsImg from 'public/misc/alumni-avatars.png';
import Image from 'next/image';

export function AlumniCounter({ count }: { count: number }) {
  return (
    <div className="flex flex-row items-center gap-1 rounded-full bg-[#01050D] py-1 pl-1 pr-3">
      <Image src={alumniAvatarsImg} alt="alumni" className="h-4 w-7.5" />
      <span className="text-xs font-roboto font-medium leading-4 text-[#F2F2F2]">
        {count}+
      </span>
    </div>
  );
}
