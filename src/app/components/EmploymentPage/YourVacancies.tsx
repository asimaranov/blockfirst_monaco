'use client';

import HeaderIcon from './assets/header-icon.png';
import GridBg from './assets/grid-bg.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Checkbox } from './Checkbox';
import {
  VACANCIES,
  VACANCY_SORT_OPTIONS,
  VACANCY_SPECIALITIES,
  VacancySort,
  VacancySpeciality,
} from '~/app/lib/constants/vacancies';
import soonBageImg from './assets/soon-bage.svg';
import { Radio } from './Radio';

export default function YourVacancies({
  lastestUpdate,
  vacanciesCount,
  specialityFilters,
  setSpecialityFilters,
  sortOption,
  setSortOption,
}: {
  lastestUpdate: string;
  vacanciesCount: number;
  specialityFilters: VacancySpeciality[];
  setSpecialityFilters: (filters: VacancySpeciality[]) => void;
  sortOption: VacancySort;
  setSortOption: (option: VacancySort) => void;
}) {
  const t = useTranslations('EmploymentPage');

  return (
    <section className="border-accent sticky top-0 left-0 flex h-screen w-80 flex-col border-r">
      {/* Header */}
      <div className="bg-background relative px-8 py-6">
        <div className="flex w-full items-center justify-between">
          <Image
            src={HeaderIcon}
            alt="Header Icon"
            className="h-10 w-10 object-contain object-center"
          />
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center justify-end gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#33CF8E]" />
              <span className="font-roboto text-xs font-medium text-[#33CF8E] leading-3.5">
                {lastestUpdate}
              </span>
            </div>
            <span className="font-roboto text-secondary text-xs opacity-50 text-xxs">
              Обновление базы
            </span>
          </div>
        </div>
        {/* Title */}
        <div className="mt-8 flex flex-col gap-0.5">
          <span className="text-2xll font-medium">Твои вакансии</span>
          <div className="flex flex-row gap-1 text-xs">
            <span className="text-secondary">Найдено -</span>
            <span>
              {vacanciesCount}{' '}
              {t('vacanciesCount', {
                count: vacanciesCount,
              })}
            </span>
          </div>
        </div>
        <Image
          src={GridBg}
          alt="Grid Background"
          className="absolute right-0 bottom-0 z-[1] h-full w-full"
        />
      </div>
      {/* Filters */}
      <div className="flex flex-col gap-7 pt-8">
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between">
            <span className="text-secondary mb-3 px-8 text-xs uppercase opacity-50">
              Рекомендованные
            </span>
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-1 px-8">
            <span className="text-sm">Персональные вакансии</span>
            <Image src={soonBageImg} alt="Soon" className="h-6 w-13" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-7 pt-7">
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between">
            <span className="text-secondary mb-3 px-8 text-xs uppercase opacity-50">
              Специальность
            </span>
          </div>
          {VACANCY_SPECIALITIES.map((speciality) => (
            <Checkbox
              key={speciality}
              title={speciality}
              itemCount={
                VACANCIES.filter((vacancy) => vacancy.speciality === speciality)
                  .length
              }
              isActive={specialityFilters.includes(speciality)}
              onChange={() =>
                specialityFilters.includes(speciality)
                  ? setSpecialityFilters(
                      specialityFilters.filter(
                        (filter) => filter !== speciality
                      )
                    )
                  : setSpecialityFilters([...specialityFilters, speciality])
              }
            />
          ))}
        </div>
      </div>
      {/* Sorting */}
      <div className="flex flex-col gap-7 pt-7">
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-row items-center justify-between">
            <span className="text-secondary mb-3 px-8 text-xs uppercase opacity-50">
              Cортировка
            </span>
          </div>
          {VACANCY_SORT_OPTIONS.map((option) => (
            <Radio
              key={option}
              title={option}
              isActive={sortOption === option}
              onChange={() => setSortOption(option)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
