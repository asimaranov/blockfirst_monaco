import React from 'react';

interface LastUpdateInfoProps {
  lastUpdate: string;
  label?: string;
}

export function LastUpdateInfo({
  lastUpdate,
  label = 'Последнее обновление',
}: LastUpdateInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-end gap-2 pb-[1px]">
        <div className="h-[6px] w-[6px] rounded-full bg-[#54EDB7]" />
        <span className="font-roboto text-sm leading-4 font-medium text-[#F2F2F2]">
          {lastUpdate}
        </span>
      </div>
      <span className="font-roboto text-secondary text-xs leading-3.5 opacity-50">
        {label}
      </span>
    </div>
  );
}
