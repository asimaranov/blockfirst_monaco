'use client';

import { useState } from 'react';
import FormContainer from '../shared/FormContainer';
import ContactItem, { RedirectArrowButton } from '../shared/ContactItem';
import Image from 'next/image';
import TelegramIcon from './assets/telegram-icon.svg';
import EmailIcon from './assets/email-icon.svg';
import WebsiteIcon from './assets/website-icon.svg';
import InfoIcon from './assets/info-icon.svg';
import CopyButton from '../shared/CopyButton/CopyButton';

interface ApplyFormProps {
  onClose: () => void;
  onSubmit?: () => void;
}

export function ApplyForm({ onClose, onSubmit }: ApplyFormProps) {
  const [formState] = useState<'input' | 'success'>('input');

  const contactItems = [
    {
      name: 'Телеграм',
      icon: TelegramIcon,
      value: 'https://t.me/asimaranov',
      button: <RedirectArrowButton hrefToOpen={'https://t.me/asimaranov'} />,
    },
    {
      name: 'Веб-сайт',
      icon: WebsiteIcon,
      value: 'https://example.com',
      button: <RedirectArrowButton hrefToOpen={'https://example.com'} />,
    },
    {
      name: 'E-mail',
      icon: EmailIcon,
      value: 'example@example.com',
      button: <CopyButton textToCopy={'example@example.com'} />,
    },
  ];

  return (
    <FormContainer
      kind="info"
      onClose={onClose}
      title="Отклик на вакансию"
      description="Мы предоставляем контакты и дополнительную информацию работодателя"
      formState={formState}
      onSubmit={onSubmit || (() => {})}
      submitButtonText=""
      bottomText={{
        main: 'Неверные контакты?',
        secondary: 'Написать нам',
        link: '#',
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
