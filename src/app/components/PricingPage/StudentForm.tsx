'use client';

import { useState } from 'react';
import UserIcon from '~/app/components/input-legends/user';
import TelegramSvg from '~/app/components/input-legends/telegram';
import BookIcon from '~/app/components/input-legends/book';
import FormContainer from '../shared/FormContainer';
import FormField, { FormTextArea } from '../shared/FormField';
import { api } from '~/trpc/react';

interface StudentFormProps {
  onClose: () => void;
}

export function StudentForm({ onClose }: StudentFormProps) {
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [motivation, setMotivation] = useState('');
  const [formState, setFormState] = useState<'input' | 'success'>('input');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitFormMutation = api.formSubmissions.submitForm.useMutation({
    onSuccess: () => {
      setFormState('success');
      setIsSubmitting(false);
    },
    onError: (error) => {
      setError(error.message || 'Произошла ошибка при отправке формы');
      setIsSubmitting(false);
    },
  });

  const handleSubmit = () => {
    setIsSubmitting(true);
    setError(null);

    submitFormMutation.mutate({
      formType: 'student',
      name,
      telegram,
      motivation,
    });
  };

  return (
    <FormContainer
      onClose={onClose}
      title="Анкета для студентов"
      description="Заполните анкету и напишите краткое мотивационное письмо. Мы рассмотрим для вас персональные условия"
      submitButtonText="Продолжить"
      submitDisabled={
        name === '' || telegram === '' || motivation === '' || isSubmitting
      }
      submitLoading={isSubmitting}
      onSubmit={handleSubmit}
      formState={formState}
      successTitle="Письмо отправлено"
      successDescription="В ближайшее время с вами свяжется менеджер для обсуждения персональных условий"
    >
      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

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
