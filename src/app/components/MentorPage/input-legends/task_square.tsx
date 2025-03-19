import { cn } from '~/helpers';

export default function TaskSquareSvg({ active }: { active: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'group-focus-within:[&>*]:stroke-[#f2f2f2] group-focus-within:[&>*]:[stroke-opacity:100%]',
        active && '[&>*]:stroke-foreground [&>*]:[stroke-opacity:100%]'
      )}
    >
      <path
        d="M8.24609 5.91992H11.7461"
        stroke="#9AA6B5"
        stroke-opacity="0.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={cn(
          'group-focus-within:stroke-foreground',
          active && 'stroke-foreground'
        )}
      />
      <path
        d="M4.25391 5.91992L4.75391 6.41992L6.25391 4.91992"
        stroke="#9AA6B5"
        stroke-opacity="0.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={cn(
          'group-focus-within:stroke-foreground',
          active && 'stroke-foreground'
        )}
      />
      <path
        d="M8.24609 10.5879H11.7461"
        stroke="#9AA6B5"
        stroke-opacity="0.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={cn(
          'group-focus-within:stroke-foreground',
          active && 'stroke-foreground'
        )}
      />
      <path
        d="M4.25391 10.5879L4.75391 11.0879L6.25391 9.58789"
        stroke="#9AA6B5"
        stroke-opacity="0.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={cn(
          'group-focus-within:stroke-foreground',
          active && 'stroke-foreground'
        )}
      />
      <path
        d="M5.9987 14.6673H9.9987C13.332 14.6673 14.6654 13.334 14.6654 10.0007V6.00065C14.6654 2.66732 13.332 1.33398 9.9987 1.33398H5.9987C2.66536 1.33398 1.33203 2.66732 1.33203 6.00065V10.0007C1.33203 13.334 2.66536 14.6673 5.9987 14.6673Z"
        stroke="#9AA6B5"
        stroke-opacity="0.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={cn(
          'group-focus-within:stroke-foreground',
          active && 'stroke-foreground'
        )}
      />
    </svg>
  );
}
