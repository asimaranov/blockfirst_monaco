import { cn } from '~/helpers';

// Spinner component
const Spinner = () => (
  <div className="border-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
);

export default function AuthButton({
  text,
  state,
  onClick,
}: {
  text: string;
  state: 'loading' | 'active' | 'disabled';
  onClick: () => void;
}) {
  return (
    <button
      type="submit"
      disabled={state === 'disabled'}
      className={cn(
        'bg-primary text-foreground flex w-full items-center justify-center rounded-full py-3.5 text-sm',
        'transition-colors duration-300',
        state != 'disabled' && 'hover:bg-[#1242B2]',
        state === 'loading' && 'bg-[#1242B2]',
        state === 'disabled' && 'bg-[#195AF4] opacity-30'
      )}
      onClick={onClick}
    >
      {text}
      {state === 'loading' ? (
        <Spinner />
      ) : (
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.2307 4.43254C14.5295 4.14571 15.0043 4.15545 15.2911 4.45429L19.9065 9.26303C20.185 9.55324 20.185 10.0115 19.9065 10.3017L15.2911 15.1104C15.0043 15.4093 14.5295 15.419 14.2307 15.1322C13.9318 14.8454 13.9221 14.3706 14.2089 14.0718L18.3258 9.78237L14.2089 5.49297C13.9221 5.19413 13.9318 4.71936 14.2307 4.43254Z"
            fill="#F2F2F2"
          />
        </svg>
      )}
    </button>
  );
}
