'use client';

import {  useState } from 'react';
import { Topbar } from './Topbar';
import { Session } from '~/server/auth';
import Footer from '~/app/components/Footer';
import Image from 'next/image';
import { Tariff, TARIFFS } from '~/app/lib/constants/tariff';
import { cn } from '~/helpers';
import PaymentMethodsModal from './PaymentMethodsModal';
import { formatPrice } from '~/app/lib/utils';
import { InfoPopover } from '~/app/components/shared/InfoPopover';

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
  >
    <path
      d="M5.44922 10.65L8.04922 13.25L14.5492 6.75"
      stroke="#33CF8E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TariffCard = ({ tariff }: { tariff: Tariff }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <div className="border-accent flex flex-col border-b">
      <div className="relative bg-[#01050D] p-8">
        <div className="relative z-1 bg-[url(/images/misc/tariff-grid.svg)] bg-cover bg-no-repeat bg-blend-screen">
          {tariff.sale && (
            <div className="absolute top-0 right-0">
              <span className="bg-error rounded-full px-2 py-1 text-xs uppercase">
                Sale {tariff.sale.percent}%
              </span>
            </div>
          )}
          <div className="flex flex-col items-center gap-5">
            <div className="h-23 w-23 overflow-hidden rounded-full">
              <Image
                src={tariff.bigIcon}
                width={92}
                height={92}
                alt={`${tariff.name} plan`}
                className="z-10 h-23 w-23 object-cover"
              />
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <h3 className="text-2xll">{tariff.name}</h3>
              <p className="text-secondary text-xs">{tariff.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between px-8 py-4">
          <span className="text-secondary text-xs uppercase opacity-50">
            Что включено?
          </span>
          {tariff.price && (
            <InfoPopover
              title="Структура курса заблокирована?"
              content="Доступ к курсам по платному тарифу сохраняется на 6 месяцев. Вы сможете просматривать пройденные курсы, но функции проверок, AI и другие будут отключены."
            />
          )}
        </div>

        {tariff.features.map((feature, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 px-8 py-3 ${feature.bg ? 'bg-[#14171C]' : ''}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M5.44922 10.65L8.04922 13.25L14.5492 6.75"
                stroke={tariff.price ? '#195AF4' : '#9aa6b5'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-sm">{feature.text}</span>
          </div>
        ))}
      </div>

      {tariff.price && (
        <div className="mt-auto flex flex-col gap-6 pt-8 pb-0">
          <div className="flex justify-between px-8">
            <div className="flex flex-col gap-2">
              <span className="text-2xll leading-7 font-medium text-gray-50">
                {formatPrice(tariff.price.monthly)}
                <span className="text-base">/мес</span>
              </span>
              {tariff.price.installments && (
                <span className="text-secondary text-xs">
                  Рассрочка {tariff.price.installments} месяцев
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                className={cn(
                  'flex items-center rounded-full border border-[#1959F4] bg-[#1959F4] px-11 py-3 duration-300',
                  isLoading
                    ? 'border-[#1242B2] bg-[#1242B2]'
                    : 'hover:bg-dark-bg cursor-pointer',
                  'text-sm'
                )}
                disabled={isLoading}
                onClick={() => setIsPaymentModalOpen(true)}
              >
                Оплатить
                {!isLoading ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      d="M14.75 4.97386L19.3654 9.58924L14.75 14.2046"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={cn('ml-2', isLoading && 'animate-spin')}
                  >
                    <path
                      opacity="0.4"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.25 3.33398C9.25 2.91977 9.58579 2.58398 10 2.58398C14.0961 2.58398 17.4167 5.90454 17.4167 10.0007C17.4167 10.4149 17.0809 10.7507 16.6667 10.7507C16.2525 10.7507 15.9167 10.4149 15.9167 10.0007C15.9167 6.73297 13.2677 4.08398 10 4.08398C9.58579 4.08398 9.25 3.7482 9.25 3.33398Z"
                      fill="#F2F2F2"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.36269 6.36564C4.73362 6.54998 4.88489 7.00012 4.70055 7.37105C4.30737 8.16222 4.08594 9.0543 4.08594 10.0002C4.08594 13.2679 6.73492 15.9169 10.0026 15.9169C13.2703 15.9169 15.9193 13.2679 15.9193 10.0002C15.9193 9.58602 16.2551 9.25024 16.6693 9.25024C17.0835 9.25024 17.4193 9.58602 17.4193 10.0002C17.4193 14.0964 14.0987 17.4169 10.0026 17.4169C5.90649 17.4169 2.58594 14.0964 2.58594 10.0002C2.58594 8.81753 2.86333 7.69745 3.35728 6.7035C3.54162 6.33257 3.99176 6.1813 4.36269 6.36564Z"
                      fill="#F2F2F2"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="text-secondary mt-auto flex h-8 items-center justify-center gap-1 bg-[#14171C] text-xs">
            Весь курс{' '}
            <span className="text-foreground">
              {formatPrice(tariff.price.total)}
            </span>
          </div>
        </div>
      )}

      {tariff.isActive && (
        <div className="mt-auto flex flex-col gap-6 pt-8 pb-0">
          <div className="mx-8 mt-auto flex h-13 cursor-pointer items-center justify-center gap-1 rounded-full bg-[#33CF8E]/10">
            <div className="flex items-center gap-1">
              <CheckIcon />
              <span className="text-sm text-[#33CF8E]">Активный тариф</span>
            </div>
          </div>
          <div className="text-secondary mt-auto flex h-8 items-center justify-center gap-1 bg-[#14171C] text-xs">
            Стартовый тариф
          </div>
        </div>
      )}

      <PaymentMethodsModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        tariff={tariff}
      />
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
      <Footer />
    </main>
  );
}
