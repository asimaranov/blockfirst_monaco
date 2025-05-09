import React from 'react';
import { cn } from '~/helpers';

interface ToolboxActionButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const ToolboxActionButton: React.FC<ToolboxActionButtonProps> = ({
  text,
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'border-primary text-foreground hover:bg-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border py-3 text-sm transition-colors group',
        className
      )}
    >
      {icon}
      {text}
    </button>
  );
};

export default ToolboxActionButton;
