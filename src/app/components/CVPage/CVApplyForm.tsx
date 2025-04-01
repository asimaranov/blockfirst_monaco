'use client';

import { useState } from 'react';
import UserIcon from '~/app/components/input-legends/user';
import TelegramSvg from '~/app/components/input-legends/telegram';
import BookIcon from '~/app/components/input-legends/book';
import FormContainer from '../shared/FormContainer';
import FormField, { FormTextArea } from '../shared/FormField';

interface CVApplyFormProps {
  jobTitle: string;
  onClose: () => void;
}

export default function CVApplyForm({ onClose, jobTitle }: CVApplyFormProps) {
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
      title={`Резюме ${jobTitle}`}
      description="Заполните все необходимые поля. Куратор свяжется с вами и поможет создать качественное резюме для работодателей."
      submitButtonText="Продолжить"
      submitDisabled={name === '' || telegram === '' || motivation === ''}
      onSubmit={handleSubmit}
      formState={formState}
      successTitle="Письмо отправлено"
      successDescription="В ближайшее время с вами свяжется куратор и поможет составить качественное резюме"
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
        placeholder={`Дополнительная информация\n(Образование, опыт работы, GitHub, знание английского)`}
        value={motivation}
        onChange={(e) => setMotivation(e.target.value)}
      />
    </FormContainer>
  );
}
