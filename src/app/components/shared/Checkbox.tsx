'use client';

import { motion } from 'framer-motion';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

export const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
  const checkboxVariants = {
    checked: { scale: 1, opacity: 1 },
    unchecked: { scale: 1, opacity: 1 },
  };

  const checkVariants = {
    checked: { pathLength: 1 },
    unchecked: { pathLength: 0 },
  };

  return (
    <button
      className="flex cursor-pointer items-center gap-4"
      onClick={onChange}
    >
      <div className="flex h-5 w-5 items-center justify-center">
        <motion.div
          initial="unchecked"
          animate={checked ? 'checked' : 'unchecked'}
          variants={checkboxVariants}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        >
          {checked ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <rect x="2" y="2" width="16" height="16" rx="4" fill="#195AF4" />
              <motion.path
                d="M7.08594 10.416L8.7526 12.0827L12.9193 7.91602"
                stroke="#F2F2F2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial="unchecked"
                animate="checked"
                variants={checkVariants}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  mass: 0.8,
                }}
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <rect
                x="2.5"
                y="2.5"
                width="15"
                height="15"
                rx="3.5"
                stroke="#9AA6B5"
                strokeOpacity="0.5"
              />
            </svg>
          )}
        </motion.div>
      </div>
      {label && <span className="text-foreground text-sm">{label}</span>}
    </button>
  );
};
