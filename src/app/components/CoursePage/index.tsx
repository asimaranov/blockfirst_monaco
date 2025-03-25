'use client';

import { useState } from 'react';
import { Topbar } from './Topbar';
import { COURSES, ICourse } from '~/app/lib/constants/courses';
import { Skeleton } from '~/app/components/shared/Skeleton';
import { CourseInfoTopCard } from '~/app/components/CourseInfoTopCard';
import { CourseCard } from '~/app/components/CourseCard/CourseCard';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import StarterBadge from './bages/starter_badge.png';
import ProBadge from './bages/pro_badge.png';
import GridSvg from './assets/grid.svg';
import Image from 'next/image';
import { InfoPopover } from '../shared/InfoPopover';
import Link from 'next/link';

const Tariffs = [
  {
    name: 'Starter',
    price: 100,
    sale: 0,
    features: ['Все материалы курса', 'Авто проверка ваших задач'],
    badgeSvg: StarterBadge,
  },
  {
    name: 'Pro',
    price: 100,
    sale: 16,
    features: [
      'Включая все с Starter',
      'Премиумные материалы и задачи',
      'Персональный ai ментор и.т.д',
    ],
    badgeSvg: ProBadge,
  },
];

const courseStructure = [
  {
    id: 1,
    title: 'Мир токенов',
    status: 'available',
    lessons: [
      'Видеолекция – Введение в solidity',
      'Путешествие начинается – типы данных в первой лексеме',
      'Отображение и адреса – типы данных и работу с ними в первой лексеме',
      'Утверждения и видимость – изучаем вложенные отображения, утверждения',
      'События – узнайте, зачем контрактам нужны события',
      'Десятичные числа – узнайте, как работать с плавающими точками',
      'Изучите openzeppelin, Erc20',
    ],
  },
  {
    id: 2,
    title: 'Основы блокчейна и стэйкинг',
    status: 'starter',
    lessons: [
      'Лекция как работает блокчейн – txs, ноды, консенсус, mempool',
      'Практика работы со стакинг–контрактами – учимся работать со временем',
      'Практика работы со стабконтрактами – изучить кросс–контрактный вызов',
      'Практика стабконтракта – изучаем openzeppelin',
      'Практика заключения контрактов – изучить получение, оплату в ethereum',
      'Практика заключения контрактов – изучить получение ethereum, тестирование',
      'Практика ставочных контрактов – uniswap lp token & liquidity staking',
    ],
  },
  {
    id: 3,
    title: 'Основы блокчейна и мультисиг',
    status: 'starter',
  },
  {
    id: 4,
    title: 'Основы блокчейна и NFT',
    status: 'starter',
  },
];

