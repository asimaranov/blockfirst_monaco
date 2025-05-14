'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '~/helpers';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

type PopoverPosition = 'left' | 'right' | 'top';

interface InfoPopoverProps {
  title: string;
  content: string;
  children?: ReactNode;
  className?: string;
  popoverClassName?: string;
  offsetTop?: number;
  offsetSide?: number;
  position?: PopoverPosition;
  icon?: ReactNode;
  hideOnHover?: boolean;
  debugNotHide?: boolean;
}

export const InfoPopoverIcon = ({
  empty,
  className,
}: {
  empty?: boolean;
  className?: string;
}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        'text-secondary h-5 w-5 cursor-pointer transition delay-100 duration-300 hover:text-[#F2F2F2] sm:h-4 sm:w-4',
        empty && 'hover:text-secondary cursor-default',
        className
      )}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.0026 1.83594C4.59685 1.83594 1.83594 4.59685 1.83594 8.0026C1.83594 11.4084 4.59685 14.1693 8.0026 14.1693C11.4084 14.1693 14.1693 11.4084 14.1693 8.0026C14.1693 4.59685 11.4084 1.83594 8.0026 1.83594ZM0.835938 8.0026C0.835938 4.04456 4.04456 0.835938 8.0026 0.835938C11.9606 0.835938 15.1693 4.04456 15.1693 8.0026C15.1693 11.9606 11.9606 15.1693 8.0026 15.1693C4.04456 15.1693 0.835938 11.9606 0.835938 8.0026ZM8.0026 6.83594C8.27875 6.83594 8.5026 7.05979 8.5026 7.33594V10.6693C8.5026 10.9454 8.27875 11.1693 8.0026 11.1693C7.72646 11.1693 7.5026 10.9454 7.5026 10.6693V7.33594C7.5026 7.05979 7.72646 6.83594 8.0026 6.83594ZM8.0026 6.0026C8.37079 6.0026 8.66927 5.70413 8.66927 5.33594C8.66927 4.96775 8.37079 4.66927 8.0026 4.66927C7.63441 4.66927 7.33594 4.96775 7.33594 5.33594C7.33594 5.70413 7.63441 6.0026 8.0026 6.0026Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const InfoPopover = ({
  icon,
  title,
  content,
  children,
  className,
  popoverClassName,
  offsetTop = 4,
  offsetSide = -8,
  position = 'right',
  hideOnHover = false,
  debugNotHide = false,
}: InfoPopoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're in a browser environment and determine screen size
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  useEffect(() => {
    if (infoRef.current && !isMobile) {
      const rect = infoRef.current.getBoundingClientRect();

      setPopoverPosition({
        top: position === 'top' ? rect.top : rect.bottom,
        left: position === 'left' ? rect.left : rect.right,
      });
    }
  }, [isHovered, position, isMobile]);

  // Desktop and mobile variants for the popover
  const desktopVariants = {
    hidden: { opacity: 0, y: position === 'top' ? 5 : -5 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={infoRef}
      className={cn('relative inline-block', className)}
      onMouseEnter={() => {
        if (!hideOnHover) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (!debugNotHide) {
          setIsHovered(false);
        }
      }}
    >
      <div
        onMouseEnter={() => {
          if (hideOnHover) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (hideOnHover && !debugNotHide) {
            setIsHovered(false);
          }
        }}
      >
        {icon || <InfoPopoverIcon empty={!title && !content && !children} />}
      </div>
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isHovered && isMobile && (
              // Mobile popover that slides from bottom
              <motion.div
                className="fixed inset-x-0 bottom-0 z-[100000000000000000000000000000] flex w-full flex-col bg-[#1D2026] p-5"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileVariants}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <button
                  className="cursor-pointer self-end pb-5"
                  onClick={() => setIsHovered(false)}
                >
                  <Image
                    src={'/images/icons/mobile-close-cross.svg'}
                    alt="close"
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </button>
                <div className="text-foreground pb-3 text-center text-xl">
                  {title}
                </div>
                <div className="text-secondary text-center text-sm whitespace-pre-line">
                  {content}
                </div>
                {children}
              </motion.div>
            )}

            {isHovered && !isMobile && (
              // Desktop popover with original positioning
              <motion.div
                className={cn(
                  'flex w-112 flex-col bg-[#1D2026] p-6 z-[100000000000000000000000000000]',
                  popoverClassName
                )}
                style={{
                  position: 'fixed',
                  zIndex: 100000000000000000000000000000,
                  ...(position === 'top'
                    ? {
                        bottom: `calc(100vh - ${popoverPosition.top}px + ${offsetTop || 0} * var(--spacing))`,
                        left: `calc(${popoverPosition.left}px - 56 * var(--spacing) + ${offsetSide || 0} * var(--spacing))`, // Center the popover with offsetSide adjustment
                      }
                    : {
                        top: `calc(${popoverPosition.top}px + ${offsetTop || 0} * var(--spacing))`,
                        ...(position === 'left'
                          ? {
                              left: `calc(${popoverPosition.left}px - ${offsetSide || 0} * var(--spacing))`,
                            }
                          : {
                              right: `calc(100vw - ${popoverPosition.left}px + ${offsetSide || 0} * var(--spacing))`,
                            }),
                      }),
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={desktopVariants}
                transition={{ duration: 0.2 }}
              >
                {title && content && (
                  <>
                    <div className="text-foreground pb-3 text-sm">{title}</div>
                    <div className="text-secondary text-xs leading-5 whitespace-pre-line">
                      {content}
                    </div>
                  </>
                )}
                {children}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
