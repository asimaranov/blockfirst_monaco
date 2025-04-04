import { authClient } from '~/server/auth/client';
import VkLoginIcon from '../assets/social/vk';
import GoogleLoginIcon from '../assets/social/google';
import { useEffect, useState } from 'react';
import LoadingIcon from '../assets/social/loading.svg';
import Image from 'next/image';
import TelegramLoginIcon from '../assets/social/telegram';

const SocialIcon = ({
  icon,
  onClick,
}: {
  icon: React.ReactNode;
  onClick: () => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      className="flex cursor-pointer items-center justify-center"
      onClick={async () => {
        setIsLoading(true);

        try {
          await onClick();
        } catch (error) {
          console.error('Error in social login', error);
          setIsLoading(false);
        }
      }}
    >
      {isLoading ? (
        <Image
          src={LoadingIcon}
          alt="Loading"
          className="h-11 w-11 shrink-0 animate-spin sm:h-13 sm:w-13"
        />
      ) : (
        icon
      )}
    </button>
  );
};

export default function SocialLogin() {
  return (
    <div className="mt-10 flex w-full items-center justify-center gap-3">
      <SocialIcon
        icon={<GoogleLoginIcon />}
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
      />

      <SocialIcon
        icon={<TelegramLoginIcon />}
        onClick={async () => {
          await new Promise((resolve, reject) => setTimeout(reject, 1000));
        }}
      />

      <SocialIcon
        icon={<VkLoginIcon />}
        onClick={async () => {
          try {
            await authClient.signIn.social({
              provider: 'vk',
              callbackURL: '/dashboard',
            });
          } catch (error) {
            console.error('Error in google signin', error);
            alert('Error in google signin');
          }
        }}
      />
    </div>
  );
}
