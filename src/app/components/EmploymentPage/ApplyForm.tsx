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
import { api } from '~/trpc/react';

interface ApplyFormProps {
  onClose: () => void;
  onSubmit?: () => void;
  vacancyId: string;
  vacancy?: {
    publisher: {
      contacts: {
        telegram: string;
        cite: string;
        email: string;
      };
    };
  };
}

export function ApplyForm({
  onClose,
  onSubmit,
  vacancyId,
  vacancy,
}: ApplyFormProps) {
  const [formState] = useState<'input' | 'success'>('input');
  const markAsApplied = api.vacancies.markAsApplied.useMutation({});

  // Generate actual contact values from vacancy if available, or use placeholders
  const telegram =
    vacancy?.publisher?.contacts?.telegram || '–';
  const website = vacancy?.publisher?.contacts?.cite || '–';
  const email = vacancy?.publisher?.contacts?.email || '–';

  const handleLinkClick = async (link: string) => {
    window.open(link, '_blank');
    try {
      
      await markAsApplied.mutateAsync({
        id: vacancyId,
        applicationType: 'link',
      });
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error('Error marking vacancy as applied:', error);
    }
  };

  const handleCopyAction = async () => {
    try {
      await markAsApplied.mutateAsync({
        id: vacancyId,
        applicationType: 'copy',
      });
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error('Error marking vacancy as applied:', error);
    }
  };

  const contactItems = [
    {
      name: 'Телеграм',
      icon: TelegramIcon,
      value: telegram,
      button: (
        <RedirectArrowButton
          disabled={telegram === '–'}
          hrefToOpen={telegram}
          onClick={() => {
            if (telegram.includes('@')) {
              handleLinkClick(`https://t.me/${telegram.replace('@', '')}`);
            } else {
              handleLinkClick(telegram);
            }
          }}
        />
      ),
    },
    {
      name: 'Веб-сайт',
      icon: WebsiteIcon,
      value: website,
      button: (
        <RedirectArrowButton
          disabled={website === '–'}
          hrefToOpen={website}
          onClick={() => {
            if (!website.includes('http')) {
              handleLinkClick(`https://${website}`);
            } else {
              handleLinkClick(website);
            }
          }}
        />
      ),
    },
    {
      name: 'E-mail',
      icon: EmailIcon,
      value: email,
      button: (
        <CopyButton
          textToCopy={email}
          onCopy={handleCopyAction}
          disabled={email === '–'}
        />
      ),
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
