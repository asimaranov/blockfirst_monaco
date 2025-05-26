import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface MobileHeaderProps {
  username?: string;
  startDate?: string;
  hasNotifications?: boolean;
  onNotificationClick?: () => void;
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
  leftContent?: ReactNode;
}

export const MobileHeader = ({
  leftContent,
  hasNotifications = false,
  onNotificationClick = () => {},
  onMenuClick = () => {},
  isMenuOpen = false,
}: MobileHeaderProps) => {
  return (
    <div className="group" data-is-menu-open={isMenuOpen}>
      <div className="h-[75px] w-full"></div>
      <header
        className={`${isMenuOpen ? 'border-accent fixed border-b' : 'absolute'} top-0 z-[100000000] block h-auto w-full bg-[#01050d] py-4 sm:hidden`}
      >
        <div className="flex w-full items-center justify-between px-5">
          {leftContent}

          <div className="flex items-center gap-3">
            <button
              className="relative flex h-[41px] w-[41px] items-center justify-center"
              onClick={onNotificationClick}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.83594 10.8334H10.0026"
                  stroke="#F2F2F2"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.83594 14.1666H13.3359"
                  stroke="#F2F2F2"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.6641 1.66663H7.4974C3.33073 1.66663 1.66406 3.33329 1.66406 7.49996V12.5C1.66406 16.6666 3.33073 18.3333 7.4974 18.3333H12.4974C16.6641 18.3333 18.3307 16.6666 18.3307 12.5V8.33329"
                  stroke="#F2F2F2"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="17"
                  cy="3"
                  r="3"
                  fill={hasNotifications ? '#CF3336' : '#9AA6B5'}
                />
              </svg>

              {hasNotifications && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-error absolute top-[11px] right-[10px] h-[6px] w-[6px] rounded-full"
                />
              )}
            </button>

            <button
              className="border-accent flex h-[41px] w-[41px] items-center justify-center rounded-full border"
              onClick={onMenuClick}
            >
              <div className="relative flex h-[14px] w-[19px] flex-col justify-between">
                <motion.div
                  className="bg-foreground h-[1.5px] w-[19px] rounded-full"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 6.25 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="bg-foreground h-[1.5px] w-[19px] rounded-full"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="bg-foreground h-[1.5px] w-[19px] rounded-full"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -6.25 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MobileHeader;
