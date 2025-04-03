'use client';

import { motion, useMotionValue, PanInfo, useTransform } from 'motion/react';
import Image from 'next/image';
import notificationImage from './assets/top_icon.png';
import SettingIcon from './assets/settings';
import bgImage from './assets/bg.png';
import bgImage1 from './assets/bg1.png';
import bgImage2 from './assets/bg2.png';
import bfImage from './assets/bf-avatar.svg';
import noNotificationsImage from './assets/no-notifications.png';

import user1Image from './assets/user1-avatar.png';
import user2Image from './assets/user2-avatar.png';
import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '~/helpers';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

// Notification type definitions
interface BaseNotification {
  id: string;
  timestamp: string;
  category: string;
  isRead: boolean;
  isArchived: boolean;
  avatar: any;
}

interface SystemNotification extends BaseNotification {
  type: 'system';
  title: string;
  message: string;
  highlightedBorder?: boolean;
}

interface CommentNotification extends BaseNotification {
  type: 'comment';
  username: string;
  course: string;
  message: string;
}

interface LikeNotification extends BaseNotification {
  type: 'like';
  username: string;
  course: string;
}

interface PromoNotification extends BaseNotification {
  type: 'promo';
  title: string;
  category: string;
  description: string;
  image: any;
}

type Notification =
  | SystemNotification
  | CommentNotification
  | LikeNotification
  | PromoNotification;

interface NotificationsProps {
  onClose?: () => void;
  notificationsNum: number;
}

// Carousel slides (promotion notifications)
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

// Settings type definition
interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultEnabled: boolean;
}

