'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import AnimatedToggleCheck from './AnimatedToggleCheck';

export type SelectOption = {
  label: string;
  value: string;
};

type DropDownSelectorProps = {
  button: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  mobileFilterComponent?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
};

export default function DropDownAction({
  button,
  value,
  onChange,
  options,
  mobileFilterComponent,
  className = '',
  buttonClassName = '',
  dropdownClassName = '',
  optionClassName = '',
}: DropDownSelectorProps) {
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
            className={`absolute top-full left-0 z-10 flex w-60.75 translate-y-4 flex-col rounded-lg bg-[#1D2026] shadow-lg ${dropdownClassName}`}
          >
            <span className="text-secondary/50 py-3 pl-5 text-xs uppercase">
              Пожаловаться
            </span>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`text-foreground group flex w-60.75 cursor-pointer flex-row items-center gap-2 px-4 py-3.25 text-left text-xs whitespace-nowrap transition-colors duration-100 hover:bg-[#272B33] rounded-[0.4167vw] ${optionClassName}`}
              >
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
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
