'use client';

import { useState } from 'react';
import { Section } from './Section';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import DiplomaIcon from './assets/diploma.png';
import Image from 'next/image';
import { COURSES } from '~/app/lib/constants/courses';
import { useTranslations } from 'next-intl';
import LockIcon from './assets/lock.svg';
import { Diploma } from './Diploma';
import { DiplomaView } from './DiplomaView';
import CopyIcon from './assets/copy';
import ExpandIcon from './assets/expand';
import DownloadIcon from './assets/download';
import { Progress } from '../shared/Progress';
import { InfoPopover } from '../shared/InfoPopover';

const competencies = [
  'Изучите блокчейны Ethereum, BSC, Polygon и библиотеки',
  'Освоите базовые принципы работы протоколов и паттернов в Web3',
  'Написание смарт-контрактов на Solidity: стейкинг, фарминг, токены, NFT-маркетплейс, DAO, кроссчейн-бриджи и IDO-платформы',
  'Писать чистый код, покрывать функциональность тестами',
  'Разрабатывать архитектуру децентрализованных приложений с нуля',
  'Поймете разницу версий Solidity',
];

type SectionStatus = 'in_progress' | 'coming_soon' | 'completed';

interface SectionInfo {
  id: string;
  title: string;
  status: SectionStatus;
  tags: string[];
}

const SECTIONS: SectionInfo[] = [
  {
    id: 'smart-contract-engineer',
    title: 'Smart Contract Engineer',
    status: 'in_progress',
    tags: ['Solidity', 'Смарт-контракты', 'DeFi'],
  },
  {
    id: 'smart-contracts-auditor',
    title: 'Smart Contracts Auditor',
    status: 'coming_soon',
    tags: ['Web3 безопасность', 'Белый хакинг', 'Аудиты'],
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    status: 'coming_soon',
    tags: ['Кошельки', 'Смарт-контракты', 'WAGMI'],
  },
  {
    id: 'product-design',
    title: 'Product Design',
    status: 'coming_soon',
    tags: ['Интерфейсы', 'UX/UI', 'Figma'],
  },
  {
    id: 'community-manager',
    title: 'Community Manager',
    status: 'coming_soon',
    tags: ['Twitter', 'Telegram', 'Discord'],
  },
  {
    id: 'content-writer',
    title: 'Content Writer',
    status: 'coming_soon',
    tags: ['Английский', 'Копирайтинг', 'Маркетинг'],
  },
];

