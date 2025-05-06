'use client';

import { useEffect } from 'react';
import { useResetStore } from '~/store/monaco-actions/reset-store';
import { useToolboxStore } from '~/store/monaco-actions/toolbox-store';

export const MonacoActionsListener = () => {
  const { openResetModal } = useResetStore();
  const { openToolboxModal } = useToolboxStore();

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
      if (event.data?.command === 'toolboxButtonClicked') {
        openToolboxModal();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [openResetModal, openToolboxModal]);

  // This component doesn't render anything
  return null;
};

export default MonacoActionsListener;
