'use client';
import { authClient } from '~/server/auth/client';

import Link from 'next/link';
import ErrorDecorationSvg from './assets/error_decoration.svg';
import EmailSvg from '~/app/components/input-legends/email';
import PasswordSvg from '~/app/components/input-legends/password';
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
import FormField from './components/FormField';
import FormWrapper from './components/FormWrapper';
import ErrorBadge from './components/ErrorBadge';

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
  }, [router, setTopButtonState]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {},
    validationSchema: frontendSchema,
  });

  const handleSignIn = async () => {
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
  };

  // Get API error for badge display
  const getApiError = () => {
    return error ? [`Error: ${error}`] : [];
  };

  return (
    <FormWrapper
      mainText={`Открой двери
в мир web3`}
      secondText={`Добро пожаловать на платформу
BlockFirst. Мы рады видеть каждого!`}
      buttonText="Войти"
      buttonState={bottomButtonState}
      buttonAction={handleSignIn}
      linkText="Регистрация"
      linkAction={() => setAuthStep(AuthStep.SignUp)}
      linkLabel="У вас нет аккаунта?"
      showSocialLogin={true}
    >
      <FormField
        type="email"
        name="email"
        value={formik.values.email}
        placeholder="Электронная почта"
        icon={<EmailSvg active={formik.values.email !== ''} />}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.email && formik.errors.email
            ? formik.errors.email
            : undefined
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            formik.handleSubmit();
          }
        }}
      />

      <div className="relative">
        <FormField
          type="password"
          name="password"
          value={formik.values.password}
          placeholder="Пароль"
          icon={<PasswordSvg active={formik.values.password !== ''} />}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : undefined
          }
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              formik.handleSubmit();
            }
          }}
          showInlineError={false}
        />

        {/* Show API errors as badges */}
        <ErrorBadge errors={getApiError()} />

        <div
          className="text-primary absolute top-13 left-0 flex cursor-pointer gap-2 pt-3 pl-4 text-xs hover:text-[#1242B2]"
          onClick={() => {
            setAuthStep(AuthStep.ForgotPassword);
          }}
        >
          Забыли пароль?
        </div>
      </div>
    </FormWrapper>
  );
}
