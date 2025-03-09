'use client';
import { useState } from 'react';
import AuthPageBase from './AuthPageBase';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import SignUpConfirmEmailForm from './SignUpConfirmEmailForm';

export enum AuthStep {
  SignIn = 'signIn',
  SignUp = 'signUp',
  SignUpConfirmEmail = 'signUpConfirmEmail',
  AccountCreation = 'accountCreation',
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

  return (
      <AuthPageBase topButtonState={topButtonState.state} onTopButtonClick={topButtonState.onClick}>
        {authStep === AuthStep.SignUp && (
          <SignUpForm
            setAuthStep={setAuthStep}
            setAuthState={setAuthState}
            setTopButtonState={setTopButtonState}
          />
        )}
        {authStep === AuthStep.SignIn && (
          <SignInForm setAuthStep={setAuthStep} setAuthState={setAuthState}
          setTopButtonState={setTopButtonState}
          />
        )}
        {authStep === AuthStep.SignUpConfirmEmail && (
          <SignUpConfirmEmailForm
            authState={authState}
            setAuthStep={setAuthStep}
            setTopButtonState={setTopButtonState}
          />
        )}
      </AuthPageBase>
  );
}
