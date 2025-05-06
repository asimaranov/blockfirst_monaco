import { cn } from '~/helpers';
import Image from 'next/image';
import ErrorDecorationSvg from 'public/misc/error_decoration.svg';
import { ReactNode } from 'react';

interface FormFieldProps {
  type: 'text' | 'email' | 'password';
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  showInlineError?: boolean;
  walletRequired?: boolean;
  walletConnected?: boolean;
  copyable?: boolean;
  readOnly?: boolean;
}

export default function ToolboxField({
  type,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  onKeyDown,
  showInlineError = true,
  walletRequired = false,
  walletConnected = false,
  copyable = false,
  readOnly = false,
}: FormFieldProps) {
  return (
    <div className="relative flex flex-row items-center">
      <div
        className={cn(
          'group border-accent focus-within:border-foreground flex h-12 flex-1 items-center border-b pr-4',
          error && 'border-error',
          readOnly && 'bg-accent/5'
        )}
      >
        <input
          className="text-foreground placeholder:text-secondary h-full w-full bg-transparent text-sm placeholder:opacity-50 focus:outline-hidden"
          placeholder={placeholder}
          id={name}
          name={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          onKeyDown={onKeyDown}
          readOnly={readOnly}
        />
        {copyable && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4.5 w-4.5 cursor-pointer hover:opacity-50 ml-6"
            onClick={() => {
              navigator.clipboard.writeText(value);
            }}
          >
            <path
              d="M12.0039 9.675V12.825C12.0039 15.45 10.9539 16.5 8.32891 16.5H5.17891C2.55391 16.5 1.50391 15.45 1.50391 12.825V9.675C1.50391 7.05 2.55391 6 5.17891 6H8.32891C10.9539 6 12.0039 7.05 12.0039 9.675Z"
              stroke="#F2F2F2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.5039 5.175V8.325C16.5039 10.95 15.4539 12 12.8289 12H12.0039V9.675C12.0039 7.05 10.9539 6 8.32891 6H6.00391V5.175C6.00391 2.55 7.05391 1.5 9.67891 1.5H12.8289C15.4539 1.5 16.5039 2.55 16.5039 5.175Z"
              stroke="#F2F2F2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </div>
      {showInlineError && error && (
        <div className="text-error absolute top-15 left-0 flex gap-2 text-xs">
          <Image
            src={ErrorDecorationSvg}
            alt={''}
            width={14}
            height={14}
            className="h-3.5 w-3.5"
          />
          {error}
        </div>
      )}
      {walletRequired &&
        (walletConnected ? (
          <button className="bg-success/10 text-success ml-2 flex h-fit cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-xs leading-3.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M4.35938 8.51844L6.43937 10.5984L11.6394 5.39844"
                stroke="#33CF8E"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Connected
          </button>
        ) : (
          <button className="border-primary ml-2 flex h-fit cursor-pointer items-center rounded-full border px-4 py-2.25 text-xs leading-3.5 text-nowrap">
            Connect Wallet
          </button>
        ))}
    </div>
  );
}
