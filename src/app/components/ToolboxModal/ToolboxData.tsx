import React from 'react';
import { keccak256, sha256, ecrecover } from './utils/cryptoUtils';

const PencilIcon = ({ className }: { className?: string }) => (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M11.2649 2.53123C11.9641 1.8959 13.0315 1.89578 13.7307 2.53123C13.7651 2.56254 13.802 2.59958 13.8508 2.64841C13.8997 2.69735 13.9376 2.73404 13.969 2.76853C14.6044 3.46769 14.6043 4.53609 13.969 5.23533C13.9376 5.2698 13.8997 5.30656 13.8508 5.35544L7.22872 11.9775C6.7286 12.4776 6.41555 12.7968 6.02755 13.0166C5.63951 13.2362 5.20488 13.3402 4.51876 13.5117L3.28536 13.8203C3.11502 13.8628 2.9349 13.8126 2.81075 13.6885C2.68678 13.5643 2.63635 13.3841 2.67892 13.2138L2.98751 11.9804C3.15905 11.2943 3.26388 10.8597 3.4836 10.4717C3.70334 10.0838 4.0217 9.77046 4.52169 9.27048L11.1438 2.64841C11.1927 2.59952 11.2304 2.56257 11.2649 2.53123ZM5.22872 9.97752C4.69123 10.515 4.49113 10.7223 4.35372 10.9648C4.21639 11.2074 4.14156 11.4854 3.95724 12.2226L3.85079 12.6484L4.27657 12.542C5.01434 12.3575 5.29266 12.2839 5.53536 12.1465C5.77794 12.009 5.98416 11.808 6.52169 11.2705L11.7609 6.03025C11.1697 5.7996 10.6973 5.32964 10.467 4.73826L5.22872 9.97752ZM13.0578 3.27048C12.7401 2.98214 12.2544 2.98195 11.9367 3.27048C11.9243 3.2818 11.9077 3.29849 11.8508 3.35544L11.3127 3.89255C11.296 4.61034 11.888 5.2015 12.6057 5.18552L13.1438 4.64841C13.2007 4.59145 13.2174 4.57492 13.2287 4.56248C13.5174 4.24464 13.5175 3.75914 13.2287 3.44138C13.2174 3.42894 13.2007 3.41237 13.1438 3.35544C13.0869 3.29855 13.0703 3.28179 13.0578 3.27048Z"
      fill="#195AF4"
      className="group-hover:fill-foreground"
    />
  </svg>
);

export interface ToolboxItemData {
  id: string;
  title: string;
  description: string;
  inputValue?: string;
  inputValue2?: string;
  actionButtonText?: string;
  actionButtonIcon?: React.ReactNode;
  outputValue?: string;
  walletRequired?: boolean;
  applyFunction?: (input: string, input2?: string) => string;
}

export const UTILITIES_ITEMS: ToolboxItemData[] = [
  {
    id: 'keccak256',
    title: 'Hash (Keccak-256)',
    description: 'Keccak256 is a hashing algorithm used in Ethereum.',
    inputValue: 'Ввод 0x...',
    outputValue: 'Вывод 0x...', // Placeholder
    applyFunction: (input: string) => {
      return keccak256(input);
    },
  },
  {
    id: 'sha256',
    title: 'Hash (SHA-256)',
    description: 'SHA-256 is another common hashing algorithm.',
    inputValue: 'Ввод 0x...',
    outputValue: 'Вывод 0x...', // Placeholder
    applyFunction: (input: string) => {
      return sha256(input);
    },
  },
  {
    id: 'ecdsa',
    title: 'ECDSA',
    description: 'ECDSA is a digital signature algorithm used in Ethereum.',
    walletRequired: true,
    inputValue: 'Ввод 0x...',
    outputValue: 'Вывод 0x...', // Placeholder
    actionButtonText: 'Подписать ввод',
    actionButtonIcon: <PencilIcon className="text-primary h-4 w-4 shrink-0" />,
    applyFunction: (input: string) => {
      return keccak256(input);
    },
  },
  {
    id: 'ecrecover',
    title: 'Ecrecover',
    description: 'Ecrecover is a function used in Ethereum.',
    inputValue: 'Подпись 0x...',
    inputValue2: 'Сообщение 0x...',
    outputValue: 'Вывод 0x...', // Placeholder
    actionButtonText: 'Восстановить адрес',
    actionButtonIcon: <PencilIcon className="text-primary h-4 w-4 shrink-0" />,
    applyFunction: (input: string, input2?: string) => {
      if (!input2) return '';
      return ecrecover(input, input2);
    },
  },
];

export const CONSTANTS_ITEMS: ToolboxItemData[] = [
  {
    id: 'zeroAddress',
    title: 'Zero Address',
    description: 'Zero address is a special address in Ethereum.',
    outputValue: '0x0000000000000000000000000000000000000000',
  },
];
