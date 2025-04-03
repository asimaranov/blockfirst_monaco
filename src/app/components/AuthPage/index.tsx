'use client';
import { useState } from 'react';
import AuthPageBase from './AuthPageBase';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ConfirmEmailForm from './ConfirmEmailForm';
import ForgotPasswordNewPasswordForm from './ForgotPasswordNewPasswordForm';

export enum AuthStep {
  SignIn = 'signIn',
  SignUp = 'signUp',
  SignUpConfirmEmail = 'signUpConfirmEmail',
  AccountCreation = 'accountCreation',
  ForgotPassword = 'forgotPassword',
  ForgotPasswordConfirmEmail = 'forgotPasswordConfirmEmail',
  ForgotPasswordEnterNewPassword = 'ForgotPasswordEnterNewPassword',
}

export interface IAuthPageState {
  email?: string;
  username?: string;
  password?: string;
}

export interface ITopButtonState {
  state: 'back' | 'cross' | undefined;
  onClick: () => void;
}

export default function AuthPage() {
  const [authStep, setAuthStep] = useState<AuthStep>(AuthStep.SignUp);
  const [authState, setAuthState] = useState<IAuthPageState>({});
  const [topButtonState, setTopButtonState] = useState<ITopButtonState>({
    state: undefined,
    onClick: () => {},
  });
  const [resetPasswordOtp, setResetPasswordOtp] = useState<string>('');
  return (
    <AuthPageBase
      topButtonState={topButtonState.state}
      onTopButtonClick={topButtonState.onClick}
    >
      {authStep === AuthStep.SignUp && (
        <SignUpForm
          setAuthStep={setAuthStep}
          setAuthState={setAuthState}
          setTopButtonState={setTopButtonState}
        />
      )}
      {authStep === AuthStep.SignIn && (
        <SignInForm
          setAuthStep={setAuthStep}
          setAuthState={setAuthState}
          setTopButtonState={setTopButtonState}
        />
      )}
      {authStep === AuthStep.SignUpConfirmEmail && (
        <ConfirmEmailForm
          type="email-verification"
          authState={authState}
          setAuthStep={setAuthStep}
          setTopButtonState={setTopButtonState}
          setResetPasswordOtp={setResetPasswordOtp}
        />
      )}
      {authStep === AuthStep.ForgotPasswordConfirmEmail && (
        <ConfirmEmailForm
          type="forget-password"
          authState={authState}
          setAuthStep={setAuthStep}
          setTopButtonState={setTopButtonState}
          setResetPasswordOtp={setResetPasswordOtp}
        />
      )}
      {authStep === AuthStep.ForgotPasswordEnterNewPassword && (
        <ForgotPasswordNewPasswordForm
          authState={authState}
          setAuthStep={setAuthStep}
          setTopButtonState={setTopButtonState}
          resetPasswordOtp={resetPasswordOtp}
        />
      )}

      {authStep === AuthStep.ForgotPassword && (
        <ForgotPasswordForm
          setAuthState={setAuthState}
          setAuthStep={setAuthStep}
          setTopButtonState={setTopButtonState}
        />
      )}
    </AuthPageBase>
  );
}
