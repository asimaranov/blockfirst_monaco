import { motion } from 'framer-motion';

type RotatingIconProps = {
  rotationAngle: number;
  className?: string;
  size?: number;
  color?: string;
};

export const RotatingIcon = ({
  rotationAngle,
  className = '',
  size = 16,
  color = '#1962FF',
}: RotatingIconProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ rotate: rotationAngle }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={className}
    >
      <path
        d="M9.92542 3.38823C9.34542 3.2149 8.70542 3.10156 7.99875 3.10156C4.80542 3.10156 2.21875 5.68823 2.21875 8.88156C2.21875 12.0816 4.80542 14.6682 7.99875 14.6682C11.1921 14.6682 13.7788 12.0816 13.7788 8.88823C13.7788 7.70156 13.4187 6.5949 12.8054 5.6749"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7548 3.54536L8.82812 1.33203"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7545 3.54688L8.50781 5.18687"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};
