'use client';

import { useState } from 'react';
import PromoCodeIcon from '~/app/components/input-legends/promo-code';
import FormContainer from '../shared/FormContainer';
import FormField from '../shared/FormField';

export default function PromoCodeForm({
  onClose,
  onFullClose,
}: {
  onClose: () => void;
  onFullClose: () => void;
}) {
  const [promoCode, setPromoCode] = useState('');
  const [formState, setFormState] = useState<'input' | 'success'>('input');

  const handleSubmit = () => {
    setFormState('success');
  };

  return (
    <FormContainer
      onClose={onFullClose}
      title="Промокод"
      description="Пожалуйста, введите промокод, предоставленный вам менеджером, для активации персональной реферальной программы"
      submitButtonText="Активировать"
      submitDisabled={promoCode === ''}
      onSubmit={handleSubmit}
      formState={formState}
      successTitle="Промокод активирован"
      successDescription="Вы успешно активировали промокод. Теперь вам доступен индивидуальный процент от дохода"
      showBackButton={formState === 'input'}
      onBackClick={onClose}
    >
      <FormField
        type="text"
        name="promoCode"
        value={promoCode}
        placeholder="Ваш промокод"
        icon={<PromoCodeIcon active={promoCode !== ''} />}
        onChange={(e) => setPromoCode(e.target.value)}
        onBlur={() => setPromoCode(promoCode.trim())}
        error={
          promoCode === '' ? 'Данный промокод не зарегистрирован' : undefined
        }
      />
    </FormContainer>
  );
}
