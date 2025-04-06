import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary h-16 w-16 animate-spin rounded-full border-t-2 border-b-2"></div>
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
