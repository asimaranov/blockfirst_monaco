import { authClient } from '~/server/auth/client';
import VkLoginIcon from '../assets/social/vk';
import GoogleLoginIcon from '../assets/social/google';

export default function SocialLogin() {
  return (
    <div className="mt-10 flex w-full items-center justify-center gap-3">
      <button
        className="flex items-center justify-center cursor-pointer"
        onClick={async () => {
          try {
            await authClient.signIn.social({
              provider: 'google',
              callbackURL: '/dashboard',
            });
          } catch (error) {
            console.error('Error in google signin', error);
            alert('Error in google signin');
          }
        }}
      >
        <GoogleLoginIcon />
      </button>
      <button
        className="flex items-center justify-center cursor-pointer"
        onClick={async () => {
          await authClient.signIn.social({
            provider: 'vk',
            callbackURL: '/dashboard',
          });
        }}
      >
        <VkLoginIcon />
      </button>
    </div>
  );
}
