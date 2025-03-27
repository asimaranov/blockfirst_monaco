'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { AuthStep, ITopButtonState } from '.';
import AuthButton from './button';
import { cn } from '~/helpers';
import { IAuthPageState } from '.';
import ErrorNoticeSvg from './assets/error_notice.svg';
import Image from 'next/image';
import { authClient } from '~/server/auth/client';
import { useRouter } from 'next/navigation';
import MainHeading from './components/MainHeading';
interface IActiveInput {
  index: number;
  clear: boolean;
}

const TIMER_START = 30;

export default function ConfirmEmailForm({
  type,
  authState,
  setAuthStep,
  setTopButtonState,
  setResetPasswordOtp,
}: {
  type: 'email-verification' | 'forget-password';
  authState: IAuthPageState;
  setAuthStep: (step: AuthStep) => void;
  setTopButtonState: (state: ITopButtonState) => void;
  setResetPasswordOtp: (otp: string) => void;
}) {
  const [activeInput, setActiveInput] = useState<IActiveInput>({
    index: 0,
    clear: false,
  });
  const [timer, setTimer] = useState(TIMER_START);
  const [isError, setIsError] = useState(false);
  const [wholeCode, setWholeCode] = useState('');
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [bottomButtonState, setBottomButtonState] = useState<
    'active' | 'loading' | 'disabled'
  >('active');
  const router = useRouter();

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

  const updateWholeCode = () => {
    setTimeout(() => {
      setWholeCode(inputRefs.current.map((input) => input.value).join(''));
    }, 10);
  };

  const handleContinueForgotPassword = async () => {
    setBottomButtonState('loading');
    const wholeCode = inputRefs.current.map((input) => input.value).join('');

    try {
      // const creds = await authClient.emailOtp.resetPassword({
      //   email: authState.email!,
      //   password: '',
      //   otp: wholeCode,
      // });
      // if (creds?.error?.code === 'INVALID_PASSWORD') {
      setResetPasswordOtp(wholeCode);
      setAuthStep(AuthStep.ForgotPasswordEnterNewPassword);
      // } else {
      //   console.log('Error in creds signup', creds);
      //   setIsError(true);
      // }
    } catch (error) {
      setIsError(true);
    } finally {
      setBottomButtonState('active');
    }
  };
  const handleContinueSignup = async () => {
    setBottomButtonState('loading');
    const wholeCode = inputRefs.current.map((input) => input.value).join('');

    try {
      const creds = await authClient.emailOtp.verifyEmail({
        email: authState.email!,
        otp: wholeCode,
      });
      if (creds?.error) {
        console.log('Error in creds signup', creds);

        setIsError(true);
      } else {
        // setAuthStep(AuthStep.AccountCreation);
        router.push('/dashboard');
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setBottomButtonState('active');
    }
  };

  const handleContinue = async () => {
    if (type === 'email-verification') {
      await handleContinueSignup();
    } else {
      await handleContinueForgotPassword();
    }
  };

  useEffect(() => {
    if (wholeCode.length === 5) {
      handleContinue();
    }
  }, [wholeCode]);

  const sendEmailCode = useCallback(async () => {
    if (timer > 0) return;
    console.log('sendEmailCode', authState.email, type);
    const requestEmailCode = await authClient.emailOtp.sendVerificationOtp({
      email: authState.email!,
      type: type,
    });
    console.log('requestEmailCode', requestEmailCode);
    if (requestEmailCode?.error) {
      setIsError(true);
    } else {
      setTimer(TIMER_START);
    }
  }, [authState.email, timer]);

  return (
    <>
      <div className="flex h-full flex-col">
        <MainHeading
          mainText={`Подтвердите
          Ваш e-mail`}
          secondText={`Мы выслали на ваш электронный адрес ссылку для подтверждения.`}
        />
        <div className="relative">
          <div className="relative flex flex-row gap-2.75 sm:gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <input
                ref={(node: HTMLInputElement | null) => {
                  if (node) inputRefs.current[index] = node;
                }}
                key={index}
                className={cn(
                  'h-14.5 w-14.5 border-b bg-transparent text-center text-2xl text-foreground placeholder:text-center focus:outline-hidden',
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
                  updateWholeCode();
                }}
                onPaste={(e) => {
                  const pasteData = e.clipboardData.getData('text/plain');
                  const sanitizedData = pasteData.replace(/[^0-9]/g, '');

                  for (let i = 0; i < Math.min(sanitizedData.length, 5); i++) {
                    if (inputRefs.current[i]) {
                      inputRefs.current[i]!.value = sanitizedData[i] || '';
                    }
                  }
                  updateWholeCode();
                }}
              ></input>
            ))}
          </div>
          {isError && (
            <div className="absolute flex flex-row items-center gap-2 pt-3 text-xs text-error">
              <Image
                src={ErrorNoticeSvg}
                alt={''}
                className="h-3.5 w-3.5"
              ></Image>
              Вы ввели неправильный код, попробуйте снова
            </div>
          )}
        </div>
        <div className="flex w-full flex-col items-center gap-4 pt-6 sm:pt-16">
          <span className="text-lg text-foreground">
            {String(Math.floor(timer / 60)).padStart(2, '0')}:
            {String(timer % 60).padStart(2, '0')}
          </span>
          <div className="flex flex-row gap-1">
            <span className="text-sm text-foreground">
              Не получили код?
            </span>
            <button
              className={cn(
                'text-sm text-primary',
                timer > 0 && 'opacity-50'
              )}
              disabled={timer > 0}
              onClick={sendEmailCode}
            >
              Отправить
            </button>
          </div>
        </div>

        <div className="grow"></div>

        <AuthButton
          state={bottomButtonState}
          text="Продолжить"
          onClick={handleContinue}
        />
      </div>
    </>
  );
}
