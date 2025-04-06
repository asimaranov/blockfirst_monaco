import { motion, useMotionValue, PanInfo, useTransform } from 'motion/react';
import { useState } from 'react';
import { INotification } from '~/server/models/notification';


export const SwipeableNotification = ({
  isMobile,
  notification,
  children,
  isArchived = false,
  dismissNotification,
}: {
  notification: INotification;
  children: React.ReactNode;
  isArchived?: boolean;
  isMobile: boolean;
  dismissNotification: (id: string) => void;
}) => {
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-150, 0],
    ['rgb(25, 90, 244, 0.3)', 'rgba(20, 23, 28, 0)']
  );

  const checkIconOpacity = useTransform(x, [-120, -40], [1, 0]);

  const [isRemoving, setIsRemoving] = useState(false);

  // Handle swipe dismissal with animation
  const handleSwipe = async (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    // Only process swipe for non-archived notifications
    if (info.offset.x < -100 && !isArchived) {
      setIsRemoving(true);
      // Wait for animation to complete before actually removing
      await new Promise((resolve) => setTimeout(resolve, 300));
      dismissNotification(notification.id!);
    }
  };

  // Don't use swipe on desktop
  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <motion.div
      style={{ background }}
      className="relative overflow-hidden"
      animate={{
        height: isRemoving ? 0 : 'auto',
        opacity: isRemoving ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {!isArchived && (
        <motion.div
          className="absolute top-1/2 right-5 z-0 flex -translate-y-1/2 items-center justify-center"
          style={{ opacity: checkIconOpacity }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="20" fill="#195AF4" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.9467 11.0431L18.8561 11.0431C18.4289 11.0424 18.054 11.0419 17.7199 11.1732C17.4278 11.2881 17.1692 11.4745 16.9678 11.7153C16.7375 11.9907 16.6195 12.3466 16.485 12.752L16.4564 12.838L16.2214 13.5431H13.3385H11.6719C11.3267 13.5431 11.0469 13.823 11.0469 14.1681C11.0469 14.5133 11.3267 14.7931 11.6719 14.7931H12.7492L13.2527 23.3514L13.2542 23.3779L13.2542 23.3779L13.2542 23.378C13.3049 24.2389 13.345 24.9222 13.4216 25.4725C13.5 26.0359 13.6224 26.5109 13.8649 26.942C14.2591 27.6429 14.8575 28.2071 15.5803 28.5595C16.0249 28.7763 16.5063 28.8705 17.0733 28.9157C17.6272 28.9598 18.3116 28.9598 19.1741 28.9598H19.2007H20.8097H20.8363C21.6988 28.9598 22.3833 28.9598 22.9371 28.9157C23.5042 28.8705 23.9855 28.7763 24.4301 28.5595C25.153 28.2071 25.7513 27.6429 26.1456 26.942C26.3881 26.5109 26.5104 26.0359 26.5888 25.4725C26.6654 24.9222 26.7056 24.2389 26.7562 23.3779L26.7578 23.3514L27.2612 14.7931H28.3385C28.6837 14.7931 28.9635 14.5133 28.9635 14.1681C28.9635 13.823 28.6837 13.5431 28.3385 13.5431H26.6719H23.789L23.554 12.838L23.5254 12.752C23.3909 12.3466 23.2729 11.9907 23.0426 11.7153C22.8412 11.4745 22.5826 11.2881 22.2905 11.1732C21.9564 11.0419 21.5815 11.0424 21.1544 11.0431L21.0637 11.0431H18.9467ZM22.4714 13.5431L22.3681 13.2333C22.1873 12.691 22.1413 12.5861 22.0837 12.5172C22.0166 12.4369 21.9304 12.3748 21.833 12.3365C21.7495 12.3037 21.6354 12.2931 21.0637 12.2931H18.9467C18.375 12.2931 18.261 12.3037 18.1774 12.3365C18.08 12.3748 17.9938 12.4369 17.9267 12.5172C17.8691 12.5861 17.8231 12.691 17.6423 13.2333L17.539 13.5431H22.4714ZM18.3359 17.7092C18.6811 17.7092 18.9609 17.989 18.9609 18.3342V24.1675C18.9609 24.5127 18.6811 24.7925 18.3359 24.7925C17.9908 24.7925 17.7109 24.5127 17.7109 24.1675V18.3342C17.7109 17.989 17.9908 17.7092 18.3359 17.7092ZM22.2943 18.3342C22.2943 17.989 22.0144 17.7092 21.6693 17.7092C21.3241 17.7092 21.0443 17.989 21.0443 18.3342V21.6675C21.0443 22.0127 21.3241 22.2925 21.6693 22.2925C22.0144 22.2925 22.2943 22.0127 22.2943 21.6675V18.3342Z"
              fill="#F2F2F2"
            />
          </svg>
        </motion.div>
      )}
      <motion.div
        className="relative z-10 touch-pan-y bg-[#0F1217]"
        drag="x"
        style={{ x }}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleSwipe}
        animate={{ x: isRemoving ? -300 : 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};