import Image from 'next/image';
import React, { ReactNode } from 'react';

interface ContactItemProps {
  name: string;
  icon: string;
  value: string;
  actionButton: ReactNode;
}

export default function ContactItem({
  name,
  icon,
  value,
  actionButton,
}: ContactItemProps) {
  return (
    <div className="border-accent flex flex-row items-center justify-between border-b p-4">
      <div className="flex flex-col gap-4">
        <div className="flex h-12 items-center">
          <div className="flex flex-col gap-2.5">
            <span className="text-secondary text-xs">{name}</span>
            <div className="flex flex-row items-center gap-3">
              <Image src={icon} alt={name} className="h-4 w-4" />
              <span className="text-foreground text-sm">{value}</span>
            </div>
          </div>
        </div>
      </div>
      <div>{actionButton}</div>
    </div>
  );
}

export function RedirectArrowButton({
  hrefToOpen,
  onClick,
  disabled,
}: {
  hrefToOpen?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={`h-5 w-5 ${
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer hover:opacity-50'
      }`}
      onClick={() => {
        if (disabled) return;
        if (onClick) {
          onClick();
        } else if (hrefToOpen) {
          window.open(hrefToOpen, '_blank');
        }
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.901 4.46967C11.1939 4.17678 11.6688 4.17678 11.9617 4.46967L16.9617 9.46962C17.1023 9.61027 17.1814 9.80104 17.1814 9.99995C17.1814 10.1989 17.1023 10.3896 16.9617 10.5303L11.9617 15.5303C11.6688 15.8232 11.1939 15.8232 10.901 15.5303C10.6081 15.2374 10.6081 14.7625 10.901 14.4696L14.6207 10.75H3.57422C3.16001 10.75 2.82422 10.4142 2.82422 9.99995C2.82422 9.58574 3.16001 9.24995 3.57422 9.24995H14.6207L10.901 5.53033C10.6081 5.23744 10.6081 4.76257 10.901 4.46967Z"
          fill="#F2F2F2"
        />
      </svg>
    </div>
  );
}
