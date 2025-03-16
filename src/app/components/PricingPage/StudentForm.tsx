'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '~/helpers';
import LogoSvg from './assets/logo.svg';
import UserIcon from './input-legends/user';
import TelegramSvg from './input-legends/telegram';
import BookIcon from './input-legends/book';
import { motion } from 'framer-motion';

interface StudentFormProps {
  onClose: () => void;
}

export function StudentForm({ onClose }: StudentFormProps) {
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [motivation, setMotivation] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="bg-dark-bg border-accent flex h-full w-105 flex-col border">
        <div className="flex flex-1 flex-col gap-8 px-10 py-8">
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col items-center gap-8">
              <Image src={LogoSvg} alt="Logo" width={152} height={44} />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-1 flex-col items-center gap-10"
            >
              <div className="relative flex items-center justify-center">
                <div className="h-[150px] w-[150px] rounded-full" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute"
                >
                  <svg
                    width="150"
                    height="150"
                    viewBox="0 0 150 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 75C0 116.421 33.5786 150 75 150C116.421 150 150 116.421 150 75C150 33.5786 116.421 0 75 0C33.5786 0 0 33.5786 0 75ZM148.5 75C148.5 115.593 115.593 148.5 75 148.5C34.4071 148.5 1.5 115.593 1.5 75C1.5 34.4071 34.4071 1.5 75 1.5C115.593 1.5 148.5 34.4071 148.5 75Z"
                      fill="#195AF4"
                    />
                    <path
                      d="M61 77.5L68.5 85L88.5 65"
                      stroke="#F2F2F2"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-foreground text-2xll text-center"
                >
                  Письмо отправленно
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-secondary text-center text-sm"
                >
                  В ближайшее время с вами свяжется менеджер для обсуждения
                  персональных условий
                </motion.p>
              </div>
            </motion.div>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={onClose}
            className="bg-primary text-foreground flex h-[52px] w-full cursor-pointer items-center justify-center gap-[14px] rounded-full text-sm transition-colors duration-300 hover:bg-[#1242B2]"
          >
            <span>Спасибо</span>
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
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg border-accent flex h-full w-105 flex-col border">
      <div className="flex flex-1 flex-col gap-8 px-10 py-8">
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex flex-col items-center gap-8">
            <Image src={LogoSvg} alt="Logo" width={152} height={44} />
            <div className="flex flex-col gap-4">
              <h2 className="text-foreground text-2xll">
                Анкета для студентов
              </h2>
              <p className="text-secondary text-center text-sm">
                Заполните анкету и напишите краткое мотивационное письмо. Мы
                рассмотрим для вас персональные условия
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-8">
            <div className="border-accent group focus-within:border-foreground flex h-12 items-center border-b px-4">
              <div className="w-4">
                <UserIcon active={name !== ''} />
              </div>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-foreground placeholder:text-secondary/50 ml-3 h-full w-full bg-transparent text-sm focus:outline-none"
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
                className="text-foreground placeholder:text-secondary/50 ml-3 h-full w-full bg-transparent text-sm focus:outline-none"
              />
            </div>

            <div className="border-accent group focus-within:border-b-foreground flex w-full flex-1 flex-col p-4">
              <div className="flex flex-1 items-start gap-3">
                <div className="w-4">
                  <BookIcon active={motivation !== ''} />
                </div>
                <textarea
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className="text-foreground placeholder:text-secondary/50 -mt-1 h-full w-full grow resize-none bg-transparent text-sm focus:outline-none"
                  placeholder={`Мотивационное письмо\n\nРасскажите о себе и почему вы хотите\n учиться у нас`}
                  rows={5}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          disabled={name === '' || telegram === '' || motivation === ''}
          onClick={handleSubmit}
          className={cn(
            'bg-primary text-foreground flex h-[52px] w-full items-center justify-center gap-[14px] rounded-full text-sm transition-colors duration-300 hover:bg-[#1242B2]',
            'disabled:hover:bg-primary cursor-pointer disabled:cursor-default disabled:opacity-50'
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
