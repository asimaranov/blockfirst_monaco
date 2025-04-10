'use client';

import { useState } from 'react';
import { Modal } from '../shared/Modal';
import { motion } from 'motion/react';
import Image from 'next/image';
import { RotatingIcon } from '../shared/RotatingIcon';

type TimePeriod = 'all' | '7d' | '30d' | '90d' | 'lm' | 'year';

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedPeriod: TimePeriod;
  onSelectPeriod: (period: TimePeriod) => void;
};

type PeriodOption = {
  value: TimePeriod;
  label: string;
};

const periodOptions: PeriodOption[] = [
  { value: 'all', label: 'Все время' },
  { value: '7d', label: 'Последнюю неделю' },
  { value: '30d', label: 'Текущий месяц' },
  { value: '90d', label: 'Прошлый месяц' },
  { value: 'lm', label: 'Позапрошлый месяц' },
  { value: 'year', label: 'Последний год' },
];

export const FilterModal = ({
  isOpen,
  onClose,
  selectedPeriod,
  onSelectPeriod,
}: FilterModalProps) => {
  const [tempSelectedPeriod, setTempSelectedPeriod] =
    useState<TimePeriod>(selectedPeriod);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleResetFilter = () => {
    setTempSelectedPeriod('all');
    setRotationAngle((prevAngle) => prevAngle + 360);
  };

  const handleApplyFilter = () => {
    onSelectPeriod(tempSelectedPeriod);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-dark-bg flex h-full w-full flex-col">
        {/* Header */}
        <div className="flex flex-col gap-5 px-5 py-5 pb-8">
          <div className="flex justify-end">
            <button onClick={onClose} className="text-foreground">
              <Image
                src={'/images/icons/mobile-close-cross.svg'}
                alt="close"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </button>
          </div>
          <h2 className="text-foreground text-center text-lg">
            Промежуток времени
          </h2>
        </div>

        {/* Options List */}
        <div className="flex w-full flex-col">
          {periodOptions.map((option) => (
            <div
              key={option.value}
              className={`flex items-center px-5 py-3.5 ${
                option.value === tempSelectedPeriod ? 'bg-[#14171C]' : ''
              }`}
            >
              <button
                className="flex w-full items-center gap-4"
                onClick={() => setTempSelectedPeriod(option.value)}
              >
                <div className="flex h-5 w-5 items-center justify-center">
                  {option.value === tempSelectedPeriod ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                    >
                      <circle cx="10" cy="10" r="8" fill="#195AF4" />
                      <circle cx="10" cy="10" r="5" fill="#0F1217" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                        stroke="#9AA6B5"
                        stroke-opacity="0.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-foreground text-sm">{option.label}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-col gap-5 px-5 py-5">
          <div className="flex justify-center">
            <button
              className="text-primary flex items-center gap-1 text-xs"
              onClick={handleResetFilter}
            >
              <RotatingIcon rotationAngle={rotationAngle} />
              Сбросить сортировку
            </button>
          </div>

          <button
            className="bg-primary text-foreground flex items-center justify-center rounded-full py-3.5 text-sm"
            onClick={handleApplyFilter}
          >
            <span>Применить сортировку</span>
            <Image
              src={'/images/icons/forward-arrow.svg'}
              alt=""
              width={21}
              height={20}
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>
    </Modal>
  );
};
