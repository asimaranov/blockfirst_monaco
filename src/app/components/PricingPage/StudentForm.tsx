'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '~/helpers';
import LogoSvg from './assets/logo.svg';
import UserIcon from './input-legends/user';
import TelegramSvg from './input-legends/telegram';
import BookIcon from './input-legends/book';
interface StudentFormProps {
  onClose: () => void;
}

export function StudentForm({ onClose }: StudentFormProps) {
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [motivation, setMotivation] = useState('');

  const handleSubmit = () => {
    // Handle form submission
    onClose();
  };

  return (
    <div className="bg-dark-bg border-accent flex w-105 flex-col border h-full">
      <div className="flex flex-col gap-8 px-10 py-8 flex-1">
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex flex-col items-center gap-8">
            <Image src={LogoSvg} alt="Logo" width={152} height={44} />
            <div className="flex flex-col gap-4">
              <h2 className="text-foreground text-2xll">
                Анкета для студентов
              </h2>
              <p className="text-secondary text-sm">
                Заполните анкету и напишите краткое мотивационное письмо. Мы
                рассмотрим для вас персональные условия
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 flex-1">
            <div className="border-accent group focus-within:border-foreground flex h-12 items-center border-b px-4">
              <div className="w-4">
                <UserIcon active={name !== ''} />
              </div>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-secondary placeholder:text-secondary/50 ml-3 h-full w-full bg-transparent text-sm focus:outline-none"
              />
            </div>

            <div className="border-accent focus-within:border-foreground group flex h-12 items-center border-b px-4">
              <div className="w-4">
                <TelegramSvg active={telegram !== ''} />
              </div>

              <input
                type="text"
                placeholder="Ваш телеграм"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className="text-secondary placeholder:text-secondary/50 ml-3 h-full w-full bg-transparent text-sm focus:outline-none"
              />
            </div>

            <div className="border-accent group focus-within:border-b-foreground flex w-full flex-col p-4 flex-1">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-4">
                  <BookIcon active={motivation !== ''} />
                </div>
                <textarea
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className="text-secondary -mt-1 grow   w-full resize-none bg-transparent text-sm focus:outline-none"
                  placeholder={`Мотивационное письмо\n\nРасскажите о себе и почему вы хотите\n учиться у нас`}
                  rows={5}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className={cn(
            'bg-primary text-foreground flex h-[52px] w-full items-center justify-center gap-[14px] rounded-full text-sm transition-colors duration-300 hover:bg-[#1242B2]'
          )}
        >
          <span>Продолжить</span>
          <svg
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.230661 0.432766C0.5295 0.145942 1.00427 0.155683 1.2911 0.454522L5.90648 5.26326C6.18502 5.55346 6.18502 6.01173 5.90648 6.30194L1.2911 11.1107C1.00427 11.4095 0.5295 11.4193 0.230661 11.1324C-0.0681787 10.8456 -0.0779195 10.3708 0.208904 10.072L4.32583 5.7826L0.208904 1.4932C-0.0779195 1.19436 -0.0681787 0.71959 0.230661 0.432766Z"
              fill="#F2F2F2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
