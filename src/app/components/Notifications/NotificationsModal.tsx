'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Notifications from './Notifications';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsModal({
  isOpen,
  onClose,
}: NotificationsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="right-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50"
          />
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 1,
              duration: 0.4,
            }}
            className="fixed top-0 z-50 h-screen"
            style={{
              maxWidth: '420px',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Notifications onClose={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
