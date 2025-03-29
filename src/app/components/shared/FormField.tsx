import React, {
  InputHTMLAttributes,
  ReactNode,
  ChangeEvent,
  FocusEvent,
} from 'react';
import { cn } from '~/helpers';

interface FormFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  icon?: ReactNode;
  error?: string;
}

export default function FormField({
  icon,
  error,
  placeholder,
  value,
  onChange,
  onBlur,
  type = 'text',
  name,
  ...rest
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          'border-accent group focus-within:border-foreground flex h-12 items-center border-b px-4',
          error && 'border-red-500'
        )}
      >
        {icon && <div className="w-4">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          className="text-foreground placeholder:text-secondary/50 ml-3 h-full w-full bg-transparent text-sm focus:outline-none"
          {...rest}
        />
      </div>
      {error && <span className="pl-4 text-xs text-red-500">{error}</span>}
    </div>
  );
}

export function FormTextArea({
  icon,
  error,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  rows = 5,
  ...rest
}: Omit<
  Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
    icon?: ReactNode;
    error?: string;
  },
  'type'
> & { rows?: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          'border-accent group focus-within:border-b-foreground flex w-full flex-1 flex-col p-4',
          error && 'border-red-500'
        )}
      >
        <div className="flex flex-1 items-start gap-3">
          {icon && <div className="w-4">{icon}</div>}
          <textarea
            value={value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            className="text-foreground placeholder:text-secondary/50 -mt-1 h-full w-full grow resize-none bg-transparent text-sm focus:outline-none"
            placeholder={placeholder}
            rows={rows}
            {...rest}
          />
        </div>
      </div>
      {error && <span className="pl-4 text-xs text-red-500">{error}</span>}
    </div>
  );
}
