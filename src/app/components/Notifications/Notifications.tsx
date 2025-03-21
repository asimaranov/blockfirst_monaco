'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import notificationImage from './assets/top_icon.png';
import SettingIcon from './assets/settings';
import bgImage from './assets/bg.png';
import bgImage1 from './assets/bg1.png';
import bgImage2 from './assets/bg2.png';

import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '~/helpers';
import useEmblaCarousel from 'embla-carousel-react';

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
    category: 'Education',
    title: 'Новые курсы доступны',
    description:
      'Изучите новые технологии блокчейн разработки с нашими обновленными материалами',
    image: bgImage1,
  },
  {
    id: 3,
    category: 'Education',
    title: 'Групповые занятия',
    description:
      'Присоединяйтесь к нашим групповым занятиям для более эффективного обучения',
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

  // Embla carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 5000 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setSlideCount(emblaApi.slideNodes().length);
    onSelect();
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
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
      className="flex h-screen w-full max-w-105 flex-col overflow-hidden border border-[#282d33]/40 bg-[#01050d]"
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
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {carouselSlides.map((slide) => (
                <div key={slide.id} className="relative min-w-full">
                  <Image
                    src={slide.image}
                    alt="Notification"
                    fill
                    className="object-cover"
                  />
                  <div className="relative z-20 flex h-55 flex-col justify-between p-8 pb-4">
                    <div className="flex flex-col">
                      <div>
                        <span className="border-secondary/50 text-secondary h-6 rounded-full border px-3 py-1 text-xs">
                          {slide.category}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col space-y-3 pb-8">
                        <h3 className="text-foreground text-base">
                          {slide.title}
                        </h3>
                        <p className="text-secondary text-sm">
                          {slide.description}
                        </p>
                      </div>
                      <div className="flex justify-center space-x-1">
                        {Array.from({ length: slideCount }).map((_, index) => (
                          <div
                            key={index}
                            className={cn(
                              'h-0.5 w-4',
                              index === selectedIndex
                                ? 'bg-primary'
                                : 'bg-[#282d33]'
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System notification */}
          <div className="flex flex-col">
            <div className="px-8 py-8">
              <div className="flex space-x-4">
                <div className="bg-primary flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[7px]">
                  <svg
                    width="20"
                    height="23"
                    viewBox="0 0 20 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.553 13.324C15.553 13.324 12.009 6.75 8.438 6.75"
                      stroke="#195af4"
                      fill="#f2f2f2"
                      strokeWidth="0.45"
                    />
                    <path
                      d="M8.438 6.75C8.438 6.75 12.009 13.324 15.553 13.324"
                      stroke="#195af4"
                      fill="#f2f2f2"
                      strokeWidth="0.45"
                    />
                  </svg>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex w-full justify-between">
                    <span className="text-foreground text-sm">
                      BlockFirst приветствует Вас 🎉
                    </span>
                    <div className="bg-error h-1.5 w-1.5 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-secondary/50">24 мин. назад</span>
                    <div className="bg-secondary/20 h-[14px] w-[1px]"></div>
                    <span className="text-secondary/50">Система</span>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="relative ml-[58px]">
                  <div className="bg-dark-bg relative rounded-sm p-2 pl-3.5">
                    <div className="bg-primary absolute top-0 bottom-0 left-0 w-[1px]"></div>
                    <p className="py-2 pr-0 pl-0 text-sm">
                      Впервые зарегистрированным пользователям дарим скидку 16%
                      на покупку «Про» тарифа
                    </p>
                  </div>
                  <div className="absolute top-0 left-[18px] h-8 w-7 border border-[#282d33] bg-transparent"></div>
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
