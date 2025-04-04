import {
  Topbar as UnifiedTopbar,
} from '~/app/components/shared/Topbar';
import HeaderIcon from './assets/header-icon.png';
import Image from 'next/image';

export function Topbar({ lastestUpdate }: { lastestUpdate: string }) {
  return (
    <UnifiedTopbar
      showBorder={false}
      className="relative bg-[#01050d] bg-[url('/images/misc/cv-header-bg-mobile.png')] sm:bg-[url('/images/misc/cv-header-bg.png')] bg-cover bg-center"
      leftContent={
        <div className="flex flex-row space-x-4 sm:space-x-5">
          <div className="relative h-10 w-10 sm:h-15.25 sm:w-15.25 overflow-hidden shrink-0">
            {/* Logo/Icon container with images from Figma */}
            <div className="absolute inset-0 bg-[#01050d]">
              <Image
                src={HeaderIcon}
                alt="Header Icon"
                className="h-10 w-10 sm:h-15.25 sm:w-15.25 object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h1 className="text-foreground text-xl sm:text-3xl leading-8.25 font-medium">
              Персональное резюме
            </h1>
            <p className="text-secondary text-xs leading-5">
              После прохождения каждого этапа, вы разблокируете возможность
              улучшить свое резюме с куратором для работадателей
            </p>
          </div>
        </div>
      }
      mobilePremiumText="Подготовка резюме"
    />
  );
}
