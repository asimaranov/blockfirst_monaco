import React, { ReactNode } from 'react';
import { cn } from '~/helpers';

interface PricingSectionProps {
  children: ReactNode;
  className?: string;
  isRightBordered?: boolean;
}

export function PricingSection({
  children,
  className,
  isRightBordered = false,
}: PricingSectionProps) {
  return (
    <div
      className={cn(
        'py-5.25',
        isRightBordered && 'border-accent border-r',
        className
      )}
    >
      {children}
    </div>
  );
}
