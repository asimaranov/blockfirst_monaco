'use client';

import { useEffect, useState } from 'react';
import { IVacancy, VacancyCurrency } from '~/app/lib/constants/vacancies';
import { cn } from '~/helpers';
import { useViewedVacancyStore } from '~/store/viewedVacancy';
import RequirementsIcon from './assets/requirements-icon.svg';
import ResponsibilitiesIcon from './assets/responsibilities-icon.svg';
import Image from 'next/image';
import ToggleMinus from '../shared/ToggleMinus/ToggleMinus';

interface VacancyItemProps {
  vacancy: IVacancy;
  onApply: () => void;
}

export const VacancyItem = ({ vacancy, onApply }: VacancyItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { viewedVacancies, add: addViewedVacancy } = useViewedVacancyStore();

  const renderSalary = (salary?: IVacancy['salary']) => {
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
    if (isExpanded) {
      if (viewedVacancies.includes(vacancy.id)) return;

      addViewedVacancy(vacancy.id);
    }
  }, [isExpanded]);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        'border-accent relative grid grid-cols-[calc(50*var(--spacing))_calc(35*var(--spacing))_calc(28*var(--spacing))_calc(20*var(--spacing))_1fr] items-center gap-x-9 px-8 py-6 transition-colors duration-200 not-last:border-b hover:bg-[#14171C]',
        isExpanded && 'bg-[#14171C]'
      )}
    >
      {/* Publisher name */}
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{vacancy.title}</span>
        <span className="text-secondary text-xs">{vacancy.publisher.name}</span>
      </div>
      {/* Salary */}
      <span className="text-sm">{renderSalary(vacancy.salary)}</span>
      {/* Format */}
      <div className="text-secondary flex flex-row gap-1 text-xs">
        {Array.isArray(vacancy.format)
          ? vacancy.format.map((format) => format).join(' / ')
          : vacancy.format}
      </div>
      {/* Updated at */}
      <span className="text-secondary text-xs">
        {new Date(vacancy.updatedAt).toLocaleDateString('ru-RU')}
      </span>
      {/* Expand icon */}
      <div className="flex items-center justify-center gap-9">
        {!vacancy.applied ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApply();
            }}
            className="hover:bg-primary group border-primary/50 flex cursor-pointer flex-col items-center justify-center rounded-full border px-5 py-3 transition-colors duration-200 w-33"
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
            className="group flex cursor-pointer flex-col items-center justify-center rounded-full  border-[#33CF8E]/10 bg-[#33CF8E]/10 px-7.5 py-2.5 transition-colors duration-200 border hover:border-[#33CF8E] w-33"
          >
            <span className="flex flex-row items-center justify-center gap-1 text-sm leading-4 text-[#33CF8E] transition-colors duration-200 ">
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
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
              <span className="text-secondary/50 text-xs uppercase">
                Описание вакансии
              </span>
              <p className="text-secondary text-xs">{vacancy.description}</p>
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
