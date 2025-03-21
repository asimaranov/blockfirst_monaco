import React from 'react';

interface ErrorBadgeProps {
  errors: string[];
}

export default function ErrorBadge({ errors }: ErrorBadgeProps) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="mt-[12px] flex flex-row flex-wrap gap-2">
      {errors.map((error, index) => (
        <div
          key={index}
          className="bg-error text-foreground my-[5px] flex gap-2 rounded-[4px] px-[8px] py-[5px] text-xs"
        >
          {error}
        </div>
      ))}
    </div>
  );
}
