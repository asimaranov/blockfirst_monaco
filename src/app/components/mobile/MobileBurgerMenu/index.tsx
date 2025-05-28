import { motion } from 'motion/react';
import Link from 'next/link';
import CopyButton from '../../shared/CopyButton/CopyButton';
import { authClient } from '~/server/auth/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIsMobile } from '~/hooks/use-is-mobile';
import { cn } from '~/lib/utils';

interface MobileBurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menu?: React.ReactNode;
  className?: string;
}

const menuSections = [
  {
    title: 'компания',
    links: [
      { href: '/pricing', label: 'Стоимость' },
      { href: 'https://blockfirst.io/faq', label: 'F.A.Q' },
      { href: '/course/solidity', label: 'Курс Solidity' },
      { href: 'https://blockfirst.io/blog', label: 'Блог' },
      { href: 'https://blockfirst.io/blog', label: 'Статьи' },
    ],
  },
  {
    title: 'сообщество',
    links: [
      { href: 'https://www.youtube.com/@blockfirst_ru', label: 'Youtube' },
      { href: 'https://x.com/blockfirst_ru', label: 'Twitter' },
      { href: 'https://medium.com/@blockfirst', label: 'Medium' },
      { href: 'https://t.me/blockfirst_edu', label: 'Telegram' },
    ],
  },
];

const contactSections = [
  {
    title: 'Телеграм бот для быстрых ответов',
    content: 't.me/blockfirst_support_bot',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.16776 7.23046C5.7958 5.65486 8.21103 4.60791 9.42383 4.09999C12.8756 2.65914 13.6013 2.41036 14.0677 2.39999C14.1714 2.39999 14.3994 2.42073 14.5549 2.54512C14.6793 2.64877 14.7104 2.78353 14.7311 2.88719C14.7519 2.99085 14.7726 3.20853 14.7519 3.37438C14.5653 5.34388 13.7567 10.1225 13.3421 12.3201C13.1659 13.253 12.8238 13.564 12.4921 13.5951C11.7665 13.6573 11.2171 13.1182 10.5226 12.6621C9.42383 11.9469 8.81225 11.5012 7.74457 10.7963C6.51104 9.98777 7.30921 9.54204 8.01408 8.81643C8.20067 8.62985 11.383 5.72742 11.4452 5.46827C11.4555 5.43718 11.4555 5.31279 11.383 5.25059C11.3104 5.1884 11.2068 5.20913 11.1238 5.22986C11.0098 5.25059 9.26834 6.41156 5.87872 8.70241C5.38117 9.04448 4.93544 9.21033 4.53117 9.19997C4.08544 9.1896 3.23544 8.95119 2.59276 8.74387C1.81533 8.49509 1.19338 8.36033 1.24521 7.92497C1.27631 7.69692 1.58728 7.46888 2.16776 7.23046Z"
          fill="white"
        />
      </svg>
    ),
    href: 'https://t.me/blockfirst_support_bot',
    type: 'link',
  },
  {
    title: 'Для бизнес запросов',
    content: 'business@blockfirst.io',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.332 14.1667H4.66536C2.23203 14.1667 0.832031 12.7667 0.832031 10.3333V5.66667C0.832031 3.23334 2.23203 1.83334 4.66536 1.83334H11.332C13.7654 1.83334 15.1654 3.23334 15.1654 5.66667V10.3333C15.1654 12.7667 13.7654 14.1667 11.332 14.1667ZM4.66536 2.83334C2.7587 2.83334 1.83203 3.76 1.83203 5.66667V10.3333C1.83203 12.24 2.7587 13.1667 4.66536 13.1667H11.332C13.2387 13.1667 14.1654 12.24 14.1654 10.3333V5.66667C14.1654 3.76 13.2387 2.83334 11.332 2.83334H4.66536Z"
          fill="#F2F2F2"
        />
        <path
          d="M7.9992 8.57998C7.4392 8.57998 6.87254 8.40665 6.4392 8.05331L4.35253 6.38665C4.1392 6.21331 4.0992 5.89998 4.27254 5.68665C4.44587 5.47331 4.75921 5.43332 4.97254 5.60665L7.0592 7.27332C7.56587 7.67998 8.42586 7.67998 8.93253 7.27332L11.0192 5.60665C11.2325 5.43332 11.5525 5.46665 11.7192 5.68665C11.8925 5.89998 11.8592 6.21998 11.6392 6.38665L9.55254 8.05331C9.12587 8.40665 8.5592 8.57998 7.9992 8.57998Z"
          fill="#F2F2F2"
        />
      </svg>
    ),
    type: 'copy',
  },
  {
    title: 'Для запросов от пользователей',
    content: 'hello@blockfirst.io',
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.332 14.1667H4.66536C2.23203 14.1667 0.832031 12.7667 0.832031 10.3333V5.66667C0.832031 3.23334 2.23203 1.83334 4.66536 1.83334H11.332C13.7654 1.83334 15.1654 3.23334 15.1654 5.66667V10.3333C15.1654 12.7667 13.7654 14.1667 11.332 14.1667ZM4.66536 2.83334C2.7587 2.83334 1.83203 3.76 1.83203 5.66667V10.3333C1.83203 12.24 2.7587 13.1667 4.66536 13.1667H11.332C13.2387 13.1667 14.1654 12.24 14.1654 10.3333V5.66667C14.1654 3.76 13.2387 2.83334 11.332 2.83334H4.66536Z"
          fill="#F2F2F2"
        />
        <path
          d="M7.9992 8.57998C7.4392 8.57998 6.87254 8.40665 6.4392 8.05331L4.35253 6.38665C4.1392 6.21331 4.0992 5.89998 4.27254 5.68665C4.44587 5.47331 4.75921 5.43332 4.97254 5.60665L7.0592 7.27332C7.56587 7.67998 8.42586 7.67998 8.93253 7.27332L11.0192 5.60665C11.2325 5.43332 11.5525 5.46665 11.7192 5.68665C11.8925 5.89998 11.8592 6.21998 11.6392 6.38665L9.55254 8.05331C9.12587 8.40665 8.5592 8.57998 7.9992 8.57998Z"
          fill="#F2F2F2"
        />
      </svg>
    ),
    type: 'copy',
  },
];

