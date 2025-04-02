import { motion } from 'framer-motion';
import { cn } from '~/helpers';

export function Checkbox({
  title,
  itemCount,
  isActive,
  onChange,
}: {
  title: string;
  itemCount: number;
  isActive: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'flex w-full cursor-pointer flex-row items-center gap-1 px-5 sm:px-8 py-3 hover:bg-[#14171C]',
        isActive && 'bg-[#14171C]'
      )}
    >
      <span className="text-sm">{title}</span>
      <span className="text-secondary text-sm">({itemCount})</span>
      <motion.div
        initial={isActive ? 'active' : 'inactive'}
        variants={{
          active: { backgroundColor: '#195AF4', borderColor: '#195AF4' },
          inactive: { backgroundColor: 'transparent', borderColor: '#9aa6b5' },
        }}
        animate={isActive ? 'active' : 'inactive'}
        className={cn(
          'ml-auto flex size-4 flex-col items-center justify-center rounded-[4px] sm:rounded-[0.2315vw] border',
          !isActive && 'hover:opacity-100 opacity-50'
        )}
      >
        <motion.svg
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={'w-2 h-1.5'}
          variants={{
            active: { opacity: 1 },
            inactive: { opacity: 0 },
          }}
        >
          <motion.path
            d="M1.08203 3.41602L2.7487 5.08268L6.91536 0.916016"
            stroke="#F2F2F2"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              active: { pathLength: 1 },
              inactive: { pathLength: 0 },
            }}
          />
        </motion.svg>
      </motion.div>
    </button>
  );
}
