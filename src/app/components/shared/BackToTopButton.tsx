'use client';

import React from 'react';

interface BackToTopButtonProps {
  className?: string;
  targetElementId?: string;
}

export function BackToTopButton({
  className = '',
  targetElementId = 'content-view',
}: BackToTopButtonProps) {
  const scrollToTop = () => {
    document
      .getElementById(targetElementId)
      ?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`flex cursor-pointer items-center gap-1 hover:opacity-50 ${className}`}
      onClick={scrollToTop}
    >
      <span className="text-sm text-nowrap">В начало</span>
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
          d="M5.15031 12.8267C4.86349 12.5279 4.87323 12.0531 5.17207 11.7663L9.9808 7.15089C10.271 6.87235 10.7293 6.87235 11.0195 7.15089L15.8282 11.7663C16.1271 12.0531 16.1368 12.5279 15.85 12.8267C15.5632 13.1256 15.0884 13.1353 14.7895 12.8485L10.5001 8.73154L6.21075 12.8485C5.91191 13.1353 5.43713 13.1256 5.15031 12.8267Z"
          fill="#F2F2F2"
        />
      </svg>
    </div>
  );
}
