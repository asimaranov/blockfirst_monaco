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

  const handleResetFilter = () => {
    setTempSelectedPeriod('all');
  };

  const handleApplyFilter = () => {
    onSelectPeriod(tempSelectedPeriod);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-dark-bg flex h-full w-full flex-col">
        {/* Header */}
        <div className="flex flex-col gap-5 px-5 py-5">
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
                    <div className="relative h-5 w-5">
                      <div className="bg-primary absolute inset-0 rounded-full" />
                      <div className="bg-dark-bg absolute inset-[5px] rounded-full" />
                    </div>
                  ) : (
                    <div className="border-secondary/50 h-5 w-5 rounded-full border" />
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.22 3.1C3.56667 1.76667 5.2 1.1 7 1.1C8.8 1.1 10.4333 1.76667 11.78 3.1C13.1133 4.43333 13.78 6.06667 13.78 8C13.78 9.93333 13.1133 11.5667 11.78 12.9C10.4333 14.2333 8.8 14.9 7 14.9C5.2 14.9 3.56667 14.2333 2.22 12.9C0.886667 11.5667 0.22 9.93333 0.22 8C0.22 6.06667 0.886667 4.43333 2.22 3.1Z"
                  stroke="#195AF4"
                  strokeWidth="1"
                />
                <path
                  d="M8.82683 1.33331L10.7535 3.54665L8.50683 5.18665"
                  stroke="#195AF4"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5068 3.54667L10.7535 3.54667"
                  stroke="#195AF4"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Сбросить сортировку
            </button>
          </div>

          <button
            className="bg-primary text-foreground flex items-center justify-center gap-2 rounded-full py-3.5 text-sm"
            onClick={handleApplyFilter}
          >
            <span>Применить сортировку</span>
            <Image src={'/images/icons/forward-arrow.svg'} alt="forward-arrow" width={21} height={20} className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
