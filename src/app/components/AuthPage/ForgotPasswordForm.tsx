'use client';
import { authClient, signIn, useSession } from '~/server/auth/client';

import Link from 'next/link';
import ErrorDecorationSvg from './assets/error_decoration.svg';
import EmailSvg from './assets/input-legends/email';
import PasswordSvg from './assets/input-legends/password';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Image from 'next/image';
import { cn } from '~/helpers';
import GoogleLoginIcon from './assets/social/google';
import PasswordEyeOpen from './assets/password_eye_open';
import PasswordEyeClosed from './assets/password_eye_closed';
import { useEffect, useState } from 'react';
import { AuthStep, IAuthPageState, ITopButtonState } from '.';
import VkLoginIcon from './assets/social/vk';
import { useRouter } from 'next/navigation';
import AuthButton from './button';
import { frontendSchema } from '~/app/lib/zod';

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

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 5000);
  }, [error]);

  const formik = useFormik({
    initialValues: {
      username: '',
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
      {/* Main heading */}
      <div className="mb-[40px]">
        <h1 className="text-center text-[40px] font-bold uppercase leading-[48px] tracking-tight text-white">
          Открой двери
          <br />в мир web3
        </h1>
        <p className="mt-6 text-center text-[14px] leading-5 text-secondary">
          Добро пожаловать на платформу
          <br />
          BlockFirst. Мы рады видеть каждого!
        </p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-[24px]" onSubmit={formik.handleSubmit}>
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
      </form>
      <div className="flex-grow"></div>

      {/* Login link */}
      <div className="mb-[20px] h-auto text-center text-[14px] text-foreground">
        У вас нет аккаунта?{' '}
        <Link
          href="#"
          className="text-primary"
          onClick={() => {
            setAuthStep(AuthStep.SignUp);
          }}
        >
          Регистрация
        </Link>
      </div>

      {/* Register button */}
      <AuthButton
        text="Отправить"
        state="active"
        onClick={async () => {
          const res = await signIn.email({
            email: formik.values.email,
            password: formik.values.password,
          });
          if (res?.error) {
            if (res.error.code === 'EMAIL_NOT_VERIFIED') {
              console.log('Sending verification OTP');
              await authClient.emailOtp.sendVerificationOtp({
                email: formik.values.email,
                type: 'email-verification',
              });
              console.log('Verification OTP sent');
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
              setAuthStep(AuthStep.SignUpConfirmEmail);
            } else {
              setError(res.error.message ?? 'Error in email signin');
              console.error('Error in email signin', res);
            }
          } else {
            router.push('/dashboard');
          }
        }}
      ></AuthButton>
    </>
  );
}
