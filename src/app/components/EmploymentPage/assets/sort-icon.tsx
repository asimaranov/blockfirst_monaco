import { motion } from 'framer-motion';

export const SortIcon = ({
  className,
  arrow,
}: {
  className?: string;
  arrow: 'up' | 'down' | 'none';
}) => {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={arrow}
      variants={{
        up: {
          scaleX: -1,
        },
        down: {
          scaleX: 1,
        },
        none: {
          scaleX: 1,
        },
      }}
      animate={arrow}
    >
      <path
        d="M5.25646 11.9577L2.32812 9.03516"
        stroke="#9AA6B5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25781 2.04102V11.9577"
        stroke="#9AA6B5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.74219 2.04102L11.6705 4.96352"
        stroke="#9AA6B5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.74219 11.9577V2.04102"
        stroke="#9AA6B5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};
