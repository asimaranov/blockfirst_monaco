import Image from 'next/image';
import LogoSvg from './assets/logo-dashboard.svg';
import LogoutSvg from './assets/LogoutSvg';
import Link from 'next/link';
import { NotificationCounter } from '../shared/NotificationCounter';
import { MenuItem } from './MenuItem';
import { MenuLink } from './MenuLink';
import PremiumSvg from 'public/premium.svg';
import { UserInfo } from './UserInfo';
import { IUser, SubscriptionType } from '~/app/lib/types/IUser';

export default function Sidebar() {
  const user: IUser = {
    name: 'Евгений',
    startTimestamp: Date.now(),
    createdAt: new Date().toISOString(),
    subscriptionType: SubscriptionType.Free,
  };

  return (
    <section className="relative z-10 flex w-full max-w-[344px] flex-col outline outline-[1px] outline-accent">
      <nav className={'flex w-full flex-col'}>
        <div className="mx-[32px] mt-[34px] flex flex-row items-center justify-between">
          <Image src={LogoSvg} alt="logo" />
          <div
            className={
              'rounded-full border border-[#282D33] py-[10px] pl-[11px] pr-[9px]'
            }
          >
            <LogoutSvg />
          </div>
        </div>
        <MenuItem title="Основное">
          <MenuLink title="Мои Курсы" href="#">
            <svg
              width="10"
              height="14"
              viewBox="0 0 10 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={'fill-[#9AA6B5] group-hover:fill-[#F2F2F2]'}
            >
              <path d="M8.93903 6.14668H6.87903V1.34668C6.87903 0.22668 6.27236 1.29938e-05 5.53236 0.840013L4.99903 1.44668L0.485698 6.58001C-0.134302 7.28001 0.125698 7.85335 1.05903 7.85335H3.11903V12.6533C3.11903 13.7733 3.7257 14 4.4657 13.16L4.99903 12.5533L9.51237 7.42001C10.1324 6.72001 9.87236 6.14668 8.93903 6.14668Z" />
            </svg>
          </MenuLink>
          <MenuLink title="Тариф" href="#">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.50911 10.6653H6.17578"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={'stroke-[#9AA6B5] group-hover:stroke-[#F2F2F2]'}
              />
              <path
                d="M8.44193 1.67868L8.42193 1.72534L6.48859 6.21201H4.58859C4.13526 6.21201 3.70193 6.30534 3.30859 6.47201L4.47526 3.68534L4.50193 3.61868L4.54859 3.51201C4.56193 3.47201 4.57526 3.43201 4.59526 3.39868C5.46859 1.37868 6.45526 0.918676 8.44193 1.67868Z"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={'stroke-[#9AA6B5] group-hover:stroke-[#F2F2F2]'}
              />
              <path
                d="M12.0349 6.34538C11.7349 6.25204 11.4149 6.21204 11.0949 6.21204H6.48828L8.42161 1.72538L8.44161 1.67871C8.54161 1.71204 8.63495 1.75871 8.73495 1.79871L10.2083 2.41871C11.0283 2.75871 11.6016 3.11204 11.9483 3.53871C12.0149 3.61871 12.0683 3.69204 12.1149 3.77871C12.1749 3.87204 12.2216 3.96538 12.2483 4.06538C12.2749 4.12538 12.2949 4.18538 12.3083 4.23871C12.4883 4.79871 12.3816 5.48538 12.0349 6.34538Z"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={'stroke-[#9AA6B5] group-hover:stroke-[#F2F2F2]'}
              />
              <path
                d="M14.3465 9.46549V10.7655C14.3465 10.8988 14.3398 11.0322 14.3332 11.1655C14.2065 13.4922 12.9065 14.6655 10.4398 14.6655H5.23984C5.07984 14.6655 4.91984 14.6522 4.76651 14.6322C2.64651 14.4922 1.51318 13.3588 1.37318 11.2388C1.35318 11.0855 1.33984 10.9255 1.33984 10.7655V9.46549C1.33984 8.12549 2.15318 6.97216 3.31318 6.47216C3.71318 6.30549 4.13984 6.21216 4.59318 6.21216H11.0998C11.4265 6.21216 11.7465 6.25883 12.0398 6.34549C13.3665 6.75216 14.3465 7.99216 14.3465 9.46549Z"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={'stroke-[#9AA6B5] group-hover:stroke-[#F2F2F2]'}
              />
              <path
                d="M4.47203 3.68555L3.30536 6.47221C2.14536 6.97221 1.33203 8.12555 1.33203 9.46555V7.51221C1.33203 5.61888 2.6787 4.03888 4.47203 3.68555Z"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={'stroke-[#9AA6B5] group-hover:stroke-[#F2F2F2]'}
              />
              <path
                d="M14.3457 7.51185V9.46519C14.3457 7.99852 13.3724 6.75185 12.0391 6.35185C12.3857 5.48519 12.4857 4.80519 12.3191 4.23852C12.3057 4.17852 12.2857 4.11852 12.2591 4.06519C13.4991 4.70519 14.3457 6.01852 14.3457 7.51185Z"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={'stroke-[#9AA6B5] group-hover:stroke-[#F2F2F2]'}
              />
            </svg>
          </MenuLink>
          <MenuLink title="Диплом" href="#">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.33333 14.6666H10.6667C13 14.6666 14 13.3333 14 11.3333V4.66659C14 2.66659 13 1.33325 10.6667 1.33325H5.33333C3 1.33325 2 2.66659 2 4.66659V9.33325"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={'stroke-[#9AA6B5] group-hover:stroke-[#F2F2F2]'}
              />
              <path
                d="M9.66797 3V4.33333C9.66797 5.06667 10.268 5.66667 11.0013 5.66667H12.3346"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={'stroke-[#9AA6B5] group-hover:stroke-[#F2F2F2]'}
              />
              <path
                d="M2.66536 11.3333L1.33203 12.6666L2.66536 13.9999"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={'stroke-[#9AA6B5] group-hover:stroke-[#F2F2F2]'}
              />
              <path
                d="M4.66797 11.3333L6.0013 12.6666L4.66797 13.9999"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={'stroke-[#9AA6B5] group-hover:stroke-[#F2F2F2]'}
              />
            </svg>
          </MenuLink>
        </MenuItem>
        <MenuItem title="Персонально" premiumSection>
          <MenuLink title="Твой куратор" href="#" locked>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.0013 7.99992C9.84225 7.99992 11.3346 6.50753 11.3346 4.66658C11.3346 2.82564 9.84225 1.33325 8.0013 1.33325C6.16035 1.33325 4.66797 2.82564 4.66797 4.66658C4.66797 6.50753 6.16035 7.99992 8.0013 7.99992Z"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.7268 14.6667C13.7268 12.0867 11.1601 10 8.0001 10C4.8401 10 2.27344 12.0867 2.27344 14.6667"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MenuLink>
          <MenuLink title="Подготовка резюме" href="#" locked>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33203 8.1333H9.9987"
                stroke="#9AA6B5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.33203 10.8H8.25203"
                stroke="#9AA6B5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66536 3.99992H9.33203C10.6654 3.99992 10.6654 3.33325 10.6654 2.66659C10.6654 1.33325 9.9987 1.33325 9.33203 1.33325H6.66536C5.9987 1.33325 5.33203 1.33325 5.33203 2.66659C5.33203 3.99992 5.9987 3.99992 6.66536 3.99992Z"
                stroke="#9AA6B5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.6667 2.67993C12.8867 2.79993 14 3.61993 14 6.6666V10.6666C14 13.3333 13.3333 14.6666 10 14.6666H6C2.66667 14.6666 2 13.3333 2 10.6666V6.6666C2 3.6266 3.11333 2.79993 5.33333 2.67993"
                stroke="#9AA6B5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MenuLink>
          <MenuLink title="Трудоустройство" href="#" locked>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.09766 11V12.4"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.76562 14.6667H11.4323V14.0001C11.4323 13.2667 10.8323 12.6667 10.099 12.6667H6.09896C5.36562 12.6667 4.76562 13.2667 4.76562 14.0001V14.6667V14.6667Z"
                stroke="#9AA6B5"
                strokeMiterlimit="10"
              />
              <path
                d="M4.09766 14.6667H12.0977"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.9987 10.6666C5.4187 10.6666 3.33203 8.57992 3.33203 5.99992V3.99992C3.33203 2.52659 4.52536 1.33325 5.9987 1.33325H9.9987C11.472 1.33325 12.6654 2.52659 12.6654 3.99992V5.99992C12.6654 8.57992 10.5787 10.6666 7.9987 10.6666Z"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.64604 7.76657C3.14604 7.60657 2.70604 7.31324 2.35938 6.96657C1.75938 6.2999 1.35938 5.4999 1.35938 4.56657C1.35938 3.63324 2.09271 2.8999 3.02604 2.8999H3.45938C3.32604 3.20657 3.25937 3.54657 3.25937 3.8999V5.8999C3.25937 6.56657 3.39937 7.19324 3.64604 7.76657Z"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.3555 7.76657C12.8555 7.60657 13.2955 7.31324 13.6421 6.96657C14.2421 6.2999 14.6421 5.4999 14.6421 4.56657C14.6421 3.63324 13.9088 2.8999 12.9755 2.8999H12.5421C12.6755 3.20657 12.7421 3.54657 12.7421 3.8999V5.8999C12.7421 6.56657 12.6021 7.19324 12.3555 7.76657Z"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MenuLink>
        </MenuItem>
        <MenuItem title="Аккаунт">
          <MenuLink title="Реферальная программа" href="#">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.10573 7.24659C6.03906 7.23992 5.95906 7.23992 5.88573 7.24659C4.29906 7.19325 3.03906 5.89325 3.03906 4.29325C3.03906 2.65992 4.35906 1.33325 5.99906 1.33325C7.6324 1.33325 8.95906 2.65992 8.95906 4.29325C8.9524 5.89325 7.6924 7.19325 6.10573 7.24659Z"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.9421 2.66675C12.2355 2.66675 13.2755 3.71341 13.2755 5.00008C13.2755 6.26008 12.2755 7.28675 11.0288 7.33341C10.9755 7.32675 10.9155 7.32675 10.8555 7.33341"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.7725 9.70675C1.15917 10.7867 1.15917 12.5467 2.7725 13.6201C4.60583 14.8467 7.6125 14.8467 9.44583 13.6201C11.0592 12.5401 11.0592 10.7801 9.44583 9.70675C7.61917 8.48675 4.6125 8.48675 2.7725 9.70675Z"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.2266 13.3333C12.7066 13.2333 13.1599 13.0399 13.5332 12.7533C14.5732 11.9733 14.5732 10.6866 13.5332 9.90659C13.1666 9.62659 12.7199 9.43992 12.2466 9.33325"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MenuLink>
          {/* Notifications */}
          <Link
            href={'#'}
            className={
              'group flex cursor-pointer flex-row items-center gap-[19px] border-b border-transparent px-[16px] py-[14px] hover:border-[#F2F2F2]'
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.668 5.33325C13.7725 5.33325 14.668 4.43782 14.668 3.33325C14.668 2.22868 13.7725 1.33325 12.668 1.33325C11.5634 1.33325 10.668 2.22868 10.668 3.33325C10.668 4.43782 11.5634 5.33325 12.668 5.33325Z"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.66797 8.66675H8.0013"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.66797 11.3333H10.668"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.33203 1.33325H5.9987C2.66536 1.33325 1.33203 2.66659 1.33203 5.99992V9.99992C1.33203 13.3333 2.66536 14.6666 5.9987 14.6666H9.9987C13.332 14.6666 14.6654 13.3333 14.6654 9.99992V6.66658"
                stroke="#9AA6B5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              className={'flex w-full flex-row items-center justify-between'}
            >
              <span
                className={
                  'font-roboto text-[16px] leading-[16px] text-[#9AA6B5] group-hover:text-[#F2F2F2]'
                }
              >
                Уведомления
              </span>
              <NotificationCounter count={3} />
            </div>
          </Link>
        </MenuItem>
      </nav>
      <div className={'mt-auto flex flex-col border-t border-[#282D33]'}>
        <div className={'flex flex-row items-center px-[32px] py-[20px]'}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_650_6475)">
              <rect width="16" height="16" rx="3.2" fill="#9AA6B5" />
              <path
                d="M9.82826 9.41391L12.15 7.93374V6.10949L7.09367 9.49735L12.15 12.8149V11.0384L9.82889 9.58295L9.6949 9.49893L9.82826 9.41391Z"
                fill="#01050D"
                stroke="#01050D"
                strokeWidth="0.2"
              />
              <path
                d="M6.17174 6.49179L3.85 5.01162V3.18737L8.90633 6.57523L3.85 9.89274V8.11632L6.17111 6.66083L6.3051 6.57681L6.17174 6.49179Z"
                fill="#01050D"
                stroke="#01050D"
                strokeWidth="0.2"
              />
            </g>
            <defs>
              <clipPath id="clip0_650_6475">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span
            className={
              'ml-[16px] mr-[32px] text-center font-roboto text-[13px] leading-[16px] text-[#9AA6B5]'
            }
          >
            Закрытый клуб BlockFirst
          </span>
          <Image src={PremiumSvg} alt="Premium" />
        </div>
        <UserInfo user={user} />
      </div>
    </section>
  );
}
