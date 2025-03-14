import React from 'react';
import { ChevronRight } from '../icons/ChevronRight';
import { Info } from '../icons/Info';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ variant, children, onClick }: ButtonProps) => {
  const baseStyles = 'h-11 rounded-full flex items-center justify-center gap-2';
  const variantStyles = {
    primary: 'border border-[#1889F4] text-[#F2F2F2]',
    secondary: 'text-[#F2F2F2]',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} w-[169px]`}
      onClick={onClick}
    >
      {children}
      {variant === 'primary' && <ChevronRight />}
      {variant === 'secondary' && <Info />}
    </button>
  );
};