const Notifications = ({ onClose }: NotificationsProps) => {
  const [activeTab, setActive] = useState<'incoming' | 'archieve' | 'settings'>(
    'incoming'
  );
  const [incomingNotifications, setIncomingNotifications] = useState<
    Notification[]
  >([]);
  const [archivedNotifications, setArchivedNotifications] = useState<
    Notification[]
  >([]);
  const [inArchived, setInArchived] = useState(false);
  // Settings state
  const [settings, setSettings] = useState<Record<string, boolean>>({});

  const incomingTabRef = useRef<HTMLDivElement>(null);
  const archieveTabRef = useRef<HTMLDivElement>(null);
  const settingsTabRef = useRef<HTMLDivElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    left: 0,
  });

  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

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

  // Initialize notifications data
  useEffect(() => {
    // Convert carousel slides to promo notifications
    const promoNotifications: PromoNotification[] = carouselSlides.map(
      (slide) => ({
        id: `promo-${slide.id}`,
        type: 'promo',
        title: slide.title,
        description: slide.description,
        category: slide.category,
        image: slide.image,
        timestamp: 'Сегодня',
        isRead: false,
        isArchived: false,
        avatar: bgImage,
      })
    );

    // Initial notifications data
    const initialNotifications: Notification[] = [
      {
        id: 'welcome',
        type: 'system',
        title: 'BlockFirst приветствует Вас 🎉',
        message:
          'Впервые зарегистрированным пользователям дарим скидку 16% на покупку «Про» тарифа',
        timestamp: '24 мин. назад',
        category: 'Система',
        isRead: true,
        isArchived: false,
        avatar: bfImage,
        highlightedBorder: true,
      },
      {
        id: 'comment-1',
        type: 'comment',
        username: 'Андрей',
        course: 'Путешествие по Solidity...',
        message:
          'Очень хороший пример разработки интуитивно понятного интерфэйса, молодцы что тут ещ с...',
        timestamp: '1 ч. назад',
        category: 'Комментарий',
        isRead: true,
        isArchived: false,
        avatar: user1Image,
      },
      {
        id: 'like-1',
        type: 'like',
        username: 'Нагибатор 228',
        course: 'Путешествие по Solidity...',
        timestamp: '1 ч. назад',
        category: 'Лайк',
        isRead: false,
        isArchived: false,
        avatar: user2Image,
      },
      {
        id: 'congrats',
        type: 'system',
        title: 'BlockFirst поздравляет Вас! 🔥',
        message: 'Поздравляем с окончанием курса! Вы большой молодец!',
        timestamp: '24 мин. назад',
        category: 'Система',
        isRead: false,
        isArchived: false,
        avatar: bfImage,
        highlightedBorder: true,
      },
      {
        id: 'jobs',
        type: 'system',
        title: 'Новые вакансии 🔥',
        message:
          'Мы обновили для вас список актуальных вакансий! Скорее заходи в раздел!',
        timestamp: '24 мин. назад',
        category: 'Система',
        isRead: false,
        isArchived: false,
        avatar: bfImage,
        highlightedBorder: true,
      },
    ];

    setIncomingNotifications([...promoNotifications, ...initialNotifications]);
  }, []);

  // Dismiss notification (move to archive)
  const dismissNotification = (id: string) => {
    const notification = incomingNotifications.find((n) => n.id === id);
    if (notification) {
      // Remove from incoming
      setIncomingNotifications((prev) => prev.filter((n) => n.id !== id));
      // Add to archived
      setArchivedNotifications((prev) => [
        ...prev,
        { ...notification, isArchived: true, isRead: true },
      ]);
    }
  };

  // Archive all notifications
  const archiveAll = () => {
    setArchivedNotifications((prev) => [
      ...prev,
      ...incomingNotifications
        .filter((n) => n.type !== 'promo')
        .map((n) => ({
          ...n,
          isArchived: true,
          isRead: true,
        })),
    ]);
    setIncomingNotifications(
      incomingNotifications.filter((n) => n.type === 'promo')
    );
    setInArchived(true);
  };

  // Settings data
  const notificationSettings: NotificationSetting[] = [
    {
      id: 'news',
      title: 'Новости и обновления',
      description: 'Новости BlockFirst, скидки, релизы',
      defaultEnabled: true,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M14.4388 6.96033L13.7855 9.747C13.2255 12.1537 12.1188 13.127 10.0388 12.927C9.70548 12.9003 9.34548 12.8403 8.95882 12.747L7.83882 12.4803C5.05882 11.8203 4.19882 10.447 4.85215 7.66033L5.50548 4.867C5.63882 4.30033 5.79882 3.807 5.99882 3.40033C6.77882 1.787 8.10548 1.35366 10.3322 1.88033L11.4455 2.14033C14.2388 2.79366 15.0922 4.17366 14.4388 6.96033Z"
            stroke="#F2F2F2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.0402 12.9271C9.62689 13.2071 9.10689 13.4404 8.47356 13.6471L7.42023 13.9937C4.77356 14.8471 3.38023 14.1337 2.52023 11.4871L1.66689 8.85372C0.813561 6.20706 1.52023 4.80706 4.16689 3.95372L5.22023 3.60706C5.49356 3.52039 5.75356 3.44706 6.00023 3.40039C5.80023 3.80706 5.64023 4.30039 5.50689 4.86706L4.85356 7.66039C4.20023 10.4471 5.06023 11.8204 7.84023 12.4804L8.96023 12.7471C9.34689 12.8404 9.70689 12.9004 10.0402 12.9271Z"
            stroke="#F2F2F2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.42578 5.68555L11.6591 6.50555"
            stroke="#F2F2F2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.77344 8.26758L9.70677 8.76091"
            stroke="#F2F2F2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'comments',
      title: 'Комментарии и лайки',
      description: 'Ответы на ваши сообщения и реакции',
      defaultEnabled: true,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M14.6654 5.33398V8.66732C14.6654 11.334 13.332 12.6673 10.6654 12.6673H10.332C10.1254 12.6673 9.92536 12.7673 9.7987 12.934L8.7987 14.2673C8.3587 14.854 7.6387 14.854 7.1987 14.2673L6.1987 12.934C6.09203 12.7873 5.84536 12.6673 5.66536 12.6673H5.33203C2.66536 12.6673 1.33203 12.0007 1.33203 8.66732V5.33398C1.33203 2.66732 2.66536 1.33398 5.33203 1.33398H7.9987"
            stroke="#F2F2F2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.1345 3.07973C9.91446 2.41973 10.1745 1.60639 10.8945 1.37973C11.2678 1.26639 11.7345 1.35973 12.0011 1.71306C12.2545 1.34639 12.7345 1.26639 13.1078 1.37973C13.8278 1.59973 14.0878 2.41973 13.8678 3.07973C13.5278 4.12639 12.3345 4.66639 12.0011 4.66639C11.6678 4.66639 10.4878 4.13306 10.1345 3.07973Z"
            stroke="#F2F2F2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.6617 7.33333H10.6677"
            stroke="#F2F2F2"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.99764 7.33333H8.00363"
            stroke="#F2F2F2"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.32967 7.33333H5.33566"
            stroke="#F2F2F2"
            strokeWidth="1.33333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'jobs',
      title: 'Вакансии',
      description: 'Уведомлять о новых вакансиях',
      defaultEnabled: false,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M5.33387 14.6667H10.6672C13.3472 14.6667 13.8272 13.5933 13.9672 12.2867L14.4672 6.95333C14.6472 5.32667 14.1805 4 11.3339 4H4.6672C1.82054 4 1.35387 5.32667 1.53387 6.95333L2.03387 12.2867C2.17387 13.5933 2.65387 14.6667 5.33387 14.6667Z"
            stroke="#F2F2F2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.33203 4.00065V3.46732C5.33203 2.28732 5.33203 1.33398 7.46536 1.33398H8.53203C10.6654 1.33398 10.6654 2.28732 10.6654 3.46732V4.00065"
            stroke="#F2F2F2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.33464 8.66667V9.33333C9.33464 9.34 9.33464 9.34 9.33464 9.34667C9.33464 10.0733 9.32797 10.6667 8.0013 10.6667C6.6813 10.6667 6.66797 10.08 6.66797 9.35333V8.66667C6.66797 8 6.66797 8 7.33464 8H8.66797C9.33464 8 9.33464 8 9.33464 8.66667Z"
            stroke="#F2F2F2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.432 7.33398C12.892 8.45398 11.132 9.12065 9.33203 9.34732"
            stroke="#F2F2F2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.74609 7.51367C3.24609 8.54034 4.93943 9.16034 6.66609 9.35367"
            stroke="#F2F2F2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  // Initialize settings state
  useEffect(() => {
    const initialSettings: Record<string, boolean> = {};
    notificationSettings.forEach((setting) => {
      initialSettings[setting.id] = setting.defaultEnabled;
    });
    setSettings(initialSettings);
  }, []);

  // Toggle setting
  const toggleSetting = (settingId: string) => {
    setSettings((prev) => ({
      ...prev,
      [settingId]: !prev[settingId],
    }));
  };

  // Add swipe functionality for mobile
  const handleSwipeComplete = (id: string, info: PanInfo) => {
    if (info.offset.x < -100) {
      dismissNotification(id);
    }
  };

  const SwipeableNotification = ({
    notification,
    children,
    isArchived = false,
  }: {
    notification: Notification;
    children: React.ReactNode;
    isArchived?: boolean;
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
        dismissNotification(notification.id);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="scrollbar max-w-auto flex h-screen min-w-auto flex-col overflow-y-auto border border-[#282D33]/40 bg-[#0F1217] sm:max-w-105 sm:min-w-105"
    >
      <div className="flex h-full flex-col">
        {/* Header with title and archive button - this stays fixed */}
        <div className="flex-shrink-0 px-5 py-5 sm:px-8 sm:py-8">
          <div className="flex justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative h-9 w-9 rounded-full">
                <Image
                  src={notificationImage}
                  alt=""
                  className="object-cover"
                />
              </div>
              <span className="text-foreground text-xl">Уведомления</span>
            </div>
            <div className="flex items-center">
              <button
                className="border-primary/50 hover:border-primary flex cursor-pointer items-center gap-1 rounded-full border py-1.5 pr-3 pl-2 leading-4"
                onClick={archiveAll}
              >
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
                <span
                  className={cn(
                    'text-foreground text-xs',
                    inArchived && 'text-primary'
                  )}
                >
                  {inArchived ? 'В архиве' : 'Все в архив'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs - these will be sticky */}
        <div className="sticky top-0 z-10 flex-shrink-0 bg-[#0F1217]">
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
              {incomingNotifications.filter((n) => n.type !== 'promo').length >
                0 && (
                <div className="bg-error flex h-5 w-5 items-center justify-center rounded-full text-xs">
                  {
                    incomingNotifications.filter(
                      (notification) => notification.type !== 'promo'
                    ).length
                  }
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
        <div className="flex-1">
          {activeTab === 'incoming' && (
            <>
              {/* Embla Carousel for promo notifications */}
              {incomingNotifications.some((n) => n.type === 'promo') && (
                <div
                  className="relative overflow-hidden"
                  ref={emblaRef}
                  onMouseEnter={pauseAutoplay}
                  onMouseLeave={resumeAutoplay}
                >
                  <div className="flex">
                    {incomingNotifications
                      .filter(
                        (notification): notification is PromoNotification =>
                          notification.type === 'promo'
                      )
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className="relative flex-[0_0_100%]"
                        >
                          <div className="group relative h-55 w-full overflow-hidden">
                            <Image
                              src={notification.image}
                              alt="Notification"
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                            <div className="relative z-20 flex h-full flex-col justify-between p-8 pb-4">
                              <div className="flex flex-col">
                                <div>
                                  <span className="border-secondary/50 text-secondary h-6 rounded-full border px-3 py-1 text-xs backdrop-blur-sm">
                                    {notification.category}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <div className="flex flex-col space-y-3 pb-8">
                                  <h3 className="text-foreground text-base font-medium">
                                    {notification.title}
                                  </h3>
                                  <p className="text-secondary text-sm">
                                    {notification.description}
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
                    {Array.from({
                      length: incomingNotifications.filter(
                        (n) => n.type === 'promo'
                      ).length,
                    }).map((_, index) => (
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
              )}

              {/* Regular notifications */}
              {incomingNotifications.filter(
                (notification) => notification.type !== 'promo'
              ).length > 0 ? (
                incomingNotifications
                  .filter((notification) => notification.type !== 'promo')
                  .map((notification) => (
                    <SwipeableNotification
                      key={notification.id}
                      notification={notification}
                      isArchived={false}
                    >
                      <div className="group relative flex flex-col px-8 py-5 first:pt-8 hover:bg-[#282D33]/30 nth-[2]:pt-8">
                        <button
                          className="absolute top-0 right-0 m-2 hidden h-4 w-4 cursor-pointer group-hover:block"
                          onClick={(e) => {
                            e.stopPropagation();
                            dismissNotification(notification.id);
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                          >
                            <path
                              d="M4.73203 12.2007C4.4743 12.4584 4.05643 12.4584 3.7987 12.2007C3.54097 11.9429 3.54096 11.5251 3.7987 11.2673L7.06536 8.00065L3.7987 4.73399C3.54097 4.47625 3.54097 4.05838 3.7987 3.80065C4.05643 3.54292 4.4743 3.54292 4.73203 3.80065L7.9987 7.06732L11.2654 3.80065C11.5231 3.54292 11.941 3.54292 12.1987 3.80065C12.4564 4.05838 12.4564 4.47625 12.1987 4.73398L8.93203 8.00065L12.1987 11.2673C12.4564 11.5251 12.4564 11.9429 12.1987 12.2007C11.941 12.4584 11.5231 12.4584 11.2654 12.2007L7.9987 8.93398L4.73203 12.2007Z"
                              fill="#9AA6B5"
                              fillOpacity="0.5"
                            />
                          </svg>
                        </button>
                        <div className="">
                          <div className="relative flex space-x-4">
                            <div className="flex h-9 w-9 shrink-0">
                              <Image
                                src={notification.avatar}
                                alt=""
                                className="h-9 w-9 object-cover"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex w-full justify-between">
                                {notification.type === 'system' && (
                                  <span className="text-foreground text-xs">
                                    {notification.title}
                                  </span>
                                )}
                                {notification.type === 'comment' && (
                                  <span className="text-secondary text-xs">
                                    <span className="text-foreground">
                                      {notification.username}
                                    </span>{' '}
                                    ответил вам в
                                    <span className="text-foreground">
                                      {' '}
                                      {notification.course}
                                    </span>
                                  </span>
                                )}
                                {notification.type === 'like' && (
                                  <span className="text-secondary line-clamp-1 text-xs">
                                    <span className="text-foreground">
                                      {notification.username}
                                    </span>{' '}
                                    лайкнул ваш пост в
                                    <span className="text-foreground">
                                      {' '}
                                      {notification.course}
                                    </span>
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-3 text-xs">
                                <span className="text-secondary/50">
                                  {notification.timestamp}
                                </span>
                                <div className="bg-secondary/20 h-full w-[1px]"></div>
                                <span className="text-secondary/50">
                                  {notification.category}
                                </span>
                              </div>
                            </div>
                            {!notification.isRead && (
                              <div className="bg-error ml-auto h-1.5 w-1.5 shrink-0 rounded-full"></div>
                            )}
                          </div>
                          {(notification.type === 'system' ||
                            notification.type === 'comment') && (
                            <div className="mt-4">
                              <div className="relative ml-14.5">
                                <div className="relative rounded-sm bg-[#14171C] p-2 px-3">
                                  <div
                                    className={cn(
                                      'absolute top-0 bottom-0 left-0 w-[1px]',
                                      notification.type === 'system' &&
                                        notification.highlightedBorder &&
                                        'bg-primary'
                                    )}
                                  ></div>
                                  <p className="text-secondary text-xs">
                                    {notification.message}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </SwipeableNotification>
                  ))
              ) : (
                <div className="flex w-full justify-center pt-56">
                  <div className="flex flex-col items-center gap-5 text-center">
                    <div className="bg-accent flex h-15 w-15 items-center justify-center rounded-full">
                      <Image
                        src={noNotificationsImage}
                        alt="No notifications"
                      />
                    </div>
                    <span className="text-sm text-[#9AA6B5]/50">
                      Нет новых уведомлений :(
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Archived notifications */}
          {activeTab === 'archieve' && (
            <>
              {archivedNotifications.length === 0 ? (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex w-full justify-center">
                    <div className="flex flex-col items-center gap-5 text-center">
                      <div className="bg-accent flex h-15 w-15 items-center justify-center rounded-full">
                        <Image
                          src={noNotificationsImage}
                          alt="No notifications"
                        />
                      </div>
                      <span className="text-sm text-[#9AA6B5]/50">
                        Уведомлений в архиве нет :(
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                archivedNotifications.map((notification) => (
                  <SwipeableNotification
                    key={notification.id}
                    notification={notification}
                    isArchived={true}
                  >
                    <div className="group relative flex flex-col px-8 py-5 first:pt-8 hover:bg-[#282D33]/30">
                      <div className="opacity-70">
                        <div className="relative flex space-x-4">
                          <div className="flex h-9 w-9 shrink-0">
                            <Image
                              src={notification.avatar}
                              alt=""
                              className="h-9 w-9 object-cover"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex w-full justify-between">
                              {notification.type === 'system' && (
                                <span className="text-foreground text-xs">
                                  {notification.title}
                                </span>
                              )}
                              {notification.type === 'comment' && (
                                <span className="text-secondary text-xs">
                                  <span className="text-foreground">
                                    {notification.username}
                                  </span>{' '}
                                  ответил вам в
                                  <span className="text-foreground">
                                    {' '}
                                    {notification.course}
                                  </span>
                                </span>
                              )}
                              {notification.type === 'like' && (
                                <span className="text-secondary line-clamp-1 text-xs">
                                  <span className="text-foreground">
                                    {notification.username}
                                  </span>{' '}
                                  лайкнул ваш пост в
                                  <span className="text-foreground">
                                    {' '}
                                    {notification.course}
                                  </span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-3 text-xs">
                              <span className="text-secondary/50">
                                {notification.timestamp}
                              </span>
                              <div className="bg-secondary/20 h-full w-[1px]"></div>
                              <span className="text-secondary/50">
                                {notification.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        {(notification.type === 'system' ||
                          notification.type === 'comment') && (
                          <div className="mt-4">
                            <div className="relative ml-14.5">
                              <div className="relative rounded-sm bg-[#14171C] p-2 px-3">
                                <div
                                  className={cn(
                                    'absolute top-0 bottom-0 left-0 w-[1px]',
                                    notification.type === 'system' &&
                                      notification.highlightedBorder &&
                                      'bg-primary'
                                  )}
                                ></div>
                                <p className="text-secondary text-xs">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </SwipeableNotification>
                ))
              )}
            </>
          )}

          {/* Settings tab content */}
          {activeTab === 'settings' && (
            <div className="flex flex-col p-8">
              <p className="text-foreground mb-3 text-base font-medium">
                Уведомления от BlockFirst
              </p>
              <p className="text-secondary mb-8 text-sm">
                Получайте актуальные обновления, информацию о скидках на курсы и
                релизах продуктов
              </p>

              <p className="text-secondary/50 mb-1 text-xs uppercase">
                Настройки
              </p>
              <div className="flex flex-col">
                {notificationSettings.map((setting, index) => (
                  <div
                    key={setting.id}
                    className={cn(
                      'flex flex-col',
                      index < notificationSettings.length - 1 &&
                        'border-accent border-b'
                    )}
                  >
                    <div className="flex items-center justify-between py-5">
                      <div className="flex gap-3">
                        <div className="text-foreground">{setting.icon}</div>
                        <div className="flex flex-col gap-2">
                          <span className="text-foreground text-sm leading-4">
                            {setting.title}
                          </span>
                          <span className="text-secondary text-xs leading-3.5">
                            {setting.description}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={settings[setting.id] || false}
                            onChange={() => toggleSetting(setting.id)}
                          />
                          <div className="peer bg-background after:bg-foreground peer-checked:bg-primary h-5 w-9 rounded-full after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Notifications;
