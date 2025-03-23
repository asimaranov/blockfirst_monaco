'use client';
import { useRouter } from 'next/navigation';
import AuthButton from './button';

export default function PasswordResetFailedForm() {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {/* Error Message */}
      <div className="flex h-full flex-col items-center justify-center">
        {/* Error Icon Circle */}
        <div className="relative mb-10 h-37.5 w-37.5">
          <div className="h-full w-full rounded-full bg-error"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <g>
                <path
                  d="M4.57 28H27.43"
                  stroke="#F2F2F2"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="7.81" cy="8" r="2.29" fill="#F2F2F2" />
                <circle cx="24.19" cy="8" r="2.29" fill="#F2F2F2" />
              </g>
            </svg>
          </div>
        </div>

        {/* Error Text */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center text-2xl font-bold text-foreground">
            Ошибка восстановления
          </h2>
          <p className="text-center text-sm leading-5 text-secondary">
            Что-то пошло не так, возможно проблема с интернет соединением
          </p>
        </div>
      </div>

      <AuthButton
        text="Войти"
        state="active"
        onClick={() => router.push('/auth/signin')}
      />
    </div>
  );
}
