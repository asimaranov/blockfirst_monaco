'use client';

import { useEffect, useState } from 'react';
import { VacancyCurrency, VacancyFormat } from '~/app/lib/constants/vacancies';
import { cn } from '~/helpers';
import { useViewedVacancyStore } from '~/store/viewedVacancy';
import RequirementsIcon from './assets/requirements-icon.svg';
import ResponsibilitiesIcon from './assets/responsibilities-icon.svg';
import Image from 'next/image';
import ToggleMinus from '../shared/ToggleMinus/ToggleMinus';

// Define a general vacancy interface that works with both sources
interface IVacancyGeneral {
  id?: string;
  title: string;
  description: string;
  updatedAt: string | Date;
  publishedDate: string | Date;
  speciality: string;
  format: VacancyFormat | [VacancyFormat, VacancyFormat];
  salary?:
    | {
        amount: number | { from?: number; to?: number };
        currency: VacancyCurrency;
      }
    | undefined;
  publisher: {
    name: string;
    contacts: {
      telegram: string;
      cite: string;
      email: string;
    };
  };
  responsibilities: string[];
  requirements: string[];
  applied?: boolean;
  isPersonal?: boolean;
  userId?: string;
}

interface VacancyItemProps {
  vacancy: IVacancyGeneral;
  onApply: () => void;
}

