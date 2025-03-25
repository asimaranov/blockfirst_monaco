'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '~/helpers';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import CopyIcon from './assets/copy_icon';
import CopiedIcon from './assets/copied_icon.svg';
import BackIcon from '../AuthPage/assets/back_icon';
import CopyButton from '../shared/CopyButton/CopyButton';
interface StudentFormProps {
  onClose: () => void;
}

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

export default function UsdtForm({ onClose }: StudentFormProps) {
  const [success, setSuccess] = useState(false);

  const trc20Address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // Recipient's TRON address
  const amount = 1000000; // Amount in smallest unit (e.g., 1 USDT = 1000000)

  const paymentUri = `tron:${trc20Address}?amount=${amount}`;
  console.log(paymentUri);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(trc20Address);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  const handleSubmit = () => {
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="bg-dark-bg border-accent/40 flex h-full w-105 flex-col border-l">
        <div className="flex flex-1 flex-col gap-8 px-10 py-8">
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col items-center gap-8">
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
                  Тариф оплачен
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-secondary text-center text-sm"
                >
                  Выбранный тариф успешно оплачен. Желаем вам приятного
                  обучения!
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
            <span>Спасибо</span>
            <CheckIcon />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg border-accent/40 relative flex h-full w-105 flex-col border-l">
      <button
        className="absolute top-0 left-0 cursor-pointer px-10 py-11"
        onClick={onClose}
      >
        <BackIcon />
      </button>
      <div className="flex flex-1 flex-col gap-8 pt-8 pb-6">
        <div className="flex flex-1 flex-col gap-8 px-10">
          <div className="flex flex-col items-center gap-8">
            <Image
              src={'/images/logo/form-logo.svg'}
              alt="Logo"
              width={152}
              height={44}
              className="w-38"
            />
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-foreground text-2xll">Оплата курса</h2>
              <p className="text-secondary text-center text-sm">
                Мы создали для вас уникальный QR-код и адрес для осуществления
                оплаты курса
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6">
            <div className="relative flex h-82 w-85 flex-col items-center justify-center gap-4">
              <div className="bg-foreground flex items-center justify-center rounded-3xl p-5">
                <QRCodeSVG
                  value={paymentUri}
                  size={200}
                  fgColor="#01050d"
                  bgColor="#f2f2f2"
                  level="L" // Error correction level
                  className="h-50 w-50"
                />
              </div>
              <svg
                width="340"
                height="328"
                viewBox="0 0 340 328"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute h-82 w-85"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.4 8H60V9H14.4C11.378 9 9.19174 9.00137 7.49535 9.18517C5.81768 9.36693 4.73811 9.71744 3.88553 10.3369C3.29127 10.7686 2.76866 11.2912 2.33691 11.8855C1.71747 12.7381 1.36696 13.8177 1.18519 15.4953C1.0014 17.1917 1.00003 19.3779 1.00003 22.4V63.9417H2.57897e-05V22.4C2.57897e-05 16.4004 2.57897e-05 13.4006 1.52789 11.2977C2.02133 10.6186 2.61859 10.0213 3.29774 9.52786C5.40067 8 8.40045 8 14.4 8ZM0 271L2.57897e-05 313.6C2.57897e-05 319.6 2.57897e-05 322.599 1.52789 324.702C2.02133 325.381 2.61859 325.979 3.29774 326.472C5.40067 328 8.40045 328 14.4 328H325.6C331.6 328 334.599 328 336.702 326.472C337.381 325.979 337.979 325.381 338.472 324.702C340 322.599 340 319.6 340 313.6L340 271H339V313.6C339 316.622 338.999 318.808 338.815 320.505C338.633 322.182 338.283 323.262 337.663 324.115C337.231 324.709 336.709 325.231 336.115 325.663C335.262 326.283 334.182 326.633 332.505 326.815C330.808 326.999 328.622 327 325.6 327H280V327.941H60V327H14.4C11.378 327 9.19174 326.999 7.49535 326.815C5.81768 326.633 4.73811 326.283 3.88553 325.663C3.29127 325.231 2.76866 324.709 2.33691 324.115C1.71747 323.262 1.36696 322.182 1.18519 320.505C1.0014 318.808 1.00003 316.622 1.00003 313.6V271H0ZM339 63.9416H340L340 22.4C340 16.4004 340 13.4006 338.472 11.2977C337.979 10.6186 337.381 10.0213 336.702 9.52786C334.599 8 331.6 8 325.6 8H280V9H325.6C328.622 9 330.808 9.00137 332.505 9.18517C334.182 9.36693 335.262 9.71744 336.115 10.3369C336.709 10.7686 337.231 11.2912 337.663 11.8855C338.283 12.7381 338.633 13.8177 338.815 15.4953C338.999 17.1917 339 19.3779 339 22.4V63.9416Z"
                  fill="#282D33"
                />
                <path
                  d="M129.204 9.036H130.272C130.416 10.392 131.328 11.184 132.816 11.184C134.088 11.184 134.868 10.608 134.868 9.684C134.868 8.58 133.8 8.352 132.432 8.076C130.968 7.788 129.408 7.44 129.408 5.724C129.408 4.248 130.548 3.276 132.408 3.276C134.46 3.276 135.66 4.536 135.792 6.18H134.712C134.592 5.088 133.776 4.236 132.384 4.236C131.256 4.236 130.488 4.836 130.488 5.688C130.488 6.708 131.616 6.936 132.852 7.188C134.436 7.5 135.948 7.848 135.948 9.612C135.948 11.208 134.628 12.144 132.792 12.144C130.62 12.144 129.288 10.848 129.204 9.036ZM136.614 8.76C136.614 6.756 137.85 5.388 139.746 5.388C141.306 5.388 142.422 6.324 142.722 7.776H141.642C141.402 6.876 140.742 6.324 139.746 6.324C138.438 6.324 137.67 7.296 137.67 8.76C137.67 10.224 138.438 11.208 139.758 11.208C140.802 11.208 141.474 10.584 141.678 9.6H142.758C142.494 11.136 141.354 12.144 139.734 12.144C137.85 12.144 136.614 10.764 136.614 8.76ZM144.42 10.26C144.42 10.932 144.972 11.244 145.776 11.244C147.096 11.244 147.96 10.416 147.96 9.336V8.868L145.656 9.276C144.72 9.444 144.42 9.756 144.42 10.26ZM143.34 10.308C143.34 9.288 144.012 8.688 145.512 8.424L147.96 8.004V7.944C147.96 6.888 147.336 6.324 146.256 6.324C145.2 6.324 144.612 6.864 144.468 7.764H143.412C143.544 6.372 144.564 5.388 146.28 5.388C148.008 5.388 149.016 6.384 149.016 8.028V12H148.08L148.044 10.968C147.66 11.64 146.676 12.144 145.536 12.144C144.24 12.144 143.34 11.496 143.34 10.308ZM150.084 12V5.532H151.02L151.056 6.696C151.392 5.868 152.16 5.388 153.18 5.388C154.62 5.388 155.508 6.324 155.508 7.836V12H154.476V8.22C154.476 6.972 153.972 6.324 152.952 6.324C151.848 6.324 151.116 7.08 151.116 8.22V12H150.084ZM158.68 7.716C158.68 4.992 160.324 3.276 162.796 3.276C165.292 3.276 166.936 4.992 166.936 7.716C166.936 9.252 166.42 10.452 165.532 11.208L166.828 12.912H165.484L164.716 11.748C164.152 12 163.516 12.144 162.796 12.144C160.324 12.144 158.68 10.44 158.68 7.716ZM159.76 7.716C159.76 9.852 160.972 11.184 162.796 11.184C164.644 11.184 165.856 9.852 165.856 7.716C165.856 5.556 164.632 4.236 162.796 4.236C160.984 4.236 159.76 5.568 159.76 7.716ZM167.945 12V3.42H171.617C173.561 3.42 174.569 4.344 174.569 5.928C174.569 7.2 173.909 8.04 172.649 8.316L174.821 12H173.609L171.581 8.424H168.977V12H167.945ZM168.977 7.464H171.545C172.841 7.464 173.489 7.02 173.489 5.928C173.489 4.836 172.829 4.38 171.545 4.38H168.977V7.464ZM175.465 9.048V8.112H179.641V9.048H175.465ZM180.501 7.716C180.501 4.992 182.097 3.276 184.497 3.276C186.537 3.276 187.989 4.464 188.385 6.456H187.281C186.933 5.052 185.913 4.236 184.485 4.236C182.745 4.236 181.581 5.568 181.581 7.716C181.581 9.852 182.745 11.184 184.497 11.184C185.985 11.184 187.029 10.272 187.329 8.748H188.433C188.109 10.872 186.633 12.144 184.497 12.144C182.097 12.144 180.501 10.44 180.501 7.716ZM190.205 8.76C190.205 10.224 190.985 11.208 192.293 11.208C193.601 11.208 194.369 10.224 194.369 8.76C194.369 7.308 193.601 6.324 192.293 6.324C190.985 6.324 190.205 7.308 190.205 8.76ZM189.149 8.76C189.149 6.756 190.397 5.388 192.293 5.388C194.189 5.388 195.425 6.756 195.425 8.76C195.425 10.764 194.189 12.144 192.293 12.144C190.397 12.144 189.149 10.764 189.149 8.76ZM201.185 8.748C201.185 7.236 200.417 6.324 199.145 6.324C197.897 6.324 197.201 7.2 197.201 8.76C197.201 10.32 197.897 11.208 199.145 11.208C200.417 11.208 201.185 10.272 201.185 8.748ZM202.193 12H201.257L201.221 10.896C200.837 11.724 199.937 12.144 198.989 12.144C197.285 12.144 196.145 10.788 196.145 8.772C196.145 6.756 197.285 5.388 198.989 5.388C199.937 5.388 200.765 5.808 201.161 6.564V3.18H202.193V12ZM203.106 8.76C203.106 6.756 204.33 5.388 206.202 5.388C208.026 5.388 209.238 6.684 209.238 8.604V9.12H204.174C204.294 10.38 205.038 11.208 206.238 11.208C207.15 11.208 207.774 10.74 208.05 9.96H209.142C208.77 11.292 207.69 12.144 206.214 12.144C204.33 12.144 203.106 10.764 203.106 8.76ZM204.198 8.256H208.158C208.038 7.08 207.354 6.324 206.214 6.324C205.074 6.324 204.354 7.08 204.198 8.256Z"
                  fill="url(#paint0_linear_2008_35882)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2008_35882"
                    x1="135.451"
                    y1="21.9231"
                    x2="204.122"
                    y2="-22.7312"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F46919" />
                    <stop offset="1" stop-color="#F419AB" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="text-secondary opacity flex h-12 w-full items-center justify-between rounded-[0.463vw] bg-[#14171C] px-5 text-center text-sm">
              0x9702230a8ea536...3d4df4a8c7
              <CopyButton />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-10">
          <div className="text-2xll flex w-full flex-col items-center leading-8">
            1700 USDT
          </div>
          <div className="bg-accent h-px w-full"></div>
          <div className="flex w-full flex-row items-center justify-center gap-1 pb-5 text-sm">
            <span className="text-secondary">Валюта –</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <g clip-path="url(#clip0_1444_21002)">
                <circle cx="8" cy="8" r="8" fill="#26C5A8" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.79688 8.27064C8.75246 8.27397 8.52299 8.28766 8.01111 8.28766C7.60397 8.28766 7.31491 8.27545 7.21349 8.27064C5.6401 8.20142 4.4657 7.92753 4.4657 7.5996C4.4657 7.27167 5.6401 6.99815 7.21349 6.92783V7.99785C7.31639 8.00526 7.611 8.02265 8.01814 8.02265C8.5067 8.02265 8.75135 8.0023 8.7954 7.99822V6.92857C10.3655 6.99852 11.5373 7.27241 11.5373 7.5996C11.5373 7.92679 10.3658 8.20068 8.7954 8.27027L8.79688 8.27064ZM8.79727 6.81803V5.86053H10.9884V4.40039H5.02276V5.86053H7.21352V6.81766C5.43285 6.89946 4.09375 7.25219 4.09375 7.67487C4.09375 8.09755 5.43285 8.4499 7.21352 8.53207V11.6004H8.7969V8.53096C10.5735 8.44916 11.9104 8.09681 11.9104 7.6745C11.9104 7.25219 10.5746 6.89983 8.7969 6.81766L8.79727 6.81803Z"
                  fill="#0F1217"
                />
              </g>
              <defs>
                <clipPath id="clip0_1444_21002">
                  <rect width="16" height="16" rx="8" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Tether (TRC20)
          </div>

          <button
            onClick={handleSubmit}
            className={cn(
              'text-foreground flex h-13 w-full items-center justify-center rounded-full bg-[#1242B2] text-sm transition-colors duration-300 hover:bg-[#1242B2]',
              'disabled:hover:bg-primary cursor-pointer disabled:cursor-default disabled:opacity-50'
            )}
          >
            <span>Ищем транзакцию</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn('ml-2', 'animate-spin', 'w-5 h-5')}
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
          </button>
        </div>
      </div>
      <div className="flex h-8 w-full items-center justify-center gap-1 bg-[#14171C] text-xs">
        <span className="text-secondary">Не прошла оплата?</span>
        <span className="text-foreground cursor-pointer underline hover:opacity-50">
          Напишите нам
        </span>
      </div>
    </div>
  );
}
