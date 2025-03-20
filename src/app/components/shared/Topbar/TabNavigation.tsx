import React from 'react';
import { cn } from '~/helpers';

export interface TabItem {
  label: string;
  active: boolean;
  onClick: () => void;
}

interface TabNavigationProps {
  items: TabItem[];
}

export function TabNavigation({ items }: TabNavigationProps) {
  return (
    <div className="flex flex-row rounded-[100px] bg-[#01050D]">
      {items.map((item) => (
        <div
          onClick={item.onClick}
          key={item.label}
          className={cn(
            'font-roboto flex items-center justify-center px-8 py-3 text-sm font-medium',
            'shrink-0 cursor-pointer',
            'leading-4',
            item.active
              ? 'rounded-[100px] bg-[#F2F2F2] text-[#01050D]'
              : 'bg-transparent text-[#F2F2F2] hover:opacity-80'
          )}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
