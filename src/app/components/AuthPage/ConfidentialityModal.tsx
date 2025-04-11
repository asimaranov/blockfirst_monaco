'use client';

import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useEffect, useState } from 'react';
import ConsentIcon from './assets/consent-icon.svg';
import Image from 'next/image';
import Link from 'next/link';
interface ConfidentialityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfidentialityModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfidentialityModalProps) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      setTimeout(() => {
        onConfirm();
        setIsChecked(false);
        onClose();
      }, 1000);
    }
  }, [isChecked]);

  // Custom animation for mobile-style modal from bottom left
  const variants = {
    initial: { x: 0, y: '100%' },
    animate: { x: 0, y: 0 },
    exit: { x: 0, y: '100%' },
  };

  const handleConfirm = () => {
    if (isChecked) {
      onConfirm();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 opacity-50 sm:w-115"
          />

          {/* Modal container */}
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ type: 'tween', duration: 0.3 }}
            className="border-accent/40 fixed bottom-0 left-0 z-[100000] w-full overflow-hidden border-t bg-[#0F1217]/50 backdrop-blur-[50px] sm:w-117"
          >
            <div className="flex h-full w-full flex-col p-5 py-8 sm:py-5 sm:p-16">
              {/* Header */}
              <div className="mb-4 flex flex-col gap-6 sm:mb-8 sm:gap-4">
                <div className="self-center">
                  <Image
                    src={ConsentIcon}
                    alt="Consent Icon"
                    className="h-8 w-32"
                  />
                </div>
                <h2 className="text-center text-xl font-bold text-white sm:text-3xl">
                  Персональные данные
                </h2>
              </div>

              {/* Content */}
              <p className="mb-8 text-center text-sm text-slate-400 sm:mb-10">
                Я соглашаюсь с{' '}
                <Link href="/privacy-policy.pdf" className="underline">
                  политикой обработки персональных данных
                </Link>{' '}
                и с{' '}
                <Link href="/terms-of-service.pdf" className="underline">
                  правилами пользования Платформой
                </Link>
              </p>

              {/* Checkbox */}
              <motion.div
                className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#9AA6B5]/10 px-4 py-3.5 hover:bg-[#195AF4]/10 data-[checked=true]:bg-[#195AF4]/10 sm:py-4"
                onClick={() => setIsChecked(!isChecked)}
                data-checked={isChecked}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                }}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isChecked ? 0 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isChecked ? (
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      initial={{ opacity: 1, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <rect
                        x="2"
                        y="2"
                        width="16"
                        height="16"
                        rx="4"
                        fill="#195AF4"
                      />
                      <motion.path
                        d="M7.08203 10.417L8.7487 12.0837L12.9154 7.91699"
                        stroke="#F2F2F2"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      className="h-5 w-5"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      initial={{ opacity: 1, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <rect
                        x="2.5"
                        y="2.5"
                        width="15"
                        height="15"
                        rx="3.5"
                        stroke="#9AA6B5"
                        className="group-hover:stroke-foreground group-data-[checked=true]:stroke-foreground group-data-[checked=true]:stroke-opacity-100 group-hover:stroke-opacity-100 stroke-[#9AA6B5]/50"
                      />
                    </motion.svg>
                  )}
                </motion.div>

                <motion.span
                  className="group-hover:text-foreground group-data-[checked=true]:text-foreground text-sm text-[#9AA6B5]"
                  animate={{ color: isChecked ? 'rgb(242, 242, 242)' : '' }}
                  transition={{ duration: 0.2 }}
                >
                  Я даю согласие
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
