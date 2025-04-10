'use client';

import { useState } from 'react';
import { api } from '~/trpc/react';
import FormField from '../shared/FormField';
import PromoCodeIcon from '~/app/components/input-legends/promo-code';

export default function PromoCodeManager() {
  const [newCode, setNewCode] = useState('');
  const [percentage, setPercentage] = useState(5);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  // tRPC queries and mutations
  const promoCodes = api.referrals.getAllPromoCodes.useQuery();

  const createPromoCode = api.referrals.createPromoCode.useMutation({
    onSuccess: (data) => {
      setSuccess(`Промокод ${data.code} создан успешно`);
      setNewCode('');
      setPercentage(5);
      promoCodes.refetch();
      setTimeout(() => setSuccess(undefined), 3000);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleCreateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setSuccess(undefined);

    if (!newCode) {
      setError('Пожалуйста, введите код');
      return;
    }

    await createPromoCode.mutateAsync({
      code: newCode,
      referralPercent: percentage,
    });
  };

  // Format date to readable format
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-8 text-2xl font-bold">
        Управление промокодами для блогеров
      </h1>

      {/* Create new promo code */}
      <div className="mb-10 rounded-lg border border-gray-700 bg-gray-800 p-6">
        <h2 className="mb-4 text-xl">Создать новый промокод</h2>
        <form onSubmit={handleCreateCode} className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <FormField
                type="text"
                name="promoCode"
                value={newCode}
                placeholder="Введите код промокода"
                icon={<PromoCodeIcon active={newCode !== ''} />}
                onChange={(e) => {
                  setNewCode(e.target.value);
                  if (error) setError(undefined);
                }}
                error={error}
              />
              <p className="mt-1 text-xs text-gray-400">
                Если оставить пустым, будет сгенерирован автоматически
              </p>
            </div>
            <div className="w-32">
              <FormField
                type="number"
                name="percentage"
                value={percentage.toString()}
                min={1}
                max={99}
                onChange={(e) => setPercentage(parseInt(e.target.value) || 5)}
              />
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={createPromoCode.isPending}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {createPromoCode.isPending ? 'Создание...' : 'Создать промокод'}
            </button>
          </div>

          {success && (
            <div className="mt-3 rounded-md bg-green-900/20 p-3 text-sm text-green-400">
              {success}
            </div>
          )}
        </form>
      </div>

      {/* List of promo codes */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        <h2 className="mb-4 text-xl">Существующие промокоды</h2>

        {promoCodes.isLoading ? (
          <div className="py-12 text-center">Загрузка...</div>
        ) : promoCodes.data?.length === 0 ? (
          <div className="py-12 text-center text-gray-400">
            Пока нет созданных промокодов
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 text-left">Код</th>
                  <th className="py-3 text-left">Процент</th>
                  <th className="py-3 text-left">Статус</th>
                  <th className="py-3 text-left">Создан</th>
                  <th className="py-3 text-left">Использован</th>
                </tr>
              </thead>
              <tbody>
                {promoCodes.data?.map((code) => (
                  <tr key={code.id} className="border-b border-gray-700">
                    <td className="py-3">
                      <span className="font-mono">{code.code}</span>
                    </td>
                    <td className="py-3">{code.referralPercent}%</td>
                    <td className="py-3">
                      {code.isActive ? (
                        code.usedBy ? (
                          <span className="rounded-full bg-green-900/30 px-2 py-1 text-xs text-green-400">
                            Активирован
                          </span>
                        ) : (
                          <span className="rounded-full bg-blue-900/30 px-2 py-1 text-xs text-blue-400">
                            Ожидает активации
                          </span>
                        )
                      ) : (
                        <span className="rounded-full bg-red-900/30 px-2 py-1 text-xs text-red-400">
                          Неактивен
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-sm">
                      {formatDate(code.createdAt)}
                    </td>
                    <td className="py-3 text-sm">
                      {code.usedAt ? formatDate(code.usedAt) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
