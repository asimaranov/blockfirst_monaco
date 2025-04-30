import { Notification, PromoNotification } from './types';

export const initialNotifications: Notification[] = [
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
    avatar: '/images/avatars/bf-avatar.svg',
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
    avatar: '/images/avatars/user1-avatar.png',
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
    avatar: '/images/avatars/user2-avatar.png',
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
    avatar: '/images/avatars/bf-avatar.svg',
    highlightedBorder: true,
  },
  {
    id: 'jobs-1',
    type: 'system',
    title: 'Новые вакансии 🔥',
    message:
      'Мы обновили для вас список актуальных вакансий! Скорее заходи в раздел!',
    timestamp: '24 мин. назад',
    category: 'Система',
    isRead: false,
    isArchived: false,
    avatar: '/images/avatars/bf-avatar.svg',
    highlightedBorder: true,
  },
  {
    id: 'jobs-2',
    type: 'system',
    title: 'Новые вакансии 🔥',
    message:
      'Мы обновили для вас список актуальных вакансий! Скорее заходи в раздел!',
    timestamp: '24 мин. назад',
    category: 'Система',
    isRead: false,
    isArchived: false,
    avatar: '/images/avatars/bf-avatar.svg',
    highlightedBorder: true,
  },
  {
    id: 'jobs-3',
    type: 'system',
    title: 'Новые вакансии 🔥',
    message:
      'Мы обновили для вас список актуальных вакансий! Скорее заходи в раздел!',
    timestamp: '24 мин. назад',
    category: 'Система',
    isRead: false,
    isArchived: false,
    avatar: '/images/avatars/bf-avatar.svg',
    highlightedBorder: true,
  },
];


export const defaultNotifications: Notification[] = [
  {
    id: 'welcome',
    type: 'system',
    title: 'Добро пожаловать на платформу BlockFirst 🎉',
    message:
      'Впервые зарегистрированным пользователям дарим скидку 16% на покупку «Про» тарифа',
    timestamp: '24 мин. назад',
    category: 'Система',
    isRead: true,
    isArchived: false,
    avatar: '/images/avatars/bf-avatar.svg',
    highlightedBorder: true,
  },
];

// Carousel slides (promotion notifications)
export const carouselSlides = [
  {
    id: 1,
    category: 'Education',
    title: 'Предложение для студентов',
    description:
      'Уникальный условия по оплате курса для студентов. Заполните форму в тарифах',
    image: '/images/slider/slide-1.png',
  },
  {
    id: 2,
    category: 'Products',
    title: 'Новые курсы',
    description:
      'Мы активно занимаемся расширением библиотеки курсов. Пожалуйста, следите за обновлениями!',
    image: '/images/slider/slide-2.png',
  },
  {
    id: 3,
    category: 'Social',
    title: 'Будь в курсе событий!',
    description:
      'Подписывайся на наши социальные сети, мы активно публикуем новости WEB3 мира!',
    image: '/images/slider/slide-3.png',
  },
];

export const promoNotifications: PromoNotification[] = carouselSlides.map(
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
    avatar: '/images/avatars/bf-avatar.svg',
  })
);
