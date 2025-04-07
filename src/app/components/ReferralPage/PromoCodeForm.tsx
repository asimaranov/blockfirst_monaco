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
  const [error, setError] = useState<string | undefined>(undefined);
  const handleSubmit = () => {
    setFormState('success');
  };

  const checkPromoCode = async (code: string) => {
    // const response = await fetch(`/api/promo-code?code=${promoCode}`);
    // const data = await response.json();
    // return data;
    return code === '123456';
  };

  return (
    <FormContainer
      onClose={onFullClose}
      title="Промокод"
      description="Пожалуйста, введите промокод, предоставленный вам менеджером, для активации персональной реферальной программы"
      submitButtonText="Активировать"
      submitDisabled={promoCode === '' || error !== undefined}
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
        onChange={async (e) => {
          setPromoCode(e.target.value);
          const promoResp = await checkPromoCode(e.target.value);
          if (!promoResp) {
            setError('Данный промокод не зарегистрирован');
          } else {
            setError(undefined);
          }
        }}
        onBlur={() => setPromoCode(promoCode.trim())}
        error={promoCode !== '' ? error : undefined}
      />
    </FormContainer>
  );
}
