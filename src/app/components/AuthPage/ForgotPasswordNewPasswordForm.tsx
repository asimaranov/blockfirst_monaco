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
import MainHeading from './components/MainHeading';

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
      <MainHeading
        mainText={`Изменение
          пароля`}
        secondText={`Придумайте и введите новый пароль для вашей учетной записи`}
      />

      {/* Form */}
      <form className="flex flex-col gap-[24px]" onSubmit={formik.handleSubmit}>
        {/* Password field */}
        <div className="relative">
          <div
            className={cn(
              'group border-accent focus-within:border-foreground flex h-[48px] items-center border-b px-[16px]',
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
              className="text-foreground placeholder:text-secondary h-full w-full bg-transparent text-sm placeholder:opacity-50 focus:outline-hidden"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  formik.handleSubmit();
                }
              }}
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
            <div className="mt-[12px] flex flex-row gap-2">
              {(formik.errors.password.includes('|')
                ? formik.errors.password.split('|')
                : [formik.errors.password]
              ).map((error, index) => (
                <div
                  key={index}
                  className="bg-error text-foreground my-[5px] flex gap-2 rounded-[4px] px-[8px] py-[5px] text-xs"
                >
                  {error}
                </div>
              ))}
            </div>
          ) : null}
          {error ? (
            <div className="text-error absolute top-[52px] left-0 flex justify-center gap-2 text-xs">
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
              'group border-accent focus-within:border-foreground flex h-[48px] items-center border-b px-[16px]',
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
              className="text-foreground placeholder:text-secondary h-full w-full bg-transparent text-sm placeholder:opacity-50 focus:outline-hidden"
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
            <div className="mt-[12px] flex flex-row gap-2">
              {formik.values.passwordConfirm !== formik.values.password && (
                <div className="bg-error text-foreground my-[5px] flex gap-2 rounded-[4px] px-[8px] py-[5px] text-xs">
                  Пароли не совпадают
                </div>
              )}
            </div>
          ) : null}
          {error ? (
            <div className="text-error absolute top-[52px] left-0 flex justify-center gap-2 text-xs">
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
      <div className="grow"></div>

      {/* Login link */}
      <div className="text-foreground mb-[20px] h-auto text-center text-sm">
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
