export interface TariffFeature {
  text: string;
  textSecondary?: string;
  bg?: boolean;
}

export interface Tariff {
  id: string;
  name: string;
  description: string;
  bigIcon: string;
  features: TariffFeature[];
  shortFeatures: TariffFeature[];
  price?: {
    monthly: number;
    total: number;
    installments?: number;
  };
  sale?: {
    percent: number;
  };
  isActive?: boolean;
  unlocked?: boolean;
}

export const TARIFFS: Tariff[] = [
  {
    id: 'free',
    name: 'Free',
    description:
      'Стартовый тариф, который включает в себя ознакомление с курсами и платформой в целом.',
    bigIcon: '/pricing/big_icon/free.png',
    features: [
      { text: 'Ознакомление с курсами', bg: true },
      { text: 'Персональный ai ментор', textSecondary: '10k ток/день' },
      { text: '5 лекций / уроков', bg: true },
      { text: 'Реферальная программа' },
    ],
    shortFeatures: [
      { text: 'Ознакомление с курсами', bg: true },
      { text: '5 лекций / уроков' },
      { text: 'Реферальная программа', bg: true },
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    description:
      'Подходит для самостоятельного обучения. В тарифе не предусмотрен ментор, консультации и резюме.',
    bigIcon: '/pricing/big_icon/starter.png',
    features: [
      { text: 'Доступ ко всем основным материалам курса', bg: true },
      { text: 'Персональный ai ментор', textSecondary: '50к ток/день' },
      { text: 'Доступ к телеграм чату учеников курса', bg: true },
      { text: 'Автоматическая проверка решений' },
      { text: 'Образовательные материалы по теме курса', bg: true },
      { text: 'NFT Диплом' },
    ],
    shortFeatures: [
      { text: 'Все материалы курса', bg: true },
      { text: 'Авто проверка ваших задач' },
    ],
    price: {
      monthly: 14000,
      total: 140000,
      installments: 10,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    description:
      'Получи максимум от прохождения курсов. Менторы, консультации, комьюнити и многое другое.',
    bigIcon: '/pricing/big_icon/pro.png',
    features: [
      { text: 'Все что включает Starter тариф', bg: true },
      { text: 'Персональный ai ментор', textSecondary: '100k ток/день' },
      { text: 'Обсуждение задач с куратором', bg: true },
      { text: 'Премиумные материалы и задачи' },
      { text: 'Консультация для трудоустройства', bg: true },
      { text: 'Помощь в подготовке резюме' },
    ],
    shortFeatures: [
      { text: 'Включая все с Starter', bg: true },
      { text: 'Премиумные материалы и задачи' },
      { text: 'Персональный ai ментор', bg: true },
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

export const UpgradeTariff: Tariff = {
  ...TARIFFS[2]!,
  id: 'pro-upgrade',
  name: 'Pro',
  price: {
    monthly: TARIFFS[2]!.price!.monthly - TARIFFS[1]!.price!.monthly,
    total: TARIFFS[2]!.price!.total - TARIFFS[1]!.price!.total,
    installments: 10,
  },
  isActive: true,
};

export const ALL_TARIFFS = [...TARIFFS, UpgradeTariff];
