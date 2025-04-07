'use client';

import { useState } from 'react';
import UserIcon from '~/app/components/input-legends/user';
import TelegramSvg from '~/app/components/input-legends/telegram';
import BookIcon from '~/app/components/input-legends/book';
import FormContainer from '../shared/FormContainer';
import FormField, { FormTextArea } from '../shared/FormField';
import { api } from '~/trpc/react';

interface CVApplyFormProps {
  jobTitle: string;
  onClose: () => void;
}

export default function CVApplyForm({ onClose, jobTitle }: CVApplyFormProps) {
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
      formType: 'cvApply',
      name,
      telegram,
      motivation,
      jobTitle,
    });
  };

  return (
    <FormContainer
      onClose={onClose}
      title={`Резюме ${jobTitle}`}
      description="Заполните все необходимые поля. Куратор свяжется с вами и поможет создать качественное резюме для работодателей."
      submitButtonText="Продолжить"
      submitDisabled={
        name === '' || telegram === '' || motivation === '' || isSubmitting
      }
      submitLoading={isSubmitting}
      onSubmit={handleSubmit}
      formState={formState}
      successTitle="Письмо отправлено"
      successDescription="В ближайшее время с вами свяжется куратор и поможет составить качественное резюме"
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
        placeholder={`Дополнительная информация\n(Образование, опыт работы, GitHub, знание английского)`}
        value={motivation}
        onChange={(e) => setMotivation(e.target.value)}
      />
    </FormContainer>
  );
}
