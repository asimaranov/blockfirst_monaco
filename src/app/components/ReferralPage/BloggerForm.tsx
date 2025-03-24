'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '~/helpers';
import TelegramIcon from './assets/telegram-icon.svg';
import WebsiteIcon from './assets/website-icon.svg';
import SecondStepIcon from './assets/second-step.svg';
import InfoIcon from './assets/info-icon.svg';

import CopyButton from '../shared/CopyButton/CopyButton';
import PromoCodeForm from './PromoCodeForm';
interface ApplyFormProps {
  onClose: () => void;
}

const RedirectArrowButton = ({
  hrefToOpen,
  onClick,
}: {
  hrefToOpen?: string;
  onClick?: () => void;
}) => (
  <div
    className="h-5 w-5 cursor-pointer hover:opacity-50"
    onClick={() => {
      if (onClick) {
        onClick();
      } else {
        window.open(hrefToOpen, '_blank');
      }
    }}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.901 4.46967C11.1939 4.17678 11.6688 4.17678 11.9617 4.46967L16.9617 9.46962C17.1023 9.61027 17.1814 9.80104 17.1814 9.99995C17.1814 10.1989 17.1023 10.3896 16.9617 10.5303L11.9617 15.5303C11.6688 15.8232 11.1939 15.8232 10.901 15.5303C10.6081 15.2374 10.6081 14.7625 10.901 14.4696L14.6207 10.75H3.57422C3.16001 10.75 2.82422 10.4142 2.82422 9.99995C2.82422 9.58574 3.16001 9.24995 3.57422 9.24995H14.6207L10.901 5.53033C10.6081 5.23744 10.6081 4.76257 10.901 4.46967Z"
        fill="#F2F2F2"
      />
    </svg>
  </div>
);

export default function BloggerForm({ onClose }: ApplyFormProps) {
  const [isPromoCodeFormOpen, setIsPromoCodeFormOpen] = useState(false);

  return (
    <>
      {isPromoCodeFormOpen ? (
        <PromoCodeForm
          onClose={() => {
            setIsPromoCodeFormOpen(false);
          }}
          onFullClose={() => {
            setIsPromoCodeFormOpen(false);
            onClose();
          }}
        />
      ) : (
        <div className="bg-dark-bg border-accent/40 flex h-full w-105 flex-col border-l">
          <div className="flex flex-1 flex-col gap-8 py-8">
            <div className="flex flex-1 flex-col gap-8">
              <div className="flex flex-col items-center gap-8 px-10">
                <Image
                  src={'/images/logo/form-logo.svg'}
                  alt="Logo"
                  width={152}
                  height={44}
                  className="w-38"
                />
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-foreground text-2xll">Блогерам</h2>
                  <p className="text-secondary text-center text-sm">
                    Если вы являетесь блогером или владельцем Telegram-канала с
                    активной аудиторией, пожалуйста, свяжитесь с нами.
                  </p>
                </div>
              </div>
              <div className="text-secondary/50 bg-[#14171C] px-8 py-3.5 text-xs uppercase">
                Необходимые действия
              </div>

              <div className="flex flex-1 flex-col gap-8 px-10">
                {[
                  {
                    name: 'Связь с менеджером (TG)',
                    icon: TelegramIcon,
                    value: 'Рассмотрим персональные условия',
                    stepText: 'Первый шаг',
                    button: (
                      <RedirectArrowButton
                        hrefToOpen={'https://t.me/changeme'}
                      />
                    ),
                  },
                  {
                    name: 'Активация аккаунта',
                    icon: SecondStepIcon,
                    value: 'Промокод выдает менеджер',
                    stepText: 'Второй шаг',
                    button: (
                      <RedirectArrowButton
                        onClick={() => setIsPromoCodeFormOpen(true)}
                      />
                    ),
                  },
                ].map((item) => (
                  <div className="flex flex-col">
                    <div>
                      <span className="rounded-full border-[0.0289vw] border-[#33CF8E]/50 px-3 py-1.25 text-xs text-[#33CF8E]">
                        {item.stepText}
                      </span>
                    </div>
                    <div className="border-accent flex flex-row items-center gap-4 border-b py-4 pt-6 pb-8">
                      <Image
                        src={item.icon}
                        alt={'Telegram'}
                        className="h-10 w-10"
                      />
                      <div className="flex flex-col gap-4">
                        <div className="flex h-12 items-center">
                          <div className="flex flex-col gap-2">
                            <span className="text-foreground text-base">
                              {item.name}
                            </span>
                            <div className="flex flex-row items-center gap-3">
                              <span className="text-secondary text-xs">
                                {item.value}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-auto">{item.button}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-secondary flex w-full flex-row justify-center gap-1 text-xs">
              <span className="flex flex-row gap-1">
                <Image src={InfoIcon} alt="Info" className="h-4 w-4" />
                Неверные контакты?
              </span>
              <span className="text-foreground cursor-pointer underline">
                Написать нам
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