const DefaultMenu = () => {
  const router = useRouter();
  return (
    <div className="flex h-[calc(100dvh-69px)] flex-col overflow-y-auto px-5 pt-10 pb-5">
      <div className="flex flex-col space-y-10">
        {/* Menu sections */}
        <div className="grid grid-cols-2 gap-x-4">
          {menuSections.map((section, i) => (
            <div key={i} className="flex flex-col">
              <span className="mb-5 text-xs text-[#9AA6B5]/50 uppercase">
                {section.title}
              </span>
              <div className="flex flex-col space-y-4">
                {section.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="text-sm text-[#f2f2f2]"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact sections */}
        <div className="flex flex-col space-y-0">
          {contactSections.map((section) => (
            <div key={section.title} className="border-t border-[#282D33] py-6">
              <div className="flex flex-col space-y-3">
                <span className="text-xs text-[#9AA6B5]">{section.title}</span>
                <div className="flex flex-row items-center gap-3">
                  {section.icon}
                  <div>{section.content}</div>
                  {section.type === 'copy' && (
                    <CopyButton
                      textToCopy={section.content}
                      className="ml-auto"
                      appearanceType="near"
                    />
                  )}
                  {section.type === 'link' && (
                    <Link href={section.href ?? ''} className="ml-auto">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.0778 4.6461C11.2731 4.45083 11.5897 4.45083 11.7849 4.64609L16.7849 9.64604C16.8787 9.73981 16.9314 9.86699 16.9314 9.9996C16.9314 10.1322 16.8787 10.2594 16.7849 10.3532L11.7849 15.3532C11.5897 15.5484 11.2731 15.5484 11.0778 15.3532C10.8825 15.1579 10.8825 14.8413 11.0778 14.646L15.2243 10.4996H3.57422C3.29808 10.4996 3.07422 10.2757 3.07422 9.9996C3.07422 9.72346 3.29808 9.4996 3.57422 9.4996H15.2242L11.0778 5.3532C10.8825 5.15794 10.8825 4.84136 11.0778 4.6461Z"
                          fill="#F2F2F2"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          className="flex w-full items-center justify-center rounded-full border border-[#195AF4] py-3"
          onClick={async () => {
            try {
              await authClient.signOut();
            } catch (error) {
              console.error('Sign out error', error);
            } finally {
              router.push('/signin');
            }
          }}
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
                d="M12.5859 6.30001C12.3276 3.30001 10.7859 2.07501 7.41094 2.07501H7.3026C3.5776 2.07501 2.08594 3.56668 2.08594 7.29168V12.725C2.08594 16.45 3.5776 17.9417 7.3026 17.9417H7.41094C10.7609 17.9417 12.3026 16.7333 12.5776 13.7833"
                stroke="#F2F2F2"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.49713 10H16.9805"
                stroke="#F2F2F2"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.1263 7.20833L17.918 10L15.1263 12.7917"
                stroke="#F2F2F2"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

const MobileBurgerMenu = ({
  isOpen,
  onClose,
  menu,
  className,
}: MobileBurgerMenuProps) => {
  const menuVariants = {
    closed: {
      y: '-100%',
      display: 'none',
      transition: {
        type: 'easeInOut',
        duration: 0.5,
      },
    },
    open: {
      y: 0,
      display: 'flex',
      transition: {
        type: 'easeInOut',
        duration: 0.5,
      },
    },
  };

  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <motion.div
      className={cn(
        'text-foreground absolute top-[69px] right-0 left-0 z-[10000000] flex flex-col bg-[#01050d] sm:hidden',
        className
      )}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={menuVariants}
    >
      {menu || <DefaultMenu />}
    </motion.div>
  );
};

export default MobileBurgerMenu;
