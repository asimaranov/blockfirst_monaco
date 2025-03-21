import { ReactNode } from 'react';
import MainHeading from './MainHeading';
import SocialLogin from './SocialLogin';
import AuthButton from '../button';
import Link from 'next/link';

interface FormWrapperProps {
  mainText: string;
  secondText: string;
  children: ReactNode;
  buttonText: string;
  buttonState: 'active' | 'loading' | 'disabled';
  buttonAction: () => void;
  linkText?: string;
  linkAction?: () => void;
  linkDestination?: string;
  linkLabel?: string;
  showSocialLogin?: boolean;
}

export default function FormWrapper({
  mainText,
  secondText,
  children,
  buttonText,
  buttonState,
  buttonAction,
  linkText,
  linkAction,
  linkDestination,
  linkLabel,
  showSocialLogin = false,
}: FormWrapperProps) {
  return (
    <>
      <MainHeading mainText={mainText} secondText={secondText} />

      <form
        className="flex flex-1 flex-col"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-1 flex-col gap-8">{children}</div>

        {linkText && (linkAction || linkDestination) && (
          <div className="text-foreground mb-[20px] h-auto text-center text-sm">
            {linkLabel || 'Уже есть аккаунт?'}{' '}
            {linkDestination ? (
              <Link
                href={linkDestination}
                className="text-primary hover:text-[#1242B2]"
              >
                {linkText}
              </Link>
            ) : (
              <Link
                href="#"
                className="text-primary hover:text-[#1242B2]"
                onClick={linkAction}
              >
                {linkText}
              </Link>
            )}
          </div>
        )}

        <AuthButton
          text={buttonText}
          state={buttonState}
          onClick={buttonAction}
        />
      </form>

      {showSocialLogin && <SocialLogin />}
    </>
  );
}
