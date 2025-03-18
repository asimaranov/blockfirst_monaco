'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function DiplomaView({ isOpen, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center"
          onClick={onClose}
        >
          <div className="fixed inset-0 z-50 bg-black/50" />
          <motion.div
            className="@container fixed z-50 h-[calc(2301px/3)] w-[calc(1626px/3)]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95}}
            transition={{ duration: 0.1, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
