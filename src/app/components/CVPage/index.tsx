'use client';

import { useState, useRef, useEffect } from 'react';
import { Topbar } from './Topbar';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import InProgressFlag from './assets/in-progress-flag.svg';
import CompletedFlag from './assets/completed-flag.svg';
import LockedFlag from './assets/locked-flag.svg';
import FaqItems from './assets/faq-items-icons.png';
import TelegramIcon from './assets/telegram-cv-icon.svg';
import EmailIcon from './assets/email-cv-icon.svg';

import { Modal } from '../shared/Modal';
import { Progress } from '../shared/Progress';
import ToggleMinus from '../shared/ToggleMinus/ToggleMinus';
import CVApplyForm from './CVApplyForm';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

// Components for CV Page
const StageCard = ({
  title,
  completed,
  salaryRange,
  position,
  progressValue,
}: {
  title: string;
  completed: boolean;
  salaryRange: string;
  position: string;
  progressValue: number;
}) => (
  <div className="r-0 flex flex-col gap-5 p-5 pt-10 pb-0 sm:p-8 sm:pt-8 sm:pr-0 sm:pb-0">
    <div
      className={`inline-flex w-fit items-center rounded-full border-[0.5px] px-3 py-1.25 ${completed ? 'border-success/50 text-success' : 'border-secondary/50 text-secondary'}`}
    >
      <span className="text-xs leading-3.5">{title}</span>
    </div>

    <div className="flex flex-col group-last:pr-0 sm:group-last:pr-8">
      <div className="flex flex-col gap-2 pb-5">
        <h3 className="text-foreground text-2xl font-normal">{salaryRange}</h3>
        <p className="text-secondary text-xs leading-3.5 uppercase">
          {position}
        </p>
      </div>

      <div className="relative mr-3 sm:mr-0">
        <div className="relative flex flex-row">
          <Progress
            value={progressValue}
            className="rounded-full"
            inactive={!completed && progressValue === 0}
            locked={progressValue === 0}
          />
        </div>
        <div className="absolute right-[1px] bottom-0 z-10 flex translate-x-1/2 items-center">
          {completed ? (
            <Image
              src={CompletedFlag}
              alt="Completed"
              className="h-21.5 w-7"
            ></Image>
          ) : progressValue === 0 ? (
            <Image src={LockedFlag} alt="Locked" className="h-21.5 w-7"></Image>
          ) : (
            <Image
              src={InProgressFlag}
              alt="InProgress"
              className="h-21.5 w-7"
            ></Image>
          )}
        </div>
      </div>
      <div className="border-accent hidden h-8 not-group-last:border-r-0 sm:block sm:not-group-last:border-r"></div>
    </div>
  </div>
);

const CourseItem = ({
  title,
  lessons,
  duration,
  completed,
  opened,
}: {
  title: string;
  lessons: string;
  duration: string;
  completed: boolean;
  opened: boolean;
}) => (
  <div className="flex items-start gap-4">
    {completed ? (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
      >
        <path
          d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
          fill="#195AF4"
        />
        <path
          d="M6.625 10.2124L8.73396 12.3214L13.3737 7.68164"
          stroke="#F2F2F2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ) : opened ? (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
      >
        <path
          d="M18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10Z"
          stroke="#195AF4"
          stroke-linecap="round"
        />
      </svg>
    ) : (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
      >
        <path
          d="M18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10Z"
          stroke="#9AA6B5"
          stroke-opacity="0.5"
          stroke-linecap="round"
        />
      </svg>
    )}
    <div className="flex flex-col gap-2">
      <p className="text-foreground font-base leading-5 sm:text-sm">{title}</p>
      <div className="text-secondary flex items-center gap-3 text-xs">
        <span className="text-xxs uppercase">{lessons}</span>
        {duration && (
          <>
            <div className="bg-secondary/20 h-3 w-px"></div>
            <span className="text-xxs uppercase">{duration}</span>
          </>
        )}
      </div>
    </div>
  </div>
);

