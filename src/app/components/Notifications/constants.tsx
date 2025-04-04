import { Notification, PromoNotification } from './types';
import bgImage from './assets/bg.png';
import bgImage1 from './assets/bg1.png';
import bgImage2 from './assets/bg2.png';
import bfImage from './assets/bf-avatar.svg';
import user1Image from './assets/user1-avatar.png';
import user2Image from './assets/user2-avatar.png';


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
    id: 'jobs-1',
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
    avatar: bfImage,
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
    avatar: bfImage,
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
    avatar: bgImage,
  })
);
