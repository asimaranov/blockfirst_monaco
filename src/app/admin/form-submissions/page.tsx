'use client';

import { useState } from 'react';
import { api } from '~/trpc/react';

// Extended interface including virtual fields from the toJSON transform
interface FormSubmissionWithVirtuals {
  id?: string;
  formType:
    | 'student'
    | 'usdt'
    | 'promoCode'
    | 'cvApply'
    | 'mentor'
    | 'changeCurator';
  status: 'pending' | 'processed' | 'rejected';
  createdAt: Date | string;
  updatedAt: Date | string;
  processedAt?: Date | string;
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
  formattedProcessedAt?: string;

  // Student and CV Apply fields
  name?: string;
  telegram?: string;
  motivation?: string;

  // USDT fields
  transactionId?: string;
  amountPaid?: number;

  // Promo code fields
  promoCode?: string;

  // CV Apply fields
  jobTitle?: string;
  additionalInfo?: string;

  // Mentor fields
  course?: string;

  // Common fields
  adminNotes?: string;

  // Mongoose document properties
  _id?: any;
  __v?: number;
}

export default function FormSubmissionsPage() {
  const [formType, setFormType] = useState<
    | 'student'
    | 'usdt'
    | 'promoCode'
    | 'cvApply'
    | 'mentor'
    | 'changeCurator'
    | undefined
  >(undefined);
  const [status, setStatus] = useState<
    'pending' | 'processed' | 'rejected' | undefined
  >(undefined);
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const { data, isLoading, error, refetch } =
    api.formSubmissions.getFormSubmissions.useQuery(
      {
        formType,
        status,
        limit: pageSize,
        offset: page * pageSize,
      },
      {
        retry: false,
        refetchOnWindowFocus: false,
      }
    );

  const updateStatusMutation = api.formSubmissions.updateFormStatus.useMutation(
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const handleStatusChange = (
    id: string,
    newStatus: 'pending' | 'processed' | 'rejected'
  ) => {
    updateStatusMutation.mutate({
      id,
      status: newStatus,
    });
  };

  const renderFormDetails = (submission: FormSubmissionWithVirtuals) => {
    switch (submission.formType) {
      case 'student':
        return (
          <div className="mt-2">
            <p>
              <strong>Имя:</strong> {submission.name}
            </p>
            <p>
              <strong>Телеграм:</strong> {submission.telegram}
            </p>
            <p>
              <strong>Мотивация:</strong> {submission.motivation}
            </p>
          </div>
        );
      case 'usdt':
        return (
          <div className="mt-2">
            <p>
              <strong>ID транзакции:</strong>{' '}
              {submission.transactionId || 'Не указан'}
            </p>
            <p>
              <strong>Сумма:</strong> {submission.amountPaid || 'Не указана'}{' '}
              USDT
            </p>
          </div>
        );
      case 'promoCode':
        return (
          <div className="mt-2">
            <p>
              <strong>Промокод:</strong> {submission.promoCode}
            </p>
          </div>
        );
      case 'cvApply':
        return (
          <div className="mt-2">
            <p>
              <strong>Имя:</strong> {submission.name}
            </p>
            <p>
              <strong>Телеграм:</strong> {submission.telegram}
            </p>
            <p>
              <strong>Вакансия:</strong> {submission.jobTitle}
            </p>
            <p>
              <strong>Доп. информация:</strong>{' '}
              {submission.additionalInfo || submission.motivation}
            </p>
          </div>
        );
      case 'mentor':
        return (
          <div className="mt-2">
            <p>
              <strong>Имя:</strong> {submission.name}
            </p>
            <p>
              <strong>Телеграм:</strong> {submission.telegram}
            </p>
            <p>
              <strong>Курс:</strong> {submission.course}
            </p>
            <p>
              <strong>Мотивация:</strong> {submission.motivation}
            </p>
          </div>
        );
      case 'changeCurator':
        return (
          <div className="mt-2">
            <p>
              <strong>Имя:</strong> {submission.name}
            </p>
            <p>
              <strong>Телеграм:</strong> {submission.telegram}
            </p>
            <p>
              <strong>Причина:</strong>{' '}
              {submission.motivation || submission.additionalInfo}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  if (error) {
    return (
      <div className="p-8">
        <h1 className="mb-6 text-2xl font-bold">Заявки</h1>
        <div className="rounded-md bg-red-100 p-4 text-red-700">
          Ошибка: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Заявки</h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Тип формы</label>
          <select
            className="rounded-md border border-gray-300 px-3 py-2"
            value={formType || ''}
            onChange={(e) => setFormType((e.target.value as any) || undefined)}
          >
            <option value="">Все</option>
            <option value="student">Анкета студента</option>
            <option value="usdt">Оплата USDT</option>
            <option value="promoCode">Промокод</option>
            <option value="cvApply">Заявка на резюме</option>
            <option value="mentor">Заявка ментора</option>
            <option value="changeCurator">Смена куратора</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Статус</label>
          <select
            className="rounded-md border border-gray-300 px-3 py-2"
            value={status || ''}
            onChange={(e) => setStatus((e.target.value as any) || undefined)}
          >
            <option value="">Все</option>
            <option value="pending">В ожидании</option>
            <option value="processed">Обработано</option>
            <option value="rejected">Отклонено</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center">
          <p>Загрузка...</p>
        </div>
      ) : data?.data?.length ? (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">ID</th>
                  <th className="border px-4 py-2 text-left">Тип</th>
                  <th className="border px-4 py-2 text-left">Статус</th>
                  <th className="border px-4 py-2 text-left">Дата создания</th>
                  <th className="border px-4 py-2 text-left">Данные</th>
                  <th className="border px-4 py-2 text-left">Действия</th>
                </tr>
              </thead>
              <tbody>
                {(data.data as any[]).map((submission: FormSubmissionWithVirtuals) => (
                  <tr
                    key={submission.id || String(submission._id)}
                    className="hover:bg-gray-50"
                  >
                    <td className="border px-4 py-2">
                      {submission.id || String(submission._id)}
                    </td>
                    <td className="border px-4 py-2">
                      {submission.formType === 'student' && 'Анкета студента'}
                      {submission.formType === 'usdt' && 'Оплата USDT'}
                      {submission.formType === 'promoCode' && 'Промокод'}
                      {submission.formType === 'cvApply' && 'Заявка на резюме'}
                      {submission.formType === 'mentor' && 'Заявка ментора'}
                      {submission.formType === 'changeCurator' &&
                        'Смена куратора'}
                    </td>
                    <td className="border px-4 py-2">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                          submission.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : submission.status === 'processed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {submission.status === 'pending' && 'В ожидании'}
                        {submission.status === 'processed' && 'Обработано'}
                        {submission.status === 'rejected' && 'Отклонено'}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      {submission.formattedCreatedAt ||
                        (submission.createdAt instanceof Date
                          ? submission.createdAt.toLocaleDateString()
                          : new Date(
                              submission.createdAt
                            ).toLocaleDateString())}
                    </td>
                    <td className="border px-4 py-2">
                      {renderFormDetails(submission)}
                    </td>
                    <td className="border px-4 py-2">
                      {submission.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleStatusChange(
                                submission.id || String(submission._id),
                                'processed'
                              )
                            }
                            className="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
                            disabled={updateStatusMutation.isPending}
                          >
                            Принять
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(
                                submission.id || String(submission._id),
                                'rejected'
                              )
                            }
                            className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                            disabled={updateStatusMutation.isPending}
                          >
                            Отклонить
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="rounded border px-4 py-2 disabled:opacity-50"
            >
              Назад
            </button>

            <span className="self-center">
              Страница {page + 1} из{' '}
              {Math.ceil((data?.pagination?.total || 0) / pageSize)}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={
                !data?.pagination?.total ||
                (page + 1) * pageSize >= data.pagination.total
              }
              className="rounded border px-4 py-2 disabled:opacity-50"
            >
              Вперед
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500">Заявки не найдены</p>
        </div>
      )}
    </div>
  );
}
