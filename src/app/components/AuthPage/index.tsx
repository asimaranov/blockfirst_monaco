'use client';
import { useState } from 'react';
import AuthPageBase from './AuthPageBase';
import SignInForm from './SignUpForm';
import SignUpConfirmEmailForm from './SignUpConfirmEmailForm';

export enum AuthStep {
  SignIn = 'signIn',
  SignUp = 'signUp',
  SignUpConfirmEmail = 'signUpConfirmEmail',
}

export default function AuthPage() {
  const [authStep, setAuthStep] = useState<AuthStep>(AuthStep.SignUpConfirmEmail);
  return (
    <AuthPageBase>
      {authStep === AuthStep.SignIn && <SignInForm setAuthStep={setAuthStep} />}
      {/* {authStep === AuthStep.SignUp && <SignUpForm />} */}
      {authStep === AuthStep.SignUpConfirmEmail && <SignUpConfirmEmailForm />}
    </AuthPageBase>
  );
}