export default function DiplomaPage({ session }: { session: Session }) {
  const [isDiplomaExpanded, setIsDiplomaExpanded] = useState(false);
  const [sectionExpanded, setSectionExpanded] = useState<
    Record<string, boolean>
  >(
    SECTIONS.reduce(
      (acc, section) => ({
        ...acc,
        [section.id]: section.id === 'smart-contract-engineer', // Only expand first section initially
      }),
      {} as Record<string, boolean>
    )
  );
  const [diplomaStatus, setDiplomaStatus] = useState<'locked' | 'available'>(
    'locked'
  );
  const t = useTranslations('UserSpace');

  const toggleSection = (sectionId: string) => {
    setSectionExpanded((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const userProgress = {
    [COURSES[0]!.id]: 10,
    [COURSES[1]!.id]: 5,
    [COURSES[2]!.id]: 0,
    [COURSES[3]!.id]: 0,
    [COURSES[4]!.id]: 0,
    [COURSES[5]!.id]: 0,
    [COURSES[6]!.id]: 0,
  };

  return (
    <main className="border-accent flex min-h-screen w-full flex-col border-r-0 border-l-0 sm:border-r sm:border-l">
      <div className="flex flex-1 flex-col">
        <DiplomaView
          isOpen={isDiplomaExpanded}
          onClose={() => {
            console.log('close');
            setIsDiplomaExpanded(false);
          }}
        >
          <Diploma
            name="Андрей Симаранов"
            jobTitle="Smart Contract Engineer"
            uniqueCode="0xa6193A2A141d8572480fA19312B96F721ec80a4D"
            startDate="21.02.2025"
            endDate="22.04.2025"
            curatorName="Андрей Симаранов"
            curatorTitle="Основатель BlockFirst"
            skills={[
              'Освоил язык Solidity',
              'Разработка смарт-контрактов',
              'Получен опыт DeFI',
              'Может скамить на 200%',
              'Холодные продажи',
            ]}
          />
        </DiplomaView>
        <Section
          title={SECTIONS[0]!.title}
          status={SECTIONS[0]!.status}
          tags={SECTIONS[0]!.tags}
          isExpanded={sectionExpanded[SECTIONS[0]!.id] || false}
          onToggle={() => toggleSection(SECTIONS[0]!.id)}
        >
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col">
              {/* NFT Diploma Section */}
              <div className="flex items-start gap-5 bg-[url(/images/misc/diploma-header-bg-mobile.png)] bg-cover bg-no-repeat px-5 py-6 sm:bg-[url(/images/misc/diploma-header-bg.png)] sm:px-8">
                <Image
                  src={DiplomaIcon}
                  alt="NFT Diploma"
                  className="w-10 h-10 sm:w-15 sm:h-15 object-cover"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="text-foreground text-2xll leading-8.25">
                    NFT диплом
                  </h2>
                  <p className="text-secondary text-sm sm:text-xs">
                    Диплом интерактивный, после каждого курса добавится новая
                    запись о ваших новых компетенциях
                  </p>
                </div>
              </div>

              {/* Competencies Grid */}
              <div className="bg-dark-bg grid grid-cols-1 gap-x-16 gap-y-5 p-5 sm:grid-cols-2 sm:p-8">
                {competencies.map((competency, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-5 w-5">
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                      >
                        <path
                          d="M5.94922 10.65L8.54922 13.25L15.0492 6.75"
                          stroke="#195AF4"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <span className="text-foreground text-sm">
                      {competency}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-secondary/50 mt-5 mb-2 flex w-full shrink-0 gap-7.75 bg-[#14171C] px-5 py-4 sm:hidden">
                <span className="text-sm uppercase">#</span>
                <span className="text-sm uppercase">Название курса</span>
                <InfoPopover
                  title="Прогресс обучения"
                  content="По завершении курса ваша новая компетенция будет отражена в интерактивном дипломе, который можно дополнить новыми компетенциями  в зависимости от пройденных курсов."
                  className="ml-auto"
                />
              </div>

              {/* Course List */}
              <div className="bg-dark-bg relative">
                <div className="border-accent hidden grid-cols-[calc(6*var(--spacing))_1fr_calc(28.5*var(--spacing))_calc(37.5*var(--spacing))] items-center gap-x-5 bg-[#14171C] px-8 py-2.75 sm:grid">
                  <span className="text-secondary text-xs opacity-50">#</span>
                  <span className="text-secondary text-xs uppercase opacity-50">
                    Название курса
                  </span>
                  <span className="text-secondary text-xs uppercase opacity-50">
                    Уроки
                  </span>

                  <div className="text-secondary flex items-center justify-between">
                    <span className="text-xs uppercase opacity-50">
                      Прогресс
                    </span>
                    <InfoPopover
                      title="Прогресс обучения"
                      content="По завершении курса ваша новая компетенция будет отражена в интерактивном дипломе, который можно дополнить новыми компетенциями  в зависимости от пройденных курсов."
                    />
                  </div>
                </div>

                <div className="max-h-85 overflow-y-auto">
                  {/* Desktop view */}
                  <div className="hidden px-8 sm:flex sm:flex-col">
                    {COURSES.map((course, index) => (
                      <div
                        key={course.id}
                        className="grid grid-cols-[calc(6*var(--spacing))_1fr_calc(28.5*var(--spacing))_calc(37.5*var(--spacing))] items-center gap-x-5 py-3 first:pt-7 last:pb-8"
                      >
                        <div className="flex h-6 w-6 items-center justify-center">
                          <span className="text-secondary text-sm">
                            {index + 1}.
                          </span>
                        </div>

                        <div className="flex items-center gap-5">
                          <div className="h-10 w-10 overflow-hidden rounded-lg bg-[#01050D]">
                            <img
                              src={course.smallImg}
                              alt={course.title}
                              className="h-full w-full object-cover mix-blend-lighten"
                            />
                          </div>
                          <div className="flex flex-col gap-3">
                            <span className="text-foreground text-sm">
                              {course.title}
                            </span>
                            {(course.info?.lessonsCount || 0) > 0 ? (
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-secondary text-xxs uppercase">
                                  {course.info?.lessonsCount || 0}{' '}
                                  {t('lesson', {
                                    count: course.info?.lessonsCount || 0,
                                  })}
                                </span>
                                <div className="bg-secondary/20 h-0.5 w-0.5 rounded-full" />
                                <span className="text-secondary text-xxs uppercase">
                                  {course.info?.duration || 0}{' '}
                                  {t('month', {
                                    count: course.info?.duration || 0,
                                  })}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-secondary">—</span>
                                <div className="bg-secondary/20 h-0.5 w-0.5 rounded-full" />
                                <span className="text-secondary">—</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <span className="text-foreground text-sm">
                          {userProgress[course.id]}
                          <span className="text-secondary text-xs">
                            /{course.info?.lessonsCount || 0}
                          </span>
                        </span>

                        <div className="relative">
                          <Progress
                            inactive={!!course.soon}
                            value={userProgress[course.id]}
                            max={course.info?.lessonsCount || 0}
                            className="h-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile view */}
                  <div className="flex flex-col sm:hidden">
                    {COURSES.map((course, index) => (
                      <div key={course.id} className="flex flex-col last:mb-8">
                        <div className="flex px-4 py-6">
                          <div className="mt-2.5 mr-4 flex h-6 w-6 items-center justify-center self-start">
                            <span className="text-secondary text-sm">
                              {index + 1}.
                            </span>
                          </div>
                          <div className="flex gap-4">
                            <div className="h-10 w-10 self-start overflow-hidden rounded-lg bg-[#01050D]">
                              <img
                                src={course.smallImg}
                                alt={course.title}
                                className="h-full w-full object-cover mix-blend-lighten"
                              />
                            </div>
                            <div className="flex flex-col gap-3">
                              <span className="text-foreground text-sm leading-4">
                                {course.title}
                              </span>
                              {(course.info?.lessonsCount || 0) > 0 ? (
                                <div className="flex items-center gap-3 text-xs leading-3">
                                  <span className="text-secondary text-xxs uppercase">
                                    {course.info?.lessonsCount || 0}{' '}
                                    {t('lesson', {
                                      count: course.info?.lessonsCount || 0,
                                    })}
                                  </span>
                                  <div className="bg-secondary/20 h-0.5 w-0.5 rounded-full" />
                                  <span className="text-secondary text-xxs uppercase">
                                    {course.info?.duration || 0}{' '}
                                    {t('month', {
                                      count: course.info?.duration || 0,
                                    })}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-3 text-xs">
                                  <span className="text-secondary">—</span>
                                  <div className="bg-secondary/20 h-0.5 w-0.5 rounded-full" />
                                  <span className="text-secondary">—</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full px-10">
                          <div className="w-4 sm:w-10"></div>
                          <div className="relative h-2 flex-1">
                            <Progress
                              inactive={!!course.soon}
                              value={userProgress[course.id]}
                              max={course.info?.lessonsCount || 0}
                              className="h-2 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shadow overlay */}
                <div className="pointer-events-none absolute right-0 bottom-[-1px] left-0 h-14 bg-gradient-to-b from-transparent via-[#0F121780] to-[#0F1217]" />
              </div>
            </div>
            <div className="bg-background @container flex h-full w-full flex-col pb-0">
              <div className="p-5">
                <Diploma
                  locked={diplomaStatus === 'locked'}
                  name="Андрей Симаранов"
                  jobTitle="Smart Contract Engineer"
                  uniqueCode="0xa6193A2A141d8572480fA19312B96F721ec80a4D"
                  startDate="21.02.2025"
                  endDate="22.04.2025"
                  curatorName="Андрей Симаранов"
                  curatorTitle="Основатель BlockFirst"
                  skills={[
                    'Освоил язык Solidity',
                    'Разработка смарт-контрактов',
                    'Получен опыт DeFI',
                    'Может скамить на 200%',
                    'Холодные продажи',
                  ]}
                />
              </div>
              {diplomaStatus === 'locked' && (
                <div
                  className="bg-background text-secondary flex flex-row items-center justify-center gap-2 py-3 text-xs opacity-50"
                  onClick={() => setDiplomaStatus('available')}
                >
                  <Image src={LockIcon} alt="Lock" className="h-4 w-4" />
                  Недоступен
                </div>
              )}
              {diplomaStatus === 'available' && (
                <div className="grid w-full cursor-pointer grid-cols-3 items-center justify-center gap-2">
                  <div
                    className="hover:bg-foreground group flex flex-row items-center justify-center py-3.5"
                    onClick={() => setIsDiplomaExpanded(true)}
                  >
                    <ExpandIcon />
                  </div>
                  <div
                    className="hover:bg-foreground group flex flex-row items-center justify-center py-3.5"
                    onClick={() => {
                      setDiplomaStatus('locked');
                    }}
                  >
                    <CopyIcon />
                  </div>
                  <div className="hover:bg-foreground group flex flex-row items-center justify-center py-3.5">
                    <DownloadIcon />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>
        {SECTIONS.slice(1).map((section) => (
          <Section
            key={section.id}
            title={section.title}
            status={section.status}
            tags={section.tags}
            isExpanded={sectionExpanded[section.id] || false}
            onToggle={() => {}}
          >
            <div>
              {/* Content for the {section.title} section will go here */}
            </div>
          </Section>
        ))}
      </div>
      <Footer />
    </main>
  );
}
