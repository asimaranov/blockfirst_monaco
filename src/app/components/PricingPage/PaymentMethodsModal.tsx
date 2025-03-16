import { Modal } from '../shared/Modal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '~/helpers';
import { api } from '~/trpc/react';
import LogoSvg from './assets/logo.svg';

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
  },
  {
    name: 'Т-Банк',
    icon: '/images/payment-methods/t-bank.svg',
    description: 'Банковской картой',
    currency: 'RUB',
    type: 't-bank',
    bgColor: 'bg-[#FFDE2A]',
  },
  {
    name: 'Tether (TRC20)',
    icon: '/images/payment-methods/tether.svg',
    description: 'Перевод на кошелек',
    currency: 'USDT',
    type: 'tether',
    bgColor: 'bg-[#26C7B6]',
  },
];

interface PaymentMethodProps {
  method: (typeof paymentMethods)[0];
  price: string;
  onPaymentClick: () => void;
  isLoading?: boolean;
}

const PaymentMethod = ({
  method,
  price,
  onPaymentClick,
  isLoading,
}: PaymentMethodProps) => {
  const isInstallment = method.type === 'installment';
  const statusColor = isInstallment
    ? 'text-[#33CF8E]'
    : 'text-[#9AA6B5] opacity-50';

  return (
    <div className="mx-10 py-8">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Image src={method.icon} alt={method.name} width={41} height={41} />
          <div className="flex flex-col gap-2">
            <h4 className="text-white">{method.name}</h4>
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
        <span className="text-2xll text-white">
          {price}
          {method.type === 'installment' && (
            <span className="text-base">/мес</span>
          )}
        </span>
        <button
          className={cn(
            'flex cursor-pointer items-center rounded-full border border-[#195AF4] px-6 py-2.5 text-sm text-white transition-colors hover:bg-[#195AF4]',
            isLoading ? 'cursor-not-allowed opacity-50' : ''
          )}
          onClick={onPaymentClick}
          disabled={isLoading}
        >
          Оплатить
          {!isLoading ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M14.75 4.97386L19.3654 9.58924L14.75 14.2046"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          ) : (
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.2307 4.43254C14.5295 4.14571 15.0043 4.15545 15.2911 4.45429L19.9065 9.26303C20.185 9.55324 20.185 10.0115 19.9065 10.3017L15.2911 15.1104C15.0043 15.4093 14.5295 15.419 14.2307 15.1322C13.9318 14.8454 13.9221 14.3706 14.2089 14.0718L18.3258 9.78237L14.2089 5.49297C13.9221 5.19413 13.9318 4.71936 14.2307 4.43254Z"
                fill="white"
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
        return `₽${formatter.format(tariff.price.monthly)}`;
      case 'tether':
        return '1700 USDT';
      default:
        return `₽${formatter.format(tariff.price.total)}`;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={cn(
          'h-screen w-[420px] border-l border-[#282D33]/50 bg-[#0F1115]'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo and title */}
          <div className="flex flex-col items-center gap-8 px-10 pt-8">
            <Image src={LogoSvg} alt="Logo" width={152} height={44} />

            <div className="flex flex-col items-center gap-4 text-center pb-8">
              <h3 className="text-2xll text-white">Выбор метода оплаты</h3>
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
              />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-center gap-2 pb-8 text-sm text-[#9AA6B5]">
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.4974 1.60352C4.51736 1.60352 2.10156 4.01931 2.10156 6.99935C2.10156 9.97939 4.51736 12.3952 7.4974 12.3952C10.4774 12.3952 12.8932 9.97939 12.8932 6.99935C12.8932 4.01931 10.4774 1.60352 7.4974 1.60352ZM1.22656 6.99935C1.22656 3.53606 4.03411 0.728516 7.4974 0.728516C10.9607 0.728516 13.7682 3.53606 13.7682 6.99935C13.7682 10.4626 10.9607 13.2702 7.4974 13.2702C4.03411 13.2702 1.22656 10.4626 1.22656 6.99935ZM7.4974 5.97852C7.73902 5.97852 7.9349 6.17439 7.9349 6.41602V9.33268C7.9349 9.57431 7.73902 9.77018 7.4974 9.77018C7.25577 9.77018 7.0599 9.57431 7.0599 9.33268V6.41602C7.0599 6.17439 7.25577 5.97852 7.4974 5.97852ZM7.4974 5.24935C7.81956 5.24935 8.08073 4.98818 8.08073 4.66602C8.08073 4.34385 7.81956 4.08268 7.4974 4.08268C7.17523 4.08268 6.91406 4.34385 6.91406 4.66602C6.91406 4.98818 7.17523 5.24935 7.4974 5.24935Z"
                fill="#9AA6B5"
              />
            </svg>

            <span className="text-xs">
              Не подходят методы оплаты?{' '}
              <span className="text-foreground cursor-pointer underline">
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
