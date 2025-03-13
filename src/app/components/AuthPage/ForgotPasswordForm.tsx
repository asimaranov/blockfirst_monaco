'use client';
import { authClient } from '~/server/auth/client';

import ErrorDecorationSvg from './assets/error_decoration.svg';
import EmailSvg from './assets/input-legends/email';
import { useFormik } from 'formik';
import Image from 'next/image';
import { cn } from '~/helpers';
import { useEffect, useState } from 'react';
import { AuthStep, IAuthPageState, ITopButtonState } from '.';
import { useRouter } from 'next/navigation';
import AuthButton from './button';
import { frontendSchema } from '~/app/lib/zod';
import MainHeading from './components/MainHeading';

export default function ForgotPasswordForm({
  setAuthStep,
  setAuthState,
  setTopButtonState,
}: {
  setAuthStep: (step: AuthStep) => void;
  setAuthState: (state: IAuthPageState) => void;
  setTopButtonState: (state: ITopButtonState) => void;
}) {
  const [error, setError] = useState('');
  const router = useRouter();
  const [bottomButtonState, setBottomButtonState] = useState<
    'active' | 'loading' | 'disabled'
  >('active');

  useEffect(() => {
    setTopButtonState({
      state: 'back',
      onClick: () => {
        setAuthStep(AuthStep.SignIn);
        setTopButtonState({
          state: undefined,
          onClick: () => {},
        });
      },
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [error]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: frontendSchema,
  });

  return (
    <>
      <MainHeading
        mainText={`Восстановить
          доступ`}
        secondText={`Введите адрес электронной почты, на который зарегистрирован ваш
          аккаунт`}
      />
      <form
        className="flex flex-1 flex-col"
        onSubmit={async (e) => {
          e.preventDefault();

          setBottomButtonState('loading');
          try {
            const res = await authClient.emailOtp.sendVerificationOtp({
              email: formik.values.email,
              type: 'forget-password',
            });
            if (res?.error) {
              setError(res?.error?.message || '');
              return;
            }
          } catch (error) {
            setError('Не удалось отправить код');
            console.log('Error in forgot password', error);
          } finally {
            setBottomButtonState('active');
          }

          console.log('Forgot password OTP sent');
          setAuthState({
            email: formik.values.email,
            username: '',
            password: formik.values.password,
          });
          setTopButtonState({
            state: 'back',
            onClick: () => {
              setAuthStep(AuthStep.SignIn);
              setTopButtonState({
                state: undefined,
                onClick: () => {},
              });
            },
          });
          setAuthStep(AuthStep.ForgotPasswordConfirmEmail);
        }}
      >
        {/* Email field */}
        <div className="relative">
          <div
            className={cn(
              'group flex h-[48px] items-center border-b border-accent px-[16px] focus-within:border-foreground',
              formik.touched.email && formik.errors.email && 'border-error'
            )}
          >
            <div className="mr-[14px] h-[16px] w-[16px]">
              <EmailSvg active={formik.values.email !== ''} />
            </div>

            <input
              type="email"
              placeholder="Электронная почта"
              className="h-full w-full bg-transparent text-[14px] text-foreground placeholder:text-secondary placeholder:opacity-50 focus:outline-none"
              id="email"
              name="email"
              required
              autoComplete="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  formik.handleSubmit();
                }
              }}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="absolute left-0 top-[52px] flex gap-[8px] text-[12px] text-error">
              <Image
                src={ErrorDecorationSvg}
                alt={''}
                width={14}
                height={14}
              ></Image>
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="flex-1"></div>
        <AuthButton
          text="Продолжить"
          state={bottomButtonState}
          onClick={async () => {}}
        ></AuthButton>
      </form>
    </>
  );
}
