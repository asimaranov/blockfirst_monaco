'use client';

import { useState } from 'react';
import FormContainer from '../shared/FormContainer';
import ContactItem, { RedirectArrowButton } from '../shared/ContactItem';
import Image from 'next/image';
import TelegramFlatIcon from './assets/telegram-flat-icon.svg';
import InfoIcon from './assets/info-icon.svg';

interface ApplyFormProps {
  onClose: () => void;
}

export function WithdrawForm({ onClose }: ApplyFormProps) {
  const [formState] = useState<'input' | 'success'>('input');

  const contactItems = [
    {
      name: 'Телеграм',
      icon: TelegramFlatIcon,
      value: 'https://t.me/changeme',
      button: <RedirectArrowButton hrefToOpen={'https://t.me/changeme'} />,
    },
  ];

  return (
    <FormContainer
      onClose={onClose}
      title="Вывод средств"
      description="Вывод осуществляется в ручном режиме, необходимо написать менеджеру в Telegram. Выплата производится 1 раз в месяц"
      formState={formState}
      onSubmit={() => {}}
      submitButtonText=""
    >
      {contactItems.map((item, index) => (
        <ContactItem
          key={index}
          name={item.name}
          icon={item.icon}
          value={item.value}
          actionButton={item.button}
        />
      ))}

      <div className="text-secondary flex w-full flex-row justify-center gap-1 text-xs">
        <span className="flex flex-row gap-1">
          <Image src={InfoIcon} alt="Info" className="h-4 w-4" />
          Электронный адрес
        </span>
        <span className="text-foreground">hello@blockfirst.io</span>
      </div>
    </FormContainer>
  );
}
