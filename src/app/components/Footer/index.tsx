import Link from 'next/link';
import { BackToTopButton } from '../shared/BackToTopButton';
import NewsletterSubscription from './NewsletterSubscription';

export default function Footer({ className }: { className?: string }) {
  const mobileLinkSections = [
    {
      title: 'Компания',
      links: [
        { label: 'Стоимость', href: 'https://app.blockfirst.io/pricing' },
        { label: 'F.A.Q', href: 'https://blockfirst.io/faq' },
        { label: 'Курс Solidity', href: 'https://app.blockfirst.io/course/solidity' },
        { label: 'Блог', href: 'https://blockfirst.io/blog' },
        // { label: 'Статьи', href: '#' },
      ],
      className: '',
    },
    {
      title: 'Сообщество',
      links: [
        { label: 'Youtube', href: 'https://www.youtube.com/@blockfirst_ru' },
        { label: 'Twitter', href: 'https://x.com/blockfirst_ru' },
        { label: 'Medium', href: 'https://medium.com/@blockfirst_ru' },
        { label: 'Telegram', href: 'https://t.me/blockfirst_edu' },
      ],
    },
  ];
  const linkSections = [
    {
      title: 'Медиа',
      links: [
        { label: 'Youtube', href: 'https://www.youtube.com/@blockfirst_ru' },
        { label: 'Twitter', href: 'https://x.com/blockfirst_ru' },
        { label: 'Medium', href: 'https://medium.com/@blockfirst_ru' },
        { label: 'Telegram', href: 'https://t.me/blockfirst_edu' },
      ],
    },
    {
      title: 'Сообщество',
      links: [
        { label: 'Блог', href: 'https://blockfirst.io/blog' },
        // { label: 'Статьи', href: '#' },
      ],
      className: 'hidden sm:flex',
    },
    {
      title: 'Компания',
      links: [
        { label: 'Стоимость', href: 'https://app.blockfirst.io/pricing' },
        { label: 'F.A.Q', href: 'https://blockfirst.io/faq' },
        {
          label: 'Курс Solidity',
          href: 'https://app.blockfirst.io/course/solidity',
        },
      ],
    },
  ];

  const contactSections = [
    {
      title: 'Для бизнес запросов',
      email: 'business@blockfirst.io',
      icon: 'email',
      className: 'hidden sm:flex',
    },
    {
      title: 'Для запросов от пользователей',
      email: 'hello@blockfirst.io',
      icon: 'email',
      className: 'hidden sm:flex',
    },
    {
      title: 'Телеграм бот для быстрых ответов',
      link: 't.me/blockfirst_support_bot',
      href: 'https://t.me/blockfirst_support_bot',
      icon: 'telegram',
      hasArrow: true,
    },
  ];

  const renderIcon = (iconType: string) => {
    if (iconType === 'email') {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M11.332 14.1666H4.66536C2.23203 14.1666 0.832031 12.7666 0.832031 10.3333V5.66659C0.832031 3.23325 2.23203 1.83325 4.66536 1.83325H11.332C13.7654 1.83325 15.1654 3.23325 15.1654 5.66659V10.3333C15.1654 12.7666 13.7654 14.1666 11.332 14.1666ZM4.66536 2.83325C2.7587 2.83325 1.83203 3.75992 1.83203 5.66659V10.3333C1.83203 12.2399 2.7587 13.1666 4.66536 13.1666H11.332C13.2387 13.1666 14.1654 12.2399 14.1654 10.3333V5.66659C14.1654 3.75992 13.2387 2.83325 11.332 2.83325H4.66536Z"
            fill="#F2F2F2"
          />
          <path
            d="M7.9992 8.57998C7.4392 8.57998 6.87254 8.40665 6.4392 8.05331L4.35253 6.38665C4.1392 6.21331 4.0992 5.89998 4.27254 5.68665C4.44587 5.47331 4.75921 5.43332 4.97254 5.60665L7.0592 7.27332C7.56587 7.67998 8.42586 7.67998 8.93253 7.27332L11.0192 5.60665C11.2325 5.43332 11.5525 5.46665 11.7192 5.68665C11.8925 5.89998 11.8592 6.21998 11.6392 6.38665L9.55254 8.05331C9.12587 8.40665 8.5592 8.57998 7.9992 8.57998Z"
            fill="#F2F2F2"
          />
        </svg>
      );
    } else if (iconType === 'telegram') {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.16776 7.23037C5.7958 5.65477 8.21103 4.60782 9.42383 4.0999C12.8756 2.65905 13.6013 2.41027 14.0677 2.3999C14.1714 2.3999 14.3994 2.42063 14.5549 2.54502C14.6793 2.64868 14.7104 2.78344 14.7311 2.8871C14.7519 2.99075 14.7726 3.20844 14.7519 3.37429C14.5653 5.34379 13.7567 10.1224 13.3421 12.32C13.1659 13.2529 12.8238 13.5639 12.4921 13.595C11.7665 13.6572 11.2171 13.1181 10.5226 12.6621C9.42383 11.9468 8.81225 11.5011 7.74457 10.7962C6.51104 9.98768 7.30921 9.54195 8.01408 8.81634C8.20067 8.62976 11.383 5.72733 11.4452 5.46818C11.4555 5.43709 11.4555 5.3127 11.383 5.2505C11.3104 5.18831 11.2068 5.20904 11.1238 5.22977C11.0098 5.2505 9.26834 6.41147 5.87872 8.70232C5.38117 9.04439 4.93544 9.21024 4.53117 9.19987C4.08544 9.18951 3.23544 8.95109 2.59276 8.74378C1.81533 8.495 1.19338 8.36024 1.24521 7.92488C1.27631 7.69683 1.58728 7.46878 2.16776 7.23037Z"
            fill="#F2F2F2"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <div className="border-accent hidden h-9.5 shrink-0 sm:block"></div>
      <footer className="bg-background border-accent border-t-0 pt-16 sm:border-t">
        {/* Top section */}
        <div className="mb-16 flex w-full flex-col gap-10 px-5 sm:flex-row sm:gap-0 sm:px-8">
          {/* Newsletter signup */}
          <div className="max-w-auto flex flex-col gap-10 sm:max-w-77">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl">Новости. Скидки. Анонсы</h3>
              <p className="text-secondary text-sm text-nowrap">
                Подписываясь на рассылку, вы можете быть <br />
                <span className="text-secondary text-sm text-nowrap">
                  уверены, что мы не будем спамить Вам :)
                </span>
              </p>
            </div>
            <NewsletterSubscription />
          </div>
          {/* <div className="flex-grow"></div> */}

          {/* Mobile links section */}
          <div className="ml-0 flex gap-16 sm:ml-auto sm:justify-end md:hidden">
            {mobileLinkSections.map((section, index) => (
              <div
                key={index}
                className={`flex w-1/2 flex-col gap-5 sm:gap-8 sm:w-auto ${section.className || ''}`}
              >
                <span className="text-secondary text-xs uppercase opacity-50">
                  {section.title}
                </span>
                <div className="flex flex-col gap-6 text-sm">
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      className="hover:opacity-50"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Links section */}
          <div className="ml-0 hidden gap-16 sm:ml-auto sm:justify-end md:flex">
            {linkSections.map((section, index) => (
              <div
                key={index}
                className={`flex w-1/2 flex-col gap-8 sm:w-auto ${section.className || ''}`}
              >
                <span className="text-secondary text-xs uppercase opacity-50">
                  {section.title}
                </span>
                <div className="flex flex-col gap-6 text-sm">
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      className="hover:opacity-50"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="divide-accent relative grid h-25 grid-cols-1 divide-x border-t border-b border-[#282F33] md:grid-cols-3">
          {contactSections.map((section, index) => (
            <div
              key={index}
              className={`relative flex flex-row px-5 py-6 sm:px-8 ${section.className || ''} items-center bg-[url('/images/misc/footer-tab-grid.svg')] bg-cover bg-center`}
            >
              <div className="flex flex-col gap-2">
                <span className="text-secondary z-10 text-xs">
                  {section.title}
                </span>
                <div className="z-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {renderIcon(section.icon)}
                    <a
                      href={section.href || `mailto:${section.email}`}
                      className="text-sm"
                    >
                      {section.email || section.link}
                    </a>
                  </div>
                </div>
              </div>
              {section.hasArrow && (
                <Link
                  href={section.href}
                  target="_blank"
                  className="ml-auto h-5 w-5 cursor-pointer hover:opacity-50"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.901 4.46943C11.1939 4.17653 11.6688 4.17653 11.9617 4.46942L16.9617 9.46937C17.1023 9.61003 17.1814 9.80079 17.1814 9.9997C17.1814 10.1986 17.1023 10.3894 16.9617 10.53L11.9617 15.53C11.6688 15.8229 11.1939 15.8229 10.901 15.53C10.6081 15.2371 10.6081 14.7623 10.901 14.4694L14.6207 10.7497H3.57422C3.16001 10.7497 2.82422 10.4139 2.82422 9.99971C2.82422 9.58549 3.16001 9.24971 3.57422 9.24971H14.6207L10.901 5.53009C10.6081 5.2372 10.6081 4.76232 10.901 4.46943Z"
                      fill="#F2F2F2"
                    />
                  </svg>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Copyright section */}
        <div className="flex flex-col items-center gap-5 px-5 pt-8 pb-8 text-xs sm:gap-0 sm:px-8 md:flex-row md:justify-between">
          <div className="text-foreground sm:text-secondary flex gap-6 text-xs">
            <a
              href="https://blockfirst.io/user-agreement"
              className="text-sm hover:opacity-50 sm:text-xs"
            >
              Правила сервиса
            </a>
            <a
              href="https://blockfirst.io/privacy-policy"
              className="text-sm hover:opacity-50 sm:text-xs"
            >
              Конфиденциальность
            </a>
          </div>
          <div className="flex items-center justify-between gap-0 sm:gap-95">
            <span className="text-secondary">
              © 2025-2026 BlockFirst. Все права защищены.
            </span>
            <BackToTopButton className="hidden sm:flex" />
          </div>
        </div>
      </footer>
    </div>
  );
}
