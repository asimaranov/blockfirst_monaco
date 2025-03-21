import { cn } from '~/helpers';
import Image from 'next/image';
import ErrorDecorationSvg from '../assets/error_decoration.svg';
import { ReactNode } from 'react';
import PasswordEyeOpen from '../assets/password_eye_open';
import PasswordEyeClosed from '../assets/password_eye_closed';

interface FormFieldProps {
  type: 'text' | 'email' | 'password';
  name: string;
  value: string;
  placeholder: string;
  icon: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  showPassword?: boolean;
  toggleShowPassword?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  showInlineError?: boolean;
}

export default function FormField({
  type,
  name,
  value,
  placeholder,
  icon,
  onChange,
  onBlur,
  error,
  showPassword,
  toggleShowPassword,
  onKeyDown,
  showInlineError = true,
}: FormFieldProps) {
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="relative">
      <div
        className={cn(
          'group border-accent focus-within:border-foreground flex h-12 items-center border-b px-4',
          error && 'border-error'
        )}
      >
        <div className="mr-3.5 h-4 w-4">{icon}</div>
        <input
          className="text-foreground placeholder:text-secondary h-full w-full bg-transparent text-sm placeholder:opacity-50 focus:outline-hidden"
          placeholder={placeholder}
          id={name}
          name={name}
          type={inputType}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          onKeyDown={onKeyDown}
        />
        {isPassword && toggleShowPassword && (
          <button type="button" className="group" onClick={toggleShowPassword}>
            <div className="group">
              {showPassword ? <PasswordEyeOpen /> : <PasswordEyeClosed />}
            </div>
          </button>
        )}
      </div>
      {showInlineError && error && (
        <div className="text-error absolute top-15 left-0 flex gap-2 text-xs">
          <Image src={ErrorDecorationSvg} alt={''} width={14} height={14} />
          {error}
        </div>
      )}
    </div>
  );
}
