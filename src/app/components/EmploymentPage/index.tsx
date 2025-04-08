'use client';

import { Session } from '~/server/auth';
import YourVacancies from './YourVacancies';
import { VacancySort, VacancySpeciality } from '~/app/lib/constants/vacancies';
import { useState } from 'react';
import { VacancyItem } from './VacancyItem';
import { SortIcon } from './assets/sort-icon';
import { useViewedVacancyStore } from '~/store/viewedVacancy';
import Footer from '../Footer';
import { Modal } from '../shared/Modal';
import { ApplyForm } from './ApplyForm';
import { api } from '~/trpc/react';

// Define a general vacancy interface matching the one used in VacancyItem
interface IVacancyGeneral {
  id?: string;
  title: string;
  description: string;
  updatedAt: string | Date;
  speciality: string;
  format: any; // Using any to avoid circular imports, will be properly typed at runtime
  salary?: {
    amount: number | { from?: number; to?: number };
    currency: any;
  };
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
}

enum SortType {
  NONE,
  SALARY_UP,
  SALARY_DOWN,
  PUBLISHED_UP,
  PUBLISHED_DOWN,
}

export default function EmploymentPage({ session }: { session: Session }) {
  // API query for vacancies
  const {
    data: vacancyData,
    isLoading,
    error,
  } = api.vacancies.getAll.useQuery();
  const vacancies = vacancyData?.vacancies || [];

  // Get API mutation for applying to a vacancy
  const markAsApplied = api.vacancies.markAsApplied.useMutation();

  // Calculate the last update time from the vacancies
  const lastUpdate = vacancies.length
    ? new Date(
        Math.min(
          ...vacancies.map((vacancy) => new Date(vacancy.updatedAt).getTime())
        )
      ).toLocaleDateString('ru-RU')
    : new Date().toLocaleDateString('ru-RU');

  const { viewedVacancies } = useViewedVacancyStore();

  const [specialityFilters, setSpecialityFilters] = useState<
    VacancySpeciality[]
  >([]);
  const [sortOption, setSortOption] = useState<VacancySort>(VacancySort.ALL);
  const [activeSortType, setActiveSortType] = useState<SortType>(SortType.NONE);
  const [isApplyFormOpen, setIsApplyFormOpen] = useState(false);
  const [currentVacancyId, setCurrentVacancyId] = useState<string | null>(null);

  const handleApply = (vacancyId: string) => {
    setCurrentVacancyId(vacancyId);
    setIsApplyFormOpen(true);
  };

  const handleSubmitApplication = async () => {
    if (currentVacancyId && session) {
      try {
        await markAsApplied.mutateAsync({ id: currentVacancyId });
      } catch (error) {
        console.error('Error marking vacancy as applied:', error);
      }
    }
    setIsApplyFormOpen(false);
  };

  const sortVacancies = (vacanciesArray: IVacancyGeneral[]) => {
    if (vacanciesArray.length === 0) return [];

    const getSalary = (salary?: IVacancyGeneral['salary']) => {
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

    const filterBySpeciality = (vacanciesToFilter: IVacancyGeneral[]) => {
      if (specialityFilters.length === 0) return vacanciesToFilter;
      return vacanciesToFilter.filter((vacancy) =>
        specialityFilters.includes(vacancy.speciality as VacancySpeciality)
      );
    };

    const filterByViewed = (vacanciesToFilter: IVacancyGeneral[]) => {
      if (viewedVacancies.length === 0) return vacanciesToFilter;

      if (sortOption === VacancySort.VIEWED) {
        return vacanciesToFilter.filter((vacancy) =>
          viewedVacancies.includes(vacancy.id || '')
        );
      }

      if (sortOption === VacancySort.NEW) {
        return vacanciesToFilter.filter(
          (vacancy) => !viewedVacancies.includes(vacancy.id || '')
        );
      }

      return vacanciesToFilter;
    };

    const sortedVacancies = filterBySpeciality(filterByViewed(vacanciesArray));

    // Apply active sort
    if (activeSortType !== SortType.NONE) {
      return [...sortedVacancies].sort((a, b) => {
        // Salary sorting
        if (
          activeSortType === SortType.SALARY_UP ||
          activeSortType === SortType.SALARY_DOWN
        ) {
          const salaryA = getSalary(a.salary);
          const salaryB = getSalary(b.salary);

          return activeSortType === SortType.SALARY_UP
            ? salaryA - salaryB
            : salaryB - salaryA;
        }

        // Publication date sorting
        if (
          activeSortType === SortType.PUBLISHED_UP ||
          activeSortType === SortType.PUBLISHED_DOWN
        ) {
          const dateA = new Date(a.updatedAt).getTime();
          const dateB = new Date(b.updatedAt).getTime();

          return activeSortType === SortType.PUBLISHED_UP
            ? dateA - dateB
            : dateB - dateA;
        }

        return 0;
      });
    }

    return sortedVacancies;
  };

  return (
    <main className="border-accent flex min-h-screen w-full flex-col border-r-0 border-l-0 sm:border-r sm:border-l">
      <Modal isOpen={isApplyFormOpen} onClose={() => setIsApplyFormOpen(false)}>
        <ApplyForm
          onClose={() => setIsApplyFormOpen(false)}
          onSubmit={handleSubmitApplication}
        />
      </Modal>
      <div className="border-accent flex flex-1 flex-col sm:flex-row">
        <YourVacancies
          lastestUpdate={lastUpdate}
          vacanciesCount={vacancies.length || 0}
          specialityFilters={specialityFilters}
          setSpecialityFilters={setSpecialityFilters}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        {/* Sticky header */}
        <div className="relative flex flex-1 flex-col">
          <div className="bg-background sticky top-0 z-[2] hidden grid-cols-[calc(50*var(--spacing))_calc(35*var(--spacing))_calc(28*var(--spacing))_calc(25*var(--spacing))_1fr] items-center gap-9 px-8 py-3.5 sm:grid">
            <span className="text-secondary text-xs uppercase opacity-50">
              Вакансия
            </span>
            <button
              onClick={() => {
                setActiveSortType(
                  activeSortType === SortType.SALARY_UP
                    ? SortType.SALARY_DOWN
                    : SortType.SALARY_UP
                );
              }}
              className="group flex cursor-pointer flex-row items-center gap-1 @sm:mt-2"
            >
              <span className="text-secondary text-xs uppercase opacity-50 group-hover:opacity-100">
                Зарплата
              </span>
              <SortIcon
                className="mb-0.5 size-3"
                arrow={
                  activeSortType === SortType.SALARY_UP
                    ? 'up'
                    : activeSortType === SortType.SALARY_DOWN
                      ? 'down'
                      : 'none'
                }
              />
            </button>
            <span className="text-secondary text-xs uppercase opacity-50 @sm:mt-2">
              Формат
            </span>
            <button
              onClick={() => {
                setActiveSortType(
                  activeSortType === SortType.PUBLISHED_UP
                    ? SortType.PUBLISHED_DOWN
                    : SortType.PUBLISHED_UP
                );
              }}
              className="group flex cursor-pointer flex-row items-center gap-1 @sm:mt-2"
            >
              <span className="text-secondary text-xs uppercase opacity-50 group-hover:opacity-100">
                Публикация
              </span>
              <SortIcon
                className="mb-0.5 size-3"
                arrow={
                  activeSortType === SortType.PUBLISHED_UP
                    ? 'up'
                    : activeSortType === SortType.PUBLISHED_DOWN
                      ? 'down'
                      : 'none'
                }
              />
            </button>
            <div className="@sm:hidden"></div>
          </div>
          {/* Vacancies list */}
          <div className="relative max-h-[calc(100vh-var(--header-height))] overflow-y-auto">
            <div className="flex flex-col">
              {isLoading ? (
                <div className="flex justify-center p-10">
                  <div className="text-accent">Loading vacancies...</div>
                </div>
              ) : error ? (
                <div className="flex justify-center p-10">
                  <div className="text-red-500">
                    Error loading vacancies. Please try again.
                  </div>
                </div>
              ) : sortVacancies(vacancies).length === 0 ? (
                <div className="flex justify-center p-10">
                  <div className="text-secondary">
                    No vacancies found matching your criteria.
                  </div>
                </div>
              ) : (
                sortVacancies(vacancies).map((vacancy) => (
                  <VacancyItem
                    key={vacancy.id}
                    vacancy={vacancy}
                    onApply={() => handleApply(vacancy.id || '')}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer className="border-accent block border-t sm:hidden" />
    </main>
  );
}
