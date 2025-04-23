'use client';

import AccountSvg from '~/app/components/input-legends/account';
import EmailSvg from '~/app/components/input-legends/email';
import PasswordSvg from '~/app/components/input-legends/password';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { AuthStep, IAuthPageState, ITopButtonState } from '.';
import { authClient } from '~/server/auth/client';
import { frontendSchema } from '~/app/lib/zod';
import { useRouter } from 'next/navigation';
import FormField from './components/FormField';
import FormWrapper from './components/FormWrapper';
import ErrorBadge from './components/ErrorBadge';
import { api } from '~/trpc/react';
import { ConfidentialityModal } from './ConfidentialityModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  }, [router, setTopButtonState]);

  const handleSignUp = async () => {
    setIsModalOpen(true);
    
  };

  // Get password validation errors for badge display
  const getPasswordValidationErrors = () => {
    if (!formik.values.password || !formik.errors.password) return [];

    return formik.errors.password.includes('|')
      ? formik.errors.password.split('|')
      : [formik.errors.password];
  };

  // Get API error for badge display
  const getApiError = () => {
    return error ? [`Error: ${error}`] : [];
  };

  return (
    <>
    <FormWrapper
      mainText={`Открой двери
в мир web3`}
      secondText={`Добро пожаловать на платформу
BlockFirst. Мы рады видеть каждого!`}
      buttonText="Зарегистрироваться"
      buttonState={bottomButtonState}
      buttonAction={handleSignUp}
      linkText="Вход"
      linkAction={() => setAuthStep(AuthStep.SignIn)}
      linkLabel="Вы зарегистрированы?"
      showSocialLogin={true}
    >
      <FormField
        type="text"
        name="username"
        value={formik.values.username}
        placeholder="Ваше имя"
        icon={<AccountSvg active={formik.values.username !== ''} />}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.username && formik.errors.username
            ? formik.errors.username
            : undefined
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            formik.handleSubmit();
          }
        }}
      />

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

      <div>
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
              ? formik.errors.password.includes('|')
                ? formik.errors.password.split('|')[0]
                : formik.errors.password
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

        {/* Show password errors as badges */}
        <ErrorBadge errors={getPasswordValidationErrors()} />

        {/* Show API errors as badges */}
        <ErrorBadge errors={getApiError()} />
      </div>
    </FormWrapper>
    <ConfidentialityModal
      isOpen={isModalOpen}
      onClose={(confirmed) => {
          setIsModalOpen(false);
      }}
      onConfirm={async () => {
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
    </>
  );
}
