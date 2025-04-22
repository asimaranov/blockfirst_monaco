'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { cn } from '~/helpers';

export type SelectOption = {
  closeOnClick?: boolean;
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  link?: string;
};

type DropDownSelectorProps = {
  header?: string;
  button: React.ReactNode;
  options: SelectOption[];
  mobileFilterComponent?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  successBlock?: React.ReactNode;
  direction?: 'bottom' | 'top';
};

export default function DropDownAction({
  header,
  button,
  options,
  mobileFilterComponent,
  className = '',
  buttonClassName = '',
  dropdownClassName = '',
  successBlock,
  direction = 'bottom',
}: DropDownSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpenMobileFilter = () => {
    // If there's a mobile filter component, we'll show it
    // Otherwise, we'll just open the dropdown
    if (!mobileFilterComponent) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
      }, 4000);
    }
  }, [isSuccess]);

  return (
    <>
      <div
        className={`relative ${className} flex items-center justify-center`}
        ref={dropdownRef}
      >
        <button
          onClick={() => {
            if (window.innerWidth < 640) {
              handleOpenMobileFilter();
            } else {
              setIsOpen(!isOpen);
            }
          }}
          className={`group/button ${buttonClassName}`}
          data-active={isOpen}
        >
          {button}
        </button>

        {isOpen && (
          <div
            className={`absolute ${direction === 'bottom' ? 'top-full' : 'bottom-full'} left-0 z-100 flex w-60.75 ${direction === 'bottom' ? 'translate-y-4' : '-translate-y-4'} flex-col rounded-lg bg-[#1D2026] shadow-lg ${dropdownClassName}`}
          >
            {header && (
              <span className="text-secondary/50 py-3 pl-5 text-xs uppercase">
                {header}
              </span>
            )}
            {isSuccess ? (
              successBlock
            ) : (
              <>
                {options.map((option) =>
                  !option.link ? (
                    <button
                      key={option.value}
                      onClick={() => {
                        if (successBlock) {
                          setIsSuccess(true);
                        }
                        option.onClick?.();
                        if (option.closeOnClick) {
                          setIsOpen(false);
                        }
                      }}
                      className={cn(
                        `text-foreground group flex w-60.75 cursor-pointer flex-row items-center gap-2 px-4 py-3.25 text-left text-xs whitespace-nowrap transition-colors duration-100 first:rounded-t-[0.4167vw] last:rounded-b-[0.4167vw] hover:bg-[#272B33] ${option.className}`
                      )}
                    >
                      {option.icon ? (
                        option.icon
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                        >
                          <path
                            d="M2.44922 7.65L5.04922 10.25L11.5492 3.75"
                            stroke="#195AF4"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 transition-all duration-100 group-hover:opacity-100"
                          />
                        </svg>
                      )}

                      {option.label}
                    </button>
                  ) : (
                    <Link
                      href={option.link}
                      target="_blank"
                      className="flex w-60.75 cursor-pointer flex-row items-center gap-2 px-4 py-3.25 text-left text-xs whitespace-nowrap transition-colors duration-100 first:rounded-t-[0.4167vw] last:rounded-b-[0.4167vw] hover:bg-[#272B33]"
                    >
                      {option.icon}
                      {option.label}
                    </Link>
                  )
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
