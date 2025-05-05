'use client';

import { useEffect } from 'react';
import { useResetStore } from '../store/reset-store';

export const ResetListener = () => {
  const { openResetModal } = useResetStore();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.command === 'resetButtonClicked') {
        // If no position is provided, use a default position
        const position = event.data.position || {
          top: window.innerHeight / 2 - 100,
          left: window.innerWidth / 2 - 125,
        };

        openResetModal(position);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [openResetModal]);

  // This component doesn't render anything
  return null;
};

export default ResetListener;