export const VacancyItem = ({ vacancy, onApply }: VacancyItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { viewedVacancies, add: addViewedVacancy } = useViewedVacancyStore();

  const renderSalary = (salary?: IVacancyGeneral['salary']) => {
    if (!salary) return '—';

    if (typeof salary.amount === 'number') {
      return `${salary.amount} ${salary.currency}`;
    }
    if ('from' in salary.amount && !('to' in salary.amount)) {
      return `от ${salary.amount.from} ${salary.currency}`;
    }
    if ('to' in salary.amount && !('from' in salary.amount)) {
      return `до ${salary.amount.to} ${salary.currency}`;
    }
    return `${salary.amount.from} — ${salary.amount.to} ${salary.currency}`;
  };

  useEffect(() => {
    if (isExpanded && vacancy.id) {
      if (viewedVacancies.includes(vacancy.id)) return;

      addViewedVacancy(vacancy.id);
    }
  }, [isExpanded, vacancy.id, viewedVacancies, addViewedVacancy]);

  // Format date properly whether it's a string or Date object using publishedDate instead of updatedAt
  const formattedDate =
    typeof vacancy.publishedDate === 'string'
      ? new Date(vacancy.publishedDate).toLocaleDateString('ru-RU')
      : (vacancy.publishedDate as Date).toLocaleDateString('ru-RU');

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        'border-accent relative transition-colors duration-200 not-last:border-b hover:bg-[#14171C]',
        isExpanded && 'bg-dark-bg sm:bg-[#14171C]',
        'lg:grid lg:grid-cols-[calc(50*var(--spacing))_calc(35*var(--spacing))_calc(28*var(--spacing))_calc(19.75*var(--spacing))_1fr] lg:items-center lg:gap-x-9 lg:px-8 lg:py-6',
        'flex flex-col px-5 py-8'
      )}
    >
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-col lg:gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{vacancy.title}</span>
          {vacancy.isPersonal && (
            <span className="inline-flex items-center rounded-full bg-[#9747FF]/10 px-2 py-0.5 text-xs font-medium text-[#9747FF]">
              Персональное
            </span>
          )}
        </div>
        <span className="text-secondary text-xs">{vacancy.publisher.name}</span>
      </div>
      <span className="hidden text-sm lg:block">
        {renderSalary(vacancy.salary)}
      </span>
      <div className="text-secondary hidden flex-row gap-1 text-xs lg:flex">
        {Array.isArray(vacancy.format)
          ? vacancy.format.map((format) => format).join(' / ')
          : vacancy.format}
      </div>
      <span className="text-secondary hidden text-xs lg:block">
        {formattedDate}
      </span>
      <div className="hidden items-center justify-center gap-9 lg:flex">
        {!vacancy.applied ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApply();
            }}
            className="hover:bg-primary group border-primary/50 flex w-33 cursor-pointer flex-col items-center justify-center rounded-full border px-5 py-3 transition-colors duration-200"
          >
            <span className="group-hover:text-foreground text-primary text-sm leading-4 transition-colors duration-200">
              Откликнуться
            </span>
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApply();
            }}
            className="group flex w-33 cursor-pointer flex-col items-center justify-center rounded-full border border-[#33CF8E]/10 bg-[#33CF8E]/10 px-7.5 py-2.5 transition-colors duration-200 hover:border-[#33CF8E]"
          >
            <span className="flex flex-row items-center justify-center gap-1 text-sm leading-4 text-[#33CF8E] transition-colors duration-200">
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
              Отклик
            </span>
          </button>
        )}

        <div className="my-auto size-5">
          <ToggleMinus isExpanded={isExpanded} onToggle={() => {}} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="mb-6 flex w-full flex-row justify-between lg:hidden">
        <div className="flex max-w-[306px] flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-foreground text-xl font-medium sm:text-base">
              {vacancy.title}
            </h3>
            {vacancy.isPersonal && (
              <span className="inline-flex items-center rounded-full bg-[#9747FF]/10 px-2 py-0.5 text-xs font-medium text-[#9747FF]">
                Персональное
              </span>
            )}
          </div>
          <span className="text-secondary text-xs">
            {vacancy.publisher.name}
          </span>
        </div>
        <div className="my-auto size-5">
          <ToggleMinus isExpanded={isExpanded} onToggle={() => {}} />
        </div>
      </div>

      <div className="flex w-full flex-row items-center justify-between lg:hidden">
        <span className="text-foreground text-[16px]">
          {renderSalary(vacancy.salary)}
        </span>
        <div className="flex flex-row gap-2">
          <div className="rounded-lg bg-[#14171C] px-2 py-1.5">
            <span className="text-secondary text-xs">
              {Array.isArray(vacancy.format)
                ? vacancy.format[0]
                : vacancy.format}
            </span>
          </div>
          <div className="rounded-lg bg-[#14171C] px-2 py-1.5">
            <span className="text-secondary text-xs">{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Mobile Apply Button - visible only on mobile and outside of expanded section */}
      <div className="mt-10 w-full lg:hidden">
        {!vacancy.applied ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApply();
            }}
            className="border-primary/50 flex w-full cursor-pointer items-center justify-center rounded-full border py-4 transition-colors duration-200"
          >
            <span className="text-primary text-sm leading-4">Откликнуться</span>
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApply();
            }}
            className="flex w-full cursor-pointer items-center justify-center rounded-full bg-[#33CF8E]/10 py-4 transition-colors duration-200 hover:border-[#33CF8E]"
          >
            <span className="flex flex-row items-center justify-center gap-1 text-sm leading-4 text-[#33CF8E] transition-colors duration-200">
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
              Отклик
            </span>
          </button>
        )}
      </div>

      {/* Expandable content with animation */}
      <div
        className={cn(
          'col-span-full grid transition-all duration-300 ease-in-out',
          isExpanded
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col pt-8">
            <div className="flex flex-col gap-3 pb-8">
              <span className="text-secondary/50 text-sm uppercase sm:text-xs">
                Описание вакансии
              </span>
              <p className="text-secondary text-sm sm:text-xs">
                {vacancy.description}
              </p>
            </div>

            <div className="mb-8 flex flex-col gap-5">
              <div className="text-secondary/50 flex flex-row items-center gap-4 text-xs">
                <Image
                  src={ResponsibilitiesIcon}
                  className="h-7 w-7"
                  alt="Responsibilities icon"
                />
                <span className="text-foreground text-xl">
                  Твои обязанности
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {vacancy.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex flex-row items-center gap-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="2"
                        fill="#9AA6B5"
                        fillOpacity="0.5"
                      />
                    </svg>

                    <p className="text-foreground text-sm whitespace-pre-line">
                      {responsibility}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="text-secondary/50 flex flex-row items-center gap-4 text-xs">
                <Image
                  src={RequirementsIcon}
                  className="h-7 w-7"
                  alt="Requirements icon"
                />
                <span className="text-foreground text-xl">Требования</span>
              </div>
              <div className="flex flex-col gap-2">
                {vacancy.requirements.map((requirement, index) => (
                  <div key={index} className="flex flex-row items-center gap-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="2"
                        fill="#9AA6B5"
                        fillOpacity="0.5"
                      />
                    </svg>

                    <p className="text-foreground text-sm whitespace-pre-line">
                      {requirement}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
