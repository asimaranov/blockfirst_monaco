'use client';

import { useToolboxStore } from '~/store/monaco-actions/toolbox-store';

import { useEffect, useRef } from 'react';
import { cn } from '~/helpers';
import { Modal } from './shared/Modal';
import FormMobileControls from './shared/FormMobileControls';
import Image from 'next/image';

export const ToolboxModal = () => {
  const store = useToolboxStore();

  useEffect(() => {
    console.log('isToolboxModalOpen', store.isToolboxModalOpen);
  }, [store.isToolboxModalOpen]);

  return (
    <Modal
      isOpen={store.isToolboxModalOpen}
      onClose={() => store.closeToolboxModal()}
      className="sm:z-[10000000000000000]"
      overlayClassName="z-[10000000000000000]"
    >
      <div className="bg-dark-bg border-accent/40 relative flex h-full w-auto flex-col border-l-0 sm:w-105 sm:border-l">
        <FormMobileControls
          showBackButton={false}
          onBackClick={() => {}}
          onClose={store.closeToolboxModal}
        />
        <div
          className={cn(
            'z-[10000000000000000] flex flex-1 flex-col px-5 py-0 pb-5 sm:z-[10000000000000000] sm:py-8 sm:pb-8 md:px-10',
            false && 'pb-6'
          )}
        >
          <div className="flex flex-1 flex-col gap-8 sm:gap-8">
            <div className="flex flex-col items-center gap-8">
              <Image
                src={'/images/logo/form-logo.svg'}
                alt="Logo"
                width={152}
                height={44}
                className="hidden w-38 sm:flex"
              />
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-foreground sm:text-2xll text-xl">
                  Утилиты & Константы
                </h2>
                <p className="text-secondary text-center text-sm">
                  В процессе прохождения курса будут предоставлены новые утилиты
                  и константы.
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h3 className="text-foreground text-lg">Утилиты</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
