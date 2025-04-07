'use client';

import { useState } from 'react';
import Image from 'next/image';
import FormContainer from '../shared/FormContainer';
import ContactItem, { RedirectArrowButton } from '../shared/ContactItem';
import TelegramIcon from './assets/telegram-icon.svg';
import SecondStepIcon from './assets/second-step.svg';
import InfoIcon from './assets/info-icon.svg';
import PromoCodeForm from './PromoCodeForm';
import ContactStepItem from '../shared/ContactStepItem';

interface ApplyFormProps {
  onClose: () => void;
}

export default function BloggerForm({ onClose }: ApplyFormProps) {
  const [isPromoCodeFormOpen, setIsPromoCodeFormOpen] = useState(false);
  const [formState] = useState<'input' | 'success'>('input');

  const contactItems = [
    {
      name: 'Связь с менеджером (TG)',
      icon: TelegramIcon,
      value: 'Рассмотрим персональные условия',
      stepText: 'Первый шаг',
      actionButton: (
        <RedirectArrowButton hrefToOpen={'https://t.me/asimaranov'} />
      ),
    },
    {
      name: 'Активация аккаунта',
      icon: SecondStepIcon,
      value: 'Промокод выдает менеджер',
      stepText: 'Второй шаг',
      actionButton: (
        <RedirectArrowButton onClick={() => setIsPromoCodeFormOpen(true)} />
      ),
    },
  ];

  return (
    <>
      {isPromoCodeFormOpen ? (
        <PromoCodeForm
          onClose={() => {
            setIsPromoCodeFormOpen(false);
          }}
          onFullClose={() => {
            setIsPromoCodeFormOpen(false);
            onClose();
          }}
        />
      ) : (
        <FormContainer
          kind="info"
          onClose={onClose}
          title="Блогерам"
          description="Если вы являетесь блогером или владельцем Telegram-канала с активной аудиторией, пожалуйста, свяжитесь с нами."
          formState={formState}
          onSubmit={() => {}}
          submitButtonText=""
          onBackClick={() => {
            setIsPromoCodeFormOpen(false);
          }}
          bottomText={{
            main: 'Неверные контакты?',
            secondary: 'Написать нам',
            link: '#',
          }}
        >
          <div className="text-secondary/50 -mx-5 sm:-mx-10 bg-[#14171C] px-6 sm:px-8 py-3.5 text-xs uppercase">
            Необходимые действия
          </div>

          <div className="flex flex-1 flex-col gap-8">
            {contactItems.map((item, index) => (
              <div key={index} className="flex flex-col">

                <ContactStepItem
                  stepText={item.stepText}
                  name={item.name}
                  icon={item.icon}
                  value={item.value}
                  actionButton={item.actionButton}
                />
              </div>
            ))}
          </div>
        </FormContainer>
      )}
    </>
  );
}
