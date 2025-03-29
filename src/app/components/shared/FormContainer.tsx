import Image from 'next/image';
import { ReactNode } from 'react';
import { cn } from '~/helpers';
import { motion } from 'framer-motion';

type FormState = 'input' | 'success';

const CheckIcon = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.7307 4.43254C15.0295 4.14571 15.5043 4.15545 15.7911 4.45429L20.4065 9.26303C20.685 9.55324 20.685 10.0115 20.4065 10.3017L15.7911 15.1104C15.5043 15.4093 15.0295 15.419 14.7307 15.1322C14.4318 14.8454 14.4221 14.3706 14.7089 14.0718L18.8258 9.78237L14.7089 5.49297C14.4221 5.19413 14.4318 4.71936 14.7307 4.43254Z"
      fill="#F2F2F2"
    />
  </svg>
);

interface FormContainerProps {
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  submitButtonText?: string;
  submitDisabled?: boolean;
  onSubmit: () => void;
  formState: FormState;
  successTitle?: string;
  successDescription?: string;
  successButtonText?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function FormContainer({
  onClose,
  title,
  description,
  children,
  submitButtonText = 'Продолжить',
  submitDisabled = false,
  onSubmit,
  formState,
  successTitle = 'Письмо отправлено',
  successDescription = 'В ближайшее время с вами свяжется менеджер для обсуждения персональных условий',
  successButtonText = 'Спасибо',
  showBackButton = false,
  onBackClick,
}: FormContainerProps) {
  if (formState === 'success') {
    return (
      <div className="bg-dark-bg border-accent/40 flex h-full w-auto sm:w-105 flex-col border-l z-[10000000000000000] sm:z-0">
        <div className="flex flex-1 flex-col gap-8 px-5 md:px-10 py-8">
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex-col items-center gap-8">
              <Image
                src={'/images/logo/form-logo.svg'}
                alt="Logo"
                width={152}
                height={44}
                className="w-38 hidden sm:flex"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-1 flex-col items-center justify-center gap-10"
            >
              <div className="relative flex items-center justify-center">
                <div className="h-37.5 w-37.5 rounded-full" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute"
                >
                  <svg
                    width="150"
                    height="150"
                    viewBox="0 0 150 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-37.5 w-37.5"
                  >
                    <path
                      d="M0 75C0 116.421 33.5786 150 75 150C116.421 150 150 116.421 150 75C150 33.5786 116.421 0 75 0C33.5786 0 0 33.5786 0 75ZM148.5 75C148.5 115.593 115.593 148.5 75 148.5C34.4071 148.5 1.5 115.593 1.5 75C1.5 34.4071 34.4071 1.5 75 1.5C115.593 1.5 148.5 34.4071 148.5 75Z"
                      fill="#195AF4"
                    />
                    <path
                      d="M61 77.5L68.5 85L88.5 65"
                      stroke="#F2F2F2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-foreground text-2xll text-center"
                >
                  {successTitle}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-secondary text-center text-sm"
                >
                  {successDescription}
                </motion.p>
              </div>
            </motion.div>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={onClose}
            className="bg-primary text-foreground flex h-13 w-full cursor-pointer items-center justify-center rounded-full text-sm transition-colors duration-300 hover:bg-[#1242B2]"
          >
            <span>{successButtonText}</span>
            <CheckIcon />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg border-accent/40 relative flex h-full w-auto sm:w-105 flex-col border-l">
      {showBackButton && (
        <button
          className="absolute top-0 left-0 cursor-pointer px-10 py-11"
          onClick={onBackClick}
        >
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 1L1 9L9 17"
              stroke="#F2F2F2"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <div className="flex flex-1 flex-col gap-8 px-5 md:px-10 py-8 z-[10000000000000000] sm:z-0">
        <div className="flex flex-1 flex-col gap-8">
          <div className="flex-col items-center gap-8">
            <Image
              src={'/images/logo/form-logo.svg'}
              alt="Logo"
              width={152}
              height={44}
              className="w-38 hidden sm:flex"
            />
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-foreground text-2xll">{title}</h2>
              {description && (
                <p className="text-secondary text-center text-sm">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-8">{children}</div>
        </div>

        <button
          disabled={submitDisabled}
          onClick={onSubmit}
          className={cn(
            'bg-primary text-foreground flex h-13 w-full items-center justify-center rounded-full text-sm transition-colors duration-300 hover:bg-[#1242B2]',
            'disabled:hover:bg-primary cursor-pointer disabled:cursor-default disabled:opacity-50'
          )}
        >
          <span>{submitButtonText}</span>
          <CheckIcon />
        </button>
      </div>
    </div>
  );
}
