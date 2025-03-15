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
  labelTitle: string;
  labelImg: string;

}
export interface ICourse {
  id: string;
  title: string;
  description: string;
  smallImg: string;
  bigImg: string;
  soon: boolean;
  info?: IReadyCourseInfo;
}

export const COURSES: ICourse[] = [
  {
    id: 'solidity',
    title: 'Путешествие по Solidity & DeFi',
    description:
      'Помогите Алексу создать свой собственный токен, продать его инвесторам, внедрить стейкинг, наделение правами, мультисигму...',
    smallImg: '/courses/solidity/small.png',
    bigImg: '/courses/solidity/big.png',
    soon: false,
    info: {
      labelTitle: 'Solidity & Defi',
      rating: 4.9,
      alumniCount: 1289,
      lessonsCount: 24,
      duration: 1,
      author: { name: 'Андрей Симаранов', image: '/courses/solidity/author.png' },
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      labelImg: '/courses/solidity/label.svg',
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
    info: {
      labelTitle: 'Uniswap',
      rating: 5,
      alumniCount: 789,
      lessonsCount: 12,
      duration: 2,
      author: { name: 'Автор 2', image: '#' },
      updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      labelImg: '/courses/uniswap/label.svg',
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
  },
  {
    id: 'solidity_advanced',
    title: 'Продвинутый Solidity курс',
    description:
      'Изучение сложных подписей, оракулов, ценовых факторов, построение calldata, работа с multicall ...',
    smallImg: '/courses/solidity_advanced/small.png',
    bigImg: '/courses/solidity_advanced/big.png',
    soon: true,
  },
  {
    id: 'crypto_advanced',
    title: 'Криптография и математика',
    description:
      'Узнайте что такое эллиптическая кривая, узнайте, как рассчитать подпись своими руками. Изучите...',
    smallImg: '/courses/cryptography/small.png',
    bigImg: '/courses/cryptography/big.png',
    soon: true,
  },
  {
    id: 'evm_assembler',
    title: 'EVM assembler & YUL язык',
    description:
      'Изучите ассемблерные опкоды, научитесь писать ассемблерные вставки, использовать ассемблер...',
    smallImg: '/courses/evm_assembler_yul/small.png',
    bigImg: '/courses/evm_assembler_yul/big.png',
    soon: true,
  },
  {
    id: 'upgradeable_contracts',
    title: 'Обновляемые контракты',
    description:
      'Помогите Алексу сделать логику контрактов обновляемой. Изучите типы прокси...',
    smallImg: '/courses/upgradeable/small.png',
    bigImg: '/courses/upgradeable/big.png',
    soon: true,
  },
  {
    id: 'gas_advanced',
    title: 'Усовершенствованная оптимизация газа',
    description:
      'Cэкономите деньги Алекса и его пользователей, изучив и используя передовые...',
    smallImg: '/courses/advanced_gas/small.png',
    bigImg: '/courses/advanced_gas/big.png',
    soon: true,
  },
  {
    id: 'wagmi',
    title: 'Wagmi',
    description:
      'Узнаете как написать надежный и современный фронтенд для смартконтрактов. Работа с событиями, EVM, кросс...',
    smallImg: '/courses/wagmi/small.png',
    bigImg: '/courses/wagmi/big.png',
    soon: true,
  },
];