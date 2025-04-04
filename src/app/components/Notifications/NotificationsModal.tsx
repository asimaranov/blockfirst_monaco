import { motion, AnimatePresence } from 'motion/react';
import Notifications from './Notifications';
import Image from 'next/image';
import noNotificationsImage from './assets/no-notifications.png';

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

export function NotificationsModalMobile({
  isOpen,
  onClose,
}: NotificationsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="top-0 right-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
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
            className="flex flex-col fixed top-0 z-[100000000000] h-[100dvh] max-w-screen min-w-screen overflow-y-scroll"
            style={{
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div
              className="bg-dark-bg flex h-15 flex-row items-center gap-2 p-5 text-base"
              onClick={onClose}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.09897 4.46967C8.80608 4.17678 8.33121 4.17678 8.03831 4.46967L3.03831 9.46962C2.89766 9.61027 2.81864 9.80104 2.81864 9.99995C2.81864 10.1989 2.89766 10.3896 3.03831 10.5303L8.03831 15.5303C8.3312 15.8232 8.80608 15.8232 9.09897 15.5303C9.39186 15.2374 9.39186 14.7625 9.09897 14.4696L5.3793 10.75H16.4258C16.84 10.75 17.1758 10.4142 17.1758 9.99995C17.1758 9.58574 16.84 9.24995 16.4258 9.24995H5.37931L9.09897 5.53033C9.39186 5.23744 9.39186 4.76257 9.09897 4.46967Z"
                  fill="#F2F2F2"
                />
              </svg>
              Назад
            </div>
            <Notifications onClose={onClose} notificationsNum={5} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export const NoNewNotifications = () => {
  return (
    <div className="flex w-full justify-center flex-grow items-center">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="bg-accent flex h-15 w-15 items-center justify-center rounded-full">
          <Image src={noNotificationsImage} alt="No notifications" />
        </div>
        <span className="text-sm text-[#9AA6B5]/50">
          Нет новых уведомлений :(
        </span>
      </div>
    </div>
  );
};

export const NoArchievedNotifications = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full justify-center">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="bg-accent flex h-15 w-15 items-center justify-center rounded-full">
            <Image src={noNotificationsImage} alt="No notifications" />
          </div>
          <span className="text-sm text-[#9AA6B5]/50">
            Уведомлений в архиве нет :(
          </span>
        </div>
      </div>
    </div>
  );
};
