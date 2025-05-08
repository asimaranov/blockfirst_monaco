'use client';

import { useToolboxStore } from '~/store/monaco-actions/toolbox-store';
import { useState } from 'react';
import { Modal } from '../shared/Modal';
import FormMobileControls from '../shared/FormMobileControls';
import Image from 'next/image';
import ToolboxTabs from './ToolboxTabs';
import ToolboxItem from './ToolboxItem';
import ToolboxActionButton from './ToolboxActionButton';
import { UTILITIES_ITEMS, CONSTANTS_ITEMS, ToolboxItemData } from './ToolboxData';
import { cn } from '~/helpers';

type Tab = 'utils' | 'constants' | 'terminal';

export const ToolboxModal = () => {
  const store = useToolboxStore();
  const [activeTab, setActiveTab] = useState<Tab>('utils');

  const itemsToDisplay: (ToolboxItemData & { isConstant?: boolean })[] =
    activeTab === 'utils'
      ? UTILITIES_ITEMS
      : activeTab === 'constants'
        ? CONSTANTS_ITEMS.map((item) => ({
            ...item,
            isConstant: true,
          }))
        : [];

  return (
    <Modal
      isOpen={store.isToolboxModalOpen}
      onClose={() => store.closeToolboxModal()}
      className="sm:z-[10000000000000000]"
      overlayClassName="z-[10000000000000000]"
    >
      <div className="bg-dark-bg border-accent/40 relative flex h-full flex-col border-l-0 max-w-105 sm:border-l">
        <FormMobileControls
          showBackButton={false}
          onBackClick={() => {}}
          onClose={store.closeToolboxModal}
        />
        <div
          className={cn(
            'z-[10000000000000000] flex flex-1 flex-col overflow-y-auto sm:z-[10000000000000000]'
          )}
        >
          {/* Header Section */}
          <div className="flex flex-col items-center gap-8 px-10 py-8">
            <Image
              src={'/images/logo/form-logo.svg'}
              alt="Logo"
              width={152}
              height={44}
              className="hidden w-38 sm:flex"
            />
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-foreground text-3xl">
                Утилиты & Константы
              </h2>
              <p className="text-secondary text-sm">
                В процессе прохождения курса будут предоставлены новые утилиты и
                константы.
              </p>
            </div>
          </div>

          {/* Tabs Section */}
          <ToolboxTabs activeTab={activeTab} setActive={setActiveTab} />

          {/* Content Section */}
          <div className="flex flex-1 flex-col gap-12 px-10 py-8">
            {itemsToDisplay.map((item) => (
              <ToolboxItem
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                inputValue={item.inputValue}
                inputValue2={item.inputValue2}
                outputValue={item.outputValue}
                walletRequired={item.walletRequired}
                applyFunction={item.applyFunction}
                isConstant={item.isConstant}
                actionButton={
                  item.actionButtonText && (
                    <ToolboxActionButton
                      text={item.actionButtonText}
                      icon={item.actionButtonIcon}
                    />
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
