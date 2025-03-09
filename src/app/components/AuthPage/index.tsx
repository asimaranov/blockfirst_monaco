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

export default function AuthPage() {
  const [authStep, setAuthStep] = useState<AuthStep>(AuthStep.SignUp);
  const [authState, setAuthState] = useState<IAuthPageState>({});

  return (
      <AuthPageBase>
        {authStep === AuthStep.SignUp && (
          <SignUpForm setAuthStep={setAuthStep} setAuthState={setAuthState} />
        )}
        {authStep === AuthStep.SignIn && (
          <SignInForm setAuthStep={setAuthStep} setAuthState={setAuthState} />
        )}
        {authStep === AuthStep.SignUpConfirmEmail && (
          <SignUpConfirmEmailForm
            authState={authState}
            setAuthStep={setAuthStep}
          />
        )}
      </AuthPageBase>
  );
}
