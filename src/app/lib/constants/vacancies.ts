export interface IVacancy {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  publishedDate: string;
  speciality: VacancySpeciality | string;
  format: VacancyFormat | [VacancyFormat, VacancyFormat];
  salary:
    | {
        amount: number | { from?: number; to?: number };
        currency: VacancyCurrency;
      }
    | undefined;
  publisher: {
    name: string;
    contacts: {
      telegram: string;
      cite: string;
      email: string;
    };
  };
  responsibilities: string[];
  requirements: string[];
  applied?: boolean;
}

export enum VacancyCurrency {
  RUB = '₽',
  USD = '$',
}

export enum VacancyFormat {
  REMOTE = 'Удаленная',
  OFFICE = 'Офис',
  HYBRID = 'Гибрид',
}

export enum VacancySpeciality {
  SOLIDITY_DEVELOPER = 'Solidity Developer',
  WEB3_BACKEND = 'Web3 Backend',
  WEB3_FRONTEND = 'Web3 Frontend',
  WEB3_DEV_OPS = 'Web3 DevOps',
}

export const VACANCY_SPECIALITIES = [
  VacancySpeciality.SOLIDITY_DEVELOPER,
  VacancySpeciality.WEB3_BACKEND,
  VacancySpeciality.WEB3_FRONTEND,
  VacancySpeciality.WEB3_DEV_OPS,
];

export enum VacancySort {
  ALL = 'Все',
  VIEWED = 'Просмотренные',
  NEW = 'Новые',
}

export const VACANCY_SORT_OPTIONS = [
  VacancySort.ALL,
  VacancySort.VIEWED,
  VacancySort.NEW,
];

