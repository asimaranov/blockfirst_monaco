'use client';

import { useResetStore } from '../store/reset-store';
import { useEffect, useRef } from 'react';
import { cn } from '~/helpers';

// Placeholder Icon (replace with actual SVG if needed)
const ScrollIcon = () => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-10.5 w-10.5"
  >
    <rect width="42" height="42" rx="21" fill="#33CF8E" fill-opacity="0.1" />
    <path
      d="M18.5013 29.3346H23.5013C27.668 29.3346 29.3346 27.668 29.3346 23.5013V18.5013C29.3346 14.3346 27.668 12.668 23.5013 12.668H18.5013C14.3346 12.668 12.668 14.3346 12.668 18.5013V23.5013C12.668 27.668 14.3346 29.3346 18.5013 29.3346Z"
      stroke="#33CF8E"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.9984 18.4727L16.9234 20.5477C16.6818 20.7893 16.6818 21.1977 16.9234 21.4393L18.9984 23.5143"
      stroke="#33CF8E"
      stroke-width="1.25"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M23 18.4727L25.075 20.5477C25.3167 20.7893 25.3167 21.1977 25.075 21.4393L23 23.5143"
      stroke="#33CF8E"
      stroke-width="1.25"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const ResetConfirmationModal = () => {
  const { isResetModalOpen, buttonPosition, closeResetModal, resetCode } =
    useResetStore();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeResetModal();
      }
    };

    if (isResetModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isResetModalOpen, closeResetModal]);

  if (!isResetModalOpen || !buttonPosition) return null;

  // Calculate position to show near the button
  // Position it to the right of the button with a small offset
  const modalStyle = {
    position: 'fixed',
    top: `${buttonPosition.top}px`,
    left: `${buttonPosition.left}px`, // Position to the right of the button
    transform: 'translateX(-100%)', // Align bottom edge with buttonPosition.top
    zIndex: 9999,
  };

  return (
    <div
      ref={modalRef}
      className={cn(
        'bg-accent rounded-lg p-8',
        'w-94'
        // Adjust width/height based on content via padding
      )}
      style={modalStyle as React.CSSProperties}
    >
      <div className="flex flex-col space-y-7">
        {/* Top Section: Icon + Text */}
        <div className="flex items-center space-x-5">
          {/* Icon Circle */}
          <div className="bg-success/10 flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-full">
            <ScrollIcon />
          </div>
          {/* Text Content */}
          <div className="flex flex-col space-y-2">
            <span className="text-foreground text-xl">Сбросить код</span>
            <span className="text-secondary text-sm">
              Хотите сбросить код задачи по умолчанию?
            </span>
          </div>
        </div>

        {/* Bottom Section: Buttons */}
        <div className="flex items-center justify-between space-x-4">
          <button
            onClick={closeResetModal}
            className="border-secondary/20 text-secondary hover:border-foreground flex-1 rounded-full border py-2.5 text-center text-sm cursor-pointer"
          >
            Отменить
          </button>
          <button
            onClick={resetCode}
            className="bg-primary text-foreground flex-1 rounded-full py-2.5 text-center text-sm hover:bg-[#1242B2] cursor-pointer"
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
};
