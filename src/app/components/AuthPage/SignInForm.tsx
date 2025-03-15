'use client';
import { authClient } from '~/server/auth/client';

import Link from 'next/link';
import ErrorDecorationSvg from './assets/error_decoration.svg';
import EmailSvg from './assets/input-legends/email';
import PasswordSvg from './assets/input-legends/password';
import { useFormik } from 'formik';
import Image from 'next/image';
import { cn } from '~/helpers';
import PasswordEyeOpen from './assets/password_eye_open';
import PasswordEyeClosed from './assets/password_eye_closed';
import { useEffect, useState } from 'react';
import { AuthStep, IAuthPageState, ITopButtonState } from '.';
import { useRouter } from 'next/navigation';
import AuthButton from './button';
import { frontendSchema } from '~/app/lib/zod';
import MainHeading from './components/MainHeading';
import SocialLogin from './components/SocialLogin';

export default function SignInForm({
  setAuthStep,
  setAuthState,
  setTopButtonState,
}: {
  setAuthStep: (step: AuthStep) => void;
  setAuthState: (state: IAuthPageState) => void;
  setTopButtonState: (state: ITopButtonState) => void;
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

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {},
    validationSchema: frontendSchema,
  });

  return (
    <>
      <MainHeading
        mainText={`Открой двери
          в мир web3`}
        secondText={`Добро пожаловать на платформу
          BlockFirst. Мы рады видеть каждого!`}
      />

      {/* Form */}
      <form
        className="flex flex-1 flex-col"
        onSubmit={async (e) => {
          e.preventDefault();
          setBottomButtonState('loading');
          const res = await authClient.signIn.email({
            email: formik.values.email,
            password: formik.values.password,
          });
          setBottomButtonState('active');
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
            router.push('/');
          }
        }}
      >
        <div className="flex grow flex-col gap-[24px]">
          <div className="relative">
            <div
              className={cn(
                'group border-accent focus-within:border-foreground flex h-[48px] items-center border-b px-[16px]',
                formik.touched.email && formik.errors.email && 'border-error'
              )}
            >
              <div className="mr-[14px] h-[16px] w-[16px]">
                <EmailSvg active={formik.values.email !== ''} />
              </div>

              <input
                type="email"
                placeholder="Электронная почта"
                className="text-foreground placeholder:text-secondary h-full w-full bg-transparent text-sm placeholder:opacity-50 focus:outline-hidden"
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
              <div className="text-error absolute top-[52px] left-0 flex gap-2 text-xs">
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
            <div
              className="text-primary absolute top-[52px] left-0 flex cursor-pointer gap-2 pt-[12px] pl-[16px] text-xs hover:text-[#1242B2]"
              onClick={() => {
                setAuthStep(AuthStep.ForgotPassword);
              }}
            >
              Забыли пароль?
            </div>
            {/* {formik.values.password && formik.errors.password ? (
            <div className="mt-[12px] flex flex-row gap-2">
              {(formik.errors.password.includes('|')
                ? formik.errors.password.split('|')
                : [formik.errors.password]
              ).map((error, index) => (
                <div
                  key={index}
                  className="my-[5px] flex gap-2 rounded-[4px] bg-error px-[8px] py-[5px] text-xs text-foreground"
                >
                  {error}
                </div>
              ))}
            </div>
          ) : null} */}
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
        </div>
        {/* Login link */}
        <div className="text-foreground mt-auto mb-[20px] h-auto text-center text-sm">
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
          onClick={async () => {}}
        />
      </form>

      <SocialLogin />
    </>
  );
}
