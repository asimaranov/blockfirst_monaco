import React, { ReactNode } from 'react';
import { cn } from '~/helpers';
import MobileHeader from '../../MobileHeader';

export interface TopbarProps {
  /**
   * Left side content
   */
  leftContent: ReactNode;

  /**
   * Right side content
   */
  rightContent?: ReactNode;

  /**
   * Whether to show the bottom border
   * @default true
   */
  showBorder?: boolean;

  /**
   * Additional className to apply to the nav element
   */
  className?: string;
}

export function Topbar({
  leftContent,
  rightContent,
  showBorder = true,
  className,
}: TopbarProps) {
  return (
    <>
    <MobileHeader hasNotifications={true} />
    <nav
      className={cn(
        'flex w-full flex-row items-center justify-between px-8 py-6',
        showBorder && 'border-b border-[#282D33]',
        className
      )}
    >
      {leftContent}
      {rightContent}
    </nav>
    
    </>
  );
}