const CourseSection = ({
  position,
  opened,
  courses,
  buttonText,
  isDisabled = false,
}: {
  position: string;
  opened: boolean;
  courses: {
    title: string;
    lessons: string;
    duration: string;
    completed: boolean;
  }[];
  buttonText: string;
  isDisabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('UserSpace');

  return (
    <div className="border-accent flex flex-1 flex-col not-group-last:border-r-0 sm:not-group-last:border-r">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CVApplyForm onClose={() => setIsOpen(false)} jobTitle={position} />
      </Modal>
      <div className="border-accent hidden bg-[#14171C] px-5 py-4 sm:block sm:px-8">
        <h4 className="text-secondary/50 text-xs leading-4 uppercase">
          Курсы этапа
        </h4>
      </div>

      <div className="flex flex-col gap-4 px-5 pt-10 pb-10 sm:px-8 sm:pt-7">
        {courses.map((course, index) => (
          <CourseItem
            key={index}
            title={course.title}
            lessons={course.lessons}
            duration={course.duration}
            opened={opened}
            completed={course.completed}
          />
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-6">
        <button
          className={`mx-5 flex items-center justify-center rounded-full py-3.5 sm:mx-8 ${isDisabled ? 'bg-secondary/10 text-secondary' : 'bg-primary text-foreground cursor-pointer hover:bg-[#1242B2]'}`}
          disabled={isDisabled}
          onClick={() => setIsOpen(true)}
        >
          <span className="text-sm">{buttonText}</span>
          <Image
            src={'/images/icons/forward-arrow.svg'}
            alt=""
            width={21}
            height={20}
            className="h-5 w-5"
          />
        </button>

        <div className="border-accent bg-[#14171C] py-2">
          <p className="text-secondary text-center text-xs">
            Закончите{' '}
            <span className="text-foreground">
              {courses.filter((x) => !x.completed).length}{' '}
              {t('course', {
                count: courses.filter((x) => !x.completed).length,
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// FAQ Item Component with Animation
const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-accent border-b last:border-b-0">
      <div className="px-5 py-6 sm:px-8">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={onClick}
        >
          <h3 className="text-foreground text-sm">{question}</h3>
          <ToggleMinus
            isExpanded={isOpen}
            onToggle={onClick}
            className="ml-6 h-5 w-5 shrink-0"
          ></ToggleMinus>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4">
                <p className="text-secondary text-sm">{answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function CVPage({ session }: { session: Session }) {
  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState(0);

  // FAQ data
  const faqItems = [
    {
      question: 'Я прошел один курс, могу ли я запросить подготовку резюме?',
      answer:
        'Да, вы можете запросить подготовку резюме после прохождения одного курса. Обычно резюме составляется на основе приобретенных вами навыков и знаний, которые вы получили в процессе обучения. Это поможет вам выделиться на рынке труда и продемонстрировать работодателям, что вы уже начали развивать свои профессиональные компетенции.',
    },
    {
      question: 'В каком формате происходит подготовка резюме?',
      answer:
        'Подготовка резюме происходит в формате онлайн-консультации с нашими экспертами. Они помогут структурировать ваш опыт, выделить ключевые навыки и создать профессиональное резюме в формате PDF и DOCX, которое будет привлекательно для работодателей в сфере блокчейн-разработки.',
    },
    {
      question: 'Когда я закончу секцию вы заново подготовите резюме?',
      answer:
        'Да, после завершения каждой секции обучения мы обновляем ваше резюме, добавляя новые полученные навыки и компетенции. Это позволяет вашему резюме развиваться вместе с вашим профессиональным ростом и отражать актуальный уровень знаний.',
    },
    {
      question: 'На сколько стэпы реально совпадают с знаниями на позиции?',
      answer:
        'Наши образовательные этапы тщательно разработаны в соответствии с актуальными требованиями рынка труда. Мы регулярно адаптируем программу на основе обратной связи от работодателей и изменений в индустрии, чтобы обеспечить высокое соответствие между получаемыми знаниями и реальными требованиями к специалистам.',
    },
    {
      question: 'Такие высокие ЗП реальны?',
      answer:
        'Да, указанные зарплаты соответствуют реальному рынку блокчейн-разработки. Из-за высокого спроса на специалистов и относительно небольшого количества квалифицированных кадров, работодатели готовы предлагать конкурентные зарплаты. Однако конкретные суммы могут варьироваться в зависимости от компании, локации и вашего опыта.',
    },
    {
      question: 'Кто помогает с подготовкой резюме?',
      answer:
        'С подготовкой резюме помогают опытные HR-специалисты и карьерные консультанты, специализирующиеся на технических позициях в блокчейн-индустрии. Они хорошо знают требования работодателей и могут эффективно представить ваши навыки и опыт.',
    },
    {
      question: 'Вы поможете с трудоустройством?',
      answer:
        'Да, мы оказываем поддержку в трудоустройстве. Помимо подготовки резюме, мы предоставляем рекомендации по поиску работы, подготовке к собеседованиям, а также имеем партнерские отношения с компаниями, которые нанимают блокчейн-разработчиков. Однако окончательное решение о найме всегда остается за работодателем.',
    },
    {
      question: 'Как быстро можно пройти все 3 стэпа?',
      answer:
        'Скорость прохождения всех трех этапов зависит от вашего начального уровня, количества времени, которое вы можете уделять обучению, и вашей способности усваивать материал. В среднем, полное прохождение программы занимает от 6 до 12 месяцев при регулярных занятиях.',
    },
    {
      question: 'Куратор Андрей Симаранов?',
      answer:
        'Да, Андрей Симаранов является одним из кураторов нашей программы. Он имеет обширный опыт в блокчейн-разработке и преподавании, и помогает студентам освоить сложные концепции и практические навыки, необходимые для успешной карьеры в этой области.',
    },
  ];

  // Toggle FAQ item
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(index === openFAQIndex ? -1 : index);
  };

  return (
    <main className="border-accent border-r-0 border-l-0 sm:border-r sm:border-l">
      <div className="border-accent flex min-h-screen w-full flex-col border-b">
        <Topbar lastestUpdate={'18 марта 2025'} />

        {/* CV Progress Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-0 md:grid-cols-3">
          {/* First Column - Junior */}
          <div className="border-accent flex flex-col">
            <StageCard
              title="Этап завершен"
              completed={true}
              salaryRange="$1500 — $2000"
              position="Junior"
              progressValue={100}
            />

            <CourseSection
              position="Junior"
              opened={true}
              courses={[
                {
                  title: 'Путешествие по Solidity & DeFi',
                  lessons: '24 урока',
                  duration: '1 месяц',
                  completed: true,
                },
                {
                  title: 'Продвинутый Uniswap курс',
                  lessons: '16 урока',
                  duration: '2 месяца',
                  completed: false,
                },
              ]}
              buttonText="Подготовить резюме"
            />
          </div>

          {/* Second Column - Middle */}
          <div className="border-accent flex flex-col">
            <StageCard
              title="Этап в процессе"
              completed={false}
              salaryRange="$2000 — $5000"
              position="Middle"
              progressValue={30}
            />

            <CourseSection
              position="Middle"
              opened={true}
              courses={[
                {
                  title: 'EVM assembler & YUL',
                  lessons: 'Курс в разработке',
                  duration: '',
                  completed: false,
                },
                {
                  title: 'Криптография и математика',
                  lessons: 'Курс в разработке',
                  duration: '',
                  completed: false,
                },
                {
                  title: 'Безопасность смарт контрактов',
                  lessons: 'Курс в разработке',
                  duration: '',
                  completed: false,
                },
              ]}
              buttonText="Недоступно"
              isDisabled={true}
            />
          </div>

          {/* Third Column - Senior */}
          <div className="group flex flex-col">
            <StageCard
              title="Этап недоступен"
              completed={false}
              salaryRange="$5000 — $15000"
              position="Senior"
              progressValue={0}
            />

            <CourseSection
              position="Senior"
              opened={false}
              courses={[
                {
                  title: 'Изучение другого блокчейна (Solana, Sui)',
                  lessons: 'Курс в разработке',
                  duration: '',
                  completed: false,
                },
              ]}
              buttonText="Недоступно"
              isDisabled={true}
            />
          </div>
        </div>
        <div className="border-accent hidden h-16 shrink-0 border-y border-b-0 sm:block sm:border-b"></div>

        {/* FAQ Section */}
        <div className="flex flex-col sm:flex-row">
          {/* Left Column - FAQ Intro and Contact Info */}
          <div className="border-accent flex-1 border-t border-r-0 sm:border-t-0 sm:border-r">
            <div className="flex flex-col py-8 pt-16 pb-0 sm:pt-8 sm:pb-8">
              <div className="px-5 sm:px-8">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-foreground text-xl sm:text-2xl">
                    Раздел FAQs
                  </h2>
                  <Image src={FaqItems} alt="Close" className="h-7 w-19.5" />
                </div>
                <p className="text-secondary text-sm">
                  Мы собрали для вас топ самых популярных и часто задаваемых
                  вопросов, которые касаются раздела "Подготовка резюме".
                  <span className="text-foreground">
                    {' '}
                    Не нашли ответа? Напишите нам
                  </span>
                </p>
              </div>

              <div className="border-accent mt-8 border-b bg-[#14171C] py-6 sm:border-b-0">
                <div className="flex flex-col gap-20 px-5 sm:flex-row sm:px-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-background flex h-9.5 w-9.5 items-center justify-center rounded-full">
                        <div className="text-foreground">
                          <Image
                            src={TelegramIcon}
                            alt="Telegram"
                            className="h-9.5 w-9.5"
                          />
                        </div>
                      </div>
                    </div>
                    <Link
                      href="https://t.me/blockfirst_edu/app"
                      className="flex w-full flex-row items-center justify-between"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-secondary text-xs">
                          Телеграм бот
                        </span>
                        <span className="text-foreground text-sm">
                          t.me/blockfirst_edu/app
                        </span>
                      </div>
                      <div className="flex sm:hidden">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-auto self-end"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10.901 4.46967C11.1939 4.17678 11.6688 4.17678 11.9617 4.46967L16.9617 9.46962C17.1023 9.61027 17.1814 9.80104 17.1814 9.99995C17.1814 10.1989 17.1023 10.3896 16.9617 10.5303L11.9617 15.5303C11.6688 15.8232 11.1939 15.8232 10.901 15.5303C10.6081 15.2374 10.6081 14.7625 10.901 14.4696L14.6207 10.75H3.57422C3.16001 10.75 2.82422 10.4142 2.82422 9.99995C2.82422 9.58574 3.16001 9.24995 3.57422 9.24995H14.6207L10.901 5.53033C10.6081 5.23744 10.6081 4.76257 10.901 4.46967Z"
                            fill="#F2F2F2"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>

                  <Link
                    href="mailto:hello@blockfirst.io"
                    className="hidden gap-4 sm:flex"
                  >
                    <div className="flex-shrink-0">
                      <div className="bg-background flex h-9.5 w-9.5 items-center justify-center rounded-full">
                        <div className="text-foreground">
                          <Image
                            src={EmailIcon}
                            alt="Email"
                            className="h-9.5 w-9.5"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-secondary text-xs">E-mail</span>
                      <span className="text-foreground text-sm">
                        hello@blockfirst.io
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="flex-1">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={index === openFAQIndex}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
