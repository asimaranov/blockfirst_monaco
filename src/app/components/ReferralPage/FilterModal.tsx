'use client';

import { useState } from 'react';
import { Modal } from '../shared/Modal';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
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
              <X size={20} />
            </button>
          </div>
          <h2 className="text-foreground text-lg">Промежуток времени</h2>
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
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: rotationAngle }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <path
                  d="M9.92542 3.38823C9.34542 3.2149 8.70542 3.10156 7.99875 3.10156C4.80542 3.10156 2.21875 5.68823 2.21875 8.88156C2.21875 12.0816 4.80542 14.6682 7.99875 14.6682C11.1921 14.6682 13.7788 12.0816 13.7788 8.88823C13.7788 7.70156 13.4187 6.5949 12.8054 5.6749"
                  stroke="#1962FF"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.7548 3.54536L8.82812 1.33203"
                  stroke="#1962FF"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.7545 3.54688L8.50781 5.18687"
                  stroke="#1962FF"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </motion.svg>
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
              alt="forward-arrow"
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
