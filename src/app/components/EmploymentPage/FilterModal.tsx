'use client';

import { useEffect, useState } from 'react';
import {
  VACANCY_SPECIALITIES,
  VACANCY_SORT_OPTIONS,
  VacancySpeciality,
  VacancySort,
  VACANCIES,
} from '~/app/lib/constants/vacancies';
import { Modal } from '../shared/Modal';
import Image from 'next/image';
import SoonBageImg from './assets/soon-bage.svg';
import { RotatingIcon } from '../shared/RotatingIcon';
import { Checkbox } from './Checkbox';
import { Radio } from './Radio';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  specialityFilters: VacancySpeciality[];
  setSpecialityFilters: (filters: VacancySpeciality[]) => void;
  sortOption: VacancySort;
  setSortOption: (option: VacancySort) => void;
}

export const FilterModal = ({
  isOpen,
  onClose,
  specialityFilters,
  setSpecialityFilters,
  sortOption,
  setSortOption,
}: FilterModalProps) => {
  // const [localSortOption, setLocalSortOption] =
  //   useState<VacancySort>(sortOption);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleReset = () => {
    setSpecialityFilters([]);
    // setLocalSortOption(VACANCY_SORT_OPTIONS[0] as VacancySort);
    setRotationAngle((prevAngle) => prevAngle + 360);
  };

  const handleApply = () => {
    setSpecialityFilters(specialityFilters);
    // setSortOption(localSortOption);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-[780px] w-full flex-grow flex-col bg-[#0f1217]">
        <div className="flex h-full flex-col py-5">
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="mx-5 flex flex-col gap-5">
              <div className="flex justify-end">
                <button onClick={onClose} className="h-5 w-5">
                  <Image
                    src={'/images/icons/mobile-close-cross.svg'}
                    alt="close"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </button>
              </div>

              <h2 className="text-foreground text-center text-xl">
                Фильтр вакансий
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              {/* Personal vacancies section */}
              <div className="flex items-center justify-between px-5 py-3">
                <span className="text-foreground text-sm">
                  Персональные вакансии
                </span>
                <Image src={SoonBageImg} alt="Soon" className="h-6 w-13.25" />
              </div>

              {/* Speciality section */}
              <div className="flex flex-col gap-4">
                <div className="px-5">
                  <span className="text-secondary text-sm uppercase opacity-50">
                    Специальность
                  </span>
                </div>

                <div className="flex flex-col">
                  {VACANCY_SPECIALITIES.map((speciality) => (
                    <Checkbox
                      key={speciality}
                      title={speciality}
                      itemCount={
                        VACANCIES.filter(
                          (vacancy) => vacancy.speciality === speciality
                        ).length
                      }
                      isActive={specialityFilters.includes(speciality)}
                      onChange={() =>
                        specialityFilters.includes(speciality)
                          ? setSpecialityFilters(
                              specialityFilters.filter(
                                (filter) => filter !== speciality
                              )
                            )
                          : setSpecialityFilters([
                              ...specialityFilters,
                              speciality,
                            ])
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Sort section */}
              <div className="flex flex-col gap-4">
                <div className="px-5">
                  <span className="text-secondary text-sm uppercase opacity-50">
                    сортировка
                  </span>
                </div>

                <div className="flex flex-col">
                  {VACANCY_SORT_OPTIONS.map((option) => (
                    <div
                      key={option}
                      className="bg-dark-bg cursor-pointer"
                      onClick={() => setSortOption(option)}
                    >
                      <Radio
                        title={option}
                        isActive={sortOption === option}
                        onChange={() => setSortOption(option)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="mt-auto flex flex-col gap-5 px-5">
            <button
              onClick={handleReset}
              className="text-primary flex items-center justify-center gap-1 text-xs"
            >
              <RotatingIcon rotationAngle={rotationAngle} />
              Сбросить фильтр
            </button>

            <button
              onClick={handleApply}
              className="bg-primary text-foreground flex items-center justify-center rounded-full px-6 py-3.5"
            >
              <div className="flex items-center">
                <span className="text-sm">Применить фильтр</span>
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2305 4.43358C14.5292 4.1468 15.0042 4.15636 15.291 4.45506L19.9062 9.26365C20.1848 9.55386 20.1848 10.0125 19.9062 10.3027L15.291 15.1113C15.0042 15.4102 14.5293 15.4196 14.2305 15.1328C13.9319 14.8459 13.9222 14.371 14.209 14.0722L18.3262 9.78319L14.209 5.49412C13.9222 5.19533 13.9317 4.72041 14.2305 4.43358Z"
                    fill="#F2F2F2"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
