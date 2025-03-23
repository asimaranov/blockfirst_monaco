import { cn } from '~/helpers';

export default function PasswordSVG({ active }: { active?: boolean }) {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
    >
      <g>
        <path
          d="M4.5 6.66665V5.33331C4.5 3.12665 5.16667 1.33331 8.5 1.33331C11.8333 1.33331 12.5 3.12665 12.5 5.33331V6.66665"
          stroke="#9AA6B5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            '[stroke-opacity:50%] group-focus-within:stroke-foreground group-focus-within:[stroke-opacity:100%]',
            active && 'stroke-foreground [stroke-opacity:100%]'
          )}
        />
        <path
          d="M8.50016 12.3333C9.42064 12.3333 10.1668 11.5871 10.1668 10.6667C10.1668 9.74619 9.42064 9 8.50016 9C7.57969 9 6.8335 9.74619 6.8335 10.6667C6.8335 11.5871 7.57969 12.3333 8.50016 12.3333Z"
          stroke="#9AA6B5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            '[stroke-opacity:50%] group-focus-within:stroke-foreground group-focus-within:[stroke-opacity:100%]',
            active && 'stroke-foreground [stroke-opacity:100%]'
          )}
        />
        <path
          d="M11.8335 14.6667H5.16683C2.50016 14.6667 1.8335 14 1.8335 11.3334V10C1.8335 7.33335 2.50016 6.66669 5.16683 6.66669H11.8335C14.5002 6.66669 15.1668 7.33335 15.1668 10V11.3334C15.1668 14 14.5002 14.6667 11.8335 14.6667Z"
          stroke="#9AA6B5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            '[stroke-opacity:50%] group-focus-within:stroke-foreground group-focus-within:[stroke-opacity:100%]',
            active && 'stroke-foreground [stroke-opacity:100%]'
          )}
        />
      </g>
    </svg>
  );
}
