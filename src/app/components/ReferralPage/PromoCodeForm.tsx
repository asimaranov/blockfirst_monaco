'use client';

import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
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
  const [referralPercent, setReferralPercent] = useState<number | null>(null);

  // tRPC mutations
  const checkPromoCodeQuery = api.referrals.checkPromoCode.useQuery(
    { code: promoCode },
    {
      enabled: promoCode.length > 0,
      refetchOnWindowFocus: false,
    }
  );

  const activatePromoCodeMutation = api.referrals.activatePromoCode.useMutation(
    {
      onSuccess: (data) => {
        if (data.referralPercent) {
          setReferralPercent(data.referralPercent);
        }
        setFormState('success');
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const handleSubmit = async () => {
    if (!error && promoCode) {
      await activatePromoCodeMutation.mutateAsync({ code: promoCode });
    }
  };

  return (
    <FormContainer
      onClose={onFullClose}
      title="Промокод"
      description="Пожалуйста, введите промокод, предоставленный вам менеджером, для активации персональной реферальной программы"
      submitButtonText="Активировать"
      submitDisabled={false}
      onSubmit={handleSubmit}
      formState={formState}
      successTitle="Промокод активирован"
      successDescription={`Вы успешно активировали промокод. Теперь вам доступен индивидуальный процент от дохода: ${referralPercent || 3}%`}
      showBackButton={formState === 'input'}
      onBackClick={onClose}
    >
      <FormField
        type="text"
        name="promoCode"
        value={promoCode}
        placeholder="Ваш промокод"
        icon={<PromoCodeIcon active={promoCode !== ''} />}
        onChange={(e) => {
          setPromoCode(e.target.value);
          if (!e.target.value) {
            setError(undefined);
          }
        }}
        onBlur={() => setPromoCode(promoCode.trim())}
        error={error}
      />
    </FormContainer>
  );
}
