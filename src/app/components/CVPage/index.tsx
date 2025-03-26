'use client';

import { useState, useRef, useEffect } from 'react';
import { Topbar } from './Topbar';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
// import CallIcon from './assets/calls.png';
// import TextIcon from './assets/text.png';
// import GridSvg from './assets/grid.svg';
// import TopGridSvg from './assets/top-grid.svg';
// import UserIcon from '../input-legends/user';
import TelegramSvg from '../input-legends/telegram';
import StatsIcon from './assets/stats-icon.svg';
import TaskSquareSvg from './assets/shop-icon.svg';
import UserSvg from './assets/user-icon.svg';

import PercentSvg from './assets/percent-icon.svg';
import BankIcon from './assets/bank-icons.png';
import InProgressFlag from './assets/in-progress-flag.svg';
import CompletedFlag from './assets/completed-flag.svg';
import LockedFlag from './assets/locked-flag.svg';
import FaqItems from './assets/faq-items-icons.png';
import TelegramIcon from './assets/telegram-cv-icon.svg';
import EmailIcon from './assets/email-cv-icon.svg';

import { InfoPopover } from '~/app/components/shared/InfoPopover';
import { Modal } from '../shared/Modal';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Lock,
  Wallet,
} from 'lucide-react';
import { ReferralTable } from './ReferralTable';
import { WithdrawForm } from './WithdrawForm';
import { Progress } from '../shared/Progress';
import ToggleMinus from '../shared/ToggleMinus/ToggleMinus';

// Add new types
type TimePeriod = any;

// Add new components
const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  badgeText,
  badgeColor = 'bg-[#14171C]',
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  badgeText?: string;
  badgeColor?: string;
}) => (
  <div className="flex flex-col gap-5 px-8 pt-6">
    <div
      className={`${badgeColor} inline-flex w-fit items-center rounded-lg px-3 py-2`}
    >
      <span
        className={`${badgeColor === 'bg-success/10' ? 'text-success' : 'text-secondary'} text-xs uppercase`}
      >
        {badgeText || title}
      </span>
    </div>
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#010514]">
          {icon}
        </div>
        <span className="text-foreground text-3xl">{value}</span>
      </div>
      <span className="text-secondary text-xs opacity-50">{subtitle}</span>
    </div>
  </div>
);