export const VACANCIES: IVacancy[] = [
  {
    id: '1',
    title: 'Smart Contract Developer',
    speciality: VacancySpeciality.SOLIDITY_DEVELOPER,
    description:
      'Привет! Мы – международная IT-компания Crypton Studio, самая крупная команда blockchain-разработчиков в Европе. На данный момент у нас открыты несколько вакансий Smart-contract разработчиков с релокацией в Латвию, Францию, США, Канаду, а также варианты работы с проживанием в Таиланде.',
    salary: {
      amount: 9999,
      currency: VacancyCurrency.RUB,
    },
    format: [VacancyFormat.REMOTE, VacancyFormat.OFFICE],
    updatedAt: '2024-02-15',
    publishedDate: '2024-02-15',
    publisher: {
      name: 'DeFi Protocol',
      contacts: {
        telegram: '@defi_hr',
        cite: 'defiprotocol.com',
        email: 'hr@defiprotocol.com',
      },
    },
    responsibilities: [
      'Разработка смарт-контрактов',
      'Аудит безопасности',
      'Оптимизация gas-cost',
    ],
    requirements: [
      'Опыт работы с Solidity',
      'Знание EVM',
      'Опыт с DeFi протоколами',
    ],
  },
  {
    id: '2',
    title: 'Middle Web3 Contract Developer',
    speciality: 'Contract Developer',
    description: 'Разработка пользовательского интерфейса для NFT маркетплейса',
    salary: undefined,
    format: [VacancyFormat.REMOTE, VacancyFormat.OFFICE],
    updatedAt: '2024-02-14',
    publishedDate: '2024-02-14',
    publisher: {
      name: 'NFT Market',
      contacts: {
        telegram: '@nft_market',
        cite: 'nftmarket.io',
        email: 'jobs@nftmarket.io',
      },
    },
    responsibilities: [
      'Разработка UI компонентов',
      'Интеграция с Web3 библиотеками',
      'Оптимизация производительности',
    ],
    requirements: [
      'React/Next.js',
      'TypeScript',
      'Опыт работы с Web3.js/Ethers.js',
    ],
    applied: true,
  },
  {
    id: '3',
    title: 'Senior Web3 Backend Developer',
    speciality: VacancySpeciality.WEB3_BACKEND,
    description: 'Разработка бэкенда для криптобиржи',
    salary: {
      amount: { from: 5000, to: 8000 },
      currency: VacancyCurrency.USD,
    },
    format: VacancyFormat.REMOTE,
    updatedAt: '2024-02-13',
    publishedDate: '2024-02-13',
    publisher: {
      name: 'CryptoExchange',
      contacts: {
        telegram: '@crypto_exchange',
        cite: 'cryptoexchange.com',
        email: 'hr@cryptoexchange.com',
      },
    },
    responsibilities: [
      'Разработка микросервисов',
      'Интеграция с блокчейн нодами',
      'Оптимизация производительности',
    ],
    requirements: [
      'Node.js',
      'Опыт работы с криптовалютами',
      'Знание blockchain технологий',
    ],
    applied: true,
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    speciality: VacancySpeciality.WEB3_DEV_OPS,
    description: 'Поддержка инфраструктуры Web3 проекта',
    salary: {
      amount: { from: 3000 },
      currency: VacancyCurrency.USD,
    },
    format: VacancyFormat.OFFICE,
    updatedAt: '2024-02-12',
    publishedDate: '2024-02-12',
    publisher: {
      name: 'Web3 Solutions',
      contacts: {
        telegram: '@web3_solutions',
        cite: 'web3solutions.com',
        email: 'careers@web3solutions.com',
      },
    },
    responsibilities: [
      'Настройка и поддержка CI/CD',
      'Мониторинг блокчейн нод',
      'Обеспечение безопасности',
    ],
    requirements: [
      'Docker/Kubernetes',
      'Опыт работы с блокчейн нодами',
      'AWS/GCP',
    ],
  },
  {
    id: '5',
    title: 'Middle Solidity Developer',
    speciality: VacancySpeciality.SOLIDITY_DEVELOPER,
    description: 'Разработка NFT смарт-контрактов',
    salary: {
      amount: { from: 2000, to: 4000 },
      currency: VacancyCurrency.USD,
    },
    format: VacancyFormat.HYBRID,
    updatedAt: '2024-02-11',
    publishedDate: '2024-02-11',
    publisher: {
      name: 'NFT Studio',
      contacts: {
        telegram: '@nft_studio',
        cite: 'nftstudio.io',
        email: 'hr@nftstudio.io',
      },
    },
    responsibilities: [
      'Разработка NFT контрактов',
      'Интеграция с маркетплейсами',
      'Тестирование смарт-контрактов',
    ],
    requirements: ['Solidity', 'Hardhat/Truffle', 'OpenZeppelin'],
  },
  {
    id: '6',
    title: 'Junior Web3 Frontend Developer',
    speciality: VacancySpeciality.WEB3_FRONTEND,
    description: 'Разработка dApp интерфейсов',
    salary: {
      amount: 2500,
      currency: VacancyCurrency.RUB,
    },
    format: VacancyFormat.REMOTE,
    updatedAt: '2024-02-10',
    publishedDate: '2024-02-10',
    publisher: {
      name: 'DApp Factory',
      contacts: {
        telegram: '@dapp_factory',
        cite: 'dappfactory.com',
        email: 'jobs@dappfactory.com',
      },
    },
    responsibilities: [
      'Разработка UI/UX',
      'Интеграция с Web3 кошельками',
      'Верстка компонентов',
    ],
    requirements: ['React', 'Web3 библиотеки', 'JavaScript/TypeScript'],
  },
  {
    id: '7',
    title: 'Middle Web3 Backend Developer',
    speciality: VacancySpeciality.WEB3_BACKEND,
    description: 'Разработка API для Web3 проекта',
    salary: {
      amount: { from: 3000 },
      currency: VacancyCurrency.USD,
    },
    format: VacancyFormat.OFFICE,
    updatedAt: '2024-02-09',
    publishedDate: '2024-02-09',
    publisher: {
      name: 'Blockchain Solutions',
      contacts: {
        telegram: '@blockchain_solutions',
        cite: 'blockchainsolutions.com',
        email: 'hr@blockchainsolutions.com',
      },
    },
    responsibilities: [
      'Разработка REST API',
      'Интеграция с смарт-контрактами',
      'Работа с базами данных',
    ],
    requirements: ['Node.js/Python', 'MongoDB/PostgreSQL', 'Web3 технологии'],
  },
  {
    id: '8',
    title: 'Senior DevOps Engineer',
    speciality: VacancySpeciality.WEB3_DEV_OPS,
    description: 'Построение инфраструктуры для DeFi проекта',
    salary: {
      amount: { to: 9000 },
      currency: VacancyCurrency.RUB,
    },
    format: VacancyFormat.HYBRID,
    updatedAt: '2024-02-08',
    publishedDate: '2024-02-08',
    publisher: {
      name: 'DeFi Platform',
      contacts: {
        telegram: '@defi_platform',
        cite: 'defiplatform.io',
        email: 'careers@defiplatform.io',
      },
    },
    responsibilities: [
      'Управление облачной инфраструктурой',
      'Настройка мониторинга',
      'Оптимизация производительности',
    ],
    requirements: ['AWS/Azure', 'Terraform', 'Kubernetes'],
  },
  {
    id: '9',
    title: 'Lead Solidity Developer',
    speciality: VacancySpeciality.SOLIDITY_DEVELOPER,
    description: 'Руководство командой разработки смарт-контрактов',
    salary: {
      amount: { to: 12000 },
      currency: VacancyCurrency.USD,
    },
    format: VacancyFormat.REMOTE,
    updatedAt: '2024-02-07',
    publishedDate: '2024-02-07',
    publisher: {
      name: 'Crypto Startup',
      contacts: {
        telegram: '@crypto_startup',
        cite: 'cryptostartup.com',
        email: 'hr@cryptostartup.com',
      },
    },
    responsibilities: [
      'Управление командой разработчиков',
      'Архитектура смарт-контрактов',
      'Код-ревью',
    ],
    requirements: ['Solidity', 'Опыт тимлида', 'Глубокое понимание DeFi'],
  },
  {
    id: '10',
    title: 'Senior Web3 Frontend Developer',
    speciality: VacancySpeciality.WEB3_FRONTEND,
    description: 'Разработка DeFi платформы',
    salary: {
      amount: { from: 5000, to: 8000 },
      currency: VacancyCurrency.USD,
    },
    format: VacancyFormat.HYBRID,
    updatedAt: '2024-02-06',
    publishedDate: '2024-02-06',
    publisher: {
      name: 'DeFi Labs',
      contacts: {
        telegram: '@defi_labs',
        cite: 'defilabs.com',
        email: 'jobs@defilabs.com',
      },
    },
    responsibilities: [
      'Разработка сложных UI компонентов',
      'Оптимизация производительности',
      'Интеграция с DeFi протоколами',
    ],
    requirements: ['React/Vue.js', 'Web3.js', 'TypeScript'],
  },
];
