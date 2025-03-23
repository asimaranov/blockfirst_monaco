import { motion } from 'framer-motion';
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
        'flex w-full cursor-pointer flex-row items-center gap-1 px-8 py-3 hover:bg-[#14171C]',
        isActive && 'bg-[#14171C]'
      )}
    >
      <span className="text-base">{title}</span>
      <motion.div
        variants={{
          active: { border: '0.1736vw solid #195AF4' },
          inactive: { border: '0.0579vw solid #9AA6B5' },
        }}
        initial={isActive ? 'active' : 'inactive'}
        animate={isActive ? 'active' : 'inactive'}
        transition={{ duration: 0.1 }}
        className="ml-auto size-4 rounded-full border"
      />
    </button>
  );
}
