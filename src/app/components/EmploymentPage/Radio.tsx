import { motion } from 'motion/react';
import { cn } from '~/helpers';

export function Radio({
  title,
  isActive,
  onChange,
}: {
  title: string;
  isActive: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'flex w-full cursor-pointer flex-row items-center gap-1 px-5 py-3 hover:bg-[#14171C] sm:px-8',
        isActive && 'bg-[#14171C]'
      )}
    >
      <span className="text-sm">{title}</span>
      <div
        className={cn(
          'ml-auto size-4 rounded-full transition-all duration-200 ease-in-out',
          isActive
            ? 'border-[3px] border-[#195AF4] sm:border-[0.1736vw]'
            : 'border-[1px] border-[#9AA6B5] sm:border-[0.0579vw]'
        )}
      />
    </button>
  );
}
