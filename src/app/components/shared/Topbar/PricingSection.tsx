import React, { ReactNode } from 'react';
import { cn } from '~/helpers';

interface PricingSectionProps {
  children: ReactNode;
  className?: string;
  isRightBordered?: boolean;
  mobileBottomBorder?: boolean;
}

export function PricingSection({
  children,
  className,
  isRightBordered = false,
  mobileBottomBorder = false,
}: PricingSectionProps) {
  return (
    <div
      className={cn(
        'py-5.25',
        isRightBordered && 'border-accent border-r',
        mobileBottomBorder && 'border-accent border-b sm:border-b-0',
        className
      )}
    >
      {children}
    </div>
  );
}
