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
import { InfoPopover } from '../shared/InfoPopover';
import MobilePremiumTopbar from '../shared/Topbar/MobilePremiumTopbar';
import { useState } from 'react';
import { FilterModal } from './FilterModal';

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

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <section className="border-accent static top-0 left-0 flex h-auto w-auto shrink-0 flex-col border-r-0 sm:border-r sm:sticky sm:h-screen sm:w-80">
      <MobilePremiumTopbar text={'Твои вакансии'} />
      {/* Header */}
      <div className="bg-background relative px-8 py-6">
        <Image
          src={GridBg}
          alt="Grid Background"
          className="absolute top-0 right-0 z-0 h-full w-full object-cover"
        />
        <div className="relative z-10 flex w-full items-center justify-between">
          <Image
            src={HeaderIcon}
            alt="Header Icon"
            className="h-10 w-10 object-contain object-center"
          />
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center justify-end gap-2">
              <div className="h-1 w-1 rounded-full bg-[#33CF8E]" />
              <span className="font-roboto text-sm leading-3.5 font-medium sm:text-xs">
                {lastestUpdate}
              </span>
            </div>
            <span className="font-roboto text-secondary sm:text-xxs text-xs opacity-50">
              Обновление базы
            </span>
          </div>
        </div>
        {/* Title */}
        <div className="relative z-10 mt-8 flex flex-col gap-0.5">
          <span className="sm:text-2xll text-2xl font-medium">
            Твои вакансии
          </span>
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
      </div>
      <div className="flex w-full shrink-0 flex-row items-center justify-between bg-[#14171C] p-5 sm:hidden">
        <span className="text-sm">Фильтр профессий</span>

        <button onClick={() => setIsFilterModalOpen(true)}>
          <Image
            src={'/images/icons/tool-icon.svg'}
            alt="tool-icon"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </button>
      </div>
      {/* Filters */}
      <div className="hidden flex-col gap-7 pt-8 sm:flex">
        <div className="flex w-full flex-col">
          <div className="mb-3 flex w-full flex-row items-center justify-between px-8">
            <span className="text-secondary text-xs uppercase opacity-50">
              Рекомендованные
            </span>
            <InfoPopover
              position="left"
              offsetSide={68.25}
              offsetTop={4}
              title="Рекомендованные"
              content="BlockFirst предлагает персонализированные вакансии и информацию о компаниях, с которыми сотрудничает. Это облегчит вам процесс получения стажировки или трудоустройства в выбранной компании."
            />
          </div>
          <div className="flex w-full flex-row items-center justify-between gap-1 px-8 py-2.5">
            <span className="text-sm">Персональные вакансии</span>
            <Image src={soonBageImg} alt="Soon" className="h-6 w-13.25" />
          </div>
        </div>
      </div>

      <div className="hidden flex-col gap-7 pt-7 sm:flex">
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
      <div className="hidden flex-col gap-7 pt-7 sm:flex">
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

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        specialityFilters={specialityFilters}
        setSpecialityFilters={setSpecialityFilters}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
    </section>
  );
}
