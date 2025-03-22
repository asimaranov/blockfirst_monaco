import { cn } from '~/helpers';

export default function AccountSVG({ active }: { active?: boolean }) {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className='h-4 w-4'
    >
      <path
        d="M8.49984 7.99998C10.3408 7.99998 11.8332 6.5076 11.8332 4.66665C11.8332 2.8257 10.3408 1.33331 8.49984 1.33331C6.65889 1.33331 5.1665 2.8257 5.1665 4.66665C5.1665 6.5076 6.65889 7.99998 8.49984 7.99998Z"
        stroke="#9AA6B5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          '[stroke-opacity:50%] group-focus-within:stroke-foreground group-focus-within:[stroke-opacity:100%]',
          active && 'stroke-foreground [stroke-opacity:100%]'
        )}
      />
      <path
        d="M14.2268 14.6667C14.2268 12.0867 11.6601 10 8.5001 10C5.3401 10 2.77344 12.0867 2.77344 14.6667"
        stroke="#9AA6B5"
        strokeOpacity="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          '[stroke-opacity:50%] group-focus-within:stroke-foreground group-focus-within:[stroke-opacity:100%]',
          active && 'stroke-foreground [stroke-opacity:100%]'
        )}
      />
    </svg>
  );
}
