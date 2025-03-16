'use client';

import { MinusIcon } from './icons/MinusIcon';
import { cn } from '~/helpers';

interface TopbarProps {
  title: string;
  status: 'in_progress' | 'completed' | 'not_started';
  tags: string[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function Topbar({
  title,
  status,
  tags,
  isExpanded,
  onToggle,
}: TopbarProps) {
  const statusText = {
    in_progress: 'In Progress',
    completed: 'Completed',
    not_started: 'Not Started',
  };

  const statusColors = {
    in_progress: 'bg-success/10 text-success border-success/50',
    completed: 'bg-primary/10 text-primary border-primary/50',
    not_started: 'bg-secondary/10 text-secondary border-secondary/50',
  };

  return (
    <div className="border-accent flex w-full flex-col border-b">
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-foreground text-2xl">{title}</h1>
            <div
              className={cn(
                'rounded-full border px-3 py-1 text-xs',
                statusColors[status]
              )}
            >
              {statusText[status]}
            </div>
          </div>
          <div className="text-secondary flex items-center gap-2 text-sm">
            {tags.map((tag, index) => (
              <>
                {index > 0 && (
                  <div className="bg-secondary h-1 w-1 rounded-full opacity-50" />
                )}
                <span key={tag}>{tag}</span>
              </>
            ))}
          </div>
        </div>
        <button
          className={cn(
            'group flex h-10 w-10 items-center justify-center rounded-full transition-colors',
            isExpanded ? 'bg-accent' : 'hover:bg-accent'
          )}
          onClick={onToggle}
        >
          <MinusIcon
            className={cn(
              'transition-transform duration-300',
              isExpanded
                ? 'text-foreground rotate-180'
                : 'group-hover:text-foreground'
            )}
          />
        </button>
      </div>
    </div>
  );
}
