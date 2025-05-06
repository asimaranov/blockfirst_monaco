'use client';

import { useState, useRef, useEffect } from 'react';
import BfLogo from './assets/bf-logo.svg';
import Image from 'next/image';
import TaskIcon from './assets/task-icon.svg';
import AiChat from './assets/ai-chat.svg';
import HeartIcon from './assets/heart-icon.svg';
import HeartIconSmall from './assets/heart-icon-small.svg';
import FlagIcon from './assets/flag-icon.svg';
import { motion, AnimatePresence } from 'motion/react';

import HeartsIllustration from './assets/hearts-illustration.png';
import ExamIllustration from './assets/exam-illustration.svg';
import TaskFormatIllustration from './assets/task-format-illustration.png';
import HumanIcon from './assets/human-icon.svg';
import StarIcon from './assets/star-icon.svg';
import { InfoPopover } from '../shared/InfoPopover';
import AiMentor from '../TaskView/AiMentor';
import ExamChat from './ExamChat';
import { useExamStore } from '@/store/examStore';
import ChatSuccess from './ChatSuccess';
import ChatFail from './ChatFail';

const IntroPage = ({
  close,
  setPage,
}: {
  close: () => void;
  setPage: (page: 'intro' | 'exam') => void;
}) => {
  return (
    <div className="flex h-200 w-175 flex-col items-center justify-center bg-[#0F1217]">
      <div className="flex w-full flex-col gap-8 bg-[url('/images/covers/exam-cover.png')] bg-cover p-8">
        <div className="flex flex-row items-center justify-between">
          <Image
            src={BfLogo}
            alt="BF Logo"
            width={115}
            height={32}
            className="h-8 w-28.75"
          />
          <button onClick={() => close()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer hover:opacity-50"
            >
              <path
                d="M13.8039 17.4C13.4725 17.7314 12.9353 17.7314 12.6039 17.4C12.2725 17.0686 12.2725 16.5314 12.6039 16.2L16.8039 12L12.6039 7.8C12.2725 7.46863 12.2725 6.93137 12.6039 6.6C12.9353 6.26863 13.4725 6.26863 13.8039 6.6L18.0039 10.8L22.2039 6.6C22.5353 6.26863 23.0725 6.26863 23.4039 6.6C23.7353 6.93137 23.7353 7.46863 23.4039 7.8L19.2039 12L23.4039 16.2C23.7353 16.5314 23.7353 17.0686 23.4039 17.4C23.0725 17.7314 22.5353 17.7314 22.2039 17.4L18.0039 13.2L13.8039 17.4Z"
                fill="#F2F2F2"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center justify-between gap-5">
          <div className="flex flex-col items-center gap-3">
            <span className="text-3xl">Зачет BlockFirst!</span>
            <span className="text-secondary text-sm">
              После успешной сдачи вам откроется доступ к следующим материалам
            </span>
          </div>
          <div className="flex flex-row items-center justify-center gap-2 rounded-[5.2083vw] border-[0.026vw] border-[#FF5D70]/20 bg-[#F2F2F2]/1 px-3 py-1 backdrop-blur-[20px]">
            <div className="relative shrink-0">
              <Image
                src={'/heroes/Alex.png'}
                alt="Alex"
                width={100}
                height={100}
                className="h-7 w-7"
              ></Image>

              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-[calc(50%-var(--spacing)*2)] translate-y-0.5"
              >
                <path
                  d="M17.6006 7.86628L16.3765 6.44464C16.1425 6.17471 15.9535 5.67083 15.9535 5.31092V3.7813C15.9535 2.82754 15.1704 2.04474 14.2164 2.04474H12.6863C12.3353 2.04474 11.8222 1.85579 11.5522 1.62184L10.1301 0.39815C9.50909 -0.132717 8.49203 -0.132717 7.86199 0.39815L6.4489 1.63084C6.17888 1.85579 5.66585 2.04474 5.31483 2.04474H3.75773C2.80367 2.04474 2.02063 2.82754 2.02063 3.7813V5.31992C2.02063 5.67083 1.83161 6.17471 1.6066 6.44464L0.391524 7.87528C-0.130508 8.49613 -0.130508 9.50387 0.391524 10.1247L1.6066 11.5554C1.83161 11.8253 2.02063 12.3292 2.02063 12.6801V14.2187C2.02063 15.1725 2.80367 15.9553 3.75773 15.9553H5.31483C5.66585 15.9553 6.17888 16.1442 6.4489 16.3782L7.87099 17.6019C8.49203 18.1327 9.50909 18.1327 10.1391 17.6019L11.5612 16.3782C11.8312 16.1442 12.3353 15.9553 12.6953 15.9553H14.2254C15.1794 15.9553 15.9625 15.1725 15.9625 14.2187V12.6891C15.9625 12.3382 16.1515 11.8253 16.3855 11.5554L17.6096 10.1337C18.1316 9.51287 18.1316 8.48713 17.6006 7.86628Z"
                  fill="#010101"
                />
                <ellipse
                  cx="9.49609"
                  cy="9.4986"
                  rx="4.5"
                  ry="4.4986"
                  fill="#F2F2F2"
                />
                <path
                  d="M15.6854 8.11822L14.7334 7.0125C14.5514 6.80255 14.4044 6.41065 14.4044 6.13072V4.94101C14.4044 4.1992 13.7953 3.59035 13.0533 3.59035H11.8632C11.5902 3.59035 11.1912 3.44339 10.9812 3.26143L9.87508 2.30967C9.39205 1.89678 8.601 1.89678 8.11097 2.30967L7.0119 3.26843C6.80189 3.44339 6.40287 3.59035 6.12985 3.59035H4.91877C4.17673 3.59035 3.56769 4.1992 3.56769 4.94101V6.13771C3.56769 6.41065 3.42068 6.80255 3.24567 7.0125L2.30061 8.12522C1.89459 8.6081 1.89459 9.3919 2.30061 9.87478L3.24567 10.9875C3.42068 11.1974 3.56769 11.5894 3.56769 11.8623V13.059C3.56769 13.8008 4.17673 14.4096 4.91877 14.4096H6.12985C6.40287 14.4096 6.80189 14.5566 7.0119 14.7386L8.11797 15.6903C8.601 16.1032 9.39205 16.1032 9.88208 15.6903L10.9882 14.7386C11.1982 14.5566 11.5902 14.4096 11.8702 14.4096H13.0603C13.8023 14.4096 14.4114 13.8008 14.4114 13.059V11.8693C14.4114 11.5964 14.5584 11.1974 14.7404 10.9875L15.6924 9.88178C16.0985 9.3989 16.0985 8.6011 15.6854 8.11822ZM11.9052 7.67733L8.524 11.0575C8.42599 11.1555 8.29298 11.2114 8.15298 11.2114C8.01297 11.2114 7.87996 11.1555 7.78195 11.0575L6.08785 9.36391C5.88484 9.16096 5.88484 8.82504 6.08785 8.62209C6.29086 8.41914 6.62688 8.41914 6.82989 8.62209L8.15298 9.94476L11.1632 6.93552C11.3662 6.73257 11.7022 6.73257 11.9052 6.93552C12.1082 7.13847 12.1082 7.47438 11.9052 7.67733Z"
                  fill="#195AF4"
                />
              </svg>
            </div>

            <span className="text-base leading-7">Алекс</span>
            <span className="text-delight bg-[linear-gradient(90deg,#FF5D70_0%,#FFD064_100%)] bg-clip-text text-xs leading-3.75 text-transparent">
              BF Heroes
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-8">
        <div className="border-b-accent/50 flex flex-row gap-12 border-b">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-5">
              <Image src={TaskIcon} alt="" className="h-8 w-8" />
              <div className="flex flex-row items-center gap-3">
                <span className="text-base leading-6">Формат зачета</span>
                <Image src={AiChat} alt="" className="h-6 w-15.75" />
              </div>
            </div>
            <span className="text-secondary pl-13 text-sm">
              Зачет в формате диалога с AI-экзаменатором. Предоставляйте
              развернутые ответы.
            </span>
          </div>
          <Image
            src={TaskFormatIllustration}
            alt=""
            quality={100}
            className="h-28 w-50 [-webkit-user-drag:none]"
          ></Image>
        </div>
        <div className="border-b-accent/50 flex flex-row gap-12 border-b">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-5">
              <Image src={HeartIcon} className="h-8 w-8" alt="" />
              <div className="flex flex-row items-center gap-3">
                <span className="text-base leading-6">Очки «жизни»</span>
              </div>
            </div>
            <span className="text-secondary pl-13 text-sm">
              В зачете 20 вопросов, допускается 5 неверных ответов. Превышение
              требует повторной сдачи.
            </span>
          </div>
          <Image
            src={HeartsIllustration}
            alt=""
            quality={100}
            className="h-28 w-50 [-webkit-user-drag:none]"
          ></Image>
        </div>
        <div className="border-b-accent/50 flex flex-row gap-12 border-b">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-5">
              <Image src={FlagIcon} className="h-8 w-8" alt="" />
              <div className="flex flex-row items-center gap-3">
                <span className="text-base leading-6">Сдача зачета</span>
              </div>
            </div>
            <span className="text-secondary pl-13 text-sm">
              После зачета откроется доступ к следующим урокам. Важно освоить
              текущий материал.
            </span>
          </div>
          <Image
            src={ExamIllustration}
            alt=""
            quality={100}
            className="h-28 w-50 [-webkit-user-drag:none]"
          ></Image>
        </div>
      </div>
      <div className="flex flex-row items-center gap-16 pt-5.75 pb-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-secondary text-xxs w-31.75 bg-[#14171C] px-3 py-1.75 uppercase">
              прошли зачет
            </span>
            <div className="flex flex-row gap-2">
              <Image src={HumanIcon} alt="" className="h-6 w-6"></Image>
              <span className="text-base">1 207+</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-secondary text-xxs w-31.75 bg-[#14171C] px-3 py-1.75 uppercase">
              рейтинг зачета
            </span>
            <div className="flex flex-row gap-2">
              <Image src={StarIcon} alt="" className="h-6 w-6"></Image>
              <span className="text-base">1 207+</span>
            </div>
          </div>
        </div>

        <button
          className="border-primary hover:bg-primary flex h-fit cursor-pointer flex-row rounded-[5.2083vw] border px-22 py-3.5"
          onClick={() => setPage('exam')}
        >
          <span className="h-fit text-sm">Пройти зачет</span>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M14.2305 4.43173C14.5107 4.16285 14.9458 4.15427 15.2354 4.40048L15.2911 4.45321L19.9063 9.26181C20.1848 9.55201 20.1848 10.0107 19.9063 10.3009L15.2911 15.1095C15.0042 15.4083 14.5294 15.4178 14.2305 15.1309C13.932 14.8441 13.9223 14.3691 14.209 14.0704L18.3252 9.78134L14.209 5.49228L14.1583 5.43368C13.9245 5.1343 13.9506 4.7005 14.2305 4.43173Z"
              fill="#F2F2F2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ExamPage = ({ close, examId }: { close: () => void; examId: string }) => {
  const {
    totalLives,
    currentLives,
    currentQuestionId,
    updateLives,
    updateCurrentQuestion,
    totalQuestions,
  } = useExamStore();

  const [currentState, setCurrentState] = useState<
    'chat' | 'completed' | 'failed'
  >('chat');

  console.log('Current lives:', currentLives);

  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      if (currentLives <= 0) {
        setCurrentState('failed');
      }
    })();
  }, [currentLives]);

  return (
    <div className="flex h-200 w-175 flex-col justify-center bg-[#0F1217] rounded-[0.4167vw]">
      <div className="border-b-accent flex flex-row items-center justify-between border-b px-4 py-3">
        <div className="flex-1"></div>
        <div className="flex items-center justify-center">
          <span className="text-secondary text-xs">Зачет по —&nbsp;</span>
          <span className="text-xs">Миру токенов</span>
        </div>
        <button className="flex flex-1 justify-end" onClick={() => close()}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 cursor-pointer hover:opacity-50"
          >
            <path
              d="M6.5 14.5C6.22386 14.7761 5.77614 14.7761 5.5 14.5C5.22386 14.2239 5.22386 13.7761 5.5 13.5L9 10L5.5 6.5C5.22386 6.22386 5.22386 5.77614 5.5 5.5C5.77614 5.22386 6.22386 5.22386 6.5 5.5L10 9L13.5 5.5C13.7761 5.22386 14.2239 5.22386 14.5 5.5C14.7761 5.77614 14.7761 6.22386 14.5 6.5L11 10L14.5 13.5C14.7761 13.7761 14.7761 14.2239 14.5 14.5C14.2239 14.7761 13.7761 14.7761 13.5 14.5L10 11L6.5 14.5Z"
              fill="#9AA6B5"
            />
          </svg>
        </button>
      </div>
      {currentState === 'chat' && <ExamChat examId={examId}></ExamChat>}
      {currentState === 'completed' && <ChatSuccess />}
      {currentState === 'failed' && (
        <ChatFail onRetry={() => setCurrentState('chat')} examId={examId} />
      )}
      {currentState === 'chat' && (
        <div className="border-t-accent flex flex-row justify-between border-t px-8 py-3.5">
          <div>
            <span className="text-xl leading-5">{currentQuestionId}</span>
            <span className="text-secondary text-sm leading-5">
              / {totalQuestions}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <InfoPopover
              title="Очки «жизни»"
              content="При прохождении зачета вам разрешается сделать 5 неверных ответов. Превышение данного количества потребует повторной сдачи зачета."
            />
            <div className="flex flex-row items-center gap-1">
              <span className="text-secondary/50 text-sm leading-4">
                Очки «жизни» —
              </span>

              <div className="flex flex-row justify-center gap-0.5">
                {Array.from({ length: currentLives }).map((_, index) => (
                  <Image
                    src={HeartIconSmall}
                    alt=""
                    className="h-4 w-4"
                    key={index}
                  ></Image>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function ExamComponent() {
  const { isOpen: open, close, examId } = useExamStore();
  const [page, setPage] = useState<'intro' | 'exam'>('intro');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if the click is directly on the backdrop, not on the content
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      close();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed top-0 left-0 z-1000000000000000 flex h-full w-full items-center justify-center bg-[#01050D]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={contentRef}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {page === 'intro' ? (
              <IntroPage close={close} setPage={setPage} />
            ) : (
              <ExamPage close={close} examId={examId} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
