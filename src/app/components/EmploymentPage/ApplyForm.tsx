'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '~/helpers';
import UserIcon from '~/app/components/input-legends/user';
import TelegramSvg from '~/app/components/input-legends/telegram';
import BookIcon from '~/app/components/input-legends/book';

import { motion } from 'framer-motion';
import TelegramIcon from './assets/telegram-icon.svg';
import EmailIcon from './assets/email-icon.svg';
import WebsiteIcon from './assets/website-icon.svg';

import InfoIcon from './assets/info-icon.svg';

import CopyButton from '../shared/CopyButton/CopyButton';
interface ApplyFormProps {
  onClose: () => void;
}

const CheckIcon = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.7307 4.43254C15.0295 4.14571 15.5043 4.15545 15.7911 4.45429L20.4065 9.26303C20.685 9.55324 20.685 10.0115 20.4065 10.3017L15.7911 15.1104C15.5043 15.4093 15.0295 15.419 14.7307 15.1322C14.4318 14.8454 14.4221 14.3706 14.7089 14.0718L18.8258 9.78237L14.7089 5.49297C14.4221 5.19413 14.4318 4.71936 14.7307 4.43254Z"
      fill="#F2F2F2"
    />
  </svg>
);

const CopyArrowButton = ({ textToCopy }: { textToCopy: string }) => (
  <div
    className="h-5 w-5 cursor-pointer hover:opacity-50"
    onClick={() => {
      navigator.clipboard.writeText(textToCopy);
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

export function ApplyForm({ onClose }: ApplyFormProps) {
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [motivation, setMotivation] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setSuccess(true);
  };

  return (
    <div className="bg-dark-bg border-accent/40 flex h-full w-105 flex-col border-l">
      <div className="flex flex-1 flex-col gap-8 px-10 py-8">
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex flex-col items-center gap-8">
            <Image
              src={'/images/logo/form-logo.svg'}
              alt="Logo"
              width={152}
              height={44}
              className="w-38"
            />
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-foreground text-2xll">Отклик на вакансию</h2>
              <p className="text-secondary text-center text-sm">
                Мы предоставляем контакты и дополнительную информацию
                работодателя
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-8">
            {[
              {
                name: 'Телеграм',
                icon: TelegramIcon,
                value: 'https://t.me/changeme',
                button: (
                  <CopyArrowButton textToCopy={'https://t.me/changeme'} />
                ),
              },
              {
                name: 'Веб-сайт',
                icon: WebsiteIcon,
                value: 'https://example.com',
                button: <CopyArrowButton textToCopy={'https://example.com'} />,
              },
              {
                name: 'E-mail',
                icon: EmailIcon,
                value: 'example@example.com',
                button: <CopyButton textToCopy={'example@example.com'} />,
              },
            ].map((item) => (
              <div className="border-accent flex flex-row items-center justify-between border-b p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex h-12 items-center">
                    <div className="flex flex-col gap-2.5">
                      <span className="text-secondary text-xs">
                        {item.name}
                      </span>
                      <div className="flex flex-row items-center gap-3">
                        <Image
                          src={item.icon}
                          alt={'Telegram'}
                          className="h-4 w-4"
                        />
                        <span className="text-foreground text-sm">
                          {item.value}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>{item.button}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-secondary flex flex-row gap-1 w-full justify-center text-xs">
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
  );
}
