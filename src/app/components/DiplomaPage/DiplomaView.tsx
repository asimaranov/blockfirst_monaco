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
          <div
            className="fixed inset-0 z-50 bg-black/50"
          />
          <div
            className="fixed z-50 w-[calc(1626px/3)] h-[calc(2301px/3)] @container"
          >
            {children}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
