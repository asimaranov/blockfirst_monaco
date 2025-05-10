import { cn } from '~/helpers';

export default function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-5 w-5', className)}
    >
      <path
        d="M13.0039 10.676V13.826C13.0039 16.451 11.9539 17.501 9.32891 17.501H6.17891C3.55391 17.501 2.50391 16.451 2.50391 13.826V10.676C2.50391 8.05098 3.55391 7.00098 6.17891 7.00098H9.32891C11.9539 7.00098 13.0039 8.05098 13.0039 10.676Z"
        stroke="#F2F2F2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5039 6.17598V9.32598C17.5039 11.951 16.4539 13.001 13.8289 13.001H13.0039V10.676C13.0039 8.05098 11.9539 7.00098 9.32891 7.00098H7.00391V6.17598C7.00391 3.55098 8.05391 2.50098 10.6789 2.50098H13.8289C16.4539 2.50098 17.5039 3.55098 17.5039 6.17598Z"
        stroke="#F2F2F2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
