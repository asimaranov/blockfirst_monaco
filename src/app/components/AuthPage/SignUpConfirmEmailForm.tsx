'use client';

import { useEffect, useRef, useState } from 'react';
import { AuthStep } from '.';
import AuthButton from './button';
import { api } from '~/trpc/react';
import { cn } from '~/helpers';
import { IAuthPageState } from '.';
import ErrorNoticeSvg from './assets/error_notice.svg';
import Image from 'next/image';
import { authClient } from '~/server/auth/client';
interface IActiveInput {
  index: number;
  clear: boolean;
}

const TIMER_START = 30;

export default function SignUpConfirmEmailForm({
  authState,
  setAuthStep,
}: {
  authState: IAuthPageState;
  setAuthStep: (step: AuthStep) => void;
}) {
  const [activeInput, setActiveInput] = useState<IActiveInput>({
    index: 0,
    clear: false,
  });
  const [timer, setTimer] = useState(TIMER_START);
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    setTimeout(() => {
      if (isError) {
        setIsError(false);
      }
    }, 5000);
  }, [isError]);

  useEffect(() => {
    if (activeInput.index <= 4) {
      setTimeout(() => {
        if (activeInput.clear) {
          inputRefs.current[activeInput.index]!.value = '';
        }
        inputRefs.current[activeInput.index]!.focus();
      }, 100);
    }
  }, [activeInput]);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  return (
    <>
      <div className="flex h-full flex-col">
        <h1 className="text-center text-[40px] font-bold uppercase leading-[48px] tracking-tight text-white">
          Подтвердите
          <br />
          Ваш e-mail
        </h1>
        <p className="mb-[40px] mt-6 text-center text-[14px] leading-5 text-secondary">
          Мы выслали на ваш электронный адрес ссылку для подтверждения.
        </p>
        <div className="relative">
          <div className="relative flex flex-row gap-[16px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <input
                ref={(node: HTMLInputElement | null) => {
                  if (node) inputRefs.current[index] = node;
                }}
                key={index}
                className={cn(
                  'h-[58px] w-[58px] border-b bg-transparent text-center text-[24px] text-foreground placeholder:text-center focus:outline-none',
                  isError && 'border-error'
                )}
                placeholder={'-'}
                type="text"
                maxLength={1}
                onFocus={() => {
                  setActiveInput({
                    index: index,
                    clear: false,
                  });
                }}
                onKeyDown={(e) => {
                  const newDigit = e.key.replace(/[^0-9]/g, '');

                  if (e.key === 'Backspace') {
                    if (index > 0) {
                      e.currentTarget.value = '';
                      setActiveInput({
                        index: activeInput.index - 1,
                        clear: false,
                      });
                    }
                  }

                  if (newDigit.length > 0) {
                    e.currentTarget.value = e.key;
                    setActiveInput({
                      index: activeInput.index + 1,
                      clear: true,
                    });
                  }
                }}
                onPaste={(e) => {
                  const pasteData = e.clipboardData.getData('text/plain');
                  const sanitizedData = pasteData.replace(/[^0-9]/g, '');

                  for (let i = 0; i < Math.min(sanitizedData.length, 5); i++) {
                    if (inputRefs.current[i]) {
                      inputRefs.current[i]!.value = sanitizedData[i] || '';
                    }
                  }
                }}
              ></input>
            ))}
          </div>
          {isError && (
            <div className="absolute flex flex-row items-center gap-[8px] pt-[12px] text-[12px] text-error">
              <Image
                src={ErrorNoticeSvg}
                alt={''}
                className="h-[14px] w-[14px]"
              ></Image>
              Вы ввели неправильный код, попробуйте снова
            </div>
          )}
        </div>
        <div className="flex w-full flex-col items-center gap-[16px] pt-[64px]">
          <span className="text-[18px] text-foreground">
            {String(Math.floor(timer / 60)).padStart(2, '0')}:
            {String(timer % 60).padStart(2, '0')}
          </span>
          <div className="flex flex-row gap-[4px]">
            <span className="text-[14px] text-foreground">
              Не получили код?
            </span>
            <button
              className={cn(
                'text-[14px] text-primary',
                timer > 0 && 'opacity-50'
              )}
              disabled={timer > 0}
              onClick={async () => {
                if (timer > 0) return;
                const requestEmailCode = await authClient.emailOtp.sendVerificationOtp({
                  email: authState.email!,
                  type: 'email-verification',
                });
                console.log('requestEmailCode', requestEmailCode)
                if (requestEmailCode?.error) {
                  setIsError(true);
                } else {
                  setTimer(TIMER_START);
                }
              }}
            >
              Отправить
            </button>
          </div>
        </div>

        <div className="flex-grow"></div>

        <AuthButton
          text="Продолжить"
          state="active"
          onClick={async () => {
            const wholeCode = inputRefs.current
              .map((input) => input.value)
              .join('');
            console.log('signup confirm email', authState.email, wholeCode);

            try {
              const creds = await authClient.emailOtp.verifyEmail({
                email: authState.email!,
                otp: wholeCode,
              });
              if (creds?.error) {
                console.log('Error in creds signup', creds);

                setIsError(true);
              } else {
                setAuthStep(AuthStep.AccountCreation);
              }
            } catch (error) {
              setIsError(true);
            }
          }}
        />
      </div>
    </>
  );
}
