'use client';

import React from 'react';

import type { TColumnElement } from '@udecode/plate-layout';

import { cn } from '@udecode/cn';
import {
  PlateElement,
  useElement,
  useReadOnly,
  withHOC,
} from '@udecode/plate/react';

export const ColumnElement = withHOC(
  React.Fragment,
  function ColumnElement({
    children,
    className,
    ...props
  }: React.ComponentProps<typeof PlateElement>) {
    const readOnly = useReadOnly();
    const { width } = useElement<TColumnElement>();

    return (
      <PlateElement
        className={cn(
          'flex-shrink-0 flex-grow-0',
          className,
          !readOnly && 'rounded-lg border border-dashed p-3'
        )}
        style={{
          width: width ?? '100%',
          // Make sure each slide takes up full width of the carousel viewport
          flexBasis: '100%',
        }}
        {...props}
      >
        {children}
      </PlateElement>
    );
  }
);
