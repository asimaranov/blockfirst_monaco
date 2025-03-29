'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '~/helpers';
import { motion, AnimatePresence } from 'framer-motion';

type PopoverPosition = 'left' | 'right';

interface InfoPopoverProps {
  title: string;
  content: string;
  children?: ReactNode;
  className?: string;
  offsetTop?: number;
  offsetSide?: number;
  position?: PopoverPosition;
}

export const InfoPopover = ({
  title,
  content,
  children,
  className,
  offsetTop = 4,
  offsetSide = -8,
  position = 'right',
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
        top: rect.bottom,
        left: position === 'left' ? rect.left : rect.right,
      });
    }
  }, [isHovered, position, isMobile]);

  // Desktop and mobile variants for the popover
  const desktopVariants = {
    hidden: { opacity: 0, y: -5 },
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          'text-secondary h-4 w-4 cursor-pointer transition delay-100 duration-300 ease-in-out hover:text-[#F2F2F2]',
          !title && !content && 'hover:text-secondary cursor-default'
        )}
      >
        <circle cx="8" cy="8" r="6.66667" stroke="currentColor" />
        <path d="M8 7.33333V10.6667" stroke="currentColor" />
        <circle cx="8" cy="5.33333" r="0.666667" fill="currentColor" />
      </svg>

      {isHovered &&
        typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isMobile ? (
              // Mobile popover that slides from bottom
              <motion.div
                className="fixed inset-x-0 bottom-0 z-[100000000000000] flex w-full flex-col bg-[#1D2026] p-6"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileVariants}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="text-foreground pb-3 text-sm">{title}</div>
                <div className="text-secondary text-xs">{content}</div>
                {children}
              </motion.div>
            ) : (
              // Desktop popover with original positioning
              <motion.div
                className={cn('flex w-112 flex-col bg-[#1D2026] p-6')}
                style={{
                  position: 'fixed',
                  zIndex: 100000,
                  top: `calc(${popoverPosition.top}px + ${offsetTop || 0} * var(--spacing))`,
                  ...(position === 'left'
                    ? {
                        left: `calc(${popoverPosition.left}px - ${offsetSide || 0} * var(--spacing))`,
                      }
                    : {
                        right: `calc(100vw - ${popoverPosition.left}px + ${offsetSide || 0} * var(--spacing))`,
                      }),
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={desktopVariants}
                transition={{ duration: 0.2 }}
              >
                <div className="text-foreground pb-3 text-sm">{title}</div>
                <div className="text-secondary text-xs">{content}</div>
                {children}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
