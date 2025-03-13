'use client';

import Link from 'next/link';
import ErrorDecorationSvg from './assets/error_decoration.svg';

import AccountSvg from './assets/input-legends/account';
import EmailSvg from './assets/input-legends/email';
import PasswordSvg from './assets/input-legends/password';
import { useFormik } from 'formik';
import Image from 'next/image';
import { cn } from '~/helpers';
import PasswordEyeOpen from './assets/password_eye_open';
import PasswordEyeClosed from './assets/password_eye_closed';
import { useEffect, useState } from 'react';
import { AuthStep, IAuthPageState, ITopButtonState } from '.';
import { authClient } from '~/server/auth/client';
import AuthButton from './button';
import { frontendSchema } from '~/app/lib/zod';
import MainHeading from './components/MainHeading';
import SocialLogin from './components/SocialLogin';
import { useRouter } from 'next/navigation';

export default function SignUpForm({
  setAuthStep,
  setAuthState,
  setTopButtonState,
}: {
  setAuthStep: (step: AuthStep) => void;
  setAuthState: (state: IAuthPageState) => void;
  setTopButtonState: (state: ITopButtonState) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [bottomButtonState, setBottomButtonState] = useState<
    'disabled' | 'loading' | 'active'
  >('active');
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

  useEffect(() => {
    if (
      formik.errors.username ||
      formik.errors.email ||
      formik.errors.password
    ) {
      setBottomButtonState('disabled');
    } else {
      setBottomButtonState('active');
    }
  }, [formik.errors]);

  useEffect(() => {
    setTopButtonState({
      state: 'cross',
      onClick: () => {
        router.push('https://blockfirst.io/');
      },
    });
    return () => {
      setTopButtonState({
        state: undefined,
        onClick: () => {},
      });
    };
  }, []);


  return (
    <>
      <MainHeading
        mainText={`Открой двери
          в мир web3`}
        secondText={`Добро пожаловать на платформу
          BlockFirst. Мы рады видеть каждого!`}
      />

      {/* Form */}
      <form className="flex flex-1 flex-col" onSubmit={formik.handleSubmit}>
        <div className="flex flex-1 flex-col gap-[24px]">
          {/* Username field */}
          <div className="relative">
            <div
              className={cn(
                'group flex h-[48px] items-center border-b border-accent px-[16px] focus-within:border-foreground',
                formik.touched.username &&
                  formik.errors.username &&
                  'border-error'
              )}
            >
              {' '}
              <div className="mr-[14px] h-[16px] w-[16px]">
                <AccountSvg active={formik.values.username !== ''} />
              </div>
              <input
                className="h-full w-full bg-transparent text-[14px] text-foreground placeholder:text-secondary placeholder:opacity-50 focus:outline-none"
                placeholder={'Ваше имя'}
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    formik.handleSubmit();
                  }
                }}
              ></input>
              {/* <span className="ml-auto flex items-center text-xs text-success">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-success"></span>
                Доступно
              </span> */}
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className="absolute left-0 top-[52px] flex gap-[8px] text-[12px] text-error">
                <Image
                  src={ErrorDecorationSvg}
                  alt={''}
                  width={14}
                  height={14}
                ></Image>
                {formik.errors.username}
              </div>
            ) : null}
          </div>

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
          <div className="flex-grow"></div>
        </div>

        {/* Login link */}
        <div className="mb-[20px] h-auto text-center text-[14px] text-foreground">
          Вы зарегистрированы?{' '}
          <Link
            href="#"
            className="text-primary hover:text-[#1242B2]"
            onClick={() => {
              setAuthStep(AuthStep.SignIn);
            }}
          >
            Вход
          </Link>
        </div>

        {/* Register button */}
        <AuthButton
          text="Зарегистрироваться"
          state={bottomButtonState}
          onClick={async () => {
            setBottomButtonState('loading');
            const { data, error } = await authClient.signUp.email({
              email: formik.values.email,
              name: formik.values.username,
              password: formik.values.password,
            });
            setBottomButtonState('active');

            if (error) {
              console.error('Error in email OTP send', error);
              setError(error.message ?? 'Unknown error');
            }

            if (data) {
              setAuthState({
                email: formik.values.email,
                username: formik.values.username,
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

              console.log('Email OTP sent', data);
            }
          }}
        />
      </form>

      <SocialLogin />
    </>
  );
}
