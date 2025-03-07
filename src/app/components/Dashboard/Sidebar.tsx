import Image from 'next/image';
import LogoSvg from './assets/logo-dashboard.svg';
import LogoutSvg from './assets/LogoutSvg';

export default function Sidebar() {
  return (
    <section className="relative z-10 flex w-full max-w-[344px] flex-col outline outline-[1px] outline-accent">
      <div className={'flex w-full flex-col'}>
        <div className="ml-[32px] mt-[34px] flex w-full flex-row">
          <Image src={LogoSvg} alt="logo" />
          <div
            className={
              'ml-[77px] flex flex-col items-center justify-center rounded-full border border-[#282D33] py-[10px] pl-[11px] pr-[9px]'
            }
          >
            <LogoutSvg />
          </div>
        </div>
        <div className={'ml-[16px] mt-[32px] flex flex-col'}>
          <span
            className={
              'ml-[16px] font-roboto text-[12px] uppercase leading-[20px] text-[#9AA6B5]'
            }
          >
            Основное
          </span>
        </div>
      </div>
    </section>
  );
}
