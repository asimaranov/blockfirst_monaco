'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from './Section';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import DiplomaIcon from './assets/diploma.png';
import Image from 'next/image';
import { COURSES } from '~/app/lib/constants/courses';
import { useTranslations } from 'next-intl';

const competencies = [
  'Изучите блокчейны Ethereum, BSC, Polygon и библиотеки',
  'Освоите базовые принципы работы протоколов и паттернов в Web3',
  'Написание смарт-контрактов на Solidity: стейкинг, фарминг, токены, NFT-маркетплейс, DAO, кроссчейн-бриджи и IDO-платформы',
  'Писать чистый код, покрывать функциональность тестами',
  'Разрабатывать архитектуру децентрализованных приложений с нуля',
  'Поймете разницу версий Solidity',
];

export default function DiplomaPage({ session }: { session: Session }) {
  const [isSmartContractExpanded, setIsSmartContractExpanded] = useState(true);
  const [isFrontendExpanded, setIsFrontendExpanded] = useState(true);
  const t = useTranslations('UserSpace');

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
    <main className="border-accent flex min-h-screen w-full flex-col border-r border-l">
      <div className="flex flex-1 flex-col">
        <Section
          title="Smart Contract Engineer"
          tags={['Solidity', 'Смарт-контракты', 'DeFi']}
          isExpanded={isSmartContractExpanded}
          onToggle={() => setIsSmartContractExpanded(!isSmartContractExpanded)}
        >
          <div className="flex flex-row">
            <div className="flex flex-col">
              {/* NFT Diploma Section */}
              <div className="bg-background flex items-start gap-5 p-6">
                <div className="bg-background h-[61px] w-[61px] overflow-hidden rounded-lg">
                  <Image
                    src={DiplomaIcon}
                    alt="NFT Diploma"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-foreground text-2xll">NFT диплом</h2>
                  <p className="text-secondary text-xs">
                    Диплом интерактивный, после каждого курса добавится новая
                    запись о ваших новых компетенциях
                  </p>
                </div>
              </div>

              {/* Competencies Grid */}
              <div className="bg-dark-bg mb-8 grid grid-cols-2 gap-x-16 gap-y-5 p-8">
                {competencies.map((competency, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-5 w-5">
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.94922 10.65L8.54922 13.25L15.0492 6.75"
                          stroke="#195AF4"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>

                    <span className="text-foreground text-sm">
                      {competency}
                    </span>
                  </div>
                ))}
              </div>

              {/* Course List */}
              <div className="bg-dark-bg relative">
                <div className="border-accent grid grid-cols-[24px_1fr_114px_150px] items-center gap-x-10 border-b bg-[#14171C] px-8 py-3">
                  <span className="text-secondary text-xs">#</span>
                  <span className="text-secondary text-xs uppercase">
                    Название курса
                  </span>
                  <span className="text-secondary text-xs uppercase">
                    Уроки
                  </span>
                  <div className="text-secondary flex items-center justify-between text-xs uppercase">
                    <span>Прогресс</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clip-rule="evenodd"
                        d="M8.0026 1.83398C4.59685 1.83398 1.83594 4.59489 1.83594 8.00065C1.83594 11.4064 4.59685 14.1673 8.0026 14.1673C11.4084 14.1673 14.1693 11.4064 14.1693 8.00065C14.1693 4.59489 11.4084 1.83398 8.0026 1.83398ZM0.835938 8.00065C0.835938 4.04261 4.04456 0.833984 8.0026 0.833984C11.9606 0.833984 15.1693 4.04261 15.1693 8.00065C15.1693 11.9587 11.9606 15.1673 8.0026 15.1673C4.04456 15.1673 0.835938 11.9587 0.835938 8.00065ZM8.0026 6.83398C8.27875 6.83398 8.5026 7.05784 8.5026 7.33398V10.6673C8.5026 10.9435 8.27875 11.1673 8.0026 11.1673C7.72646 11.1673 7.5026 10.9435 7.5026 10.6673V7.33398C7.5026 7.05784 7.72646 6.83398 8.0026 6.83398ZM8.0026 6.00065C8.37079 6.00065 8.66927 5.70217 8.66927 5.33398C8.66927 4.96579 8.37079 4.66732 8.0026 4.66732C7.63441 4.66732 7.33594 4.96579 7.33594 5.33398C7.33594 5.70217 7.63441 6.00065 8.0026 6.00065Z"
                        fill="#9AA6B5"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col px-8">
                  {COURSES.slice(0, 3).map((course, index) => (
                    <div
                      key={course.id}
                      className="grid grid-cols-[24px_1fr_114px_150px] items-center gap-x-10 py-6 first:pt-8 last:pb-8"
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
                              <span className="text-secondary">
                                {course.info?.lessonsCount || 0}{' '}
                                {t('lesson', {
                                  count: course.info?.lessonsCount || 0,
                                })}
                              </span>
                              <div className="bg-secondary/20 h-0.5 w-0.5 rounded-full" />
                              <span className="text-secondary">
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
                        {userProgress[course.id]}/
                        {course.info?.lessonsCount || 0}
                      </span>

                      <div className="relative">
                        <div className="bg-accent h-2 w-full rounded-full">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#FFf93f] to-[#FF973f]"
                            style={{
                              width: `${((userProgress[course.id] || 0) / (course.info?.lessonsCount || 1)) * 100}%`,
                            }}
                          />
                        </div>
                        {(userProgress[course.id] || 0) > 0 && (
                          <div
                            className="absolute top-1/2 left-0 h-1 w-1 -translate-y-1/2 rounded-full bg-[#01050D]"
                            style={{
                              left: `${((userProgress[course.id] || 0) / (course.info?.lessonsCount || 1)) * 100}%`,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shadow overlay */}
                <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[76px] bg-gradient-to-b from-transparent via-[#0F121780] to-[#0F1217]" />
              </div>
            </div>
            <div className="bg-background flex h-153 w-111 shrink-0 flex-col items-center p-5">
              <div className="bg-dark-bg flex h-full w-full flex-col p-5">
                Diploma
              </div>
            </div>
          </div>
        </Section>

        <Section
          title="Frontend Developer"
          status="coming_soon"
          tags={['Кошельки', 'Смарт-контракты', 'WAGMI']}
          isExpanded={isFrontendExpanded}
          onToggle={() => setIsFrontendExpanded(!isFrontendExpanded)}
        >
          <div>{/* Frontend Developer content will go here */}</div>
        </Section>

        <div className="grid flex-1 grid-cols-3 divide-x divide-[#282D33]">
          {/* Content will go here */}
        </div>
      </div>
      <div className="border-accent h-9.5 border-t"></div>
      <Footer />
    </main>
  );
}
