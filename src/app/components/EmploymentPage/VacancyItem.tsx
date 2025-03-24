'use client';

import { useEffect, useState } from 'react';
import { IVacancy, VacancyCurrency } from '~/app/lib/constants/vacancies';
import { cn } from '~/helpers';
import { useViewedVacancyStore } from '~/store/viewedVacancy';
import RequirementsIcon from './assets/requirements-icon.svg';
import ResponsibilitiesIcon from './assets/responsibilities-icon.svg';
import Image from 'next/image';
export const VacancyItem = ({ vacancy }: { vacancy: IVacancy }) => {
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
      className="border-accent relative grid grid-cols-[calc(50*var(--spacing))_calc(35*var(--spacing))_calc(28*var(--spacing))_calc(20*var(--spacing))_1fr] items-center gap-5 gap-y-8 px-8 py-6 not-last:border-b hover:bg-[#14171C]"
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log('Otklik');
          }}
          className="hover:bg-primary group border-primary/50 flex cursor-pointer flex-col items-center justify-center rounded-full border px-5 py-3"
        >
          <span className="group-hover:text-foreground text-primary text-sm leading-4">
            Откликнуться
          </span>
        </button>
        <div className="my-auto size-5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              'h-5 w-5',
              'transition-transform duration-300',
              isExpanded ? 'text-foreground' : 'group-hover:text-foreground'
            )}
          >
            <line
              x1="5"
              y1="10"
              x2="15"
              y2="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-transform duration-300"
            />
            <line
              x1="10"
              y1="5"
              x2="10"
              y2="15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={cn(
                'origin-center transition-transform duration-300',
                isExpanded ? 'scale-0' : 'scale-100'
              )}
            />
          </svg>
        </div>
      </div>

      {/* Apply button - placed at the bottom when expanded */}
      {isExpanded && (
        <div className="col-span-full flex flex-col">
          <div className="flex flex-col gap-3 pb-8">
            <span className="text-secondary/50 text-xs uppercase">
              Описание вакансии
            </span>
            <p className="text-secondary text-xs">{vacancy.description}</p>
          </div>

          <div className="flex flex-col gap-5 mb-8">
            <div className="text-secondary/50 flex flex-row items-center gap-4 text-xs">
              <Image src={ResponsibilitiesIcon} alt="Responsibilities icon" />
              <span className="text-xl text-foreground">Твои обязанности</span>
            </div>
            <div className="flex flex-col gap-2">
              {vacancy.responsibilities.map((responsibility) => (
                <div className="flex flex-row items-center gap-1">
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
                      fill-opacity="0.5"
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
              <Image src={RequirementsIcon} alt="Requirements icon" />
              <span className="text-xl text-foreground">Требования</span>
            </div>
            <div className="flex flex-col gap-2">
              {vacancy.requirements.map((requirement) => (
                <div className="flex flex-row items-center gap-1">
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
                      fill-opacity="0.5"
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
      )}
    </div>
  );
};
