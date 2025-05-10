import { cn } from '~/helpers';

export default function MentorIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        '[&>*]:[&:not(:first-child)]:fill-none',
        '[&>*]:[&:not(:first-child)]:group-hover:fill-[#F2F2F2] [&>*]:[&:not(:first-child)]:group-data-[active=true]:fill-[#F2F2F2]',
        '[&>*]:first:group-hover:stroke-none [&>*]:first:group-data-[active=true]:stroke-none',
        'h-4 w-4',
        className
      )}
    >
      <path
        d="M13.7268 14.6667C13.7268 12.0867 11.1601 10 8.0001 10C4.8401 10 2.27344 12.0867 2.27344 14.6667M11.3333 4.66668C11.3333 6.50763 9.84095 8.00001 8 8.00001C6.15905 8.00001 4.66667 6.50763 4.66667 4.66668C4.66667 2.82573 6.15905 1.33334 8 1.33334C9.84095 1.33334 11.3333 2.82573 11.3333 4.66668Z"
        stroke="#9AA6B5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.0013 8.00001C9.84225 8.00001 11.3346 6.50763 11.3346 4.66668C11.3346 2.82573 9.84225 1.33334 8.0013 1.33334C6.16035 1.33334 4.66797 2.82573 4.66797 4.66668C4.66797 6.50763 6.16035 8.00001 8.0013 8.00001Z"
        fill="#F2F2F2"
      />
      <path
        d="M8.00141 9.66668C4.66141 9.66668 1.94141 11.9067 1.94141 14.6667C1.94141 14.8533 2.08807 15 2.27474 15H13.7281C13.9147 15 14.0614 14.8533 14.0614 14.6667C14.0614 11.9067 11.3414 9.66668 8.00141 9.66668Z"
        fill="#F2F2F2"
      />
    </svg>
  );
}
