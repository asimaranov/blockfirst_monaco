'use client';

import { useState } from 'react';
import { Topbar } from './Topbar';
import { COURSES, ICourse } from '~/app/lib/constants/courses';
import { Skeleton } from '~/app/components/shared/Skeleton';
import { CourseTopCard } from '~/app/components/CourseTopCard';
import { CourseCard } from '~/app/components/CourseCard/CourseCard';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import FreePlan from './assets/pricing/free.png';
import ProPlan from './assets/pricing/pro.png';
import StarterPlan from './assets/pricing/starter.png';
import Image from 'next/image';

interface TariffFeature {
  text: string;
  bg?: boolean;
}

interface Tariff {
  name: string;
  description: string;
  image: any;
  features: TariffFeature[];
  price?: {
    monthly: number;
    total: number;
    installments?: number;
  };
  sale?: {
    percent: number;
  };
  isActive?: boolean;
}

const TARIFFS: Tariff[] = [
  {
    name: 'Free',
    description:
      'Стартовый тариф, который включает в себя ознакомление с курсами и платформой в целом.',
    image: FreePlan,
    features: [
      { text: 'Ознакомление с курсами', bg: true },
      { text: '5 лекций / уроков' },
      { text: 'Реферальная программа', bg: true },
    ],
    isActive: true,
  },
  {
    name: 'Starter',
    description:
      'Подходит для самостоятельного обучения. В тарифе не предусмотрен ментор, консультации и резюме.',
    image: StarterPlan,
    features: [
      { text: 'Доступ ко всем основным материалам курса', bg: true },
      { text: 'Доступ к телеграм чату учеников курса' },
      { text: 'Автоматическая проверка решений', bg: true },
      { text: 'Образовательные материалы по теме курса' },
      { text: 'NFT Диплом', bg: true },
    ],
    price: {
      monthly: 14000,
      total: 140000,
      installments: 10,
    },
  },
  {
    name: 'Pro',
    description:
      'Получи максимум от прохождения курсов. Менторы, консультации, комьюнити и многое другое.',
    image: ProPlan,
    features: [
      { text: 'Все что включает Starter тариф', bg: true },
      { text: 'Персональный ai ментор' },
      { text: 'Обсуждение задач с куратором', bg: true },
      { text: 'Премиумные материалы и задачи' },
      { text: 'Консультация для трудоустройства', bg: true },
      { text: 'Помощь в подготовке резюме' },
    ],
    price: {
      monthly: 18000,
      total: 180000,
      installments: 10,
    },
    sale: {
      percent: 16,
    },
  },
];

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.44922 10.65L8.04922 13.25L14.5492 6.75"
      stroke="#33CF8E"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const InfoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#9AA5B5]"
  >
    <circle cx="8" cy="8" r="6.66667" stroke="currentColor" />
    <path d="M8 7.33333V10.6667" stroke="currentColor" />
    <circle cx="8" cy="5.33333" r="0.666667" fill="currentColor" />
  </svg>
);

const TariffCard = ({ tariff }: { tariff: Tariff }) => {
  return (
    <div className="flex flex-col">
      <div className="bg-[#010514] p-8">
        <div className="relative">
          {tariff.sale && (
            <div className="absolute top-0 right-0">
              <span className="bg-error rounded-full px-2 py-1 text-xs uppercase">
                Sale {tariff.sale.percent}%
              </span>
            </div>
          )}
          <div className="flex flex-col items-center gap-5">
            <div className="h-[92px] w-[92px] overflow-hidden rounded-full">
              <Image
                src={tariff.image}
                alt={`${tariff.name} plan`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <h3 className="text-2xll">{tariff.name}</h3>
              <p className="text-xs text-[#9AA5B5]">{tariff.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between px-8 py-4">
          <span className="text-xs text-[#9AA5B5] uppercase">
            Что включено?
          </span>
          <InfoIcon />
        </div>

        {tariff.features.map((feature, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 px-8 py-3 ${feature.bg ? 'bg-[#141719]' : ''}`}
          >
            <CheckIcon />
            <span className="text-sm">{feature.text}</span>
          </div>
        ))}
      </div>

      {tariff.price && (
        <div className="mt-auto flex flex-col gap-6 pt-8 pb-0">
          <div className="flex justify-between px-8">
            <div className="flex flex-col gap-2">
              <span className="text-2xll font-semibold text-gray-50">
                ₽{tariff.price.monthly}
                <span className="text-base">/мес</span>
              </span>
              {tariff.price.installments && (
                <span className="text-xs text-[#9AA5B5]">
                  Рассрочка {tariff.price.installments} месяцев
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center rounded-full bg-[#1959F4] px-11 py-3">
                Оплатить
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.75 4.97386L19.3654 9.58924L14.75 14.2046"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-auto flex h-8 items-center justify-center gap-1 bg-[#141719] text-sm text-[#9AA5B5]">
            Весь курс{' '}
            <span className="text-foreground">₽{tariff.price.total}</span>
          </div>
        </div>
      )}

      {tariff.isActive && (
        <div className="mt-auto flex flex-col gap-6 pt-8 pb-0">
          <div className="mt-auto mx-8 flex h-[52px] items-center justify-center gap-1 rounded-full bg-[rgba(51,207,142,0.1)]">
            <div className="flex items-center gap-1">
              <CheckIcon />
              <span className="text-sm text-[#33CF8E]">Активный тариф</span>
            </div>
          </div>
          <div className="mt-auto flex h-8 items-center justify-center gap-1 bg-[#141719] text-sm text-[#9AA5B5]">
            Стартовый тариф
          </div>
        </div>
      )}
    </div>
  );
};

export default function PricingPage({ session }: { session: Session }) {
  return (
    <main className="border-accent border-r border-l">
      <div className="flex h-screen w-full flex-col">
        <Topbar />
        <div className="grid w-full grow grid-cols-3 divide-x divide-[#282D33]">
          {TARIFFS.map((tariff, index) => (
            <TariffCard key={index} tariff={tariff} />
          ))}
        </div>
      </div>
      <div className="border-accent h-9.5 border-t"></div>

      <Footer />
    </main>
  );
}
