'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import notificationImage from './assets/top_icon.png';
import SettingIcon from './assets/settings';
import bgImage from './assets/bg.png';
import bgImage1 from './assets/bg1.png';
import bgImage2 from './assets/bg2.png';
import bfImage from './assets/bf-avatar.svg';

import user1Image from './assets/user1-avatar.png';
import user2Image from './assets/user2-avatar.png';
import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '~/helpers';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

interface NotificationsProps {
  onClose?: () => void;
  notificationsNum: number;
}

// Dummy data for slider
const carouselSlides = [
  {
    id: 1,
    category: 'Education',
    title: 'Предложение для студентов',
    description:
      'Уникальный условия по оплате курса для студентов. Заполните форму в тарифах',
    image: bgImage,
  },
  {
    id: 2,
    category: 'Products',
    title: 'Новые курсы',
    description:
      'Мы активно занимаемся расширением библиотеки курсов. Пожалуйста, следите за обновлениями!',
    image: bgImage1,
  },
  {
    id: 3,
    category: 'Social',
    title: 'Будь в курсе событий!',
    description:
      'Подписывайся на наши социальные сети, мы активно публикуем новости WEB3 мира!',
    image: bgImage2,
  },
];

const Notifications = ({ onClose, notificationsNum }: NotificationsProps) => {
  const [activeTab, setActive] = useState<'incoming' | 'archieve' | 'settings'>(
    'incoming'
  );
  const incomingTabRef = useRef<HTMLDivElement>(null);
  const archieveTabRef = useRef<HTMLDivElement>(null);
  const settingsTabRef = useRef<HTMLDivElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    left: 0,
  });

  // Embla carousel options
  const options: EmblaOptionsType = {
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    duration: 25,
    skipSnaps: false,
  };

  const autoplayOptions = {
    delay: 6000,
    playOnInit: true,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  };

  // Embla carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay(autoplayOptions),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  // Autoplay control functions
  const pauseAutoplay = useCallback(() => {
    if (emblaApi) {
      const autoplay = emblaApi.plugins().autoplay;
      if (autoplay) autoplay.stop();
    }
  }, [emblaApi]);

  const resumeAutoplay = useCallback(() => {
    if (emblaApi) {
      const autoplay = emblaApi.plugins().autoplay;
      if (autoplay) autoplay.play();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const updateUnderline = () => {
      let activeTabRef;

      if (activeTab === 'incoming') {
        activeTabRef = incomingTabRef;
      } else if (activeTab === 'archieve') {
        activeTabRef = archieveTabRef;
      } else if (activeTab === 'settings') {
        activeTabRef = settingsTabRef;
      }

      if (activeTabRef?.current) {
        const { width, left } = activeTabRef.current.getBoundingClientRect();
        const parentLeft =
          activeTabRef.current.parentElement?.getBoundingClientRect().left || 0;
        setUnderlineStyle({
          width,
          left: left - parentLeft,
        });
      }
    };

    updateUnderline();
    window.addEventListener('resize', updateUnderline);
    return () => window.removeEventListener('resize', updateUnderline);
  }, [activeTab]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-screen w-full max-w-105 flex-col overflow-hidden border border-[#282D33]/40 bg-[#0F1217]"
    >
      <div className="flex h-full flex-col">
        {/* Header with title and archive button */}
        <div className="flex flex-shrink-0 flex-col space-y-8">
          <div className="flex justify-between px-8 pt-8">
            <div className="flex items-center space-x-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-full">
                <Image
                  src={notificationImage}
                  alt=""
                  className="object-cover"
                />
              </div>
              <span className="text-foreground text-xl">Уведомления</span>
            </div>
            <div className="flex items-center">
              <button className="border-primary/50 flex cursor-pointer items-center gap-1 rounded-full border py-1.5 pr-3 pl-2 leading-4">
                <div className="h-4 w-4">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M4.35938 8.52039L6.43937 10.6004L11.6394 5.40039"
                      stroke="#195AF4"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-foreground text-xs">Все в архив</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="relative flex w-full flex-row bg-[#14171C]">
            <div
              ref={incomingTabRef}
              className={cn(
                'opacity-50 hover:opacity-100',
                'flex cursor-pointer flex-row items-center justify-center gap-1 px-8 py-4 text-sm',
                activeTab == 'incoming' && 'opacity-100'
              )}
              onClick={() => setActive('incoming')}
            >
              Входящие
              {notificationsNum && (
                <div className="bg-error flex h-5 w-5 items-center justify-center rounded-full text-xs">
                  {notificationsNum}
                </div>
              )}
            </div>
            <div
              ref={archieveTabRef}
              className={cn(
                'opacity-50 hover:opacity-100',
                'flex cursor-pointer flex-row items-center justify-center gap-1 px-8 py-4 text-sm',
                activeTab == 'archieve' && 'opacity-100'
              )}
              onClick={() => setActive('archieve')}
            >
              Архив
            </div>
            <div className="ml-auto" />
            <div
              ref={settingsTabRef}
              className={cn(
                'group opacity-50 hover:opacity-100',
                activeTab == 'settings' && 'active',
                'flex cursor-pointer flex-row items-center justify-center gap-1 px-8 py-4 text-sm',
                activeTab == 'settings' && 'opacity-100'
              )}
              onClick={() => setActive('settings')}
            >
              <SettingIcon />
            </div>

            {/* Animated underline */}
            <motion.div
              className="bg-primary absolute bottom-0 h-[1px]"
              initial={false}
              animate={{
                width: underlineStyle.width,
                left: underlineStyle.left,
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Embla Carousel for notification cards */}
          <div
            className="relative overflow-hidden"
            ref={emblaRef}
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
          >
            <div className="flex">
              {carouselSlides.map((slide) => (
                <div key={slide.id} className="relative flex-[0_0_100%]">
                  <div className="group relative h-55 w-full overflow-hidden">
                    <Image
                      src={slide.image}
                      alt="Notification"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    <div className="relative z-20 flex h-full flex-col justify-between p-8 pb-4">
                      <div className="flex flex-col">
                        <div>
                          <span className="border-secondary/50 text-secondary h-6 rounded-full border px-3 py-1 text-xs backdrop-blur-sm">
                            {slide.category}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-col space-y-3 pb-8">
                          <h3 className="text-foreground text-base font-medium">
                            {slide.title}
                          </h3>
                          <p className="text-secondary text-sm">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination dots */}
            <div className="absolute right-0 bottom-4 left-0 flex justify-center space-x-1.5">
              {Array.from({ length: carouselSlides.length }).map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    'h-0.5 w-4 transition-all duration-200 ease-in-out',
                    index === selectedIndex
                      ? 'bg-primary'
                      : 'bg-[#282d33] hover:bg-[#3a3f47]'
                  )}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="group relative flex flex-col hover:bg-[#282D33]/30">
            <button className="absolute top-0 right-0 m-2 hidden h-4 w-4 cursor-pointer group-hover:block">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.73203 12.2007C4.4743 12.4584 4.05643 12.4584 3.7987 12.2007C3.54097 11.9429 3.54096 11.5251 3.7987 11.2673L7.06536 8.00065L3.7987 4.73399C3.54097 4.47625 3.54097 4.05838 3.7987 3.80065C4.05643 3.54292 4.4743 3.54292 4.73203 3.80065L7.9987 7.06732L11.2654 3.80065C11.5231 3.54292 11.941 3.54292 12.1987 3.80065C12.4564 4.05838 12.4564 4.47625 12.1987 4.73398L8.93203 8.00065L12.1987 11.2673C12.4564 11.5251 12.4564 11.9429 12.1987 12.2007C11.941 12.4584 11.5231 12.4584 11.2654 12.2007L7.9987 8.93398L4.73203 12.2007Z"
                  fill="#9AA6B5"
                  fill-opacity="0.5"
                />
              </svg>
            </button>
            <div className="px-8 py-5 first:pt-8">
              <div className="relative flex space-x-4">
                <div className="flex h-9 w-9 flex-shrink-0">
                  <Image src={bfImage} alt="" className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex w-full justify-between">
                    <span className="text-foreground text-xs">
                      BlockFirst приветствует Вас 🎉
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-secondary/50">24 мин. назад</span>
                    <div className="bg-secondary/20 h-full w-[1px]"></div>
                    <span className="text-secondary/50">Система</span>
                  </div>
                </div>
                <div className="bg-error ml-auto h-1.5 w-1.5 rounded-full"></div>
              </div>
              <div className="mt-4">
                <div className="relative ml-14.5">
                  <div className="relative rounded-sm bg-[#14171C] p-2 px-3">
                    <div className="bg-primary absolute top-0 bottom-0 left-0 w-[1px]"></div>
                    <p className="text-secondary text-xs">
                      Впервые зарегистрированным пользователям дарим
                      <span className="text-foreground"> скидку 16%</span> на
                      покупку
                      <span className="text-foreground"> «Про» тарифа</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative flex flex-col hover:bg-[#282D33]/30">
            <button className="absolute top-0 right-0 m-2 hidden h-4 w-4 cursor-pointer group-hover:block">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.73203 12.2007C4.4743 12.4584 4.05643 12.4584 3.7987 12.2007C3.54097 11.9429 3.54096 11.5251 3.7987 11.2673L7.06536 8.00065L3.7987 4.73399C3.54097 4.47625 3.54097 4.05838 3.7987 3.80065C4.05643 3.54292 4.4743 3.54292 4.73203 3.80065L7.9987 7.06732L11.2654 3.80065C11.5231 3.54292 11.941 3.54292 12.1987 3.80065C12.4564 4.05838 12.4564 4.47625 12.1987 4.73398L8.93203 8.00065L12.1987 11.2673C12.4564 11.5251 12.4564 11.9429 12.1987 12.2007C11.941 12.4584 11.5231 12.4584 11.2654 12.2007L7.9987 8.93398L4.73203 12.2007Z"
                  fill="#9AA6B5"
                  fill-opacity="0.5"
                />
              </svg>
            </button>
            <div className="px-8 py-5 first:pt-8">
              <div className="relative flex space-x-4">
                <div className="h-9 w-9 flex-shrink-0">
                  <Image src={user1Image} alt="" className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex w-full justify-between">
                    <span className="text-secondary text-xs">
                      <span className="text-foreground">Андрей</span> ответил
                      вам в
                      <span className="text-foreground">
                        {' '}
                        Путешествие по Solidity...
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-secondary/50">1 ч. назад</span>
                    <div className="bg-secondary/20 h-full w-[1px]"></div>
                    <span className="text-secondary/50">Комментарий</span>
                  </div>
                </div>
                <div className="bg-error ml-auto h-1.5 w-1.5 rounded-full"></div>
              </div>
              <div className="mt-4">
                <div className="relative ml-14.5">
                  <div className="relative rounded-sm bg-[#14171C] p-2 px-3">
                    <div className="absolute top-0 bottom-0 left-0 w-[1px]"></div>
                    <p className="text-secondary text-xs">
                      Очень хороший пример разработки интуитивно понятного
                      интерфэйса, молодцы что тут ещ с...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative flex flex-col hover:bg-[#282D33]/30">
            <button className="absolute top-0 right-0 m-2 hidden h-4 w-4 cursor-pointer group-hover:block">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.73203 12.2007C4.4743 12.4584 4.05643 12.4584 3.7987 12.2007C3.54097 11.9429 3.54096 11.5251 3.7987 11.2673L7.06536 8.00065L3.7987 4.73399C3.54097 4.47625 3.54097 4.05838 3.7987 3.80065C4.05643 3.54292 4.4743 3.54292 4.73203 3.80065L7.9987 7.06732L11.2654 3.80065C11.5231 3.54292 11.941 3.54292 12.1987 3.80065C12.4564 4.05838 12.4564 4.47625 12.1987 4.73398L8.93203 8.00065L12.1987 11.2673C12.4564 11.5251 12.4564 11.9429 12.1987 12.2007C11.941 12.4584 11.5231 12.4584 11.2654 12.2007L7.9987 8.93398L4.73203 12.2007Z"
                  fill="#9AA6B5"
                  fill-opacity="0.5"
                />
              </svg>
            </button>
            <div className="px-8 py-5 first:pt-8">
              <div className="relative flex space-x-4">
                <div className="h-9 w-9 flex-shrink-0">
                  <Image src={user2Image} alt="" className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex w-full justify-between">
                    <span className="text-secondary line-clamp-1 text-xs">
                      <span className="text-foreground">Нагибатор 228</span>{' '}
                      лайкнул ваш пост в
                      <span className="text-foreground">
                        {' '}
                        Путешествие по Solidity...
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-secondary/50">1 ч. назад</span>
                    <div className="bg-secondary/20 h-full w-[1px]"></div>
                    <span className="text-secondary/50">Лайк</span>
                  </div>
                </div>
                <div className="bg-error ml-auto h-1.5 w-1.5 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="group relative flex flex-col hover:bg-[#282D33]/30">
            <button className="absolute top-0 right-0 m-2 hidden h-4 w-4 cursor-pointer group-hover:block">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.73203 12.2007C4.4743 12.4584 4.05643 12.4584 3.7987 12.2007C3.54097 11.9429 3.54096 11.5251 3.7987 11.2673L7.06536 8.00065L3.7987 4.73399C3.54097 4.47625 3.54097 4.05838 3.7987 3.80065C4.05643 3.54292 4.4743 3.54292 4.73203 3.80065L7.9987 7.06732L11.2654 3.80065C11.5231 3.54292 11.941 3.54292 12.1987 3.80065C12.4564 4.05838 12.4564 4.47625 12.1987 4.73398L8.93203 8.00065L12.1987 11.2673C12.4564 11.5251 12.4564 11.9429 12.1987 12.2007C11.941 12.4584 11.5231 12.4584 11.2654 12.2007L7.9987 8.93398L4.73203 12.2007Z"
                  fill="#9AA6B5"
                  fill-opacity="0.5"
                />
              </svg>
            </button>
            <div className="px-8 py-5 first:pt-8">
              <div className="relative flex space-x-4">
                <div className="flex h-9 w-9 flex-shrink-0">
                  <Image src={bfImage} alt="" className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex w-full justify-between">
                    <span className="text-foreground text-xs">
                      BlockFirst поздравляет Вас! 🔥
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-secondary/50">24 мин. назад</span>
                    <div className="bg-secondary/20 h-full w-[1px]"></div>
                    <span className="text-secondary/50">Система</span>
                  </div>
                </div>
                <div className="bg-error ml-auto h-1.5 w-1.5 rounded-full"></div>
              </div>
              <div className="mt-4">
                <div className="relative ml-14.5">
                  <div className="relative rounded-sm bg-[#14171C] p-2 px-3">
                    <div className="bg-primary absolute top-0 bottom-0 left-0 w-[1px]"></div>
                    <p className="text-secondary text-xs">
                      Поздравляем с окончанием курса! Вы большой молодец!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative flex flex-col hover:bg-[#282D33]/30">
            <button className="absolute top-0 right-0 m-2 hidden h-4 w-4 cursor-pointer group-hover:block">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.73203 12.2007C4.4743 12.4584 4.05643 12.4584 3.7987 12.2007C3.54097 11.9429 3.54096 11.5251 3.7987 11.2673L7.06536 8.00065L3.7987 4.73399C3.54097 4.47625 3.54097 4.05838 3.7987 3.80065C4.05643 3.54292 4.4743 3.54292 4.73203 3.80065L7.9987 7.06732L11.2654 3.80065C11.5231 3.54292 11.941 3.54292 12.1987 3.80065C12.4564 4.05838 12.4564 4.47625 12.1987 4.73398L8.93203 8.00065L12.1987 11.2673C12.4564 11.5251 12.4564 11.9429 12.1987 12.2007C11.941 12.4584 11.5231 12.4584 11.2654 12.2007L7.9987 8.93398L4.73203 12.2007Z"
                  fill="#9AA6B5"
                  fill-opacity="0.5"
                />
              </svg>
            </button>
            <div className="px-8 py-5 first:pt-8">
              <div className="relative flex space-x-4">
                <div className="flex h-9 w-9 flex-shrink-0">
                  <Image src={bfImage} alt="" className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex w-full justify-between">
                    <span className="text-foreground text-xs">
                      Новые вакансии 🔥
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-secondary/50">24 мин. назад</span>
                    <div className="bg-secondary/20 h-full w-[1px]"></div>
                    <span className="text-secondary/50">Система</span>
                  </div>
                </div>
                <div className="bg-error ml-auto h-1.5 w-1.5 rounded-full"></div>
              </div>
              <div className="mt-4">
                <div className="relative ml-14.5">
                  <div className="relative rounded-sm bg-[#14171C] p-2 px-3">
                    <div className="bg-primary absolute top-0 bottom-0 left-0 w-[1px]"></div>
                    <p className="text-secondary text-xs">
                      Мы обновили для вас список актуальных вакансий! Скорее
                      заходи в раздел!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Notifications;
