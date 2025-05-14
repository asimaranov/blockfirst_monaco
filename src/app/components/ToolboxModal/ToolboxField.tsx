import { cn } from '~/helpers';
import Image from 'next/image';
import ErrorDecorationSvg from 'public/misc/error_decoration.svg';
import { ReactNode, useState, useRef, useEffect } from 'react';
import { Portal } from '../shared/Portal';
import CopiedPopover from './assets/copied-popover.svg';

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
  const [isCopied, setIsCopied] = useState(false);
  const copyButtonRef = useRef<SVGSVGElement>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const handleCopy = () => {
    navigator.clipboard.writeText(value);

    // Update position before showing the popover
    if (copyButtonRef.current) {
      const rect = copyButtonRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2,
      });
    }

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 112000);
  };

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
          <>
            {!isCopied ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleCopy}
                className="h-5 w-5 cursor-pointer hover:opacity-50"
                ref={copyButtonRef}
              >
                <path
                  d="M13.0039 10.675V13.825C13.0039 16.45 11.9539 17.5 9.32891 17.5H6.17891C3.55391 17.5 2.50391 16.45 2.50391 13.825V10.675C2.50391 8.05 3.55391 7 6.17891 7H9.32891C11.9539 7 13.0039 8.05 13.0039 10.675Z"
                  stroke="#F2F2F2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5039 6.175V9.325C17.5039 11.95 16.4539 13 13.8289 13H13.0039V10.675C13.0039 8.05 11.9539 7 9.32891 7H7.00391V6.175C7.00391 3.55 8.05391 2.5 10.6789 2.5H13.8289C16.4539 2.5 17.5039 3.55 17.5039 6.175Z"
                  stroke="#F2F2F2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M14.2508 1.66797H10.7508C8.18155 1.66797 6.9766 2.57971 6.72557 4.78381C6.67305 5.24492 7.05494 5.6263 7.51903 5.6263H9.25078C12.7508 5.6263 14.3758 7.2513 14.3758 10.7513V12.483C14.3758 12.9471 14.7572 13.329 15.2183 13.2765C17.4224 13.0255 18.3341 11.8205 18.3341 9.2513V5.7513C18.3341 2.83464 17.1674 1.66797 14.2508 1.66797Z"
                    fill="#195AF4"
                  />
                  <path
                    d="M9.2513 6.66797H5.7513C2.83464 6.66797 1.66797 7.83464 1.66797 10.7513V14.2513C1.66797 17.168 2.83464 18.3346 5.7513 18.3346H9.2513C12.168 18.3346 13.3346 17.168 13.3346 14.2513V10.7513C13.3346 7.83464 12.168 6.66797 9.2513 6.66797ZM10.243 11.3763L7.1513 14.468C7.03464 14.5846 6.88463 14.643 6.7263 14.643C6.56797 14.643 6.41797 14.5846 6.3013 14.468L4.7513 12.918C4.51797 12.6846 4.51797 12.3096 4.7513 12.0763C4.98464 11.843 5.35964 11.843 5.59297 12.0763L6.71797 13.2013L9.39297 10.5263C9.6263 10.293 10.0013 10.293 10.2346 10.5263C10.468 10.7596 10.4763 11.143 10.243 11.3763Z"
                    fill="#195AF4"
                  />
                  <path
                    d="M7.15703 14.4721L10.2487 11.3805C10.482 11.1471 10.4737 10.7638 10.2404 10.5305C10.007 10.2971 9.63203 10.2971 9.3987 10.5305L6.7237 13.2055L5.5987 12.0805C5.36536 11.8471 4.99036 11.8471 4.75703 12.0805C4.5237 12.3138 4.5237 12.6888 4.75703 12.9221L6.30703 14.4721C6.4237 14.5888 6.5737 14.6471 6.73203 14.6471C6.89036 14.6471 7.04036 14.5888 7.15703 14.4721Z"
                    fill="#F2F2F2"
                  />
                </svg>
              </div>
            )}
          </>
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
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Connected
          </button>
        ) : (
          <button className="border-primary hover:bg-primary ml-2 flex h-fit cursor-pointer items-center rounded-full border px-4 py-2.25 text-xs leading-3.5 text-nowrap">
            Connect Wallet
          </button>
        ))}

      {isCopied && (
        <Portal>
          <div
            style={{
              position: 'fixed',
              top: `${popoverPosition.top}px`,
              left: `${popoverPosition.left}px`,
              transform: 'translateX(-50%)',
              zIndex: 99999,
              pointerEvents: 'none',
            }}
            className="shrink-0"
          >
              <Image
                src={CopiedPopover}
                alt="Copied"
                width={92}
                height={30}
                className="h-7.5 w-23 shrink-0"
              />
          </div>
        </Portal>
      )}
    </div>
  );
}
