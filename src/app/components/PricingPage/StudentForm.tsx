'use client';

import { useState } from 'react';
import UserIcon from '~/app/components/input-legends/user';
import TelegramSvg from '~/app/components/input-legends/telegram';
import BookIcon from '~/app/components/input-legends/book';
import FormContainer from '../shared/FormContainer';
import FormField, { FormTextArea } from '../shared/FormField';

interface StudentFormProps {
  onClose: () => void;
}

export function StudentForm({ onClose }: StudentFormProps) {
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [motivation, setMotivation] = useState('');
  const [formState, setFormState] = useState<'input' | 'success'>('input');

  const handleSubmit = () => {
    setFormState('success');
  };

  return (
    <FormContainer
      onClose={onClose}
      title="Анкета для студентов"
      description="Заполните анкету и напишите краткое мотивационное письмо. Мы рассмотрим для вас персональные условия"
      submitButtonText="Продолжить"
      submitDisabled={name === '' || telegram === '' || motivation === ''}
      onSubmit={handleSubmit}
      formState={formState}
      successTitle="Письмо отправлено"
      successDescription="В ближайшее время с вами свяжется менеджер для обсуждения персональных условий"
    >
      <FormField
        icon={<UserIcon active={name !== ''} />}
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <FormField
        icon={<TelegramSvg active={telegram !== ''} />}
        placeholder="Ваш телеграм"
        value={telegram}
        onChange={(e) => setTelegram(e.target.value)}
      />

      <FormTextArea
        icon={<BookIcon active={motivation !== ''} />}
        placeholder={`Мотивационное письмо\n\nРасскажите о себе и почему вы хотите\nучиться у нас`}
        value={motivation}
        onChange={(e) => setMotivation(e.target.value)}
      />
    </FormContainer>
  );
}
