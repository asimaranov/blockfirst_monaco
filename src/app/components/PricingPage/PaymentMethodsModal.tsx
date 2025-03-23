import { Modal } from '../shared/Modal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '~/helpers';
import { api } from '~/trpc/react';
import { formatPrice } from '~/app/lib/utils';
import { InfoPopover } from '../shared/InfoPopover';

interface PaymentMethodsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tariff: {
    name: string;
    price?: {
      monthly: number;
      total: number;
      installments?: number;
    };
  };
}

const paymentMethods = [
  {
    name: 'Долями',
    icon: '/images/payment-methods/dolyami.svg',
    description: 'Оплата от 3 до 10 месяцев',
    currency: 'RUB',
    type: 'installment',
    bgColor: 'bg-[#195AF4]',
    enabled: false,
  },
  {
    name: 'Т-Банк',
    icon: '/images/payment-methods/t-bank.svg',
    description: 'Банковской картой',
    currency: 'RUB',
    type: 't-bank',
    bgColor: 'bg-[#FFDE2A]',
    enabled: true,
  },
  {
    name: 'Tether (TRC20)',
    icon: '/images/payment-methods/tether.svg',
    description: 'Перевод на кошелек',
    currency: 'USDT',
    type: 'tether',
    bgColor: 'bg-[#26C7B6]',
    enabled: false,
  },
];

interface PaymentMethodProps {
  method: (typeof paymentMethods)[0];
  price: string;
  onPaymentClick: () => void;
  isLoading?: boolean;
  isEnabled: boolean;
}

const PaymentMethod = ({
  method,
  price,
  onPaymentClick,
  isLoading,
  isEnabled,
}: PaymentMethodProps) => {
  const isInstallment = method.type === 'installment';
  const statusColor = isInstallment
    ? 'text-[#33CF8E]'
    : 'text-[#9AA6B5] opacity-50';

  return (
    <div className="mx-10 py-8">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Image src={method.icon} alt={method.name} width={41} height={41} className='w-10 h-10' />
          <div className="flex flex-col gap-2">
            <p className="text-foreground text-base">{method.name}</p>
            <p className="text-xs text-[#9AA6B5]">{method.description}</p>
          </div>
        </div>
        <div className={cn('flex items-center gap-1', statusColor || '')}>
          <div className="h-1 w-1 rounded-full bg-current"></div>
          <span className="text-xs">
            {isInstallment ? 'Рассрочка' : 'Оплата сразу'}
          </span>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-2xll text-foreground">
          {price}
          {method.type === 'installment' && (
            <span className="text-base">/мес</span>
          )}
        </span>
        <button
          className={cn(
            'flex cursor-pointer items-center rounded-full border border-[#195AF4] px-6 py-2.5 text-sm text-foreground transition-colors hover:bg-[#195AF4]',
            !isEnabled ? 'cursor-not-allowed opacity-50' : '',
            'text-sm'
          )}
          onClick={onPaymentClick}
          disabled={isLoading || !isEnabled}
        >
          Оплатить
          {!isLoading ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className='w-5 h-5'>
              <path
                d="M14.75 4.97386L19.3654 9.58924L14.75 14.2046"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn('ml-2', isLoading && 'animate-spin')}
            >
              <path
                opacity="0.4"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.25 3.33398C9.25 2.91977 9.58579 2.58398 10 2.58398C14.0961 2.58398 17.4167 5.90454 17.4167 10.0007C17.4167 10.4149 17.0809 10.7507 16.6667 10.7507C16.2525 10.7507 15.9167 10.4149 15.9167 10.0007C15.9167 6.73297 13.2677 4.08398 10 4.08398C9.58579 4.08398 9.25 3.7482 9.25 3.33398Z"
                fill="#F2F2F2"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.36269 6.36564C4.73362 6.54998 4.88489 7.00012 4.70055 7.37105C4.30737 8.16222 4.08594 9.0543 4.08594 10.0002C4.08594 13.2679 6.73492 15.9169 10.0026 15.9169C13.2703 15.9169 15.9193 13.2679 15.9193 10.0002C15.9193 9.58602 16.2551 9.25024 16.6693 9.25024C17.0835 9.25024 17.4193 9.58602 17.4193 10.0002C17.4193 14.0964 14.0987 17.4169 10.0026 17.4169C5.90649 17.4169 2.58594 14.0964 2.58594 10.0002C2.58594 8.81753 2.86333 7.69745 3.35728 6.7035C3.54162 6.33257 3.99176 6.1813 4.36269 6.36564Z"
                fill="#F2F2F2"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

const PaymentMethodsModal = ({
  isOpen,
  onClose,
  tariff,
}: PaymentMethodsModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    mutate: createPaymentLink,
    isPending,
    isError,
    error,
    data,
  } = api.tinkoff.createPaymentLink.useMutation({
    onSuccess: () => {
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });

  useEffect(() => {
    if (data) {
      const newWindow = window.open(data, '_blank');
      newWindow?.focus();
    }
  }, [data]);

  const handlePayment = (type: string) => {
    // Handle payment based on type
    if (type === 't-bank') {
      createPaymentLink({
        tariff: tariff.name,
      });
    }
    // Add other payment type handlers
  };

  const getPrice = (method: (typeof paymentMethods)[0]) => {
    if (!tariff.price) return '';
    const formatter = new Intl.NumberFormat('fr-FR');

    switch (method.type) {
      case 'installment':
        return formatPrice(tariff.price.monthly);
      case 'tether':
        return `${formatPrice(tariff.price.total / 90, '')} USDT`;
      default:
        return formatPrice(tariff.price.total);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={cn(
          'h-screen w-105 border-l border-[#282D33]/50 bg-[#0F1115]'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo and title */}
          <div className="flex flex-col items-center gap-8 px-10 pt-8">
            <Image src={'/images/logo/form-logo.svg'} alt="Logo" width={152} height={44} className='w-38' />
            <div className="flex flex-col items-center gap-4 pb-8 text-center">
              <h3 className="text-2xll text-foreground">Выбор метода оплаты</h3>
              <p className="text-sm text-[#9AA6B5]">
                Пожалуйста, выберите предпочтительный метод оплаты тарифа.
                Доступны рассрочка, оплата через Т-банк и Tether
              </p>
            </div>
          </div>

          <div className="text-secondary/50 w-full bg-[#14171C] py-3.5 pl-8 text-xs uppercase">
            способы оплаты
          </div>

          {/* Payment methods */}
          <div className="flex flex-col divide-y divide-[#282D33]">
            {paymentMethods.map((method) => (
              <PaymentMethod
                key={method.type}
                method={method}
                price={getPrice(method)}
                onPaymentClick={() => handlePayment(method.type)}
                isLoading={isLoading && method.type === 't-bank'}
                isEnabled={method.enabled}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-center gap-2 pb-8 text-sm text-[#9AA6B5]">
            <InfoPopover title={''} content={''} />

            <span className="text-xs">
              Не подходят методы оплаты?{' '}
              <span className="text-foreground cursor-pointer underline hover:opacity-50">
                Написать нам
              </span>
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentMethodsModal;
