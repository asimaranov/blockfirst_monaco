import { Notification } from './types';
import Image from 'next/image';
import { cn } from '~/helpers';
import { PromoNotification } from './types';
import noNotificationsImage from './assets/no-notifications.png';
import { INotification, IPromoNotification } from '~/server/models/notification';
export function NotificationContent({
  notification,
  dismissNotification,
}: {
  notification: Notification;
  dismissNotification: (id: string) => void;
}) {
  return (
    <div className="group relative flex flex-col px-8 py-5 first:pt-8 hover:bg-[#282D33]/30 nth-[2]:pt-8">
      <button
        className="absolute top-0 right-0 m-2 hidden h-4 w-4 cursor-pointer group-hover:block"
        onClick={(e) => {
          e.stopPropagation();
          dismissNotification(notification.id);
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
        >
          <path
            d="M4.73203 12.2007C4.4743 12.4584 4.05643 12.4584 3.7987 12.2007C3.54097 11.9429 3.54096 11.5251 3.7987 11.2673L7.06536 8.00065L3.7987 4.73399C3.54097 4.47625 3.54097 4.05838 3.7987 3.80065C4.05643 3.54292 4.4743 3.54292 4.73203 3.80065L7.9987 7.06732L11.2654 3.80065C11.5231 3.54292 11.941 3.54292 12.1987 3.80065C12.4564 4.05838 12.4564 4.47625 12.1987 4.73398L8.93203 8.00065L12.1987 11.2673C12.4564 11.5251 12.4564 11.9429 12.1987 12.2007C11.941 12.4584 11.5231 12.4584 11.2654 12.2007L7.9987 8.93398L4.73203 12.2007Z"
            fill="#9AA6B5"
            fillOpacity="0.5"
          />
        </svg>
      </button>
      <div className="">
        <div className="relative flex space-x-4">
          <div className="flex h-9 w-9 shrink-0">
            <Image
              src={notification.avatar}
              width={36}
              height={36}
              alt=""
              className="h-9 w-9 object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
              {notification.type === 'system' && (
                <span className="text-foreground text-xs">
                  {notification.title}
                </span>
              )}
              {notification.type === 'comment' && (
                <span className="text-secondary text-xs">
                  <span className="text-foreground">
                    {notification.username}
                  </span>{' '}
                  ответил вам в
                  <span className="text-foreground">
                    {' '}
                    {notification.course}
                  </span>
                </span>
              )}
              {notification.type === 'like' && (
                <span className="text-secondary line-clamp-1 text-xs">
                  <span className="text-foreground">
                    {notification.username}
                  </span>{' '}
                  лайкнул ваш пост в
                  <span className="text-foreground">
                    {' '}
                    {notification.course}
                  </span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-secondary/50">
                {notification.timestamp}
              </span>
              <div className="bg-secondary/20 h-full w-[1px]"></div>
              <span className="text-secondary/50">{notification.category}</span>
            </div>
          </div>
          {!notification.isRead && (
            <div className="bg-error ml-auto h-1.5 w-1.5 shrink-0 rounded-full"></div>
          )}
        </div>
        {(notification.type === 'system' ||
          notification.type === 'comment') && (
          <div className="mt-4">
            <div className="relative ml-12 sm:ml-14.5">
              <div className="relative rounded-sm bg-[#14171C] p-2 px-3">
                <div
                  className={cn(
                    'absolute top-0 bottom-0 left-0 w-[1px]',
                    notification.type === 'system' &&
                      notification.highlightedBorder &&
                      'bg-primary'
                  )}
                ></div>
                <p className="text-secondary text-xs">{notification.message}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function NotificationContentPromo({
  notification,
  dismissNotification,
}: {
  notification: IPromoNotification;
  dismissNotification: (id: string) => void;
}) {
  return (
    <div key={notification.id} className="relative flex-[0_0_100%]">
      <div className="group relative h-55 w-full overflow-hidden">
        <Image
          src={notification.image}
          alt="Notification"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        <div className="relative z-20 flex h-full flex-col justify-between p-5 sm:p-8 pb-4">
          <div className="flex flex-col">
            <div>
              <span className="border-secondary/50 text-secondary h-6 rounded-full border px-3 py-1 text-xs backdrop-blur-sm">
                {notification.category}
              </span>
            </div>
          </div>
          <div>
            <div className="flex flex-col space-y-3 pb-8 sm:pb-0">
              <h3 className="text-foreground text-base font-medium">
                {notification.title}
              </h3>
              <p className="text-secondary text-sm">
                {notification.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArchievedNotificationContent({
  notification,
}: {
  notification: INotification;
}) {
  return (
    <div className="group relative flex flex-col px-8 py-5 first:pt-8 hover:bg-[#282D33]/30">
      <div className="opacity-70">
        <div className="relative flex space-x-4">
          <div className="flex h-9 w-9 shrink-0">
            <Image
              src={notification.avatar}
              width={36}
              height={36}
              alt=""
              className="h-9 w-9 object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
              {notification.type === 'system' && (
                <span className="text-foreground text-xs">
                  {notification.title}
                </span>
              )}
              {notification.type === 'comment' && (
                <span className="text-secondary text-xs">
                  <span className="text-foreground">
                    {notification.username}
                  </span>{' '}
                  ответил вам в
                  <span className="text-foreground">
                    {' '}
                    {notification.course}
                  </span>
                </span>
              )}
              {notification.type === 'like' && (
                <span className="text-secondary line-clamp-1 text-xs">
                  <span className="text-foreground">
                    {notification.username}
                  </span>{' '}
                  лайкнул ваш пост в
                  <span className="text-foreground">
                    {' '}
                    {notification.course}
                  </span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-secondary/50">
                {notification.timestamp}
              </span>
              <div className="bg-secondary/20 h-full w-[1px]"></div>
              <span className="text-secondary/50">{notification.category}</span>
            </div>
          </div>
        </div>
        {(notification.type === 'system' ||
          notification.type === 'comment') && (
          <div className="mt-4">
            <div className="relative ml-12 sm:ml-14.5">
              <div className="relative rounded-sm bg-[#14171C] p-2 px-3">
                <div
                  className={cn(
                    'absolute top-0 bottom-0 left-0 w-[1px]',
                    notification.type === 'system' &&
                      notification.highlightedBorder &&
                      'bg-primary'
                  )}
                ></div>
                <p className="text-secondary text-xs">{notification.message}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const NoNotifications = () => {
  return (
    <div className="flex w-full justify-center h-full pt-56">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="bg-accent flex h-15 w-15 items-center justify-center rounded-full">
          <Image src={noNotificationsImage} alt="No notifications" />
        </div>
        <span className="text-sm text-[#9AA6B5]/50">
          Нет новых уведомлений :(
        </span>
      </div>
    </div>
  );
};


export const NoArchievedNotifications = () => {
  return (
    <div className="flex w-full justify-center flex-grow items-center">
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="bg-accent flex h-15 w-15 items-center justify-center rounded-full">
          <Image src={noNotificationsImage} alt="No notifications" />
        </div>
        <span className="text-sm text-[#9AA6B5]/50">
          Нет новых уведомлений :(
        </span>
      </div>
    </div>
  );
};
