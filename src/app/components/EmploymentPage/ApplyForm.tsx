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
}

export function ApplyForm({ onClose }: ApplyFormProps) {
  const [formState] = useState<'input' | 'success'>('input');

  const contactItems = [
    {
      name: 'Телеграм',
      icon: TelegramIcon,
      value: 'https://t.me/changeme',
      button: <RedirectArrowButton hrefToOpen={'https://t.me/changeme'} />,
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
      onClose={onClose}
      title="Отклик на вакансию"
      description="Мы предоставляем контакты и дополнительную информацию работодателя"
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
          Неверные контакты?
        </span>
        <span className="text-foreground cursor-pointer underline">
          Написать нам
        </span>
      </div>
    </FormContainer>
  );
}
