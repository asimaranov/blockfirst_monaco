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

export default function EmploymentPage({ session }: { session: Session }) {
  const lastUpdate = new Date(
    Math.min(
      ...VACANCIES.map((vacancy) => new Date(vacancy.updatedAt).getTime())
    )
  ).toLocaleDateString('ru-RU');

  const [specialityFilters, setSpecialityFilters] = useState<
    VacancySpeciality[]
  >([]);
  const [sortOption, setSortOption] = useState<VacancySort>(VacancySort.ALL);

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
        <div className="flex w-[936px] flex-col">
          {VACANCIES.map((vacancy) => (
            <VacancyItem key={vacancy.id} vacancy={vacancy} />
          ))}
        </div>
      </div>
    </main>
  );
}
