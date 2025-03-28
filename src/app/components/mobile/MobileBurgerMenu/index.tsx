'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface MobileBurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileBurgerMenu = ({ isOpen, onClose }: MobileBurgerMenuProps) => {
  const menuVariants = {
    closed: {
      y: '-100%',
      display: 'none',
      transition: {
        // type: 'linear',
        duration: 0.3
      },
    },
    open: {
      y: 0,
      display: 'flex',
      transition: {
        type: 'easeIn',
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="text-foreground absolute top-[69px] right-0 left-0 z-[1000000000] flex flex-col bg-[#01050d] sm:hidden"
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={menuVariants}
    >
      {/* Menu Content */}
      <div className="flex h-[calc(100vh-69px)] flex-col overflow-y-auto px-5">
        <div className="flex flex-col space-y-10">
          {/* Menu sections with links */}
          <div className="flex flex-row justify-between">
            {/* Company Section */}
            <div className="flex flex-col">
              <span className="mb-5 text-sm text-[#9AA6B5]">компания</span>
              <div className="flex flex-col space-y-4">
                <Link href="/price" className="text-base text-[#f2f2f2]">
                  Стоимость
                </Link>
                <Link href="/faq" className="text-base text-[#f2f2f2]">
                  F.A.Q
                </Link>
                <Link href="/solidity" className="text-base text-[#f2f2f2]">
                  Курс Solidity
                </Link>
                <Link href="/blog" className="text-base text-[#f2f2f2]">
                  Блог
                </Link>
                <Link href="/articles" className="text-base text-[#f2f2f2]">
                  Статьи
                </Link>
              </div>
            </div>

            {/* Community Section */}
            <div className="flex flex-col">
              <span className="mb-5 text-sm text-[#9AA6B5]">сообщество</span>
              <div className="flex flex-col space-y-4">
                <a
                  href="https://youtube.com/blockfirst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-[#f2f2f2]"
                >
                  Youtube
                </a>
                <a
                  href="https://twitter.com/blockfirst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-[#f2f2f2]"
                >
                  Twitter
                </a>
                <a
                  href="https://medium.com/blockfirst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-[#f2f2f2]"
                >
                  Medium
                </a>
                <a
                  href="https://t.me/blockfirst"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-[#f2f2f2]"
                >
                  Telegram
                </a>
              </div>
            </div>
          </div>

          {/* Contact Links Section */}
          <div className="flex flex-col space-y-0">
            {/* Telegram Contact */}
            <div className="border-t border-[#282D33] py-6">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-4 w-4 items-center justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.24062 2.4H14.7594V13.6H1.24062V2.4Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <span className="text-base text-[#f2f2f2]">
                      t.me/blockfirst_edu/app
                    </span>
                  </div>
                  <div className="flex h-5 w-5 rotate-180 transform items-center justify-center">
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.14453 4.57142L12.8574 4.57142"
                        stroke="#F2F2F2"
                        strokeWidth="1"
                      />
                      <path
                        d="M6.57227 9L2.14584 4.57143L6.57227 0.142857"
                        stroke="#F2F2F2"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-xs text-[#9AA6B5]">
                  Телеграм бот для быстрых ответов
                </span>
              </div>
            </div>

            {/* Business Email */}
            <div className="border-t border-[#282D33] py-6">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-4 w-4 items-center justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.833 1.833H15.167V14.167H0.833V1.833Z"
                          stroke="#F2F2F2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.16406 5.5L8.00073 8.58333L11.8307 5.5"
                          stroke="#F2F2F2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-base text-[#f2f2f2]">
                      business@blockfirst.io
                    </span>
                  </div>
                  <button className="flex h-5 w-5 items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.67643 1.66667H13.3431V8.33333"
                        stroke="#F2F2F2"
                      />
                      <path
                        d="M1.66667 6.66667H13.3333V18.3333"
                        stroke="#F2F2F2"
                      />
                    </svg>
                  </button>
                </div>
                <span className="text-xs text-[#9AA6B5]">
                  Для бизнес запросов
                </span>
              </div>
            </div>

            {/* User Email */}
            <div className="border-t border-[#282D33] py-6">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-4 w-4 items-center justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.833 1.833H15.167V14.167H0.833V1.833Z"
                          stroke="#F2F2F2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.16406 5.5L8.00073 8.58333L11.8307 5.5"
                          stroke="#F2F2F2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-base text-[#f2f2f2]">
                      hello@blockfirst.io
                    </span>
                  </div>
                  <button className="flex h-5 w-5 items-center justify-center text-[#195AF4]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.67643 1.66667H13.3431V8.33333"
                        fill="#195AF4"
                      />
                      <path
                        d="M1.66667 6.66667H13.3333V18.3333"
                        fill="#195AF4"
                      />
                      <path
                        d="M4.58252 10.3545L10.4201 10.3545"
                        fill="white"
                        stroke="white"
                      />
                    </svg>
                  </button>
                </div>
                <span className="text-xs text-[#9AA6B5]">
                  Для запросов от пользователей
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-auto mb-5">
          <button
            className="flex w-full items-center justify-center rounded-full border border-[#195AF4] py-3"
            onClick={onClose}
          >
            <div className="flex items-center space-x-2">
              <span className="text-base text-[#f2f2f2]">Выход</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.9154 7.91537V2.07504H7.41536V17.9417H17.9154V12.0834"
                  stroke="#F2F2F2"
                  strokeWidth="1.25"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 10H3.01758"
                  stroke="#F2F2F2"
                  strokeWidth="1.25"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.875 7.20833L2.08333 10L4.875 12.7917"
                  stroke="#F2F2F2"
                  strokeWidth="1.25"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileBurgerMenu;
