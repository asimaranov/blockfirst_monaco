import { useEffect, useState } from 'react';
import { InfoPopover } from '../shared/InfoPopover';

type NavigationItemType = 'completed' | 'active' | 'upcoming';

interface NavigationItem {
  title: string;
  type: NavigationItemType;
}

export default function LessonNavigation({
  items,
  activeIndex,
}: {
  items: string[];
  activeIndex: number;
}) {
  const navigationItems: NavigationItem[] = items.map((x, i) => ({
    title: x,
    type:
      activeIndex === i ? 'active' : activeIndex > i ? 'completed' : 'upcoming',
  }));
  return (
    <div className="sticky top-0 flex w-75 flex-col gap-8 px-8 pt-10">
      <div className="flex items-center justify-between">
        <span className="text-secondary/50 text-xs uppercase">
          Структура урока
        </span>
        <InfoPopover title="Структура урока" content="Структура урока" />
      </div>

      <div className="flex flex-col gap-4">
        {navigationItems.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-row items-start gap-5 ${index !== navigationItems.length - 1 ? 'pb-10' : ''} group`}
          >
            <div className="flex h-5 w-5 shrink-0 flex-col items-center justify-center">
              {item.type === 'completed' && (
                <>
                  <div className="z-10 h-2 w-2 shrink-0 rounded-full bg-[#163888]"></div>
                  <div className="absolute h-[calc(100%+10px)] w-px translate-y-[calc(1/2*100%)] bg-[#163888] pt-4"></div>
                </>
              )}
              {item.type === 'active' && (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="z-10 h-4 w-4 shrink-0"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="7.5"
                      fill="#14171C"
                      stroke="#195AF4"
                    />
                    <circle cx="8" cy="8" r="4" fill="#195AF4" />
                  </svg>
                  <div className="absolute h-[calc(100%+10px)] w-px translate-y-[calc(1/2*100%)] bg-[#575F69] pt-4 group-last:hidden"></div>
                </>
              )}
              {item.type === 'upcoming' && (
                <>
                  <div className="z-10 h-2 w-2 shrink-0 rounded-full bg-[#575F69]"></div>
                  <div className="absolute h-[calc(100%+10px)] w-px translate-y-[calc(1/2*100%)] bg-[#575F69] pt-4 group-last:hidden"></div>
                </>
              )}
            </div>

            <span className="text-secondary text-sm">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
