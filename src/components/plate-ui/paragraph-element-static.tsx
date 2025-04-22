import React from 'react';

import type { SlateElementProps } from '@udecode/plate';

import { cn } from '@udecode/cn';
import { SlateElement } from '@udecode/plate';

export const ParagraphElementStatic = ({
  children,
  className,
  ...props
}: SlateElementProps) => {
  return (
    <SlateElement className={cn(className, 'm-0 px-0 py-1 text-base leading-6')} {...props}>
      {children}
    </SlateElement>
  );
};
