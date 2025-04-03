import { useRouter } from 'next/navigation';
import { cn } from '~/helpers';

export const Topbar = () => {
  const router = useRouter();

  return (
    <div className="border-accent flex h-14 items-center justify-between border-b px-5">
      <div className="flex items-center gap-2">
        <button
          className="hover:bg-accent flex h-8 w-8 items-center justify-center rounded-full"
          onClick={() => router.back()}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.23462 14.7654L0.619247 10.15L5.23462 5.53462"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="19.25"
              y1="10.15"
              x2="0.75"
              y2="10.15"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
        <h1 className="text-xl">Тарифы</h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          className={cn(
            'border-accent flex h-8 items-center justify-center rounded-full border px-4 text-xs',
            'hover:bg-accent'
          )}
          onClick={() => {
            // Handle help button click
          }}
        >
          FAQ
        </button>
      </div>
    </div>
  );
};
