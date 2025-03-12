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
import { useFormik } from 'formik';
import { frontendSchema } from '~/app/lib/zod';
import PasswordSvg from './assets/input-legends/password';
import PasswordEyeOpen from './assets/password_eye_open';
import PasswordEyeClosed from './assets/password_eye_closed';
import Link from 'next/link';
import ErrorDecorationSvg from './assets/error_decoration.svg';

interface IActiveInput {
  index: number;
  clear: boolean;
}

const TIMER_START = 30;

export default function ForgotPasswordNewPasswordForm({
  authState,
  setAuthStep,
  setTopButtonState,
  resetPasswordOtp,
}: {
  authState: IAuthPageState;
  setAuthStep: (step: AuthStep) => void;
  setTopButtonState: (state: ITopButtonState) => void;
  resetPasswordOtp: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [bottomButtonState, setBottomButtonState] = useState<
    'disabled' | 'loading' | 'active'
  >('active');

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [error]);

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: frontendSchema,
  });

  useEffect(() => {
    if (
      formik.errors.password ||
      formik.errors.passwordConfirm ||
      formik.values.passwordConfirm !== formik.values.password
    ) {
      setBottomButtonState('disabled');
    } else {
      setBottomButtonState('active');
    }
  }, [formik.errors, formik.values]);

  console.log(formik.errors, formik.values);

  return (
    <>
      {/* Main heading */}
      <div className="mb-[40px]">
        <h1 className="text-center text-[40px] font-bold uppercase leading-[48px] tracking-tight text-white">
          Изменение пароля
        </h1>
        <p className="mt-6 text-center text-[14px] leading-5 text-secondary">
          Придумайте и введите новый пароль для вашей учетной записи
        </p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-[24px]" onSubmit={formik.handleSubmit}>
        {/* Password field */}
        <div className="relative">
          <div
            className={cn(
              'group flex h-[48px] items-center border-b border-accent px-[16px] focus-within:border-foreground',
              formik.touched.password &&
                formik.errors.password &&
                'border-error'
            )}
          >
            {' '}
            <div className="mr-[14px] h-[16px] w-[16px]">
              <PasswordSvg active={formik.values.password !== ''} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              className="h-full w-full bg-transparent text-[14px] text-foreground placeholder:text-secondary placeholder:opacity-50 focus:outline-none"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <button
              type="button"
              className="group"
              onClick={() => setShowPassword(!showPassword)}
            >
              <div className="group">
                {showPassword ? <PasswordEyeOpen /> : <PasswordEyeClosed />}
              </div>
            </button>
          </div>

          {formik.values.password && formik.errors.password ? (
            <div className="mt-[12px] flex flex-row gap-[8px]">
              {(formik.errors.password.includes('|')
                ? formik.errors.password.split('|')
                : [formik.errors.password]
              ).map((error, index) => (
                <div
                  key={index}
                  className="my-[5px] flex gap-[8px] rounded-[4px] bg-error px-[8px] py-[5px] text-[12px] text-foreground"
                >
                  {error}
                </div>
              ))}
            </div>
          ) : null}
          {error ? (
            <div className="absolute left-0 top-[52px] flex justify-center gap-[8px] text-[12px] text-error">
              <Image
                src={ErrorDecorationSvg}
                alt={''}
                width={14}
                height={14}
              ></Image>
              <div className="text-error">Error: {error}</div>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <div
            className={cn(
              'group flex h-[48px] items-center border-b border-accent px-[16px] focus-within:border-foreground',
              formik.touched.passwordConfirm &&
                formik.errors.passwordConfirm &&
                'border-error'
            )}
          >
            {' '}
            <div className="mr-[14px] h-[16px] w-[16px]">
              <PasswordSvg active={formik.values.passwordConfirm !== ''} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Повторите пароль"
              className="h-full w-full bg-transparent text-[14px] text-foreground placeholder:text-secondary placeholder:opacity-50 focus:outline-none"
              id="passwordConfirm"
              name="passwordConfirm"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirm}
            />
            <button
              type="button"
              className="group"
              onClick={() => setShowPassword(!showPassword)}
            >
              <div className="group">
                {showPassword ? <PasswordEyeOpen /> : <PasswordEyeClosed />}
              </div>
            </button>
          </div>

          {formik.values.passwordConfirm &&
          formik.values.password &&
          formik.values.passwordConfirm !== formik.values.password ? (
            <div className="mt-[12px] flex flex-row gap-[8px]">
              {formik.values.passwordConfirm !== formik.values.password && (
                <div className="my-[5px] flex gap-[8px] rounded-[4px] bg-error px-[8px] py-[5px] text-[12px] text-foreground">
                  Пароли не совпадают
                </div>
              )}
            </div>
          ) : null}
          {error ? (
            <div className="absolute left-0 top-[52px] flex justify-center gap-[8px] text-[12px] text-error">
              <Image
                src={ErrorDecorationSvg}
                alt={''}
                width={14}
                height={14}
              ></Image>
              <div className="text-error">Error: {error}</div>
            </div>
          ) : null}
        </div>
      </form>
      <div className="flex-grow"></div>

      {/* Login link */}
      <div className="mb-[20px] h-auto text-center text-[14px] text-foreground">
        У вас нет аккаунта?{' '}
        <Link
          href="#"
          className="text-primary hover:text-[#1242B2]"
          onClick={() => {
            setAuthStep(AuthStep.SignUp);
          }}
        >
          Регистрация
        </Link>
      </div>

      {/* Register button */}
      <AuthButton
        text="Войти"
        state={bottomButtonState}
        onClick={async () => {
          setBottomButtonState('loading');
          const res = await authClient.emailOtp.resetPassword({
            password: formik.values.password,
            otp: resetPasswordOtp,
            email: authState.email!,
          });
          setBottomButtonState('active');

          if (res?.error) {
            setError(res?.error?.message || 'Error in forgot password');
          } else {
            router.push('/dashboard');
          }
        }}
      />
    </>
  );
}
