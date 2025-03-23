'use client';

import { useEffect, useState } from 'react';
import { AuthStep, ITopButtonState } from '.';
import { IAuthPageState } from '.';
import { authClient } from '~/server/auth/client';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { frontendSchema } from '~/app/lib/zod';
import PasswordSvg from '~/app/components/input-legends/password';
import FormField from './components/FormField';
import FormWrapper from './components/FormWrapper';
import ErrorBadge from './components/ErrorBadge';

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

  const handleResetPassword = async () => {
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

  // Get password match error for badge display
  const getPasswordMatchError = () => {
    if (
      formik.values.passwordConfirm &&
      formik.values.password &&
      formik.values.passwordConfirm !== formik.values.password
    ) {
      return ['Пароли не совпадают'];
    }
    return [];
  };

  return (
    <FormWrapper
      mainText={`Изменение
пароля`}
      secondText={`Придумайте и введите новый пароль для вашей учетной записи`}
      buttonText="Войти"
      buttonState={bottomButtonState}
      buttonAction={handleResetPassword}
      linkText="Регистрация"
      linkAction={() => setAuthStep(AuthStep.SignUp)}
      linkLabel="У вас нет аккаунта?"
    >
      <div>
        <FormField
          type="password"
          name="password"
          value={formik.values.password}
          placeholder="Пароль"
          icon={<PasswordSvg active={formik.values.password !== ''} />}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              formik.handleSubmit();
            }
          }}
          showInlineError={false}
        />

        {/* Show password validation errors */}
        <ErrorBadge errors={getPasswordValidationErrors()} />

        {/* Show API errors */}
        <ErrorBadge errors={getApiError()} />
      </div>

      <div>
        <FormField
          type="password"
          name="passwordConfirm"
          value={formik.values.passwordConfirm}
          placeholder="Повторите пароль"
          icon={<PasswordSvg active={formik.values.passwordConfirm !== ''} />}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
          showInlineError={false}
        />

        {/* Show password match errors */}
        <ErrorBadge errors={getPasswordMatchError()} />
      </div>
    </FormWrapper>
  );
}
