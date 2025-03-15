export interface TariffFeature {
  text: string;
  bg?: boolean;
}

export interface Tariff {
  name: string;
  description: string;
  bigIcon: string;
  features: TariffFeature[];
  price?: {
    monthly: number;
    total: number;
    installments?: number;
  };
  sale?: {
    percent: number;
  };
  isActive?: boolean;
}

export const TARIFFS: Tariff[] = [
  {
    name: 'Free',
    description:
      'Стартовый тариф, который включает в себя ознакомление с курсами и платформой в целом.',
    bigIcon: '/pricing/big_icon/free.png',
    features: [
      { text: 'Ознакомление с курсами', bg: true },
      { text: '5 лекций / уроков' },
      { text: 'Реферальная программа', bg: true },
    ],
    isActive: true,
  },
  {
    name: 'Starter',
    description:
      'Подходит для самостоятельного обучения. В тарифе не предусмотрен ментор, консультации и резюме.',
    bigIcon: '/pricing/big_icon/starter.png',
    features: [
      { text: 'Доступ ко всем основным материалам курса', bg: true },
      { text: 'Доступ к телеграм чату учеников курса' },
      { text: 'Автоматическая проверка решений', bg: true },
      { text: 'Образовательные материалы по теме курса' },
      { text: 'NFT Диплом', bg: true },
    ],
    price: {
      monthly: 14000,
      total: 140000,
      installments: 10,
    },
  },
  {
    name: 'Pro',
    description:
      'Получи максимум от прохождения курсов. Менторы, консультации, комьюнити и многое другое.',
    bigIcon: '/pricing/big_icon/pro.png',
    features: [
      { text: 'Все что включает Starter тариф', bg: true },
      { text: 'Персональный ai ментор' },
      { text: 'Обсуждение задач с куратором', bg: true },
      { text: 'Премиумные материалы и задачи' },
      { text: 'Консультация для трудоустройства', bg: true },
      { text: 'Помощь в подготовке резюме' },
    ],
    price: {
      monthly: 18000,
      total: 180000,
      installments: 10,
    },
    sale: {
      percent: 16,
    },
  },
];
