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
  const [localSortOption, setLocalSortOption] =
    useState<VacancySort>(sortOption);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleReset = () => {
    setSpecialityFilters([]);
    setLocalSortOption(VACANCY_SORT_OPTIONS[0] as VacancySort);
    setRotationAngle((prevAngle) => prevAngle + 360);
  };

  const handleApply = () => {
    setSpecialityFilters(specialityFilters);
    setSortOption(localSortOption);
    onClose();
  };

  
  useEffect(() => {
    console.log('Speciality filters changed', specialityFilters);
  }, [specialityFilters]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-[780px] w-full  flex-col bg-[#0f1217]">
        <div className="flex flex-col py-5 h-full">
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

              <h2 className="text-foreground text-xl text-center">Фильтр вакансий</h2>
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
                      onClick={() => setLocalSortOption(option)}
                    >
                      <Radio
                        title={option}
                        isActive={localSortOption === option}
                        onChange={() => setLocalSortOption(option)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex flex-col gap-5 px-5 mt-auto">
            <button
              onClick={handleReset}
              className="text-primary flex items-center justify-center gap-1 text-xs"
            >
              <RotatingIcon rotationAngle={rotationAngle} />
              Сбросить фильтр
            </button>

            <button
              onClick={handleApply}
              className="bg-primary text-foreground flex items-center justify-center rounded-full px-6 py-3"
            >
              <div className="flex items-center">
                <span className="text-sm">Применить фильтр</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.75 9.5L10.25 14.25M14.75 9.5L10.25 4.75M14.75 9.5H4.75"
                    stroke="#F2F2F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
