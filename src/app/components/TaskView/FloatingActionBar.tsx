import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import BfLogo from './assets/bf-logo.svg';
import { InfoPopover, InfoPopoverIcon } from '../shared/InfoPopover';
import LoadingComponent from './LoadingComponent';
import Confetti from 'react-confetti';
import { cn } from '~/helpers';
import { Modal } from '../shared/Modal';
import { TaskReportForm } from './TaskReportForm';
import { useParams } from 'next/navigation';
import { StarIcon, StarIconFilled } from './MonacoView';

export const FloatingActionBar = ({
  setIsAiMentorActive,
  iframeRef,
}: {
  setIsAiMentorActive: (isActive: boolean) => void;
  iframeRef: React.RefObject<HTMLIFrameElement>;
}) => {
  const [position, setPosition] = useState({
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const actionBarRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<
    | {
        message: string;
        tests: string[];
      }
    | undefined
  >(undefined);
  const [rating, setRating] = useState(0);

  const [success, setSuccess] = useState<
    | {
        advancedTasksCompleted: boolean;
      }
    | undefined
  >(undefined);

  // Add state to control confetti visibility
  const [showConfetti, setShowConfetti] = useState(false);

  // State for copy link functionality
  const [linkCopied, setLinkCopied] = useState(false);

  // State for dragging/resizing
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);
  const [activeDragPanel, setActiveDragPanel] = useState<
    'error' | 'success' | null
  >(null);
  const [errorPanelHeight, setErrorPanelHeight] = useState<number | null>(null);
  const [successPanelHeight, setSuccessPanelHeight] = useState<number | null>(
    null
  );
  const errorPanelRef = useRef<HTMLDivElement>(null);
  const successPanelRef = useRef<HTMLDivElement>(null);
  const [isTaskReportFormOpen, setIsTaskReportFormOpen] = useState(false);

  // Function to send messages to iframe
  const sendMessageToIframe = useCallback((message: any) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, '*');
    }
  }, []);

  // Get current route params for sharing
  const params = useParams();

  // Function to handle social sharing
  const handleShare = useCallback(
    (platform: string) => {
      // Base sharing data
      const shareTitle = 'Я решил задачу на BlockFirst!';
      const shareMessage = success?.advancedTasksCompleted
        ? 'Я успешно выполнил все требования задачи, включая продвинутые. Попробуй свои силы!'
        : 'Я успешно выполнил все ключевые требования задачи. Попробуй свои силы!';
      const shareUrl =
        typeof window !== 'undefined' ? window.location.href : '';

      // Create sharing URLs for different platforms
      let shareLink = '';

      switch (platform) {
        case 'vk':
          shareLink = `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&description=${encodeURIComponent(shareMessage)}`;
          break;
        case 'twitter':
          shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}`;
          break;
        case 'telegram':
          shareLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle + '\n\n' + shareMessage)}`;
          break;
        case 'copy':
          // Copy current URL to clipboard
          if (navigator.clipboard) {
            navigator.clipboard
              .writeText(shareUrl)
              .then(() => {
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 2000);
              })
              .catch((err) => console.error('Failed to copy URL: ', err));
          }
          return; // Don't open a window for copy action
      }

      // Open sharing window for all platforms except copy
      if (shareLink) {
        window.open(shareLink, '_blank', 'width=600,height=400');
      }
    },
    [success, params]
  );

  useEffect(() => {
    //     setError({
    //       message: `Line 5: Char 5: error: non-void function does not return a value [-Werror,-Wreturn-type]
    //   5 |     }
    //     |
    //     ^
    // 1 error generated.`,
    //       tests: ['Требование 2', 'Требование 3', 'Требование 4'],
    //     });
    // setSuccess({
    //   advancedTasksCompleted: true,
    // });
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      const editorsDiv = document.getElementById('editorsDiv');
      if (editorsDiv) {
        const rect = editorsDiv.getBoundingClientRect();
        setPosition({
          bottom: window.innerHeight - rect.bottom,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    };

    // Set initial position
    updatePosition();

    // Create a mutation observer to detect when editorsDiv is added to the DOM
    const observer = new MutationObserver((mutations) => {
      if (document.getElementById('editorsDiv')) {
        updatePosition();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Update position on resize
    window.addEventListener('resize', updatePosition);

    // Use ResizeObserver to detect changes in the editorsDiv
    let resizeObserver: ResizeObserver | null = null;
    const editorsDiv = document.getElementById('editorsDiv');

    if (editorsDiv && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(updatePosition);
      resizeObserver.observe(editorsDiv);
    }

    // Call updatePosition periodically during initialization
    const initInterval = setInterval(updatePosition, 500);
    setTimeout(() => clearInterval(initInterval), 2000);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updatePosition);
      if (resizeObserver && editorsDiv) {
        resizeObserver.unobserve(editorsDiv);
        resizeObserver.disconnect();
      }
      observer.disconnect();
      clearInterval(initInterval);
    };
  }, []);

  // Drag Handlers
  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!isDragging) return;

      const deltaY = event.clientY - dragStartY.current;
      let newHeight = dragStartHeight.current - deltaY; // Drag up = smaller clientY = larger height

      const minHeight = 100; // Minimum panel height
      const maxHeight = window.innerHeight * 0.8; // Max 80% of viewport height

      newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

      if (activeDragPanel === 'error') {
        setErrorPanelHeight(newHeight);
      } else if (activeDragPanel === 'success') {
        setSuccessPanelHeight(newHeight);
      }
    },
    [isDragging, activeDragPanel]
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent) => {
      if (!isDragging) return;

      setIsDragging(false);
      setActiveDragPanel(null);
      document.body.style.userSelect = '';
      // Use event.target which should be the element pointer capture was set on (the handle)
      // Need to cast as Element because PointerEvent target type is generic
      (event.target as Element)?.releasePointerCapture(event.pointerId);
    },
    [isDragging]
  );

  // Cleanup window listeners if component unmounts while dragging
  useEffect(() => {
    // Only add the listeners when isDragging is true
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    // Cleanup function - always remove the listeners when component unmounts or dependencies change
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  const handlePointerDown = useCallback(
    (
      event: React.PointerEvent<HTMLDivElement>,
      panelType: 'error' | 'success'
    ) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragging(true);
      setActiveDragPanel(panelType);
      dragStartY.current = event.clientY;

      let currentHeight = 0;
      if (panelType === 'error') {
        currentHeight =
          errorPanelHeight ?? errorPanelRef.current?.offsetHeight ?? 200; // Default fallback
      } else {
        currentHeight =
          successPanelHeight ?? successPanelRef.current?.offsetHeight ?? 300; // Default fallback
      }
      dragStartHeight.current = currentHeight;

      document.body.style.userSelect = 'none';
      // Capture pointer on the handle that was clicked
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [errorPanelHeight, successPanelHeight]
  );

  // useEffect to handle confetti timer when success state changes
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (success) {
      setShowConfetti(true);
      timer = setTimeout(() => {
        setShowConfetti(false);
      }, 10_000); // 5 seconds
    }

    // Cleanup timeout if component unmounts or success changes before 5s
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [success]);

  const [checkCode, setCheckCode] = useState(false);

  useEffect(() => {
    if (checkCode) {
      setTimeout(() => {
        setCheckCode(false);
      }, 4000);
    }
  }, [checkCode]);

  return (
    <div
      ref={actionBarRef}
      className="border-accent z-1000 flex flex-col border-l bg-[#0F1217]"
      style={{
        position: 'fixed',
        bottom: position.bottom,
        left: position.left,
        width: position.width || '0px',
        visibility: position.width ? 'visible' : 'hidden',
        // Remove height style from parent - let content determine it
        // ...(success && {
        //   height: position.height - 85 || '0px',
        // }),
      }}
    >
      <Modal
        isOpen={isTaskReportFormOpen}
        onClose={() => setIsTaskReportFormOpen(false)}
      >
        <TaskReportForm
          onClose={() => setIsTaskReportFormOpen(false)}
          // taskId={}
        />
      </Modal>
      {/* Render confetti based on showConfetti state */}
      {showConfetti && (
        <Confetti
          recycle={false} // Stop recycling for fixed duration
          numberOfPieces={600} // Use a reasonable number for 5 seconds
          gravity={0.3}
          initialVelocityX={2}
          initialVelocityY={5}
          opacity={1}
          run
          wind={0.01}
        />
      )}
      <div className="flex flex-grow flex-col">
        {error && (
          <div className="relative">
            <div
              ref={errorPanelRef}
              className="border-t-error flex flex-col gap-8 border-t bg-[#191419] px-8 py-6"
              style={{
                height: errorPanelHeight ? `${errorPanelHeight}px` : undefined,
                overflow: 'auto',
              }}
            >
              <div className="flex w-full flex-row">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row items-center gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 shrink-0"
                    >
                      <path
                        d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                        fill="#CF3336"
                      />
                      <path
                        d="M7.5 12.5L12.5 7.5M7.5 7.5L12.5 12.5"
                        stroke="#F2F2F2"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="text-base">Ошибка требований</span>
                  </div>
                  <span className="text-secondary text-sm">
                    Если вам не удалось решить задачи, обратитесь за помощью к
                    AI-ментору
                  </span>
                </div>
                <div className="ml-auto pb-7 pl-7">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 cursor-pointer hover:opacity-50"
                    onClick={() => {
                      setError(undefined);
                      setErrorPanelHeight(null); // Reset height on close
                    }}
                  >
                    <path
                      d="M5.91797 15.2474C5.5958 15.5696 5.07347 15.5696 4.7513 15.2474C4.42914 14.9252 4.42914 14.4029 4.7513 14.0807L8.83464 9.9974L4.7513 5.91406C4.42914 5.5919 4.42914 5.06956 4.7513 4.7474C5.07347 4.42523 5.5958 4.42523 5.91797 4.7474L10.0013 8.83073L14.0846 4.74739C14.4068 4.42523 14.9291 4.42523 15.2513 4.7474C15.5735 5.06956 15.5735 5.5919 15.2513 5.91406L11.168 9.9974L15.2513 14.0807C15.5735 14.4029 15.5735 14.9252 15.2513 15.2474C14.9291 15.5696 14.4068 15.5696 14.0846 15.2474L10.0013 11.1641L5.91797 15.2474Z"
                      fill="#F2F2F2"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-2">
                  {error.tests.map((x) => (
                    <div className="border-error flex flex-row items-center gap-2 rounded-[0.4167vw] border-[0.026vw] px-4 py-2">
                      <div className="bg-error h-1 w-1 rounded-full" />
                      <span className="text-xs">{x}</span>
                    </div>
                  ))}
                </div>
                <pre className="text-error text-xs">{error.message}</pre>
              </div>
            </div>
            <div
              className="absolute top-0 left-1/2 mr-auto ml-auto -translate-x-1/2 -translate-y-1/2 cursor-ns-resize touch-none p-1"
              onPointerDown={(e) => handlePointerDown(e, 'error')}
            >
              <svg
                width="32"
                height="12"
                viewBox="0 0 32 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-8"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="31"
                  height="11"
                  rx="5.5"
                  fill="#0F1217"
                  stroke="#CF3336"
                />
                <rect
                  x="8"
                  y="5.5"
                  width="16"
                  height="1"
                  rx="0.5"
                  fill="#F2F2F2"
                />
              </svg>
            </div>
          </div>
        )}

        {success && (
          <div className="relative">
            <div
              ref={successPanelRef}
              className="border-t-success relative flex flex-grow flex-col gap-16 border-t bg-[#111B1D] px-8 py-6"
              style={{
                height: successPanelHeight
                  ? `${successPanelHeight}px`
                  : undefined,
                overflow: 'auto', // Add overflow handling
              }}
            >
              <div className="flex w-full flex-row">
                <div className="ml-auto pb-7 pl-7">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 cursor-pointer hover:opacity-50"
                    onClick={() => {
                      setSuccess(undefined);
                      setSuccessPanelHeight(null); // Reset height on close
                    }}
                  >
                    <path
                      d="M5.91797 15.2474C5.5958 15.5696 5.07347 15.5696 4.7513 15.2474C4.42914 14.9252 4.42914 14.4029 4.7513 14.0807L8.83464 9.9974L4.7513 5.91406C4.42914 5.5919 4.42914 5.06956 4.7513 4.7474C5.07347 4.42523 5.5958 4.42523 5.91797 4.7474L10.0013 8.83073L14.0846 4.74739C14.4068 4.42523 14.9291 4.42523 15.2513 4.7474C15.5735 5.06956 15.5735 5.5919 15.2513 5.91406L11.168 9.9974L15.2513 14.0807C15.5735 14.4029 15.5735 14.9252 15.2513 15.2474C14.9291 15.5696 14.4068 15.5696 14.0846 15.2474L10.0013 11.1641L5.91797 15.2474Z"
                      fill="#F2F2F2"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-10">
                  {success.advancedTasksCompleted ? (
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-30 w-30"
                    >
                      <path
                        d="M120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60ZM1.8 60C1.8 92.143 27.857 118.2 60 118.2C92.143 118.2 118.2 92.143 118.2 60C118.2 27.857 92.143 1.8 60 1.8C27.857 1.8 1.8 27.857 1.8 60Z"
                        fill="#33CF8E"
                        fillOpacity="0.5"
                      />
                      <path
                        d="M0 60C0 93.1371 26.8629 120 60 120C93.1371 120 120 93.1371 120 60C120 26.8629 93.1371 0 60 0C26.8629 0 0 26.8629 0 60ZM118.2 60C118.2 92.143 92.143 118.2 60 118.2C27.857 118.2 1.8 92.143 1.8 60C1.8 27.857 27.857 1.8 60 1.8C92.143 1.8 118.2 27.857 118.2 60Z"
                        fill="#33CF8E"
                      />
                      <path
                        d="M45.5 60.9091L54.5625 70L74.5 50"
                        stroke="#33CF8E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-30 w-30"
                    >
                      <path
                        d="M120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60ZM1.8 60C1.8 92.143 27.857 118.2 60 118.2C92.143 118.2 118.2 92.143 118.2 60C118.2 27.857 92.143 1.8 60 1.8C27.857 1.8 1.8 27.857 1.8 60Z"
                        fill="#33CF8E"
                        fillOpacity="0.5"
                      />
                      <path
                        d="M60 0.9C60 0.402944 60.4031 -0.000704788 60.9001 0.00674909C72.4527 0.180012 83.7169 3.68573 93.3342 10.1118C103.201 16.7047 110.892 26.0754 115.433 37.039C119.974 48.0026 121.162 60.0666 118.847 71.7054C116.532 83.3443 110.818 94.0353 102.426 102.426C94.0353 110.818 83.3443 116.532 71.7054 118.847C60.0666 121.162 48.0026 119.974 37.039 115.433C26.0754 110.892 16.7047 103.201 10.1118 93.3342C3.68572 83.7169 0.180016 72.4527 0.00675201 60.9001C-0.000701904 60.4031 0.402946 60 0.900002 60C1.39706 60 1.79927 60.4031 1.80695 60.9001C1.98007 72.0967 5.38016 83.0129 11.6085 92.3342C18.0036 101.905 27.0932 109.365 37.7278 113.77C48.3625 118.175 60.0646 119.327 71.3543 117.082C82.644 114.836 93.0142 109.293 101.154 101.154C109.293 93.0142 114.836 82.644 117.082 71.3543C119.327 60.0646 118.175 48.3625 113.77 37.7278C109.365 27.0932 101.905 18.0036 92.3342 11.6085C83.0129 5.38016 72.0967 1.98007 60.9001 1.80696C60.4031 1.79927 60 1.39706 60 0.9Z"
                        fill="#33CF8E"
                      />
                      <path
                        d="M45.5 60.9091L54.5625 70L74.5 50"
                        stroke="#33CF8E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center gap-5">
                      <span className="text-2xl">Требования выполнены!</span>
                      <span className="text-secondary text-center text-sm">
                        {success.advancedTasksCompleted ? (
                          <span>
                            Поздравляем! Вы успешно выполнили все ключевые
                            требования задачи. Это небольшая, но значимая победа
                            на вашем пути к освоению новой профессии.
                          </span>
                        ) : (
                          <span>
                            Поздравляем! Вы успешно выполнили все ключевые
                            требования задачи. Это небольшая, но значимая победа
                            на вашем пути к освоению новой профессии.
                          </span>
                        )}
                      </span>
                    </div>
                    {success.advancedTasksCompleted ? (
                      <div className="flex h-fit w-fit flex-row items-center gap-2 rounded-[0.4167vw] bg-white/5 px-5 py-3">
                        <svg
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4.25"
                        >
                          <path
                            d="M6.09375 12.3245V5.5512C6.09375 5.28453 6.17375 5.02453 6.32042 4.80453L8.14042 2.09787C8.42708 1.66453 9.14042 1.35787 9.74708 1.58453C10.4004 1.80453 10.8337 2.53787 10.6937 3.1912L10.3471 5.3712C10.3204 5.5712 10.3737 5.7512 10.4871 5.8912C10.6004 6.01787 10.7671 6.09787 10.9471 6.09787H13.6871C14.2138 6.09787 14.6671 6.3112 14.9337 6.68453C15.1871 7.04453 15.2338 7.5112 15.0671 7.98453L13.4271 12.9779C13.2204 13.8045 12.3204 14.4779 11.4271 14.4779H8.82708C8.38042 14.4779 7.75375 14.3245 7.46708 14.0379L6.61375 13.3779C6.28708 13.1312 6.09375 12.7379 6.09375 12.3245Z"
                            fill="#33CF8E"
                          />
                          <path
                            d="M3.97203 4.25781H3.28536C2.25203 4.25781 1.83203 4.65781 1.83203 5.64448V12.3511C1.83203 13.3378 2.25203 13.7378 3.28536 13.7378H3.97203C5.00536 13.7378 5.42536 13.3378 5.42536 12.3511V5.64448C5.42536 4.65781 5.00536 4.25781 3.97203 4.25781Z"
                            fill="#33CF8E"
                          />
                        </svg>

                        <span className="text-xs leading-4">
                          Требования с <span className="text-[#F48E19]">*</span>{' '}
                          выполнены. Отличный результат!
                        </span>
                      </div>
                    ) : (
                      <div className="flex h-fit w-fit flex-row items-center gap-2 rounded-[0.4167vw] bg-white/5 px-5 py-3">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8ZM8.66667 10.6667C8.66667 11.0349 8.36819 11.3333 8 11.3333C7.63181 11.3333 7.33333 11.0349 7.33333 10.6667C7.33333 10.2985 7.63181 10 8 10C8.36819 10 8.66667 10.2985 8.66667 10.6667ZM7.16667 6.66667C7.16667 6.20643 7.53976 5.83333 8 5.83333C8.46024 5.83333 8.83333 6.20643 8.83333 6.66667V6.74755C8.83333 6.99001 8.73701 7.22255 8.56557 7.39399L7.64645 8.31311C7.45118 8.50838 7.45118 8.82496 7.64645 9.02022C7.84171 9.21548 8.15829 9.21548 8.35355 9.02022L9.27267 8.1011C9.63166 7.74212 9.83333 7.25523 9.83333 6.74755V6.66667C9.83333 5.65414 9.01252 4.83333 8 4.83333C6.98748 4.83333 6.16667 5.65414 6.16667 6.66667V7C6.16667 7.27614 6.39052 7.5 6.66667 7.5C6.94281 7.5 7.16667 7.27614 7.16667 7V6.66667Z"
                            fill="#33CF8E"
                            fillOpacity="0.5"
                          />
                        </svg>

                        <span className="text-xs leading-4">
                          Для выполнения задачи на 100% — выполните требования с{' '}
                          <span className="text-[#F48E19]">*</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-row">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <button
                        className="group cursor-pointer"
                        key={index}
                        onClick={() => {
                          if (rating) {
                            setRating(0);
                          } else {
                            setRating(index + 1);
                          }
                        }}
                      >
                        {rating ? (
                          <>
                            {' '}
                            {index < rating ? <StarIconFilled /> : <StarIcon />}
                          </>
                        ) : (
                          <>
                            <StarIcon className="block not-first:ml-[-0.0521vw] group-hover:hidden group-has-[~button:hover]:hidden" />
                            <StarIconFilled className="hidden group-hover:block group-has-[~button:hover]:block" />
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                  {rating ? (
                    <span className="text-xs text-[#FEF360]/50">
                      Спасибо за оценку!
                    </span>
                  ) : (
                    <span className="text-xs text-[#FEF360]/50">
                      Пожалуйста, оцените задачу
                    </span>
                  )}
                </div>
                <div className="flex w-full flex-col items-center gap-5">
                  <div className="grid w-full grid-cols-4 gap-3">
                    {[
                      {
                        name: 'Вконтакте',
                        id: 'vk',
                        icon: (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                          >
                            <rect
                              width="16"
                              height="16"
                              rx="8"
                              fill="#0077FF"
                            />
                            <path
                              d="M8.39457 10.8031C5.38795 10.8031 3.67302 8.70102 3.60156 5.20312H5.10762C5.15709 7.77049 6.2674 8.85798 7.14685 9.0822V5.20312H8.56496V7.41734C9.43342 7.32204 10.3458 6.31303 10.6537 5.20312H12.0718C11.9558 5.77876 11.7246 6.32379 11.3926 6.80413C11.0606 7.28446 10.6351 7.68978 10.1425 7.99472C10.6923 8.27335 11.178 8.66772 11.5674 9.15182C11.9568 9.63592 12.2411 10.1987 12.4016 10.8031H10.8405C10.6965 10.2782 10.4037 9.80825 9.99892 9.45225C9.59412 9.09626 9.09529 8.87003 8.56496 8.80192V10.8031H8.39457V10.8031Z"
                              fill="#F2F2F2"
                            />
                          </svg>
                        ),
                      },
                      {
                        name: 'Twitter (X)',
                        id: 'twitter',
                        icon: (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                          >
                            <g clipPath="url(#clip0_3828_45729)">
                              <rect
                                width="16"
                                height="16"
                                rx="8"
                                fill="#01050D"
                              />
                              <path
                                d="M8.59552 7.38246L11.2307 4.38281H10.6065L8.31738 6.98683L6.49047 4.38281H4.38281L7.14607 8.32092L4.38281 11.4661H5.00704L7.4228 8.7156L9.35257 11.4661H11.4602M5.23234 4.84379H6.19133L10.606 11.0278H9.64676"
                                fill="#F2F2F2"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_3828_45729">
                                <rect
                                  width="16"
                                  height="16"
                                  rx="8"
                                  fill="white"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        ),
                      },
                      {
                        name: 'Telegram',
                        id: 'telegram',
                        icon: (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                          >
                            <rect
                              width="16"
                              height="16"
                              rx="8"
                              fill="#1EA1DD"
                            />
                            <path
                              d="M11.2016 5.03777L9.99939 11.3138C9.99939 11.3138 9.83119 11.7489 9.36912 11.5402L6.59539 9.33791L6.58253 9.33142C6.9572 8.98303 9.86252 6.27794 9.9895 6.15532C10.1861 5.96542 10.064 5.85237 9.83581 5.99582L5.54428 8.81806L3.88862 8.24118C3.88862 8.24118 3.62807 8.14521 3.603 7.93652C3.5776 7.72749 3.89719 7.61443 3.89719 7.61443L10.6468 4.87245C10.6468 4.87245 11.2016 4.62005 11.2016 5.03777V5.03777Z"
                              fill="#F2F2F2"
                            />
                          </svg>
                        ),
                      },
                      {
                        name: 'Ссылка',
                        id: 'copy',
                        icon: linkCopied ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                          >
                            <path
                              d="M11.3998 1.33594H8.59984C6.54446 1.33594 5.5805 2.06533 5.37967 3.82861C5.33766 4.1975 5.64317 4.5026 6.01445 4.5026H7.39984C10.1998 4.5026 11.4998 5.8026 11.4998 8.6026V9.988C11.4998 10.3593 11.8049 10.6648 12.1738 10.6228C13.9371 10.422 14.6665 9.45799 14.6665 7.4026V4.6026C14.6665 2.26927 13.7332 1.33594 11.3998 1.33594Z"
                              fill="#195AF4"
                            />
                            <path
                              d="M7.4026 5.33594H4.6026C2.26927 5.33594 1.33594 6.26927 1.33594 8.6026V11.4026C1.33594 13.7359 2.26927 14.6693 4.6026 14.6693H7.4026C9.73594 14.6693 10.6693 13.7359 10.6693 11.4026V8.6026C10.6693 6.26927 9.73594 5.33594 7.4026 5.33594ZM8.19594 9.1026L5.7226 11.5759C5.62927 11.6693 5.50927 11.7159 5.3826 11.7159C5.25594 11.7159 5.13594 11.6693 5.0426 11.5759L3.8026 10.3359C3.61594 10.1493 3.61594 9.84927 3.8026 9.6626C3.98927 9.47594 4.28927 9.47594 4.47594 9.6626L5.37594 10.5626L7.51594 8.4226C7.7026 8.23594 8.0026 8.23594 8.18927 8.4226C8.37594 8.60927 8.3826 8.91594 8.19594 9.1026Z"
                              fill="#195AF4"
                            />
                            <path
                              d="M5.72406 11.5785L8.1974 9.10516C8.38406 8.91849 8.3774 8.61182 8.19073 8.42516C8.00406 8.23849 7.70406 8.23849 7.5174 8.42516L5.3774 10.5652L4.4774 9.66516C4.29073 9.47849 3.99073 9.47849 3.80406 9.66516C3.6174 9.85182 3.6174 10.1518 3.80406 10.3385L5.04406 11.5785C5.1374 11.6718 5.2574 11.7185 5.38406 11.7185C5.51073 11.7185 5.63073 11.6718 5.72406 11.5785Z"
                              fill="#F2F2F2"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                          >
                            <g clipPath="url(#clip0_3828_45741)">
                              <path
                                d="M10.4 8.53375V11.0538C10.4 13.1538 9.56 13.9938 7.46 13.9938H4.94C2.84 13.9938 2 13.1538 2 11.0538V8.53375C2 6.43375 2.84 5.59375 4.94 5.59375H7.46C9.56 5.59375 10.4 6.43375 10.4 8.53375Z"
                                stroke="#F2F2F2"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M14.0016 4.94V7.46C14.0016 9.56 13.1616 10.4 11.0616 10.4H10.4016V8.54C10.4016 6.44 9.56156 5.6 7.46156 5.6H5.60156V4.94C5.60156 2.84 6.44156 2 8.54156 2H11.0616C13.1616 2 14.0016 2.84 14.0016 4.94Z"
                                stroke="#F2F2F2"
                                strokeWidth="0.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_3828_45741">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        ),
                      },
                    ].map((x) => (
                      <div
                        key={x.id}
                        className="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-[5.2083vw] border border-[#F2F2F2]/20 py-3 hover:border-[#F2F2F2]"
                        onClick={() => handleShare(x.id)}
                      >
                        <div className="flex flex-row items-center gap-2">
                          {x.icon}
                          <span className="text-sm leading-4">{x.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4.25 w-4"
                    >
                      <path
                        d="M10.5 2.39844V5.59844C4.1 5.59844 2.5 8.87844 2.5 13.5984C3.332 10.4304 5.7 8.79844 8.9 8.79844H10.5V11.9984L15.3 6.94244L10.5 2.39844Z"
                        fill="#9AA6B5"
                      />
                    </svg>

                    <span className="text-secondary text-xs">
                      Поделитесь успехом в социальных сетях
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute top-0 left-1/2 mr-auto ml-auto -translate-x-1/2 -translate-y-1/2 cursor-ns-resize touch-none p-1"
              onPointerDown={(e) => handlePointerDown(e, 'success')}
            >
              <svg
                width="32"
                height="12"
                viewBox="0 0 32 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-8"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="31"
                  height="11"
                  rx="5.5"
                  fill="#0F1217"
                  stroke="#33CF8E"
                />
                <rect
                  x="8"
                  y="5.5"
                  width="16"
                  height="1"
                  rx="0.5"
                  fill="#F2F2F2"
                />
              </svg>
            </div>
          </div>
        )}

        <div className="border-accent flex flex-row items-center justify-center border-t shadow-lg">
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-row px-8 py-6">
              {/* Action buttons go here */}
              <div className="flex flex-row items-center gap-4">
                <Image
                  src={BfLogo}
                  alt="logo"
                  width={20}
                  height={20}
                  className="h-5 w-5 shrink-0"
                />
                <div className="flex items-center justify-center gap-1">
                  <span className="text-foreground text-xl leading-5">0</span>
                  <span className="text-secondary text-xs leading-5">
                    — Проверок кода
                  </span>
                </div>
              </div>
              <button
                className={cn(
                  'not-disabled:border-primary group/run-button not-disabled:hover:bg-primary ml-auto flex gap-2 rounded-[5.2083vw] border px-6 py-3 text-sm not-disabled:cursor-pointer',
                  checkCode && 'border-[#1242B2] bg-[#1242B2]'
                )}
                disabled={checkCode}
                onClick={() => {
                  setCheckCode(true);
                  sendMessageToIframe({
                    type: 'check-code'
                  })
                  
                  // Randomly choose action
                  if (Math.random() > 0.5) {
                    setError(undefined);
                    setSuccess(undefined);
                    setError({
                      message: `Line 5: Char 5: error: non-void function does not return a value [-Werror,-Wreturn-type]
      5 |     }
        |
        ^
    1 error generated.`,
                      tests: ['Требование 2', 'Требование 3', 'Требование 4'],
                    });
                    setIsAiMentorActive(true);
                  } else {
                    setError(undefined);
                    setSuccess(undefined);
                    setSuccess({
                      advancedTasksCompleted: Math.random() > 0.5,
                    });
                  }
                }}
              >
                {checkCode ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 animate-spin"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 10C3 6.13516 6.11172 3 10 3C12.3136 3 14.0468 3.96629 15.1909 4.91968C15.4687 5.15117 15.7127 5.38261 15.9231 5.60053V3.89744C15.9231 3.60005 16.1642 3.35897 16.4615 3.35897C16.7589 3.35897 17 3.60005 17 3.89744V7.1282C17 7.42559 16.7589 7.66667 16.4615 7.66667H13.5897C13.2924 7.66667 13.0513 7.42559 13.0513 7.1282C13.0513 6.83082 13.2924 6.58974 13.5897 6.58974H15.372C15.1431 6.33271 14.8528 6.0398 14.5014 5.74699C13.4917 4.90551 11.9941 4.07692 10 4.07692C6.70879 4.07692 4.07692 6.72763 4.07692 10C4.07692 10.2974 3.83585 10.5385 3.53846 10.5385C3.24108 10.5385 3 10.2974 3 10ZM16.4615 9.46154C16.7589 9.46154 17 9.70262 17 10C17 13.866 13.866 17 10 17C8.02888 17 6.46913 16.0093 5.4283 15.0656C5.1927 14.852 4.98122 14.6386 4.79487 14.4362V16.1026C4.79487 16.3999 4.55379 16.641 4.25641 16.641C3.95903 16.641 3.71795 16.3999 3.71795 16.1026V12.8718C3.71795 12.5744 3.95903 12.3333 4.25641 12.3333H7.1745C7.47188 12.3333 7.71296 12.5744 7.71296 12.8718C7.71296 13.1692 7.47188 13.4103 7.1745 13.4103H5.32582C5.54647 13.6717 5.82328 13.97 6.15166 14.2678C7.09047 15.1189 8.40251 15.9231 10 15.9231C13.2712 15.9231 15.9231 13.2712 15.9231 10C15.9231 9.70262 16.1642 9.46154 16.4615 9.46154Z"
                      fill="#F2F2F2"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      className="hidden group-hover/run-button:block"
                      d="M5.51953 12.0047V7.99469C5.51953 5.56965 5.51953 4.35713 6.30075 3.93063C7.08197 3.50412 8.10192 4.1598 10.1418 5.47116L13.2607 7.47616C15.0284 8.61257 15.9123 9.18077 15.9123 9.9997C15.9123 10.8186 15.0284 11.3868 13.2607 12.5232L10.1418 14.5282C8.10191 15.8396 7.08197 16.4953 6.30075 16.0688C5.51953 15.6423 5.51953 14.4297 5.51953 12.0047Z"
                      fill="#F2F2F2"
                    />
                    <path
                      className="group-hover/run-button:hidden"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.4341 4.91624L10.4798 4.94563L13.5987 6.95063L13.6426 6.97887C14.4891 7.52302 15.184 7.96968 15.6608 8.38671C16.1542 8.81813 16.5373 9.32226 16.5373 9.9999C16.5373 10.6775 16.1542 11.1817 15.6608 11.6131C15.184 12.0301 14.4891 12.4768 13.6426 13.0209L13.5987 13.0492L10.4798 15.0542L10.4341 15.0836C9.45298 15.7143 8.65646 16.2264 8.00661 16.52C7.34475 16.819 6.65602 16.975 6.00126 16.6175C5.3465 16.2601 5.10529 15.5964 4.99893 14.8779C4.89449 14.1725 4.89451 13.2256 4.89453 12.0593L4.89453 12.0049V7.9949L4.89453 7.94055C4.89451 6.7742 4.89449 5.82728 4.99893 5.12188C5.10529 4.40343 5.3465 3.73973 6.00126 3.38226C6.65602 3.02479 7.34475 3.1808 8.00661 3.47983C8.65646 3.77343 9.45297 4.2855 10.4341 4.91624ZM7.49195 4.61896C6.93855 4.36894 6.7267 4.41036 6.60024 4.4794C6.47379 4.54844 6.32438 4.70425 6.23545 5.30495C6.1462 5.90777 6.14453 6.76117 6.14453 7.9949V12.0049C6.14453 13.2386 6.1462 14.092 6.23545 14.6949C6.32438 15.2956 6.47379 15.4514 6.60024 15.5204C6.7267 15.5894 6.93855 15.6309 7.49195 15.3808C8.04729 15.1299 8.76604 14.6699 9.80383 14.0027L12.9227 11.9977C13.8241 11.4183 14.4392 11.0208 14.838 10.6721C15.2285 10.3306 15.2873 10.1412 15.2873 9.9999C15.2873 9.85861 15.2285 9.66918 14.838 9.32767C14.4392 8.97895 13.8241 8.58154 12.9227 8.0021L9.80384 5.9971C8.76605 5.32995 8.04729 4.86987 7.49195 4.61896Z"
                      fill="#F2F2F2"
                    />
                  </svg>
                )}

                <span className="text-sm">Проверить код</span>
              </button>
            </div>

            <div className="border-accent flex justify-center gap-1 bg-[#14171C] py-2.25 text-xs">
              <div className="flex flex-row gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                >
                  <path
                    d="M6.11828 1.29969L3.20745 2.39635C2.53661 2.64719 1.98828 3.44052 1.98828 4.15219V8.48635C1.98828 9.17469 2.44328 10.0789 2.99745 10.493L5.50578 12.3655C6.32828 12.9839 7.68161 12.9839 8.50411 12.3655L11.0124 10.493C11.5666 10.0789 12.0216 9.17469 12.0216 8.48635V4.15219C12.0216 3.43469 11.4733 2.64135 10.8024 2.39052L7.89161 1.29969C7.39578 1.11885 6.60245 1.11885 6.11828 1.29969Z"
                    stroke="#9AA6B5"
                    strokeWidth="0.875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.28125 6.92464L6.22042 7.8638L8.72875 5.35547"
                    stroke="#9AA6B5"
                    strokeWidth="0.875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="text-secondary">Возникла проблема? </span>
              </div>

              <span
                className="cursor-pointer underline hover:opacity-50"
                onClick={() => setIsTaskReportFormOpen(true)}
              >
                Написать нам
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
