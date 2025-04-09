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
  publishedDate: string | Date;
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
  } = api.vacancies.getAll.useQuery(undefined, {
    refetchInterval: 5_000,
  });
  const vacancies = vacancyData?.vacancies || [];

  // Calculate the last update time from the vacancies
  const lastUpdate = vacancies.length
    ? new Date(
        Math.min(
          ...vacancies.map((vacancy) =>
            new Date(vacancy.publishedDate).getTime()
          )
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
  const [currentVacancy, setCurrentVacancy] = useState<IVacancyGeneral | null>(
    null
  );

  // Sort vacancies based on active sort type
  const sortVacancies = (vacancies: IVacancyGeneral[]) => {
    // First filter by speciality if filters are set
    const filteredVacancies =
      specialityFilters.length > 0
        ? vacancies.filter((vacancy) =>
            specialityFilters.includes(vacancy.speciality as VacancySpeciality)
          )
        : vacancies;

    // Then apply sorting
    switch (activeSortType) {
      case SortType.SALARY_UP:
        return [...filteredVacancies].sort((a, b) => {
          const salaryA = getSalaryValue(a.salary?.amount);
          const salaryB = getSalaryValue(b.salary?.amount);
          return salaryA - salaryB;
        });
      case SortType.SALARY_DOWN:
        return [...filteredVacancies].sort((a, b) => {
          const salaryA = getSalaryValue(a.salary?.amount);
          const salaryB = getSalaryValue(b.salary?.amount);
          return salaryB - salaryA;
        });
      case SortType.PUBLISHED_UP:
        return [...filteredVacancies].sort(
          (a, b) =>
            new Date(a.publishedDate).getTime() -
            new Date(b.publishedDate).getTime()
        );
      case SortType.PUBLISHED_DOWN:
        return [...filteredVacancies].sort(
          (a, b) =>
            new Date(b.publishedDate).getTime() -
            new Date(a.publishedDate).getTime()
        );
      default:
        return filteredVacancies;
    }
  };

  // Helper to get comparable salary value
  const getSalaryValue = (amount: any) => {
    if (!amount) return 0;
    if (typeof amount === 'number') return amount;
    if (amount.from && amount.to) return (amount.from + amount.to) / 2;
    return amount.from || amount.to || 0;
  };

  // Handle vacancy sorting
  const handleSortClick = () => {
    // Cycle through sort types
    switch (activeSortType) {
      case SortType.NONE:
        setActiveSortType(SortType.PUBLISHED_DOWN);
        break;
      case SortType.PUBLISHED_DOWN:
        setActiveSortType(SortType.PUBLISHED_UP);
        break;
      case SortType.PUBLISHED_UP:
        setActiveSortType(SortType.SALARY_DOWN);
        break;
      case SortType.SALARY_DOWN:
        setActiveSortType(SortType.SALARY_UP);
        break;
      case SortType.SALARY_UP:
        setActiveSortType(SortType.NONE);
        break;
    }
  };

  const handleApply = (vacancy: IVacancyGeneral) => {
    setCurrentVacancy(vacancy);
    setIsApplyFormOpen(true);
  };

  const handleSubmitApplication = async () => {
    setIsApplyFormOpen(false);
  };

  return (
    <main className="border-accent flex min-h-screen w-full flex-col border-r-0 border-l-0 sm:border-r sm:border-l">
      <Modal isOpen={isApplyFormOpen} onClose={() => setIsApplyFormOpen(false)}>
        <ApplyForm
          onClose={() => setIsApplyFormOpen(false)}
          onSubmit={handleSubmitApplication}
          vacancyId={currentVacancy?.id || ''}
          vacancy={currentVacancy || undefined}
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
                    onApply={() => handleApply(vacancy)}
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
