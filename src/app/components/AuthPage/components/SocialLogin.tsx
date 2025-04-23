import { authClient } from '~/server/auth/client';
import VkLoginIcon from '../assets/social/vk';
import GoogleLoginIcon from '../assets/social/google';
import { useEffect, useState } from 'react';
import LoadingIcon from '../assets/social/loading.svg';
import Image from 'next/image';
import TelegramLoginIcon from '../assets/social/telegram';
import { ConfidentialityModal } from '../ConfidentialityModal';

const SocialIcon = ({
  isLoading,
  setIsLoading,
  icon,
  onClick,
}: {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  icon: React.ReactNode;
  onClick: () => Promise<void>;
}) => {
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
  const [openModalProvider, setOpenModalProvider] = useState<string | null>(
    null
  );
  const [loadingModalProvider, setLoadingModalProvider] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (loadingModalProvider === null) {
      setTimeout(() => {
        setLoadingModalProvider(null);
      }, 10_000);
    }
  }, [loadingModalProvider]);

  return (
    <div className="mt-10 flex w-full items-center justify-center gap-3">
      <ConfidentialityModal
        isOpen={openModalProvider !== null}
        onClose={(confirmed) => {
          setOpenModalProvider(null);

          if (!confirmed) {
            setLoadingModalProvider(null);
          }
        }}
        onConfirm={async () => {
          console.log('confirmed');
          if (loadingModalProvider === 'google') {
            await authClient.signIn.social({
              provider: 'google',
              callbackURL: '/dashboard',
            });
          }
          if (loadingModalProvider === 'telegram') {
            await new Promise((resolve, reject) => setTimeout(reject, 1000));
          }
          if (loadingModalProvider === 'vk') {
            try {
              await authClient.signIn.social({
                provider: 'vk',
                callbackURL: '/dashboard',
              });
            } catch (error) {
              console.error('Error in vk signin', error);
            }
          }
        }}
      />

      <SocialIcon
        icon={<GoogleLoginIcon />}
        isLoading={loadingModalProvider === 'google'}
        setIsLoading={() => setLoadingModalProvider('google')}
        onClick={async () => {
          setOpenModalProvider('google');
          // try {
          //   await authClient.signIn.social({
          //     provider: 'google',
          //     callbackURL: '/dashboard',
          //   });
          // } catch (error) {
          //   console.error('Error in google signin', error);
          //   alert('Error in google signin');
          // }
        }}
      />

      <SocialIcon
        icon={<TelegramLoginIcon />}
        isLoading={loadingModalProvider === 'telegram'}
        setIsLoading={() => setLoadingModalProvider('telegram')}
        onClick={async () => {
          setOpenModalProvider('telegram');
        }}
      />

      <SocialIcon
        icon={<VkLoginIcon />}
        isLoading={loadingModalProvider === 'vk'}
        setIsLoading={() => setLoadingModalProvider('vk')}
        onClick={async () => {
          setOpenModalProvider('vk');
        }}
      />
    </div>
  );
}
