'use client';
import { authClient } from '~/server/auth/client';

import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { AuthStep, IAuthPageState, ITopButtonState } from '.';
import { frontendSchema } from '~/app/lib/zod';
import FormField from './components/FormField';
import FormWrapper from './components/FormWrapper';
import EmailSvg from '~/app/components/input-legends/email';
import ErrorBadge from './components/ErrorBadge';

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
  }, [setAuthStep, setTopButtonState]);

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

  const handleResetPassword = async () => {
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
  };

  // Get API error for badge display
  const getApiError = () => {
    return error ? [error] : [];
  };

  return (
    <FormWrapper
      mainText={`Восстановить
доступ`}
      secondText={`Введите адрес электронной почты, на который зарегистрирован ваш
аккаунт`}
      buttonText="Продолжить"
      buttonState={bottomButtonState}
      buttonAction={handleResetPassword}
      showSocialLogin={false}
    >
      <div>
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

        {/* Show API errors as badges */}
        <ErrorBadge errors={getApiError()} />
      </div>
    </FormWrapper>
  );
}
