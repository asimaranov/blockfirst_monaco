import React from 'react';

interface ErrorBadgeProps {
  errors: string[];
}

export default function ErrorBadge({ errors }: ErrorBadgeProps) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="mt-3 flex flex-row flex-wrap gap-2">
      {errors.map((error, index) => (
        <div
          key={index}
          className="bg-error text-foreground my-1.25 flex gap-2 rounded-[4px] sm:rounded-[0.2315vw] px-2 py-1.25 text-xs z-10"
        >
          {error}
        </div>
      ))}
    </div>
  );
}
