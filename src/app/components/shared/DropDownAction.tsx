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
            className={`absolute top-full left-0 z-10 flex w-60.75 translate-y-4 flex-col rounded-lg bg-[#1D2026] shadow-lg ${dropdownClassName}`}
          >
            <span className="text-secondary/50 py-3 pl-5 text-xs uppercase">
              Пожаловаться
            </span>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center gap-2 pt-9 pb-14">
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8.25"
                >
                  <rect
                    x="1"
                    y="0.5"
                    width="31"
                    height="31"
                    rx="15.5"
                    stroke="#195AF4"
                  />
                  <path
                    d="M11.043 16.7855L14.163 19.9055L21.963 12.1055"
                    stroke="#F2F2F2"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="flex flex-col gap-3 text-center px-5">
                  <p className="text-base font-medium">Жалоба принята</p>
                  <p className="text-xs text-secondary">Мы проверим этот комментарий на наличие нарушений</p>

                </div>
              </div>
            ) : (
              <>
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setIsSuccess(true);
                      // onChange(option.value);
                      // setIsOpen(false);
                    }}
                    className={`text-foreground group flex w-60.75 cursor-pointer flex-row items-center gap-2 rounded-[0.4167vw] px-4 py-3.25 text-left text-xs whitespace-nowrap transition-colors duration-100 hover:bg-[#272B33] ${optionClassName}`}
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
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
