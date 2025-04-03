import { useRouter } from 'next/navigation';
import AuthButton from './button';

export default function PasswordResetSuccessForm() {
  const router = useRouter();

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center">
        {/* Success Message */}
        <div className="flex flex-col items-center">
          {/* Success Icon Circle */}
          <div className="relative mb-10 h-37.5 w-37.5">
            <div className="h-full w-full rounded-full bg-primary"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M4 16L12 24L28 8"
                  stroke="#F2F2F2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Success Text */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-center text-2xl font-bold text-foreground">
              Поздравляем
            </h2>
            <p className="text-center text-sm leading-5 text-secondary">
              Вы успешно создали новый пароль и можете войти в систему
            </p>
          </div>
        </div>
      </div>
      <AuthButton
        text="Войти"
        state="active"
        onClick={() => router.push('/auth/signin')}
      />
    </>
  );
}