const TimePeriodSelector = ({
  value,
  onChange,
}: {
  value: TimePeriod;
  onChange: (period: TimePeriod) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const periods: { label: string; value: TimePeriod }[] = [
    { label: 'Все время', value: 'all' },
    { label: 'Последнюю неделю', value: '7d' },
    { label: 'Текущий месяц', value: '30d' },
    { label: 'Прошлый месяц', value: '90d' },
    { label: 'Позапрошлый месяц', value: 'lm' },
    { label: 'Последний год', value: 'year' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 cursor-pointer items-center gap-2 rounded-[5.787vw] bg-[#14171C] px-4 py-2.25 transition-colors hover:bg-[#1c2026]"
      >
        <span className="text-foreground text-xs">
          {periods.find((p) => p.value === value)?.label}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.67353 4.55205C2.92093 4.31134 3.31662 4.31676 3.55733 4.56415L7.00127 8.10376L10.4452 4.56415C10.6859 4.31676 11.0816 4.31134 11.329 4.55205C11.5764 4.79276 11.5818 5.18845 11.3411 5.43585L7.44922 9.43585C7.33156 9.55678 7.17 9.625 7.00127 9.625C6.83254 9.625 6.67098 9.55678 6.55331 9.43585L2.66142 5.43585C2.42071 5.18845 2.42613 4.79276 2.67353 4.55205Z"
            fill="#195AF4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-10 mt-2 w-45.5 rounded-lg bg-[#14171C] py-2 shadow-lg">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => {
                onChange(period.value);
                setIsOpen(false);
              }}
              className={`flex w-45.5 cursor-pointer flex-row items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-[#1c2026] ${
                value === period.value ? 'text-foreground' : 'text-secondary'
              } text-xs`}
            >
              {period.value == value ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                >
                  <path
                    d="M2.44922 7.65L5.04922 10.25L11.5492 3.75"
                    stroke="#195AF4"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <div className="w-3.5"></div>
              )}

              {period.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

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
  <div className="flex flex-col gap-5 p-8 pr-0 pb-0">
    <div
      className={`inline-flex w-fit items-center rounded-full border-[0.5px] px-3 py-1.5 ${completed ? 'border-success text-success' : 'border-secondary/50 text-secondary'}`}
    >
      <span className="text-xs">{title}</span>
    </div>

    <div className="flex flex-col group-last:pr-8">
      <div className="flex flex-col gap-2 pb-8">
        <h3 className="text-foreground text-2xl font-normal">{salaryRange}</h3>
        <p className="text-secondary text-xs">{position}</p>
      </div>

      <div className="relative">
        <div className="relative flex flex-row">
          <Progress
            value={progressValue}
            className="h-4 rounded-full"
            inactive={!completed && progressValue === 0}
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
      <div className="border-accent h-8 not-group-last:border-r"></div>
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
    ) : (
      <div
        className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full ${opened ? 'border border-primary' : 'border-secondary/50 border'}`}
      ></div>
    )}
    <div className="flex flex-col gap-2">
      <p className="text-foreground text-sm">{title}</p>
      <div className="text-secondary flex items-center gap-3 text-xs">
        <span>{lessons}</span>
        {duration && (
          <>
            <div className="bg-secondary/20 h-3 w-px"></div>
            <span>{duration}</span>
          </>
        )}
      </div>
    </div>
  </div>
);

const CourseSection = ({
  title,
  opened,
  courses,
  footerText,
  buttonText,
  isDisabled = false,
}: {
  title: string;
  opened: boolean;
  courses: {
    title: string;
    lessons: string;
    duration: string;
    completed: boolean;
  }[];
  footerText: string;
  buttonText: string;
  isDisabled?: boolean;
}) => (
  <div className="border-accent flex flex-1 flex-col not-group-last:border-r">
    <div className="bg-[#14171C] border-accent border-b px-8 py-4">
      <h4 className="text-secondary/50 text-xs uppercase">{title}</h4>
    </div>

    <div className="flex flex-col gap-4 px-8 py-7">
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
        className={`mx-8 flex items-center justify-center rounded-full py-3 ${isDisabled ? 'bg-secondary/10 text-secondary' : 'bg-primary text-foreground'}`}
        disabled={isDisabled}
      >
        <span className="text-sm">{buttonText}</span>
        <ChevronRight size={16} className="ml-2" />
      </button>

      <div className="bg-dark-bg border-accent border-t py-2">
        <p className="text-secondary text-center text-xs">{footerText}</p>
      </div>
    </div>
  </div>
);

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
    <div className="border-accent border-b">
      <div className="px-8 py-6">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={onClick}
        >
          <h3 className="text-foreground text-base">{question}</h3>
          <ToggleMinus
            isExpanded={isOpen}
            onToggle={onClick}
            className="h-5 w-5"
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
    <main className="border-accent border-r border-l">
      <div className="flex min-h-screen w-full flex-col">
        <Topbar lastestUpdate={'18 марта 2025'} />

        {/* CV Progress Grid */}
        <div className="mt-4 grid grid-cols-1 gap-0 md:grid-cols-3">
          {/* First Column - Junior */}
          <div className="border-accent group flex flex-col">
            <StageCard
              title="Этап завершен"
              completed={true}
              salaryRange="$1500 — $2000"
              position="Junior"
              progressValue={100}
            />

            <CourseSection
              title="курсы этапа"
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
              footerText="Закончены 2 курса"
              buttonText="Подготовить резюме"
            />
          </div>

          {/* Second Column - Middle */}
          <div className="border-accent group flex flex-col">
            <StageCard
              title="Этап в процессе"
              completed={false}
              salaryRange="$2000 — $5000"
              position="Middle"
              progressValue={30}
            />

            <CourseSection
              title="курсы этапа"
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
              footerText="Закончите 3 курса"
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
              title="курсы этапа"
              opened={false}
              courses={[
                {
                  title: 'Изучение другого блокчейна (Solana, Sui)',
                  lessons: 'Курс в разработке',
                  duration: '',
                  completed: false,
                },
              ]}
              footerText="Закончите 1 курс"
              buttonText="Недоступно"
              isDisabled={true}
            />
          </div>
        </div>
        <div className="border-accent border-accent h-8 shrink-0 border-y"></div>

        {/* FAQ Section */}
        <div className="flex flex-row">
          {/* Left Column - FAQ Intro and Contact Info */}
          <div className="border-accent flex-1 border-r">
            <div className="flex flex-col py-8">
              <div className="px-8">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-foreground text-2xl">Раздел FAQs</h2>
                  <Image src={FaqItems} alt="Close" className="h-7 w-19.5" />
                </div>
                <p className="text-secondary text-sm">
                  Мы собрали для вас топ самых популярных и часто задаваемых
                  вопросов, которые касаются раздела "Подготовка резюме". Не
                  нашли ответа? Напишите нам
                </p>
              </div>

              <div className="bg-dark-bg mt-8 py-6">
                <div className="flex gap-20 px-8">
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
                    <div className="flex flex-col gap-1">
                      <span className="text-secondary text-xs">
                        Телеграм бот
                      </span>
                      <span className="text-foreground text-base">
                        t.me/blockfirst_edu/app
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4">
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
                      <span className="text-foreground text-base">
                        hello@blockfirst.io
                      </span>
                    </div>
                  </div>
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
