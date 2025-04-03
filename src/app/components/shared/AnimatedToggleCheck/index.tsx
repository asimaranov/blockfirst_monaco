import { motion } from 'motion/react';
import { cn } from '~/helpers';

export default function AnimatedToggleCheck({
  isOpen,
  className,
}: {
  isOpen: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex h-3.5 w-3.5 items-center justify-center',
        className
      )}
    >
      <motion.svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5"
        initial={false}
        animate={{
          rotate: isOpen ? 180 : 0,
          scale: isOpen ? [1, 1.05, 1] : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.67353 4.55205C2.92093 4.31134 3.31662 4.31676 3.55733 4.56415L7.00127 8.10376L10.4452 4.56415C10.6859 4.31676 11.0816 4.31134 11.329 4.55205C11.5764 4.79276 11.5818 5.18845 11.3411 5.43585L7.44922 9.43585C7.33156 9.55678 7.17 9.625 7.00127 9.625C6.83254 9.625 6.67098 9.55678 6.55331 9.43585L2.66142 5.43585C2.42071 5.18845 2.42613 4.79276 2.67353 4.55205Z"
          animate={{
            fill: isOpen ? '#9AA6B5' : '#195AF4',
          }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        />
      </motion.svg>
    </div>
  );
}
