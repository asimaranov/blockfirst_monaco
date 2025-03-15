import { cn } from '~/helpers';

// Spinner component
const Spinner = () => (
  <div className="h-4 w-4 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
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
        'flex w-full items-center justify-center gap-[14px] rounded-full bg-primary py-3.5 text-sm text-foreground',
        'transition-colors duration-300',
        state != 'disabled'  && 'hover:bg-[#1242B2]',
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
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.230661 0.432766C0.5295 0.145942 1.00427 0.155683 1.2911 0.454522L5.90648 5.26326C6.18502 5.55346 6.18502 6.01173 5.90648 6.30194L1.2911 11.1107C1.00427 11.4095 0.5295 11.4193 0.230661 11.1324C-0.0681787 10.8456 -0.0779195 10.3708 0.208904 10.072L4.32583 5.7826L0.208904 1.4932C-0.0779195 1.19436 -0.0681787 0.71959 0.230661 0.432766Z"
            fill="#F2F2F2"
          />
        </svg>
      )}
    </button>
  );
}
