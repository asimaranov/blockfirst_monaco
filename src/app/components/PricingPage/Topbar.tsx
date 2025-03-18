'use client';

import Link from 'next/link';
import { cn } from '~/helpers';
import Image from 'next/image';
import { useState } from 'react';
import StudentIcon from './assets/student.png';
import AvatarsIcon from './assets/avatars.svg';
import { Modal } from '../shared/Modal';
import { StudentForm } from './StudentForm';

export function Topbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className={cn('grid w-full grid-cols-3 border-b border-[#282D33]')}>
        <div className="border-accent flex flex-row items-center gap-2 border-r py-6 text-xl">
          <div className="pl-8">Тарифы BlockFirst</div>
        </div>
        <div className="py-6">
          <div className="flex flex-col gap-2 pl-8">
            <div className="flex flex-row items-center gap-2 text-sm">
              <Image
                src={StudentIcon}
                alt="Student"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              Для студентов
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-primary flex cursor-pointer flex-row text-xs"
            >
              Заполни анкету
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
        </div>
        <div className="flex flex-col items-end gap-2 py-6 pr-8">
          <div className="flex flex-row items-center justify-end gap-2 text-sm">
            <Image src={AvatarsIcon} alt={''} />
          </div>
          <span className="font-roboto text-secondary text-xs opacity-50">
            Сервисы для оплаты
          </span>
        </div>
      </nav>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <StudentForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
