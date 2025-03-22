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
            className="fixed inset-0 z-40 ml-86 bg-black/50"
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
            className="fixed top-0 left-86 z-50 h-screen max-w-105"
            style={{
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Notifications onClose={onClose} notificationsNum={5} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
