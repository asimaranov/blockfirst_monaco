'use client';

import { useState, FormEvent, useEffect } from 'react';
import { api } from '~/trpc/react';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }, [message]);

  const subscribeMutation = api.subscribers.subscribe.useMutation({
    onSuccess: (data) => {
      setMessage({ text: data.message, type: 'success' });
      setEmail('');
      setIsSubmitting(false);
    },
    onError: (error) => {
      setMessage({
        text:
          error.message.includes('validation') ? 'Указан неверный ардес почты. Исправьте его и попробуйте снова.' : 'Произошла ошибка. Пожалуйста, попробуйте позже.',
        type: 'error',
      });
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage({ text: 'Пожалуйста, введите email', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    subscribeMutation.mutate({ email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <input
          type="email"
          placeholder="Электронная почта"
          className="text-foreground placeholder:text-secondary h-full w-full bg-transparent text-sm placeholder:opacity-50 focus:outline-hidden"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-shrink-0"
          aria-label="Подписаться на рассылку"
        >
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`text-secondary h-5 w-5 cursor-pointer ${isSubmitting ? 'opacity-50' : 'hover:opacity-75'}`}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.401 4.46943C11.6939 4.17653 12.1688 4.17653 12.4617 4.46942L17.4617 9.46937C17.6023 9.61003 17.6814 9.80079 17.6814 9.9997C17.6814 10.1986 17.6023 10.3894 17.4617 10.53L12.4617 15.53C12.1688 15.8229 11.6939 15.8229 11.401 15.53C11.1081 15.2371 11.1081 14.7623 11.401 14.4694L15.1207 10.7497H4.07422C3.66001 10.7497 3.32422 10.4139 3.32422 9.99971C3.32422 9.58549 3.66001 9.24971 4.07422 9.24971H15.1207L11.401 5.53009C11.1081 5.2372 11.1081 4.76232 11.401 4.46943Z"
              fill="#F2F2F2"
            />
          </svg>
        </button>
      </div>
      <div className="h-[1px] w-full bg-[#282F33]"></div>

      {message && (
        <div
          className={`text-xs flex flex-row items-center gap-2 ${message.type === 'success' ? 'text-success' : 'text-error'}`}
        >
          {message.type === 'success' && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            className='w-3.5 h-3.5'
          >
            <path
              d="M3 7.00009L5.5 9.50009L11 4.00009"
              stroke="#33CF8E"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              />
            </svg>
          )}

          {message.text}
        </div>
      )}
    </form>
  );
}
