export interface IReadyCourseInfo {
  rating: number;
  alumniCount: number;
  lessonsCount: number;
  duration: number;
  author: {
    name: string;
    image: string;
  };
  updatedAt: string;
}
export interface ICourseBageInfo {
  title: string;
  img?: string;
}
export interface ICourse {
  id: string;
  title: string;
  description: string;
  aboutText?: string;
  smallImg: string;
  bigImg: string;
  soon: boolean;
  info?: IReadyCourseInfo;
  bage?: ICourseBageInfo;
}

export const COURSES: ICourse[] = [
  {
    id: 'solidity',
    title: 'Путешествие по Solidity & DeFi',
    description:
      'Помогите Алексу создать свой собственный токен, продать его инвесторам, внедрить стейкинг, управление правами, мультисиги...',
    aboutText:
      'После интерактивного курса ты научишься писать смарт-контракты и станешь востребованным разработчиком блокчейнов. Независимо от начального уровня, ты освоишь технологию будущего с помощью виртуального помощника. Главная особенность наших курсов — практика и мгновенная проверка кода прямо на сайте',
    smallImg: '/courses/solidity/small.png',
    bigImg: '/courses/solidity/big.png',
    soon: false,
    bage: {
      title: 'Solidity & Defi',
      img: '/courses/solidity/label.svg',
    },
    info: {
      rating: 4.9,
      alumniCount: 1289,
      lessonsCount: 24,
      duration: 1,
      author: {
        name: 'Андрей Симаранов',
        image: '/courses/solidity/author.png',
      },
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
  {
    id: 'uniswap_advanced',
    title: 'Продвинутый Uniswap курс',
    description:
      'Реализуйте свой собственный uniswap с нуля и помогите Алексу запустить его новую блестящую ...',
    smallImg: '/courses/uniswap/small.png',
    bigImg: '/courses/uniswap/big.png',
    soon: false,
    bage: {
      title: 'Uniswap',
      img: '/courses/uniswap/label.svg',
    },
    info: {
      rating: 5,
      alumniCount: 789,
      lessonsCount: 12,
      duration: 2,
      author: { name: 'Автор 2', image: '#' },
      updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
  },
  {
    id: 'lending_advanced',
    title: 'Передовое кредитование',
    description:
      'Исследуйте архитектуру AAVE и Compound и сделайте лучший проект по кредитованию ...',
    smallImg: '/courses/aave_compound/small.png',
    bigImg: '/courses/aave_compound/big.png',
    soon: true,
    bage: {
      title: 'Aave & Compound',
    },
  },
  {
    id: 'solidity_advanced',
    title: 'Продвинутый Solidity курс',
    description:
      'Изучение сложных подписей, оракулов, ценовых факторов, построение calldata, работа с multicall ...',
    smallImg: '/courses/solidity_advanced/small.png',
    bigImg: '/courses/solidity_advanced/big.png',
    soon: true,
    bage: {
      title: 'Solidity Advanced',
    },
  },
  {
    id: 'crypto_advanced',
    title: 'Криптография и математика',
    description:
      'Узнайте что такое эллиптическая кривая, узнайте, как рассчитать подпись своими руками. Изучите...',
    smallImg: '/courses/cryptography/small.png',
    bigImg: '/courses/cryptography/big.png',
    soon: true,
    bage: {
      title: 'Cryptography',
    },
  },
  {
    id: 'evm_assembler',
    title: 'EVM assembler & YUL язык',
    description:
      'Изучите ассемблерные опкоды, научитесь писать ассемблерные вставки, использовать ассемблер...',
    smallImg: '/courses/evm_assembler_yul/small.png',
    bigImg: '/courses/evm_assembler_yul/big.png',
    soon: true,
    bage: {
      title: 'EVM Assembler & YUL',
    },
  },
  {
    id: 'upgradeable_contracts',
    title: 'Обновляемые контракты',
    description:
      'Помогите Алексу сделать логику контрактов обновляемой. Изучите типы прокси...',
    smallImg: '/courses/upgradeable/small.png',
    bigImg: '/courses/upgradeable/big.png',
    soon: true,
    bage: {
      title: 'Upgradeable Contracts',
    },
  },
  {
    id: 'gas_advanced',
    title: 'Оптимизация газа',
    description:
      'Cэкономите деньги Алекса и его пользователей, изучив и используя передовые...',
    smallImg: '/courses/advanced_gas/small.png',
    bigImg: '/courses/advanced_gas/big.png',
    soon: true,
    bage: {
      title: 'Advanced Gas',
    },
  },
  {
    id: 'wagmi',
    title: 'Wagmi',
    description:
      'Узнаете как написать надежный и современный фронтенд для смартконтрактов...',
    smallImg: '/courses/wagmi/small.png',
    bigImg: '/courses/wagmi/big.png',
    soon: true,
    bage: {
      title: 'Wagmi',
    },
  },
];

export interface CourseStructure {
  id: number;
  title: string;
  status: string;
  lessons: string[];
}


export const COURSE_DATA = {
  solidity: {
    structure: [
      {
        id: 1,
        title: 'Мир токенов',
        status: 'available',
        lessons: [
          'Видеолекция – Введение в solidity',
          'Путешествие начинается – типы данных в первой лексеме',
          'Отображение и адреса – типы данных и работу с ними в первой лексеме',
          'Утверждения и видимость – изучаем вложенные отображения, утверждения',
          'События – узнайте, зачем контрактам нужны события',
          'Десятичные числа – узнайте, как работать с плавающими точками',
          'Изучите openzeppelin, Erc20',
        ],
      },
      {
        id: 2,
        title: 'Основы блокчейна и стэйкинг',
        status: 'starter',
        lessons: [
          'Лекция как работает блокчейн – txs, ноды, консенсус, mempool',
          'Практика работы со стакинг–контрактами – учимся работать со временем',
          'Практика работы со стабконтрактами – изучить кросс–контрактный вызов',
          'Практика стабконтракта – изучаем openzeppelin',
          'Практика заключения контрактов – изучить получение, оплату в ethereum',
          'Практика заключения контрактов – изучить получение ethereum, тестирование',
          'Практика ставочных контрактов – uniswap lp token & liquidity staking',
        ],
      },
      {
        id: 3,
        title: 'Основы блокчейна и мультисиг',
        status: 'starter',
      },
      {
        id: 4,
        title: 'Основы блокчейна и NFT',
        status: 'starter',
      },
    ] as CourseStructure[],
    stats: {
      lessons: '100+',
      tests: '45+',
      lectures: '30+',
    },
    course: COURSES[0]
  },
};
