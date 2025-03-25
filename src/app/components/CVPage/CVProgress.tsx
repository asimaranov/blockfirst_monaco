'use client';

import { Progress } from '~/app/components/shared/Progress';

interface CVProgressProps {
  progress: number;
  totalSteps: number;
  currentStep: number;
}

export function CVProgress({
  progress,
  totalSteps,
  currentStep,
}: CVProgressProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-roboto text-sm leading-4 font-medium text-[#F2F2F2]">
            Прогресс заполнения
          </span>
          <span className="font-roboto text-xs leading-3.5 text-[#9AA6B5]">
            Шаг {currentStep} из {totalSteps}
          </span>
        </div>
        <span className="font-roboto text-sm leading-4 font-medium text-[#F2F2F2]">
          {progress}%
        </span>
      </div>
      <Progress value={progress} useFlag />
    </div>
  );
}
