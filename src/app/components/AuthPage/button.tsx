import { cn } from '~/helpers';

// Spinner component
const Spinner = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 animate-spin ml-2"
  >
    <path
      opacity="0.4"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.25 1.33398C7.25 0.919771 7.58579 0.583984 8 0.583984C12.0961 0.583984 15.4167 3.90454 15.4167 8.00065C15.4167 8.41487 15.0809 8.75065 14.6667 8.75065C14.2525 8.75065 13.9167 8.41487 13.9167 8.00065C13.9167 4.73297 11.2677 2.08398 8 2.08398C7.58579 2.08398 7.25 1.7482 7.25 1.33398Z"
      fill="#F2F2F2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.36074 4.36564C2.73167 4.54998 2.88294 5.00012 2.6986 5.37105C2.30542 6.16222 2.08398 7.0543 2.08398 8.00024C2.08398 11.2679 4.73297 13.9169 8.00065 13.9169C11.2683 13.9169 13.9173 11.2679 13.9173 8.00024C13.9173 7.58602 14.2531 7.25024 14.6673 7.25024C15.0815 7.25024 15.4173 7.58602 15.4173 8.00024C15.4173 12.0964 12.0968 15.4169 8.00065 15.4169C3.90454 15.4169 0.583984 12.0964 0.583984 8.00024C0.583984 6.81753 0.861374 5.69745 1.35533 4.7035C1.53966 4.33257 1.9898 4.1813 2.36074 4.36564Z"
      fill="#F2F2F2"
    />
  </svg>
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
        'transition-colors duration-300 cursor-pointer',
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
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.2307 4.43254C14.5295 4.14571 15.0043 4.15545 15.2911 4.45429L19.9065 9.26303C20.185 9.55324 20.185 10.0115 19.9065 10.3017L15.2911 15.1104C15.0043 15.4093 14.5295 15.419 14.2307 15.1322C13.9318 14.8454 13.9221 14.3706 14.2089 14.0718L18.3258 9.78237L14.2089 5.49297C13.9221 5.19413 13.9318 4.71936 14.2307 4.43254Z"
            fill="#F2F2F2"
          />
        </svg>
      )}
    </button>
  );
}
