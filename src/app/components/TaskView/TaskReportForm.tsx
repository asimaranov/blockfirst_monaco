'use client';

import { useState } from 'react';
import UserIcon from '~/app/components/input-legends/user';
import TelegramSvg from '~/app/components/input-legends/telegram';
import BookIcon from '~/app/components/input-legends/book';
import FormContainer from '../shared/FormContainer';
import FormField, { FormTextArea } from '../shared/FormField';
import { api } from '~/trpc/react';
import { useParams } from 'next/navigation';

interface TaskReportFormProps {
  onClose: () => void;
}

export function TaskReportForm({ onClose }: TaskReportFormProps) {
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [issue, setIssue] = useState('');
  const [formState, setFormState] = useState<'input' | 'success'>('input');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { taskId } = useParams();


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
      formType: 'reportTask',
      name,
      telegram,
      issue,
      taskId: taskId as string,
    });
  };

  return (
    <FormContainer
      onClose={onClose}
      title="Сообщить о проблеме"
      description="Если вы столкнулись с проблемой технического плана, пожалуйста сообщите нам"
      submitButtonText="Продолжить"
      submitDisabled={
        name === '' || telegram === '' || issue === '' || isSubmitting
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
        icon={<BookIcon active={issue !== ''} />}
        placeholder={`Опишите возникшую проблему`}
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
      />
    </FormContainer>
  );
}
