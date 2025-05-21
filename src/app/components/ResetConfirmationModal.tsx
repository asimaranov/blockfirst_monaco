'use client';

import { useResetStore } from '~/store/monaco-actions/reset-store';
import { api } from '~/trpc/react';

import { useEffect, useRef } from 'react';
import { cn } from '~/helpers';
import { useMonacoEditorStore } from '~/store/monacoEditorStore';
import { useTestResultStore } from '~/store/testResultStore';

const ScrollIcon = ({ className }: { className?: string }) => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('h-10.5 w-10.5', className)}
  >
    <rect width="42" height="42" rx="21" fill="#33CF8E" fillOpacity="0.1" />
    <path
      d="M18.5013 29.3346H23.5013C27.668 29.3346 29.3346 27.668 29.3346 23.5013V18.5013C29.3346 14.3346 27.668 12.668 23.5013 12.668H18.5013C14.3346 12.668 12.668 14.3346 12.668 18.5013V23.5013C12.668 27.668 14.3346 29.3346 18.5013 29.3346Z"
      stroke="#33CF8E"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.9984 18.4727L16.9234 20.5477C16.6818 20.7893 16.6818 21.1977 16.9234 21.4393L18.9984 23.5143"
      stroke="#33CF8E"
      strokeWidth="1.25"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 18.4727L25.075 20.5477C25.3167 20.7893 25.3167 21.1977 25.075 21.4393L23 23.5143"
      stroke="#33CF8E"
      strokeWidth="1.25"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ResetConfirmationModal = ({ taskId }: { taskId: string }) => {
  const { isResetModalOpen, buttonPosition, closeResetModal, resetCode } =
    useResetStore();
  const { resetEditor, iframeKey, setIframeKey, setShowActionBar } =
    useMonacoEditorStore();
  const { resetTestResults } = useTestResultStore();

  const modalRef = useRef<HTMLDivElement>(null);

  // Initialize the mutation
  const clearSavedMutation = api.tasks.clearSaved.useMutation();

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

  const editorsDivRect = document
    .getElementById('editorsDiv')
    ?.getBoundingClientRect();

  const modalStyle = {
    position: 'fixed',
    top: `${buttonPosition.top}px`,
    left: `${(editorsDivRect?.left || 0) + buttonPosition.left}px`, // Position to the right of the button
    transform: 'translateX(-100%)', // Align bottom edge with buttonPosition.top
    zIndex: 9999,
  };

  const handleReset = async () => {
    closeResetModal();
    console.log('[t] Clearing saved code', taskId);
    try {
      resetEditor();

      await clearSavedMutation.mutateAsync({ taskId });

      const iframe = document.getElementById(
        'monaco-editor-iframe'
      ) as HTMLIFrameElement;
      if (iframe) {
        setShowActionBar(false);
        setIframeKey(iframeKey + 1);
        resetTestResults();
      }
    } catch (error) {
      console.error('Failed to clear saved code:', error);
    }
  };

  return (
    <div
      ref={modalRef}
      className={cn(
        'bg-accent w-94 rounded-lg p-8 py-7'
        // Adjust width/height based on content via padding
      )}
      style={modalStyle as React.CSSProperties}
    >
      <div className="flex flex-col space-y-7">
        {/* Top Section: Icon + Text */}
        <div className="flex shrink-0 items-center gap-5">
          {/* Icon Circle */}
          <div className="shrink-0">
            <ScrollIcon className="shrink-0" />
          </div>
          {/* Text Content */}
          <div className="flex flex-col space-y-2">
            <span className="text-foreground text-xl leading-5">
              Сбросить код
            </span>
            <span className="text-secondary text-xs leading-3.5">
              Хотите сбросить код задачи по умолчанию?
            </span>
          </div>
        </div>

        {/* Bottom Section: Buttons */}
        <div className="flex items-center justify-between space-x-4">
          <button
            onClick={closeResetModal}
            className="border-secondary/20 text-secondary hover:border-foreground flex-1 cursor-pointer rounded-full border py-2.5 text-center text-sm"
          >
            Отменить
          </button>
          <button
            onClick={handleReset}
            className="bg-primary text-foreground flex-1 cursor-pointer rounded-full py-2.5 text-center text-sm hover:bg-[#1242B2]"
          >
            Сбросить
          </button>
        </div>
      </div>
    </div>
  );
};
