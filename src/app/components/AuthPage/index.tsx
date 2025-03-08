'use client';
import { useState } from 'react';
import AuthPageBase from './AuthPageBase';
import SignInForm from './SignUpForm';
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
        <SignInForm setAuthStep={setAuthStep} setAuthState={setAuthState} />
      )}
      {/* {authStep === AuthStep.SignUp && <SignUpForm />} */}
      {authStep === AuthStep.SignUpConfirmEmail && (
        <SignUpConfirmEmailForm authState={authState} setAuthStep={setAuthStep} />
      )}
    </AuthPageBase>
  );
}
