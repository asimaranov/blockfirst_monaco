import * as React from 'react';

import type { SlateElementProps } from '@udecode/plate';

import { cn } from '@udecode/cn';
import { SlateElement } from '@udecode/plate';
import { cva } from 'class-variance-authority';

interface HeadingElementViewProps extends SlateElementProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const headingVariants = cva('relative mb-1', {
  variants: {
    variant: {
      h1: 'mb-4 mt-6 text-3xl font-medium tracking-tight',
      h2: 'mb-4 mt-6 text-2xl font-medium tracking-tight',
      h3: 'mb-4 mt-6 text-xl font-semibold tracking-tight',
      h4: 'mb-4 mt-6 text-sm font-semibold tracking-tight',
      h5: 'mb-4 mt-6 text-xs font-semibold tracking-tight',
      h6: 'mb-4 mt-6 text-xxs font-semibold tracking-tight',
    },
  },
});

export const HeadingElementStatic = ({
  children,
  className,
  variant = 'h1',
  ...props
}: HeadingElementViewProps) => {
  return (
    <SlateElement
      as={variant}
      className={cn(className, headingVariants({ variant }))}
      {...props}
    >
      {children}
    </SlateElement>
  );
};
