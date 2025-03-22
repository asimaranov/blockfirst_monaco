import { cn } from '~/helpers';

export default function BookIcon({ active }: { active?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'h-4 w-4',
        'group-focus-within:stroke-foreground [&>*]:stroke-foreground [stroke-opacity:50%] group-focus-within:[stroke-opacity:100%]',
        active && 'stroke-foreground [stroke-opacity:100%]'
      )}
    >
      <path
        d="M14.6654 11.1595V3.11281C14.6654 2.31281 14.012 1.71947 13.2187 1.78614H13.1787C11.7787 1.90614 9.65203 2.61947 8.46536 3.36614L8.35203 3.43947C8.1587 3.55947 7.8387 3.55947 7.64536 3.43947L7.4787 3.33948C6.29203 2.59948 4.17203 1.89281 2.77203 1.77947C1.9787 1.71281 1.33203 2.31281 1.33203 3.10614V11.1595C1.33203 11.7995 1.85203 12.3995 2.49203 12.4795L2.68536 12.5061C4.13203 12.6995 6.36536 13.4328 7.64536 14.1328L7.67203 14.1461C7.85203 14.2461 8.1387 14.2461 8.31203 14.1461C9.59203 13.4395 11.832 12.6995 13.2854 12.5061L13.5054 12.4795C14.1454 12.3995 14.6654 11.7995 14.6654 11.1595Z"
        stroke="#9AA6B5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 3.66016V13.6602"
        stroke="#9AA6B5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.16797 5.66016H3.66797"
        stroke="#9AA6B5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.66797 7.66016H3.66797"
        stroke="#9AA6B5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
