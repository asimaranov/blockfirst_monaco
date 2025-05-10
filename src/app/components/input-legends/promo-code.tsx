import { cn } from '~/helpers';

export default function PromoCodeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        '[&>*]:[&:not(:first-child)]:stroke-none',
        '[&>*]:[&:not(:first-child)]:group-focus-within:stroke-[#F2F2F2] [&>*]:[&:not(:first-child)]:group-data-[active=true]:stroke-[#F2F2F2]',
        '[&>*]:first:group-focus-within:stroke-none [&>*]:first:group-data-[active=true]:stroke-none',
        'h-4 w-4',
        active && '[&>*]:stroke-foreground [&>*]:[stroke-opacity:100%]'
      )}
    >
      <path
        d="M6.66536 2.66602L6.66536 13.3327M12.9987 8.33268C12.9987 7.41268 13.7454 6.66602 14.6654 6.66602V5.99935C14.6654 3.33268 13.9987 2.66602 11.332 2.66602H4.66536C1.9987 2.66602 1.33203 3.33268 1.33203 5.99935V6.33268C2.25203 6.33268 2.9987 7.07935 2.9987 7.99935C2.9987 8.91935 2.25203 9.66602 1.33203 9.66602V9.99935C1.33203 12.666 1.9987 13.3327 4.66536 13.3327H11.332C13.9987 13.3327 14.6654 12.666 14.6654 9.99935C13.7454 9.99935 12.9987 9.25268 12.9987 8.33268Z"
        stroke="#9AA6B5"
        strokeOpacity="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M6.66536 2.66602L6.66536 13.3327M12.9987 8.33268C12.9987 7.41268 13.7454 6.66602 14.6654 6.66602V5.99935C14.6654 3.33268 13.9987 2.66602 11.332 2.66602H4.66536C1.9987 2.66602 1.33203 3.33268 1.33203 5.99935V6.33268C2.25203 6.33268 2.9987 7.07935 2.9987 7.99935C2.9987 8.91935 2.25203 9.66602 1.33203 9.66602V9.99935C1.33203 12.666 1.9987 13.3327 4.66536 13.3327H11.332C13.9987 13.3327 14.6654 12.666 14.6654 9.99935C13.7454 9.99935 12.9987 9.25268 12.9987 8.33268Z"
        stroke="#F2F2F2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
