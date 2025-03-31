'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const variants = {
    initial: isMobile ? { x: 0, y: 'calc(100% + 64px)' } : { x: '100%', y: 0 },
    animate: { x: 0, y: 0 },
    exit: isMobile ? { x: 0, y: 'calc(100% + 64px)' } : { x: '100%', y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50"
          />
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ type: 'tween', duration: 0.3 }}
            className={`fixed z-[10000000000000000] overflow-y-auto sm:z-50 ${
              isMobile
                ? 'top-[64px] right-0 left-0 h-[calc(100vh-64px)] w-full'
                : 'top-0 right-0 h-screen w-auto'
            }`}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
