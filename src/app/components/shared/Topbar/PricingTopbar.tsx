'use client';

import Image from 'next/image';
import { useState } from 'react';
import StudentIcon from '~/app/components/PricingPage/assets/student.png';
import AvatarsIcon from '~/app/components/PricingPage/assets/avatars.svg';
import { Modal } from '~/app/components/shared/Modal';
import { StudentForm } from '~/app/components/PricingPage/StudentForm';
import { Topbar as UnifiedTopbar, PricingSection } from './';
import { cn } from '~/helpers';

/**
 * PricingPage Topbar component
 *
 * This component uses the UnifiedTopbar but with a special approach:
 * - The entire 3-column grid is passed as the leftContent
 * - We use className="!p-0" to remove padding since PricingSections have their own padding
 * - We don't use rightContent since our grid layout handles the full width
 */
export function PricingTopbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <UnifiedTopbar
        leftContent={
          <div className={cn('grid w-full grid-cols-1 sm:grid-cols-3')}>
            <PricingSection
              isRightBordered
              className="flex flex-row items-center gap-2 text-base sm:text-xl"
            >
              <div className="pl-5 sm:pl-8">Тарифы BlockFirst</div>
            </PricingSection>
            <PricingSection className="py-4.5 pt-10 pb-4 sm:py-5.25 border-t sm:border-t-0 border-accent">
              <div className="flex flex-row justify-between gap-2 px-5 sm:flex-col sm:pl-8">
                <div className="flex flex-row items-center gap-2 text-sm leading-4">
                  <Image
                    src={StudentIcon}
                    alt="Student"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  Для студентов
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-primary flex cursor-pointer flex-row items-center text-xs leading-3.5 hover:opacity-50"
                >
                  Заполни анкету
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.30561 2.96967C5.5985 2.67678 6.07337 2.67678 6.36627 2.96967L9.86627 6.46967C10.1592 6.76256 10.1592 7.23744 9.86627 7.53033L6.36627 11.0303C6.07337 11.3232 5.5985 11.3232 5.30561 11.0303C5.01271 10.7374 5.01271 10.2626 5.30561 9.96967L8.27528 7L5.30561 4.03033C5.01271 3.73744 5.01271 3.26256 5.30561 2.96967Z"
                      fill="#195AF4"
                    />
                  </svg>
                </button>
              </div>
            </PricingSection>

            <PricingSection className="hidden flex-col items-end gap-2 pr-8 sm:flex">
              <div className="flex flex-row items-center justify-end gap-2 text-sm">
                <Image src={AvatarsIcon} alt={''} className="h-6 w-16.5" />
              </div>
              <span className="font-roboto text-secondary text-xs leading-3.5 opacity-50">
                Сервисы для оплаты
              </span>
            </PricingSection>
          </div>
        }
        className="!p-0"
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <StudentForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
