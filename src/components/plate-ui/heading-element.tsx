'use client';

import React from 'react';

import { withRef, withVariants } from '@udecode/cn';
import { PlateElement } from '@udecode/plate/react';
import { cva } from 'class-variance-authority';

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

const HeadingElementVariants = withVariants(PlateElement, headingVariants, [
  'variant',
]);

export const HeadingElement = withRef<typeof HeadingElementVariants>(
  ({ children, variant = 'h1', ...props }, ref) => {
    return (
      <HeadingElementVariants
        ref={ref}
        as={variant!}
        variant={variant}
        {...props}
      >
        {children}
      </HeadingElementVariants>
    );
  }
);
