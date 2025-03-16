import { cn } from '~/helpers';

export function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-secondary', className)}
    >
      <path
        d="M3.4153642654419 9.25H15.082030296326"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