export default function CoursePage({
  session,
  courseId,
}: {
  session: Session;
  courseId: string;
}) {
  const course = COURSES.find((x) => x.id === courseId)!;

  return (
    <main className="border-accent border-r border-l">
      <Topbar
        courseAuthor={course?.info?.author.name ?? ''}
        courseAuthorAvatar={course?.info?.author.image ?? ''}
      />
      <div className="border-accent mb-9.5 grid grid-cols-2 border-b">
        <CourseInfoTopCard course={course} />
        <div className="border-accent flex flex-col border-l">
          {/* Top section with Starter and Pro blocks */}
          <div className="border-accent divide-accent flex flex-row divide-x border-b">
            {Tariffs.map((tariff) => (
              <div className="flex-1" key={tariff.name}>
                <div className="flex flex-col">
                  {/* Dark header */}
                  <div className="relative h-20 bg-[#01050D]">
                    <div className="pointer-events-none absolute inset-0 z-[1] opacity-50 mix-blend-soft-light">
                      <div className="bg-gradient-radial h-full w-full from-gray-100 to-transparent" />
                    </div>
                    <div className="relative z-[2] px-8 py-5">
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#01050D]">
                            <Image
                              src={tariff.badgeSvg}
                              alt=""
                              className="h-10 w-10 rounded-full"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                              <span className="text-base">{tariff.name}</span>
                              {!!tariff.sale && (
                                <span className="bg-error rounded-full px-2 py-1 text-xs">
                                  Sale {tariff.sale}%
                                </span>
                              )}
                            </div>
                            <div className="text-secondary text-xs">
                              Платный тариф
                            </div>
                          </div>
                        </div>
                        <Link href="/pricing">
                          <div className="h-6 w-6 cursor-pointer hover:opacity-50">
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className='h-6 w-6'
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12.901 6.96967C13.1939 6.67678 13.6688 6.67678 13.9617 6.96967L18.9617 11.9696C19.1023 12.1103 19.1814 12.301 19.1814 12.4999C19.1814 12.6989 19.1023 12.8896 18.9617 13.0303L13.9617 18.0303C13.6688 18.3232 13.1939 18.3232 12.901 18.0303C12.6081 17.7374 12.6081 17.2625 12.901 16.9696L16.6207 13.25H5.57422C5.16001 13.25 4.82422 12.9142 4.82422 12.5C4.82422 12.0857 5.16001 11.75 5.57422 11.75H16.6207L12.901 8.03033C12.6081 7.73744 12.6081 7.26257 12.901 6.96967Z"
                                fill="#F2F2F2"
                              />
                            </svg>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <Image
                      className="absolute inset-0 right-0 bottom-0 z-[0] w-78.5 h-20.25"
                      src={GridSvg}
                      alt=""
                    />
                  </div>
                  {/* Features list */}
                  <div className="flex flex-col">
                    {tariff.features.map((feature) => (
                      <div
                        className="flex h-11 items-center px-8 odd:bg-[#14171C]"
                        key={feature}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="Check - Circle">
                                <path
                                  id="Vector"
                                  d="M5.44922 10.65L8.04922 13.25L14.5492 6.75"
                                  stroke="#195AF4"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                            </svg>
                          </div>
                          <span className="text-xs">{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-9.5 w-full"></div>

          {/* Bottom section with stats */}
          <div className="border-accent divide-accent flex flex-row divide-x border-t border-b">
            {/* Tasks stat */}
            <div className="flex-1 px-8 py-5">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-3">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className='h-9 w-9'
                  >
                    <rect width="36" height="36" rx="18" fill="#01050D" />
                    <path
                      d="M20.792 11.3335H15.2054C12.7787 11.3335 11.332 12.7802 11.332 15.2068V20.7868C11.332 23.2202 12.7787 24.6668 15.2054 24.6668H20.7854C23.212 24.6668 24.6587 23.2202 24.6587 20.7935V15.2068C24.6654 12.7802 23.2187 11.3335 20.792 11.3335ZM17.2987 21.6735C17.1054 21.8668 16.7387 22.0535 16.472 22.0935L14.832 22.3268C14.772 22.3335 14.712 22.3402 14.652 22.3402C14.3787 22.3402 14.1254 22.2468 13.9454 22.0668C13.7254 21.8468 13.632 21.5268 13.6854 21.1735L13.9187 19.5335C13.9587 19.2602 14.1387 18.9002 14.3387 18.7068L17.312 15.7335C17.3654 15.8735 17.4187 16.0135 17.492 16.1735C17.5587 16.3135 17.632 16.4602 17.712 16.5935C17.7787 16.7068 17.852 16.8135 17.912 16.8935C17.9854 17.0068 18.072 17.1135 18.1254 17.1735C18.1587 17.2202 18.1854 17.2535 18.1987 17.2668C18.3654 17.4668 18.5587 17.6535 18.7254 17.7935C18.772 17.8402 18.7987 17.8668 18.812 17.8735C18.912 17.9535 19.012 18.0335 19.0987 18.0935C19.2054 18.1735 19.312 18.2468 19.4254 18.3068C19.5587 18.3868 19.7054 18.4602 19.852 18.5335C20.0054 18.6002 20.1454 18.6602 20.2854 18.7068L17.2987 21.6735ZM21.5787 17.3935L20.9654 18.0135C20.9254 18.0535 20.872 18.0735 20.8187 18.0735C20.7987 18.0735 20.772 18.0735 20.7587 18.0668C19.4054 17.6802 18.3254 16.6002 17.9387 15.2468C17.9187 15.1735 17.9387 15.0935 17.992 15.0468L18.612 14.4268C19.6254 13.4135 20.592 13.4335 21.5854 14.4268C22.092 14.9335 22.3387 15.4202 22.3387 15.9268C22.332 16.4068 22.0854 16.8868 21.5787 17.3935Z"
                      fill="#F2F2F2"
                    />
                  </svg>

                  <span className="text-2xl text-gray-100">100+</span>
                </div>
                <span className="text-xs text-gray-400">Задач в курсе</span>
              </div>
            </div>

            {/* Tests stat */}
            <div className="border-accent flex-1 px-8 py-5">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-3">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className='h-9 w-9'
                  >
                    <rect width="36" height="36" rx="18" fill="#01050D" />
                    <path
                      d="M20.7959 11.3335H15.2093C12.7826 11.3335 11.3359 12.7802 11.3359 15.2068V20.7935C11.3359 23.2202 12.7826 24.6668 15.2093 24.6668H20.7959C23.2226 24.6668 24.6693 23.2202 24.6693 20.7935V15.2068C24.6693 12.7802 23.2226 11.3335 20.7959 11.3335ZM16.6493 19.9335L15.1493 21.4335C15.0493 21.5335 14.9226 21.5802 14.7959 21.5802C14.6693 21.5802 14.5359 21.5335 14.4426 21.4335L13.9426 20.9335C13.7426 20.7402 13.7426 20.4202 13.9426 20.2268C14.1359 20.0335 14.4493 20.0335 14.6493 20.2268L14.7959 20.3735L15.9426 19.2268C16.1359 19.0335 16.4493 19.0335 16.6493 19.2268C16.8426 19.4202 16.8426 19.7402 16.6493 19.9335ZM16.6493 15.2668L15.1493 16.7668C15.0493 16.8668 14.9226 16.9135 14.7959 16.9135C14.6693 16.9135 14.5359 16.8668 14.4426 16.7668L13.9426 16.2668C13.7426 16.0735 13.7426 15.7535 13.9426 15.5602C14.1359 15.3668 14.4493 15.3668 14.6493 15.5602L14.7959 15.7068L15.9426 14.5602C16.1359 14.3668 16.4493 14.3668 16.6493 14.5602C16.8426 14.7535 16.8426 15.0735 16.6493 15.2668ZM21.7093 21.0802H18.2093C17.9359 21.0802 17.7093 20.8535 17.7093 20.5802C17.7093 20.3068 17.9359 20.0802 18.2093 20.0802H21.7093C21.9893 20.0802 22.2093 20.3068 22.2093 20.5802C22.2093 20.8535 21.9893 21.0802 21.7093 21.0802ZM21.7093 16.4135H18.2093C17.9359 16.4135 17.7093 16.1868 17.7093 15.9135C17.7093 15.6402 17.9359 15.4135 18.2093 15.4135H21.7093C21.9893 15.4135 22.2093 15.6402 22.2093 15.9135C22.2093 16.1868 21.9893 16.4135 21.7093 16.4135Z"
                      fill="#F2F2F2"
                    />
                  </svg>

                  <span className="text-2xl text-gray-100">45+</span>
                </div>
                <span className="text-secondary text-xs">
                  Практических тестов
                </span>
              </div>
            </div>

            {/* Lectures stat */}
            <div className="flex-1 px-8 py-5">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-3">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className='h-9 w-9'
                  >
                    <rect width="36" height="36" rx="18" fill="#01050D" />
                    <path
                      d="M22.0013 18.6665C20.1613 18.6665 18.668 20.1598 18.668 21.9998C18.668 23.8398 20.1613 25.3332 22.0013 25.3332C23.8413 25.3332 25.3346 23.8398 25.3346 21.9998C25.3346 20.1598 23.8413 18.6665 22.0013 18.6665ZM21.4413 22.8465C21.608 23.0132 21.608 23.2865 21.4413 23.4598C21.3546 23.5465 21.248 23.5865 21.1346 23.5865C21.0213 23.5865 20.9146 23.5465 20.828 23.4598L19.6746 22.3065C19.508 22.1398 19.508 21.8665 19.6746 21.6932L20.828 20.5398C20.9946 20.3732 21.268 20.3732 21.4413 20.5398C21.608 20.7065 21.608 20.9798 21.4413 21.1532L20.5946 21.9998L21.4413 22.8465ZM24.3213 22.3065L23.168 23.4598C23.0813 23.5465 22.9746 23.5865 22.8613 23.5865C22.748 23.5865 22.6413 23.5465 22.5546 23.4598C22.388 23.2932 22.388 23.0198 22.5546 22.8465L23.408 21.9998L22.5613 21.1532C22.3946 20.9865 22.3946 20.7132 22.5613 20.5398C22.728 20.3732 23.0013 20.3732 23.1746 20.5398L24.328 21.6932C24.488 21.8665 24.488 22.1332 24.3213 22.3065Z"
                      fill="#F2F2F2"
                    />
                    <path
                      d="M24 14.6665V17.6465C24 17.8799 23.7733 18.0399 23.56 17.9599C22.82 17.6732 21.9933 17.5799 21.1267 17.7532C19.3933 18.0999 18.0133 19.5199 17.7267 21.2665C17.5533 22.3332 17.7667 23.3399 18.2533 24.1599C18.3867 24.3865 18.2267 24.6665 17.9667 24.6665H15.3333C13 24.6665 12 23.3332 12 21.3332V14.6665C12 12.8932 12.7867 11.6465 14.5933 11.3865C14.7867 11.3599 14.96 11.5132 14.9667 11.7132L14.9867 12.3865C15.0067 13.4532 15.9067 14.3332 16.9867 14.3332H19C20.1 14.3332 21 13.4332 21 12.3332V11.7132C21 11.5132 21.1733 11.3532 21.3667 11.3799C23.2 11.6265 24 12.8799 24 14.6665Z"
                      fill="#F2F2F2"
                    />
                    <path
                      d="M19.9998 12.0002V12.3335C19.9998 12.8802 19.5464 13.3335 18.9998 13.3335H16.9798C16.4398 13.3335 15.9931 12.9002 15.9798 12.3602L15.9731 12.0202C15.9598 11.6402 16.2598 11.3335 16.6398 11.3335H19.3331C19.6998 11.3335 19.9998 11.6335 19.9998 12.0002Z"
                      fill="#F2F2F2"
                    />
                  </svg>

                  <span className="text-2xl">30+</span>
                </div>
                <span className="text-secondary text-xs">Лекций в курсе</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between px-8 py-4">
            <span className="text-secondary/50 text-xs uppercase">
              Структура курса
            </span>
            <InfoPopover
              position="right"
              title="Структура курса заблокирована?"
              content="Первая глава доступна бесплатно, остальные — по подписке. После оплаты главы будут разблокированы по мере прохождения."
            >
              <div className="flex flex-col gap-4 pt-5">
                {[
                  {
                    type: 'available',
                    text: 'Доступно для прохождения',
                  },
                  {
                    type: 'starter',
                    text: 'Требуется оплата тарифа',
                  },
                  {
                    type: 'upcoming',
                    text: 'По мере прохождения разблокируется',
                  },
                  {
                    type: 'completed',
                    text: 'Завершенный курс',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="font-delight flex items-center gap-3"
                  >
                    {item.type === 'available' && (
                      <div className="flex h-6 w-22 items-center gap-1 rounded-lg bg-[#33CF89]/10 px-2">
                        <div className="h-1 w-1 rounded-full bg-[#33CF89]" />
                        <span className="text-xs text-[#33CF89]">
                          Available
                        </span>
                      </div>
                    )}

                    {item.type === 'starter' && (
                      <div className="flex h-6 w-22 items-center gap-1 rounded-lg bg-gradient-to-r from-[#FF20A2]/10 to-[#FF2020]/10 px-2">
                        <div className="h-1 w-1 rounded-full bg-[#FF20A2]" />
                        <span className="bg-gradient-to-r from-[#FF20A2] to-[#FF2020] bg-clip-text text-xs text-transparent">
                          STARTER
                        </span>
                      </div>
                    )}

                    {item.type === 'upcoming' && (
                      <div className="flex h-6 w-22 items-center gap-1 rounded-lg bg-[#9AA6B5]/10 px-2">
                        <div className="h-1 w-1 rounded-full bg-[#9AA6B5]" />
                        <span className="text-xs text-[#9AA6B5]">Upcoming</span>
                      </div>
                    )}

                    {item.type === 'completed' && (
                      <div className="flex h-6 w-22 items-center gap-1 rounded-lg bg-[#9AA6B5]/10 px-2 opacity-50">
                        <div className="h-1 w-1 rounded-full bg-[#9AA6B5]" />
                        <span className="text-xs text-[#9AA6B5]">
                          Completed
                        </span>
                      </div>
                    )}

                    <span className="text-xs text-white">{item.text}</span>
                  </div>
                ))}
              </div>
            </InfoPopover>
          </div>
          <div className="flex flex-col gap-8">
            {courseStructure.map((section, index) => (
              <div key={section.id} className="flex flex-col">
                <div className="flex cursor-pointer items-center justify-between bg-[#14171C] px-8 py-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#01050D]">
                      <span className="text-xs text-gray-100">
                        {section.id}
                      </span>
                    </div>
                    <span className="text-base">{section.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`h-1 w-1 rounded-full ${section.status === 'available' ? 'bg-[#33CF89]' : 'bg-[#FF2052]'}`}
                    />
                    <span
                      className={`text-xs ${
                        section.status === 'available'
                          ? 'text-[#33CF89]'
                          : 'bg-gradient-to-r from-[#FF20A2] to-[#FF2020] bg-clip-text text-transparent'
                      }`}
                    >
                      {section.status === 'available' ? 'Available' : 'STARTER'}
                    </span>
                  </div>
                </div>
                {section.lessons && (
                  <div className="flex flex-col gap-4 px-8 pt-5">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="flex items-center gap-1"
                      >
                        <div className="flex h-5 w-5 items-center justify-center">
                          <div className="h-1 w-1 rounded-full bg-[#9AA6B5] opacity-50" />
                        </div>
                        <span className="text-sm text-gray-100">
                          {lesson.split(' – ')[0]}{' '}
                          {lesson.split(' – ')[1] && (
                            <span className="text-secondary">
                              {' '}
                              – {lesson.split(' – ')[1]}
                            </span>
                          )}{' '}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
