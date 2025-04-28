'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@udecode/cn';
import { useParams, useRouter } from 'next/navigation';
import { TaskData } from '~/server/api/routers/tasks';
export interface TaskCardProps {
  task: TaskData;
  id: string;
  loading?: boolean;
  // Hero section
  updateDate?: string;
  heroImageSrc?: string;
  heroName?: string;
  heroTagline?: string;

  // Task details
  labels?: string[];
  title?: string;
  description?: string;

  // Stats
  completionCount?: string;
  rating?: string;

  regularTasksSolved?: boolean;
  advancedTasksSolved?: boolean;

  // Actions
  onExecute?: () => void;
}

export const TaskNavigation = ({ labels }: { labels: string[] }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.7959 1.33594H5.20927C2.7826 1.33594 1.33594 2.7826 1.33594 5.20927V10.7893C1.33594 13.2226 2.7826 14.6693 5.20927 14.6693H10.7893C13.2159 14.6693 14.6626 13.2226 14.6626 10.7959V5.20927C14.6693 2.7826 13.2226 1.33594 10.7959 1.33594ZM6.75594 9.66927C6.94927 9.8626 6.94927 10.1826 6.75594 10.3759C6.65594 10.4759 6.52927 10.5226 6.4026 10.5226C6.27594 10.5226 6.14927 10.4759 6.04927 10.3759L4.38927 8.71594C3.99594 8.3226 3.99594 7.68927 4.38927 7.29594L6.04927 5.63594C6.2426 5.4426 6.5626 5.4426 6.75594 5.63594C6.94927 5.82927 6.94927 6.14927 6.75594 6.3426L5.09594 8.0026L6.75594 9.66927ZM11.6159 8.70927L9.95594 10.3693C9.85594 10.4693 9.72927 10.5159 9.6026 10.5159C9.47594 10.5159 9.34927 10.4693 9.24927 10.3693C9.05594 10.1759 9.05594 9.85594 9.24927 9.6626L10.9093 8.0026L9.24927 6.33594C9.05594 6.1426 9.05594 5.8226 9.24927 5.62927C9.4426 5.43594 9.7626 5.43594 9.95594 5.62927L11.6159 7.28927C12.0093 7.6826 12.0093 8.3226 11.6159 8.70927Z"
          fill="#F2F2F2"
        />
      </svg>
      <span className="text-xs">Задача:</span>
      <div className="flex">
        {labels.map((x, i) => (
          <React.Fragment key={i}>
            <div className="text-secondary/50 text-xs">{x}</div>
            {i !== labels.length - 1 && (
              <div className="flex items-center justify-center px-2">
                <div className="bg-secondary h-1 w-1 rounded-full opacity-50"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export function TaskStatusBadge({
  status,
}: {
  status: 'available' | 'in-progress' | 'completed';
}) {
  return (
    <>
      {status == 'available' ? (
        <div className="flex cursor-default flex-row gap-1 rounded-[0.4167vw] bg-[#33CF8E]/10 px-3.5 py-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M11.5114 8.1899L10.7997 7.47823C10.6306 7.3324 10.5314 7.11656 10.5256 6.8774C10.5139 6.6149 10.6189 6.3524 10.8114 6.1599L11.5114 5.4599C12.1181 4.85323 12.3456 4.2699 12.1531 3.80906C11.9664 3.35406 11.3889 3.10323 10.5372 3.10323H4.44141V2.60156C4.44141 2.3624 4.24307 2.16406 4.00391 2.16406C3.76474 2.16406 3.56641 2.3624 3.56641 2.60156V13.3932C3.56641 13.6324 3.76474 13.8307 4.00391 13.8307C4.24307 13.8307 4.44141 13.6324 4.44141 13.3932V10.5466H10.5372C11.3772 10.5466 11.9431 10.2899 12.1356 9.82906C12.3281 9.36823 12.1064 8.79073 11.5114 8.1899Z"
              fill="#33CF8E"
            />
          </svg>
          <span className="text-xs leading-4 text-[#33CF8E]">Доступна</span>
        </div>
      ) : status == 'in-progress' ? (
        <div className="flex cursor-default flex-row gap-1 rounded-[0.4167vw] bg-[#195AF4]/10 px-3.5 py-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M7.9974 14.2682C4.53823 14.2682 1.72656 11.4566 1.72656 7.9974C1.72656 4.53823 4.53823 1.72656 7.9974 1.72656C11.4566 1.72656 14.2682 4.53823 14.2682 7.9974C14.2682 11.4566 11.4566 14.2682 7.9974 14.2682ZM7.9974 2.60156C5.0224 2.60156 2.60156 5.0224 2.60156 7.9974C2.60156 10.9724 5.0224 13.3932 7.9974 13.3932C10.9724 13.3932 13.3932 10.9724 13.3932 7.9974C13.3932 5.0224 10.9724 2.60156 7.9974 2.60156Z"
              fill="#195AF4"
            />
            <path
              d="M10.1671 10.2945C10.0913 10.2945 10.0155 10.277 9.94547 10.2303L8.13713 9.15115C7.68797 8.88281 7.35547 8.29365 7.35547 7.77448V5.38281C7.35547 5.14365 7.5538 4.94531 7.79297 4.94531C8.03214 4.94531 8.23047 5.14365 8.23047 5.38281V7.77448C8.23047 7.98448 8.40547 8.29365 8.5863 8.39865L10.3946 9.47781C10.6046 9.60031 10.6688 9.86865 10.5463 10.0786C10.4588 10.2186 10.313 10.2945 10.1671 10.2945Z"
              fill="#195AF4"
            />
          </svg>

          <span className="text-xs leading-4 text-[#195AF4]">В процессе</span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export function TaskCard({
  task,
  loading,
  updateDate = '',
  heroImageSrc = '/heroes/Alex.png',
  heroName = 'Алекс',
  heroTagline = 'Реши задачу за нашего героя!',
  labels = [],
  title = 'Без названия',
  description = '',
  completionCount = '0',
  rating = '0',
  regularTasksSolved = false,
  advancedTasksSolved = false,
  onExecute,
}: TaskCardProps) {
  const router = useRouter();
  const { courseId } = useParams();

  const handleOpenTask = () => {
    if (task?.id) {
      router.push(`/lesson/${courseId}/task/${task.id}`)
    }
  };

  return (
    <div
      className={cn(
        'bg-muted border-accent relative -mx-16 flex h-83 w-[calc(100%*var(--spacing)*32)] flex-row rounded-sm border-y'
      )}
    >
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="border-primary h-16 w-16 animate-spin rounded-full border-t-2 border-b-2"></div>
            <p className="text-lg font-medium text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="h-full w-83 shrink-0 bg-[#01050D]">
            <div className="flex h-full flex-col bg-[url('/images/grids/task-grid.svg')] bg-contain bg-bottom p-8">
              <div className="text-secondary/50 flex flex-row justify-between text-xs">
                <span>Обновление задачи</span>
                <div className="flex flex-row items-center gap-1">
                  <div className="bg-success h-1 w-1 rounded-full" />
                  <span className="text-foreground text-xs">{updateDate}</span>
                </div>
              </div>

              <div className="relative mt-auto flex flex-col items-center">
                <div className="relative">
                  <Image
                    src={heroImageSrc}
                    alt={heroName}
                    width={110}
                    height={110}
                    className=""
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-0 left-1/2 h-5 w-5 -translate-x-[calc(50%-var(--spacing)*6.25)]"
                  >
                    <path
                      d="M19.5562 8.74031L18.1961 7.16071C17.9361 6.86079 17.7261 6.30093 17.7261 5.90103V4.20145C17.7261 3.14171 16.856 2.27193 15.796 2.27193H14.0959C13.7059 2.27193 13.1358 2.06198 12.8358 1.80205L11.2557 0.442389C10.5657 -0.147463 9.43559 -0.147463 8.73554 0.442389L7.16544 1.81205C6.86543 2.06198 6.29539 2.27193 5.90537 2.27193H4.17526C3.11519 2.27193 2.24514 3.14171 2.24514 4.20145V5.91102C2.24514 6.30092 2.03513 6.86079 1.78511 7.16071L0.435027 8.75031C-0.145009 9.44014 -0.145009 10.5599 0.435027 11.2497L1.78511 12.8393C2.03513 13.1392 2.24514 13.6991 2.24514 14.089V15.7985C2.24514 16.8583 3.11519 17.7281 4.17526 17.7281H5.90537C6.29539 17.7281 6.86543 17.938 7.16544 18.198L8.74554 19.5576C9.43559 20.1475 10.5657 20.1475 11.2657 19.5576L12.8458 18.198C13.1458 17.938 13.7059 17.7281 14.1059 17.7281H15.806C16.866 17.7281 17.7361 16.8583 17.7361 15.7985V14.099C17.7361 13.7091 17.9461 13.1392 18.2061 12.8393L19.5662 11.2597C20.1463 10.5699 20.1463 9.43014 19.5562 8.74031Z"
                      fill="#010101"
                    />
                    <ellipse
                      cx="10.5508"
                      cy="10.5531"
                      rx="5"
                      ry="4.99844"
                      fill="#F2F2F2"
                    />
                    <path
                      d="M17.433 9.02068L16.3752 7.7921C16.173 7.55882 16.0096 7.12338 16.0096 6.81234V5.49045C16.0096 4.66621 15.3329 3.98971 14.5084 3.98971H13.1861C12.8828 3.98971 12.4394 3.82642 12.2061 3.62425L10.9771 2.56674C10.4404 2.10796 9.56144 2.10796 9.01697 2.56674L7.79578 3.63203C7.56243 3.82642 7.11907 3.98971 6.81572 3.98971H5.47008C4.64558 3.98971 3.96888 4.66621 3.96888 5.49045V6.82012C3.96888 7.12337 3.80553 7.55882 3.61108 7.7921L2.56101 9.02845C2.10987 9.56499 2.10987 10.4359 2.56101 10.9724L3.61108 12.2088C3.80553 12.442 3.96888 12.8775 3.96888 13.1807V14.5104C3.96888 15.3347 4.64558 16.0112 5.47008 16.0112H6.81572C7.11907 16.0112 7.56243 16.1744 7.79578 16.3766L9.02474 17.4341C9.56144 17.8929 10.4404 17.8929 10.9849 17.4341L12.2138 16.3766C12.4472 16.1744 12.8828 16.0112 13.1939 16.0112H14.5162C15.3407 16.0112 16.0174 15.3347 16.0174 14.5104V13.1885C16.0174 12.8853 16.1807 12.442 16.383 12.2088L17.4408 10.9802C17.892 10.4437 17.892 9.55721 17.433 9.02068ZM13.2328 8.5308L9.47588 12.2865C9.36699 12.3954 9.2192 12.4576 9.06364 12.4576C8.90807 12.4576 8.76028 12.3954 8.65139 12.2865L6.76905 10.4048C6.54348 10.1793 6.54348 9.80604 6.76905 9.58054C6.99462 9.35504 7.36798 9.35504 7.59354 9.58054L9.06364 11.0502L12.4083 7.70656C12.6339 7.48106 13.0072 7.48106 13.2328 7.70656C13.4584 7.93206 13.4584 8.3053 13.2328 8.5308Z"
                      fill="#195AF4"
                    />
                  </svg>
                </div>

                <div className="flex flex-col items-center gap-2.5 pt-10">
                  <div className="flex flex-row items-center gap-2">
                    <span className="text-xl leading-6">{heroName}</span>
                    <span className="font-delight border-accent rounded-[100px] border-[0.5px] px-3 pt-1 pb-1.25 text-xs leading-3.75">
                      BF heroes
                    </span>
                  </div>
                  <span className="text-secondary text-xs">{heroTagline}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col p-8">
            <div className="flex flex-row justify-between pb-8">
              <TaskNavigation labels={labels} />

              <div className="flex flex-row items-center gap-2">
                <div
                  className={cn(
                    'border-primary/50 rounded-[0.4167vw] border-[calc(0.25*var(--spacing))] px-3.25 py-1.25',
                    regularTasksSolved
                      ? 'bg-primary'
                      : 'hover:bg-primary/10 cursor-pointer'
                  )}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.44922 10.65L8.04922 13.25L14.5492 6.75"
                      stroke="#195AF4"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className={cn(regularTasksSolved && 'stroke-white')}
                    />
                  </svg>
                </div>
                <div
                  className={cn(
                    'rounded-[0.4167vw] border-[calc(0.25*var(--spacing))] border-[#F48E19]/50 px-3.25 py-1.25',
                    advancedTasksSolved
                      ? 'bg-[#F48E19]'
                      : 'cursor-pointer hover:bg-[#F48E19]/10'
                  )}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <g clip-path="url(#clip0_3557_29169)">
                      <path
                        d="M5.44922 10.65L8.04922 13.25L14.5492 6.75"
                        stroke="#F48E19"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className={cn(
                          advancedTasksSolved && 'stroke-foreground'
                        )}
                      />
                      <circle
                        cx="17"
                        cy="5.5"
                        r="4.5"
                        fill="#0F1217"
                        className={cn(advancedTasksSolved && 'fill-[#F48E19]')}
                      />
                      <path
                        d="M14.8662 7.72559L16.2402 5.83887L14.1758 5.22363L14.4971 4.19824L16.5615 4.95703L16.5 2.60547H17.5391L17.4707 4.99805L19.5078 4.23926L19.8223 5.28516L17.7236 5.90723L19.0703 7.75977L18.2227 8.39551L16.958 6.42676L15.7207 8.34766L14.8662 7.72559Z"
                        fill="#F48E19"
                        className={cn(advancedTasksSolved && 'fill-foreground')}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3557_29169">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <TaskStatusBadge status={'in-progress'} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-2xl">{title}</span>
              <span className="text-secondary text-sm">{description}</span>
            </div>

            <div className="mt-auto flex flex-row items-center gap-4">
              <div className="flex flex-col gap-3.5">
                <span className="text-secondary text-xxs w-fit rounded-[0.3125vw] bg-[#14171C] px-3 py-1.75 uppercase">
                  Выполнили задачу
                </span>
                <div className="flex flex-row items-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" rx="12" fill="#01050D" />
                    <path
                      d="M11.9987 12.0013C13.6095 12.0013 14.9154 10.6955 14.9154 9.08464C14.9154 7.4738 13.6095 6.16797 11.9987 6.16797C10.3879 6.16797 9.08203 7.4738 9.08203 9.08464C9.08203 10.6955 10.3879 12.0013 11.9987 12.0013Z"
                      fill="#F2F2F2"
                    />
                    <path
                      d="M12.0017 13.457C9.07922 13.457 6.69922 15.417 6.69922 17.832C6.69922 17.9954 6.82755 18.1237 6.99089 18.1237H17.0125C17.1759 18.1237 17.3042 17.9954 17.3042 17.832C17.3042 15.417 14.9242 13.457 12.0017 13.457Z"
                      fill="#F2F2F2"
                    />
                  </svg>
                  <span className="text-base font-medium">
                    {completionCount}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3.5">
                <span className="text-secondary text-xxs w-fit rounded-[0.3125vw] bg-[#14171C] px-3 py-1.75 uppercase">
                  Рейтинг задачи
                </span>
                <div className="flex flex-row items-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="24" height="24" rx="12" fill="#01050D" />
                    <path
                      d="M11.4124 6.49587C11.7853 6.31909 12.2173 6.31909 12.5902 6.49587C12.8481 6.61823 13.0315 6.84937 13.1937 7.1111C13.3568 7.37444 13.5362 7.73277 13.7591 8.17849L13.9476 8.55544C14.1004 8.8611 14.1447 8.94137 14.2005 8.99977C14.2581 9.05999 14.3272 9.1082 14.4036 9.14138C14.4777 9.17349 14.5683 9.18767 14.9075 9.22536L15.0706 9.24294L15.0902 9.24587C15.6255 9.30535 16.0534 9.35287 16.3773 9.41872C16.6967 9.48368 16.9951 9.57919 17.2034 9.79177C17.5015 10.0959 17.6417 10.5214 17.5833 10.9431C17.5425 11.238 17.3599 11.4928 17.1419 11.7351C16.921 11.9808 16.6059 12.274 16.2113 12.6404L16.1966 12.6531L16.0247 12.8133C15.7257 13.091 15.6487 13.17 15.6058 13.2537C15.5616 13.3399 15.5375 13.4351 15.5364 13.532C15.5355 13.6259 15.5675 13.7335 15.7044 14.1238L15.7113 14.1424C15.9133 14.7182 16.0735 15.1742 16.1644 15.5291C16.2527 15.8738 16.3019 16.2125 16.1868 16.5056C16.0249 16.9181 15.674 17.2269 15.2445 17.3357C14.9401 17.4128 14.6133 17.3234 14.2855 17.1941C13.9488 17.0613 13.5221 16.8486 12.9847 16.5799L12.9671 16.5701L12.5491 16.3611C12.2676 16.2203 12.1904 16.1865 12.1165 16.1726C12.0404 16.1583 11.9622 16.1583 11.8861 16.1726C11.8122 16.1865 11.735 16.2203 11.4534 16.3611L11.0355 16.5701L11.0179 16.5799C10.4805 16.8486 10.0537 17.0613 9.71711 17.1941C9.38923 17.3234 9.06251 17.4128 8.75813 17.3357C8.32857 17.2269 7.97768 16.9181 7.81574 16.5056C7.70067 16.2125 7.74992 15.8738 7.8382 15.5291C7.92907 15.1742 8.08927 14.7182 8.29133 14.1424L8.29816 14.1238C8.43512 13.7335 8.46712 13.6259 8.46613 13.532C8.46508 13.4351 8.441 13.3399 8.3968 13.2537C8.35384 13.17 8.27692 13.091 7.97785 12.8133L7.80598 12.6531L7.79133 12.6404C7.3967 12.274 7.08163 11.9808 6.86066 11.7351C6.64272 11.4928 6.4601 11.238 6.41926 10.9431C6.36086 10.5214 6.50112 10.0959 6.79914 9.79177C7.0075 9.57919 7.30592 9.48368 7.62531 9.41872C7.94914 9.35287 8.37706 9.30535 8.91242 9.24587L8.93195 9.24294L9.09504 9.22536C9.43427 9.18767 9.5249 9.17349 9.59895 9.14138C9.67535 9.1082 9.74452 9.05999 9.80207 8.99977C9.85787 8.94137 9.90217 8.8611 10.055 8.55544L10.2435 8.17849C10.4663 7.73277 10.6458 7.37444 10.8089 7.1111C10.9711 6.84937 11.1544 6.61823 11.4124 6.49587Z"
                      fill="#FEF360"
                    />
                  </svg>
                  <span className="text-base font-medium">{rating}</span>
                </div>
              </div>
              <button
                className="bg-primary ml-auto flex cursor-pointer flex-row items-center rounded-[5.2083vw] px-15.75 py-3 hover:bg-[#1242B2]"
                onClick={handleOpenTask}
              >
                Выполнить
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2305 4.43162C14.5292 4.14484 15.0042 4.15441 15.291 4.45311L19.9062 9.2617C20.1848 9.55191 20.1848 10.0106 19.9062 10.3008L15.291 15.1094C15.0042 15.4082 14.5293 15.4177 14.2305 15.1308C13.9319 14.844 13.9222 14.369 14.209 14.0703L18.3262 9.78123L14.209 5.49217C13.9222 5.19338 13.9317 4.71846 14.2305 4.43162Z"
                    fill="#F2F2F2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
