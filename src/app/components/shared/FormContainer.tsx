import Image from 'next/image';
import { ReactNode } from 'react';
import { cn } from '~/helpers';
import { motion } from 'motion/react';
import Link from 'next/link';
import InfoIcon from 'public/misc/info-icon.svg';
import FormMobileControls from './FormMobileControls';

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

const LoadingIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('ml-2', 'animate-spin', 'h-5 w-5')}
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
  );
};

interface FormContainerProps {
  kind?: 'form' | 'info';
  onClose: () => void;
  title: string;
  description?: string;
  bottomText?: BottomTextProps;
  children: ReactNode;
  submitButtonText?: string;
  submitDisabled?: boolean;
  submitLoading?: boolean;
  onSubmit: () => void;
  formState: FormState;
  successTitle?: string;
  successDescription?: string;
  successButtonText?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

interface BottomTextProps {
  main: string;
  secondary: string;
  link: string;
}

export default function FormContainer({
  kind = 'form',
  onClose,
  title,
  description,
  bottomText,
  children,
  submitButtonText = 'Продолжить',
  submitDisabled = false,
  submitLoading = false,
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
      <div className="bg-dark-bg border-accent/40 z-[10000000000000000] flex h-full w-auto flex-col border-l-0 sm:z-0 sm:w-105 sm:border-l">
        <FormMobileControls
          showBackButton={showBackButton}
          onBackClick={onBackClick}
          onClose={onClose}
        />
        <div className="flex flex-1 flex-col gap-8 px-5 py-8 md:px-10">
          <div className="flex flex-1 flex-col gap-8">
            <div className="hidden flex-col items-center gap-8 sm:flex">
              <Image
                src={'/images/logo/form-logo.svg'}
                alt="Logo"
                width={152}
                height={44}
                className="w-38"
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
    <div className="bg-dark-bg border-accent/40 relative flex h-full w-auto flex-col border-l-0 sm:w-105 sm:border-l">
      <FormMobileControls
        showBackButton={showBackButton}
        onBackClick={onBackClick}
        onClose={onClose}
      />
      {showBackButton && (
        <button
          className="absolute top-0 left-0 z-[10000000000000001] hidden cursor-pointer px-10 py-11 sm:block"
          onClick={onBackClick}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.09897 4.46967C8.80608 4.17678 8.33121 4.17678 8.03831 4.46967L3.03831 9.46962C2.89766 9.61027 2.81864 9.80104 2.81864 9.99995C2.81864 10.1989 2.89766 10.3896 3.03831 10.5303L8.03831 15.5303C8.3312 15.8232 8.80608 15.8232 9.09897 15.5303C9.39186 15.2374 9.39186 14.7625 9.09897 14.4696L5.3793 10.75H16.4258C16.84 10.75 17.1758 10.4142 17.1758 9.99995C17.1758 9.58574 16.84 9.24995 16.4258 9.24995H5.37931L9.09897 5.53033C9.39186 5.23744 9.39186 4.76257 9.09897 4.46967Z"
              fill="#F2F2F2"
            />
          </svg>
        </button>
      )}
      <div
        className={cn(
          'z-[10000000000000000] flex flex-1 flex-col px-5 py-0 pb-5 sm:z-0 sm:py-8 sm:pb-8 md:px-10',
          bottomText && 'pb-6'
        )}
      >
        <div className="flex flex-1 flex-col gap-6 sm:gap-8">
          <div className="flex flex-col items-center gap-8">
            <Image
              src={'/images/logo/form-logo.svg'}
              alt="Logo"
              width={152}
              height={44}
              className="hidden w-38 sm:flex"
            />
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-foreground sm:text-2xll text-xl">{title}</h2>
              {description && (
                <p className="text-secondary text-center text-sm">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-8">{children}</div>
        </div>

        {(kind || 'form') == 'form' && (
          <button
            disabled={submitDisabled}
            onClick={onSubmit}
            className={cn(
              'bg-primary text-foreground flex h-13 w-full items-center justify-center rounded-full text-sm transition-colors duration-300 hover:bg-[#1242B2]',
              'disabled:hover:bg-primary cursor-pointer disabled:cursor-default disabled:opacity-50',
              submitLoading && 'cursor-wait bg-[#1242B2]'
            )}
          >
            <span>{submitButtonText}</span>
            {submitLoading ? <LoadingIcon /> : <CheckIcon />}
          </button>
        )}
      </div>
      {bottomText && kind !== 'info' && (
        <div className="flex h-8 w-full items-center justify-center gap-1 bg-[#14171C] text-xs shrink-0">
          <span className="text-secondary">{bottomText.main}</span>
          <Link
            href={bottomText.link}
            className="text-foreground cursor-pointer underline hover:opacity-50"
          >
            {bottomText.secondary}
          </Link>
        </div>
      )}
      {bottomText && kind == 'info' && (
        <div className="text-secondary mt-auto flex w-full flex-row justify-center gap-1 pb-8 text-xs">
          <span className="flex flex-row gap-1">
            <Image
              src={'/images/misc/info-icon.svg'}
              alt="Info"
              width={15}
              height={14}
              className="h-3.5 w-3.5"
            />
            {bottomText.main}
          </span>
          <Link
            href={bottomText.link}
            className="text-foreground cursor-pointer underline hover:opacity-50"
          >
            {bottomText.secondary}
          </Link>
        </div>
      )}
    </div>
  );
}
