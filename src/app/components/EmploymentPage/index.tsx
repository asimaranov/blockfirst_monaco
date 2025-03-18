'use client';

import { Session } from '~/server/auth';
import YourVacancies from './YourVacancies';
import {
  VACANCIES,
  VacancySort,
  VacancySpeciality,
} from '~/app/lib/constants/vacancies';
import { useState } from 'react';
import { VacancyItem } from './VacancyItem';
import { IVacancy } from '~/app/lib/constants/vacancies';
import { SortIcon } from './assets/sort-icon';
import { useViewedVacancyStore } from '~/store/viewedVacancy';

enum SalarySortOption {
  SALARY_UP,
  SALARY_DOWN,
}

enum PublishedSortOption {
  PUBLISHED_UP,
  PUBLISHED_DOWN,
}

export default function EmploymentPage({ session }: { session: Session }) {
  const lastUpdate = new Date(
    Math.min(
      ...VACANCIES.map((vacancy) => new Date(vacancy.updatedAt).getTime())
    )
  ).toLocaleDateString('ru-RU');

  const { viewedVacancies } = useViewedVacancyStore();

  const [specialityFilters, setSpecialityFilters] = useState<
    VacancySpeciality[]
  >([]);
  const [sortOption, setSortOption] = useState<VacancySort>(VacancySort.ALL);
  const [salarySortOption, setSalarySortOption] = useState<
    SalarySortOption | undefined
  >(undefined);
  const [publishedSortOption, setPublishedSortOption] = useState<
    PublishedSortOption | undefined
  >(undefined);

  const sortVacancies = (vacancies: IVacancy[]) => {
    if (vacancies.length === 0) return [];

    const getSalary = (salary?: IVacancy['salary']) => {
      if (!salary?.amount) return 0;

      if (typeof salary.amount === 'number') {
        return salary.amount;
      }
      if ('from' in salary.amount && !('to' in salary.amount)) {
        return salary.amount.from ?? 0;
      }
      if ('to' in salary.amount && !('from' in salary.amount)) {
        return salary.amount.to ?? 0;
      }
      return salary.amount.to ?? 0;
    };

    const filterBySpeciality = (vacanciesToFilter: IVacancy[]) => {
      if (specialityFilters.length === 0) return vacanciesToFilter;
      return vacanciesToFilter.filter((vacancy) =>
        specialityFilters.includes(vacancy.speciality as VacancySpeciality)
      );
    };

    const filterByViewed = (vacanciesToFilter: IVacancy[]) => {
      if (viewedVacancies.length === 0) return vacanciesToFilter;

      if (sortOption === VacancySort.VIEWED) {
        return vacanciesToFilter.filter((vacancy) =>
          viewedVacancies.includes(vacancy.id)
        );
      }

      if (sortOption === VacancySort.NEW) {
        return vacanciesToFilter.filter(
          (vacancy) => !viewedVacancies.includes(vacancy.id)
        );
      }

      return vacanciesToFilter;
    };

    const sortedBySalaryAndDate = filterBySpeciality(
      filterByViewed(vacancies)
    ).sort((a, b) => {
      const salaryDiff =
        salarySortOption === SalarySortOption.SALARY_UP
          ? getSalary(a.salary) - getSalary(b.salary)
          : getSalary(b.salary) - getSalary(a.salary);
      const dateDiff =
        publishedSortOption === PublishedSortOption.PUBLISHED_UP
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      return salaryDiff || dateDiff;
    });

    return sortedBySalaryAndDate;
  };

  return (
    <main className="border-accent flex min-h-screen w-full flex-col border-r border-l">
      <div className="flex flex-1 flex-row">
        <YourVacancies
          lastestUpdate={lastUpdate}
          vacanciesCount={VACANCIES.length || 0}
          specialityFilters={specialityFilters}
          setSpecialityFilters={setSpecialityFilters}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        {/* Sticky header */}
        <div className="relative flex w-[936px] flex-col">
          <div className="bg-background sticky top-0 z-[2] grid h-[44px] grid-cols-11 items-center gap-10 px-8 py-3.5">
            <span className="text-secondary col-span-2 text-xs uppercase opacity-50">
              Вакансия
            </span>
            <button
              onClick={() => {
                setSalarySortOption(
                  salarySortOption === SalarySortOption.SALARY_UP
                    ? SalarySortOption.SALARY_DOWN
                    : SalarySortOption.SALARY_UP
                );
              }}
              className="group col-span-2 flex cursor-pointer flex-row items-center gap-1"
            >
              <span className="text-secondary text-xs uppercase opacity-50 group-hover:opacity-100">
                Зарплата
              </span>
              <SortIcon
                className="mb-0.5 size-3"
                arrow={
                  salarySortOption === SalarySortOption.SALARY_UP
                    ? 'up'
                    : salarySortOption === SalarySortOption.SALARY_DOWN
                      ? 'down'
                      : 'none'
                }
              />
            </button>
            <span className="text-secondary col-span-2 text-xs uppercase opacity-50">
              Формат
            </span>
            <button
              onClick={() => {
                setPublishedSortOption(
                  publishedSortOption === PublishedSortOption.PUBLISHED_UP
                    ? PublishedSortOption.PUBLISHED_DOWN
                    : PublishedSortOption.PUBLISHED_UP
                );
              }}
              className="group col-span-2 flex cursor-pointer flex-row items-center gap-1"
            >
              <span className="text-secondary text-xs uppercase opacity-50 group-hover:opacity-100">
                Публикация
              </span>
              <SortIcon
                className="mb-0.5 size-3"
                arrow={
                  publishedSortOption === PublishedSortOption.PUBLISHED_UP
                    ? 'up'
                    : publishedSortOption === PublishedSortOption.PUBLISHED_DOWN
                      ? 'down'
                      : 'none'
                }
              />
            </button>
          </div>
          {/* Vacancies list */}
          {sortVacancies(VACANCIES).map(
            // TODO: move VACANCIES to state
            (vacancy) => (
              <VacancyItem key={vacancy.id} vacancy={vacancy} />
            )
          )}
        </div>
      </div>
    </main>
  );
}
