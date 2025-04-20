'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import AnimatedToggleCheck from './AnimatedToggleCheck';

export type SelectOption = {
  label: string;
  value: string;
};

type DropDownSelectorProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  mobileFilterComponent?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
};

export const DropDownSelector = ({
  value,
  onChange,
  options,
  mobileFilterComponent,
  className = '',
  buttonClassName = '',
  dropdownClassName = '',
  optionClassName = '',
}: DropDownSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const selectedOption = options.find((option) => option.value === value);

  return (
    <>
      {mobileFilterComponent}

      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => {
            if (window.innerWidth < 640) {
              handleOpenMobileFilter();
            } else {
              setIsOpen(!isOpen);
            }
          }}
          className={`flex h-auto cursor-pointer items-center justify-end gap-2 rounded-[5.787vw] bg-transparent px-0 py-0 transition-colors hover:bg-[#1c2026] sm:h-8 sm:bg-[#14171C] sm:px-4 sm:py-2.25 ${buttonClassName}`}
        >
          <span className="text-foreground hidden text-xs sm:block">
            {selectedOption?.label}
          </span>

          <AnimatedToggleCheck
            isOpen={isOpen}
            className="hidden h-3.5 w-3.5 sm:block"
          />
          <div className="flex items-center justify-center gap-2 sm:hidden">
            {value !== options[0]?.value && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 shrink-0"
              >
                <circle cx="6" cy="6" r="6" fill="#14171C" />
                <circle cx="6" cy="6" r="4" fill="#CF3336" />
              </svg>
            )}

            <Image
              src={'/images/icons/tool-icon.svg'}
              alt="tool-icon"
              width={20}
              height={20}
              className="h-5 w-5"
            />
          </div>
        </button>

        {isOpen && (
          <div
            className={`absolute top-full right-0 z-10 mt-2 w-45.5 rounded-lg bg-[#14171C] py-2 shadow-lg ${dropdownClassName}`}
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex w-45.5 cursor-pointer flex-row items-center gap-2 px-4 py-2 text-left text-sm transition-colors hover:bg-[#1c2026] ${
                  value === option.value ? 'text-foreground' : 'text-secondary'
                } text-xs ${optionClassName}`}
              >
                {option.value === value ? (
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
                    />
                  </svg>
                ) : (
                  <div className="w-3.5"></div>
                )}
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
