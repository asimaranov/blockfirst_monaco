'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '~/helpers';
import { QRCodeSVG } from 'qrcode.react';
import FormContainer from '../shared/FormContainer';
import BackIcon from '../AuthPage/assets/back_icon';
import CopyButton from '../shared/CopyButton/CopyButton';
import { api } from '~/trpc/react';
import { Modal } from '../shared/Modal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function PaymentStatusModal() {
  const [formState, setFormState] = useState<'success' | 'error'>('success');
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const search = searchParams;

    if (search.get('success')) {
      setFormState('success');
      setIsOpen(true);
      router.push(pathname);
    }
    if (search.get('error')) {
      setFormState('error');
      setIsOpen(true);
      router.push(pathname);
    }
  }, [searchParams]);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormContainer
        onClose={() => {
          onClose();
        }}
        title="Оплата курса"
        description="Мы создали для вас уникальный QR-код и адрес для осуществления оплаты курса"
        submitButtonText="Ищем транзакцию"
        submitLoading={false}
        submitDisabled={false}
        onSubmit={() => false}
        formState={formState}
        successTitle={
          formState === 'success' ? 'Тариф оплачен' : 'Тариф не оплачен'
        }
        successDescription={
          formState === 'success'
            ? 'Выбранный тариф успешно оплачен. Желаем вам приятного обучения!'
            : 'Уважаемый пользователь, оплата выбранного тарифа не прошла. Возможные причины — недостаток средств или банковская ошибка.'
        }
        showBackButton={true}
        successButtonText={formState === 'success' ? 'Спасибо' : 'К тарифам'}
        onBackClick={onClose}
      >
        <div></div>
      </FormContainer>
    </Modal>
  );
}
