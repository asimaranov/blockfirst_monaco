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
      value: 'https://t.me/asimaranov',
      button: <RedirectArrowButton hrefToOpen={'https://t.me/asimaranov'} />,
    },
  ];

  return (
    <FormContainer
      kind='info'
      onClose={onClose}
      title="Вывод средств"
      description="Вывод осуществляется в ручном режиме, необходимо написать менеджеру в Telegram. Выплата производится 1 раз в месяц"
      formState={formState}
      onSubmit={() => {}}
      submitButtonText=""
      bottomText={{
        main: 'Электронный адрес',
        secondary: 'hello@blockfirst.io',
        link: 'mailto:hello@blockfirst.io',
      }}
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
    </FormContainer>
  );
}
