import { cn } from '~/helpers';

export default function ToggleMinus({
  isExpanded,
  onToggle,
  className,
  disabled,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={cn(
        'group flex cursor-pointer items-center justify-center',
        className
      )}
      onClick={onToggle}
      disabled={disabled}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          'h-5 w-5',
          'transition-transform duration-300',
          isExpanded ? 'text-secondary' : 'group-hover:text-foreground'
        )}
        onClick={onToggle}
      >
        <line
          x1="5"
          y1="10"
          x2="15"
          y2="10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="transition-transform duration-300"
        />
        <line
          x1="10"
          y1="5"
          x2="10"
          y2="15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className={cn(
            'origin-center transition-transform duration-300',
            isExpanded ? 'scale-0' : 'scale-100'
          )}
        />
      </svg>
    </button>
  );
}
