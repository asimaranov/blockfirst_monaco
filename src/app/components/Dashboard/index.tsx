'use client';

import { useState } from 'react';
import { Topbar } from '~/app/components/Dashboard/Topbar';
import { ICourse } from '~/app/lib/types/ICourse';
import { Skeleton } from '~/app/components/shared/Skeleton';
import { CourseTopCard } from '~/app/components/CourseTopCard';
import { CourseCard } from '~/app/components/CourseCard/CourseCard';
import { Session } from '~/server/auth';

export default function Dashboard({ session }: { session: Session }) {
  const courses: ICourse[] = [
    {
      id: 'solidity-defi',
      title: 'Путешествие по Solidity & DeFi',
      description:
        'Помогите Алексу создать свой собственный токен, продать его инвесторам, внедрить стейкинг, наделение правами, мультисигму...',
      smallImg: '/courses/solidity/small.png',
      bigImg: '/courses/solidity/big.png',
      soon: false,
      info: {
        labelTitle: 'Solidity & Defi',
        rating: 4.9,
        alumniCount: 1289,
        lessonsCount: 24,
        duration: 1,
        author: { name: 'Автор 1', image: '#' },
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        labelImg: '/courses/solidity/label.svg',
      },
    },
    {
      id: 'uniswap_advanced',
      title: 'Продвинутый Uniswap курс',
      description:
        'Реализуйте свой собственный uniswap с нуля и помогите Алексу запустить его новую блестящую ...',
      smallImg: '/courses/uniswap/small.png',
      bigImg: '/courses/uniswap/big.png',
      soon: false,
      info: {
        labelTitle: 'Uniswap',
        rating: 5,
        alumniCount: 789,
        lessonsCount: 12,
        duration: 2,
        author: { name: 'Автор 2', image: '#' },
        updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        labelImg: '/courses/uniswap/label.svg',
      },
    },
    {
      id: 'lending_advanced',
      title: 'Передовое кредитование',
      description:
        'Исследуйте архитектуру AAVE и Compound и сделайте лучший проект по кредитованию ...',
      smallImg: '/courses/aave_compound/small.png',
      bigImg: '/courses/aave_compound/big.png',
      soon: true,
    },
    {
      id: 'solidity_advanced',
      title: 'Продвинутый Solidity курс',
      description:
        'Изучение сложных подписей, оракулов, ценовых факторов, построение calldata, работа с multicall ...',
      smallImg: '/courses/solidity_advanced/small.png',
      bigImg: '/courses/solidity_advanced/big.png',
      soon: true,
    },
    {
      id: 'crypto_advanced',
      title: 'Криптография и математика',
      description:
        'Узнайте что такое эллиптическая кривая, узнайте, как рассчитать подпись своими руками. Изучите...',
      smallImg: '/courses/cryptography/small.png',
      bigImg: '/courses/cryptography/big.png',
      soon: true,
    },
    {
      id: 'evm_assembler',
      title: 'EVM assembler & YUL язык',
      description:
        'Изучите ассемблерные опкоды, научитесь писать ассемблерные вставки, использовать ассемблер...',
      smallImg: '/courses/evm_assembler_yul/small.png',
      bigImg: '/courses/evm_assembler_yul/big.png',
      soon: true,
    },
    {
      id: 'upgradeable_contracts',
      title: 'Обновляемые контракты',
      description:
        'Помогите Алексу сделать логику контрактов обновляемой. Изучите типы прокси...',
      smallImg: '/courses/upgradeable/small.png',
      bigImg: '/courses/upgradeable/big.png',
      soon: true,
    },
    {
      id: 'gas_advanced',
      title: 'Усовершенствованная оптимизация газа',
      description:
        'Cэкономите деньги Алекса и его пользователей, изучив и используя передовые...',
      smallImg: '/courses/advanced_gas/small.png',
      bigImg: '/courses/advanced_gas/big.png',
      soon: true,
    },
    {
      id: 'wagmi',
      title: 'Wagmi',
      description:
        'Узнаете как написать надежный и современный фронтенд для смартконтрактов. Работа с событиями, EVM, кросс...',
      smallImg: '/courses/wagmi/small.png',
      bigImg: '/courses/wagmi/big.png',
      soon: true,
    },
  ];

  const lastUpdate = new Date(
    Math.min(
      ...courses
        .filter((x) => !x.soon)
        .map((course) => new Date(course.info!.updatedAt).getTime())
    )
  ).toLocaleDateString('ru-RU');

  const [dashboardSection, setDashboardSection] = useState<
    'courses' | 'history'
  >('courses');

  return (
    <main className="border-accent border-r border-l">
      <Topbar
        lastestUpdate={lastUpdate}
        items={[
          {
            label: 'Курсы',
            onClick: () => setDashboardSection('courses'),
            active: dashboardSection === 'courses',
          },
          {
            label: 'История',
            onClick: () => setDashboardSection('history'),
            active: dashboardSection === 'history',
          },
        ]}
      />
      <div className="grid grid-cols-1 gap-8">
        {dashboardSection === 'courses' && (
          <>
            {courses?.[0] ? (
              <CourseTopCard course={courses[0]} />
            ) : (
              <Skeleton className="h-[354px] w-full" />
            )}
            <section className="divide [&>*]:border-accent divide-accent border-accent mb-[37px] grid grid-cols-1 gap-y-9 divide-x-1 sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-y">
              {courses.slice(1).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
              {Array.from({ length: 3 - ((courses.length - 1) % 3) }).map(
                (_, index) => (
                  <div key={index}></div>
                )
              )}
            </section>
          </>
        )}
        {dashboardSection === 'history' && (
          <section className="divide [&>*]:border-accent divide-accent border-accent mb-[37px] grid grid-cols-1 gap-y-9 divide-x-1 sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-y">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
            {Array.from({ length: 3 - (courses.length % 3) }).map(
              (_, index) => (
                <div key={index}></div>
              )
            )}
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-background border-accent border-t pt-16">
        {/* Top section */}
        <div className="mb-16 flex w-full px-8">
          {/* Newsletter signup */}
          <div className="flex max-w-75 flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl">Новости. Скидки. Анонсы</h3>
              <p className="text-sm text-[#9AA5B5]">
                Подписываясь на рассылку, вы можете быть уверены, что мы не
                будем спамить Вам :)
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <input
                  type="email"
                  placeholder="Электронная почта"
                  className="text-foreground placeholder:text-secondary h-full w-full bg-transparent text-sm placeholder:opacity-50 focus:outline-hidden"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                />
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-secondary cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.401 4.46943C11.6939 4.17653 12.1688 4.17653 12.4617 4.46942L17.4617 9.46937C17.6023 9.61003 17.6814 9.80079 17.6814 9.9997C17.6814 10.1986 17.6023 10.3894 17.4617 10.53L12.4617 15.53C12.1688 15.8229 11.6939 15.8229 11.401 15.53C11.1081 15.2371 11.1081 14.7623 11.401 14.4694L15.1207 10.7497H4.07422C3.66001 10.7497 3.32422 10.4139 3.32422 9.99971C3.32422 9.58549 3.66001 9.24971 4.07422 9.24971H15.1207L11.401 5.53009C11.1081 5.2372 11.1081 4.76232 11.401 4.46943Z"
                    fill="#F2F2F2"
                  />
                </svg>
                {/* <span className="mr-auto text-sm">Your E-mail</span>
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-secondary"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.401 4.46943C11.6939 4.17653 12.1688 4.17653 12.4617 4.46942L17.4617 9.46937C17.6023 9.61003 17.6814 9.80079 17.6814 9.9997C17.6814 10.1986 17.6023 10.3894 17.4617 10.53L12.4617 15.53C12.1688 15.8229 11.6939 15.8229 11.401 15.53C11.1081 15.2371 11.1081 14.7623 11.401 14.4694L15.1207 10.7497H4.07422C3.66001 10.7497 3.32422 10.4139 3.32422 9.99971C3.32422 9.58549 3.66001 9.24971 4.07422 9.24971H15.1207L11.401 5.53009C11.1081 5.2372 11.1081 4.76232 11.401 4.46943Z"
                    fill="#F2F2F2"
                  />
                </svg> */}
              </div>
              <div className="h-[1px] w-full bg-[#282F33]"></div>
            </div>
          </div>
          <div className="flex-grow"></div>

          {/* Links section */}
          <div className="ml-auto flex gap-16 lg:justify-end">
            <div className="flex flex-col gap-8">
              <span className="text-secondary text-xs uppercase opacity-50">
                Медиа
              </span>
              <div className="flex flex-col gap-6 text-sm">
                <a href="#" className="hover:opacity-50">
                  Youtube
                </a>
                <a href="#" className="hover:opacity-50">
                  Twitter
                </a>
                <a href="#" className="hover:opacity-50">
                  Medium
                </a>
                <a href="#" className="hover:opacity-50">
                  Telegram
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <span className="text-secondary text-xs uppercase opacity-50">
                Сообщество
              </span>
              <div className="flex flex-col gap-6 text-sm">
                <a href="#" className="hover:opacity-50">
                  Блог
                </a>
                <a href="#" className="hover:opacity-50">
                  Статьи
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <span className="text-secondary text-xs uppercase opacity-50">
                Компания
              </span>
              <div className="flex flex-col gap-6 text-sm">
                <a href="#" className="hover:opacity-50">
                  Стоимость
                </a>
                <a href="#" className="hover:opacity-50">
                  F.A.Q
                </a>
                <a href="#" className="hover:opacity-50">
                  Курс Solidity
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="divide-accent grid grid-cols-1 gap-8 divide-x border-t border-b border-[#282F33] px-8 md:grid-cols-3">
          <div className="flex flex-col gap-2 py-6">
            <span className="text-secondary text-sm">Для бизнес запросов</span>
            <div className="flex items-center gap-4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.332 14.1666H4.66536C2.23203 14.1666 0.832031 12.7666 0.832031 10.3333V5.66659C0.832031 3.23325 2.23203 1.83325 4.66536 1.83325H11.332C13.7654 1.83325 15.1654 3.23325 15.1654 5.66659V10.3333C15.1654 12.7666 13.7654 14.1666 11.332 14.1666ZM4.66536 2.83325C2.7587 2.83325 1.83203 3.75992 1.83203 5.66659V10.3333C1.83203 12.2399 2.7587 13.1666 4.66536 13.1666H11.332C13.2387 13.1666 14.1654 12.2399 14.1654 10.3333V5.66659C14.1654 3.75992 13.2387 2.83325 11.332 2.83325H4.66536Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M7.9992 8.57998C7.4392 8.57998 6.87254 8.40665 6.4392 8.05331L4.35253 6.38665C4.1392 6.21331 4.0992 5.89998 4.27254 5.68665C4.44587 5.47331 4.75921 5.43332 4.97254 5.60665L7.0592 7.27332C7.56587 7.67998 8.42586 7.67998 8.93253 7.27332L11.0192 5.60665C11.2325 5.43332 11.5525 5.46665 11.7192 5.68665C11.8925 5.89998 11.8592 6.21998 11.6392 6.38665L9.55254 8.05331C9.12587 8.40665 8.5592 8.57998 7.9992 8.57998Z"
                  fill="#F2F2F2"
                />
              </svg>

              <a href="mailto:business@blockfirst.io" className="">
                business@blockfirst.io
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2 py-6">
            <span className="text-secondary text-sm">
              Для запросов от пользователей
            </span>
            <div className="flex items-center gap-4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.332 14.1666H4.66536C2.23203 14.1666 0.832031 12.7666 0.832031 10.3333V5.66659C0.832031 3.23325 2.23203 1.83325 4.66536 1.83325H11.332C13.7654 1.83325 15.1654 3.23325 15.1654 5.66659V10.3333C15.1654 12.7666 13.7654 14.1666 11.332 14.1666ZM4.66536 2.83325C2.7587 2.83325 1.83203 3.75992 1.83203 5.66659V10.3333C1.83203 12.2399 2.7587 13.1666 4.66536 13.1666H11.332C13.2387 13.1666 14.1654 12.2399 14.1654 10.3333V5.66659C14.1654 3.75992 13.2387 2.83325 11.332 2.83325H4.66536Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M7.9992 8.57998C7.4392 8.57998 6.87254 8.40665 6.4392 8.05331L4.35253 6.38665C4.1392 6.21331 4.0992 5.89998 4.27254 5.68665C4.44587 5.47331 4.75921 5.43332 4.97254 5.60665L7.0592 7.27332C7.56587 7.67998 8.42586 7.67998 8.93253 7.27332L11.0192 5.60665C11.2325 5.43332 11.5525 5.46665 11.7192 5.68665C11.8925 5.89998 11.8592 6.21998 11.6392 6.38665L9.55254 8.05331C9.12587 8.40665 8.5592 8.57998 7.9992 8.57998Z"
                  fill="#F2F2F2"
                />
              </svg>

              <a href="mailto:hello@blockfirst.io" className="">
                hello@blockfirst.io
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-2 py-6">
            <span className="text-secondary text-sm">
              Телеграм бот для быстрых ответов
            </span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.16776 7.23037C5.7958 5.65477 8.21103 4.60782 9.42383 4.0999C12.8756 2.65905 13.6013 2.41027 14.0677 2.3999C14.1714 2.3999 14.3994 2.42063 14.5549 2.54502C14.6793 2.64868 14.7104 2.78344 14.7311 2.8871C14.7519 2.99075 14.7726 3.20844 14.7519 3.37429C14.5653 5.34379 13.7567 10.1224 13.3421 12.32C13.1659 13.2529 12.8238 13.5639 12.4921 13.595C11.7665 13.6572 11.2171 13.1181 10.5226 12.6621C9.42383 11.9468 8.81225 11.5011 7.74457 10.7962C6.51104 9.98768 7.30921 9.54195 8.01408 8.81634C8.20067 8.62976 11.383 5.72733 11.4452 5.46818C11.4555 5.43709 11.4555 5.3127 11.383 5.2505C11.3104 5.18831 11.2068 5.20904 11.1238 5.22977C11.0098 5.2505 9.26834 6.41147 5.87872 8.70232C5.38117 9.04439 4.93544 9.21024 4.53117 9.19987C4.08544 9.18951 3.23544 8.95109 2.59276 8.74378C1.81533 8.495 1.19338 8.36024 1.24521 7.92488C1.27631 7.69683 1.58728 7.46878 2.16776 7.23037Z"
                    fill="#F2F2F2"
                  />
                </svg>

                <a href="https://t.me/blockfirst_edu/app" className="">
                  t.me/blockfirst_edu/app
                </a>
              </div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.901 4.46943C11.1939 4.17653 11.6688 4.17653 11.9617 4.46942L16.9617 9.46937C17.1023 9.61003 17.1814 9.80079 17.1814 9.9997C17.1814 10.1986 17.1023 10.3894 16.9617 10.53L11.9617 15.53C11.6688 15.8229 11.1939 15.8229 10.901 15.53C10.6081 15.2371 10.6081 14.7623 10.901 14.4694L14.6207 10.7497H3.57422C3.16001 10.7497 2.82422 10.4139 2.82422 9.99971C2.82422 9.58549 3.16001 9.24971 3.57422 9.24971H14.6207L10.901 5.53009C10.6081 5.2372 10.6081 4.76232 10.901 4.46943Z"
                  fill="#F2F2F2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="flex flex-col items-center px-8 pt-8 pb-8 text-xs md:flex-row md:justify-between">
          <div className="text-secondary flex gap-6 text-xs">
            <a href="#" className="">
              Правила сервиса
            </a>
            <a href="#">Конфиденциальность</a>
          </div>
          <div className="flex items-center justify-between gap-[383px]">
            <span className="text-secondary">
              © 2025-2026 BlockFirst. Все права защищены.
            </span>
            <div
              className="flex cursor-pointer items-center gap-1"
              onClick={() => {
                document
                  .getElementById('content-view')
                  ?.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <a className="text-sm">В начало</a>
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.15031 12.8267C4.86349 12.5279 4.87323 12.0531 5.17207 11.7663L9.9808 7.15089C10.271 6.87235 10.7293 6.87235 11.0195 7.15089L15.8282 11.7663C16.1271 12.0531 16.1368 12.5279 15.85 12.8267C15.5632 13.1256 15.0884 13.1353 14.7895 12.8485L10.5001 8.73154L6.21075 12.8485C5.91191 13.1353 5.43713 13.1256 5.15031 12.8267Z"
                  fill="#F2F2F2"
                />
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
