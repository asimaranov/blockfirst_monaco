import { motion } from 'motion/react';
import Image from 'next/image';
import notificationImage from './assets/top_icon.png';
import { cn } from '~/helpers';

interface NotificationsTopbarProps {
  archiveAll: () => void;
  inArchived: boolean;
}

export const NotificationsTopbar = ({
  archiveAll,
  inArchived,
}: NotificationsTopbarProps) => {
  return (
    <>
      <div className="flex-shrink-0 px-5 py-5 sm:px-8 sm:py-8">
        <div className="flex justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative h-9 w-9 rounded-full">
              <Image src={notificationImage} alt="" className="object-cover" />
            </div>
            <span className="text-foreground text-xl">Уведомления</span>
          </div>
          <div className="flex items-center">
            <button
              className="border-primary/50 hover:border-primary flex cursor-pointer items-center gap-1 rounded-full border-[0.5px] py-1.5 pr-3 pl-2 leading-4"
              onClick={archiveAll}
            >
              <div className="h-4 w-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <path
                    d="M4.35938 8.52039L6.43937 10.6004L11.6394 5.40039"
                    stroke="#195AF4"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span
                className={cn(
                  'text-foreground text-xs',
                  inArchived && 'text-primary'
                )}
              >
                {inArchived ? 'В архиве' : 'Все в архив'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
