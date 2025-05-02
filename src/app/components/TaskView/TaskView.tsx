'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MonacoView from './MonacoView';
import TaskInfo from './TaskInfo';
import { cn } from '~/helpers';
import AiMentor from './AiMentor';
import YourAssistant from './assets/your-assistant.png';
import Image from 'next/image';
import React from 'react';
import { TaskStatusBadge } from '../LessonPage/plate/TaskCard';
import Link from 'next/link';

export default function TaskView({
  task,
  onClose,
  courseId,
}: {
  task: any;
  onClose?: () => void;
  courseId?: string;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'info' | 'ai-mentor'>('info');
  const [isAiMentorActive, setIsAiMentorActive] = useState(false);
  const [isMentorPopoverShown, setIsMentorPopoverShown] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const labels = ['Глава 1', 'Глава 2', 'Глава 3'];

  useEffect(() => {
    if (!window.localStorage.aiPopoverShown) {
      setIsMentorPopoverShown(true);
      setTimeout(() => {
        window.localStorage.aiPopoverShown = true;
        setIsMentorPopoverShown(false);
      }, 5000);
    }
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      if (courseId) {
        router.push(`/lesson/${courseId}`);
      } else {
        router.back();
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 z-1000 flex h-full w-full shrink-0 flex-row justify-between bg-[#0F1217]">
      {!collapsed ? (
        <div className="border-accent flex h-full w-150 flex-col border-r">
          <div className="flex flex-row items-center px-8 py-6">
            <Link
              href={`/lesson/${courseId}`}
              className="group/back-button cursor-pointer p-2.5"
              onClick={handleClose}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.86366 3.63374C8.57077 3.34084 8.0959 3.34084 7.80301 3.63373L1.96967 9.46701C1.82902 9.60766 1.75 9.79842 1.75 9.99734C1.75 10.1962 1.82902 10.387 1.96967 10.5277L7.803 16.361C8.0959 16.6539 8.57077 16.6539 8.86366 16.361C9.15656 16.0681 9.15656 15.5932 8.86366 15.3003L4.31066 10.7473H17.5C17.9142 10.7473 18.25 10.4116 18.25 9.99734C18.25 9.58313 17.9142 9.24734 17.5 9.24734H4.31067L8.86366 4.6944C9.15655 4.4015 9.15656 3.92663 8.86366 3.63374Z"
                  fill="#F2F2F2"
                  className="group-hover/back-button:fill-foreground/50"
                />
              </svg>
            </Link>
            <div className="mr-auto ml-auto flex h-10 w-71.5 flex-row rounded-[5.2083vw] bg-[#01050D]">
              <button
                className={cn(
                  'group/tab-button flex h-10 w-35.75 cursor-pointer items-center justify-center rounded-[5.2083vw]',
                  activeTab === 'info' && 'bg-foreground'
                )}
                onClick={() => setActiveTab('info')}
              >
                <span
                  className={cn(
                    'text-foreground text-sm font-medium',
                    activeTab === 'info'
                      ? 'text-[#01050D]'
                      : 'group-hover/tab-button:text-foreground/50'
                  )}
                >
                  Условие
                </span>
              </button>
              <button
                className={cn(
                  'group/tab-button flex h-10 w-35.75 cursor-pointer items-center justify-center gap-2 rounded-[5.2083vw]',
                  'relative',
                  activeTab === 'ai-mentor' && 'bg-foreground'
                )}
                onClick={() => {
                  setActiveTab('ai-mentor');
                  setIsAiMentorActive(false);
                }}
              >
                {isMentorPopoverShown && (
                  <Image
                    src={YourAssistant}
                    alt="Your assistant"
                    className="absolute -bottom-12 h-9.5 w-33.75"
                  ></Image>
                )}

                <span
                  className={cn(
                    'text-foreground text-sm font-medium',
                    activeTab === 'ai-mentor'
                      ? 'text-[#01050D]'
                      : 'group-hover/tab-button:text-foreground/50'
                  )}
                >
                  AI ментор
                </span>
                {isAiMentorActive && (
                  <div className="bg-error h-1.5 w-1.5 rounded-full"></div>
                )}
              </button>
            </div>

            <button
              className="group/hide-button cursor-pointer rounded-[0.4167vw] bg-[#14171C] p-2.5"
              onClick={() => setCollapsed(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.106 4.55806C11.8619 4.31398 11.4662 4.31398 11.2221 4.55806L6.22212 9.55806C5.97804 9.80214 5.97804 10.1979 6.22212 10.4419L11.2221 15.4419C11.4662 15.686 11.8619 15.686 12.106 15.4419C12.3501 15.1979 12.3501 14.8021 12.106 14.5581L7.54795 10L12.106 5.44194C12.3501 5.19786 12.3501 4.80214 12.106 4.55806Z"
                  fill="#F2F2F2"
                  className="group-hover/hide-button:fill-foreground/50"
                />
              </svg>
            </button>
          </div>

          {activeTab === 'info' && <TaskInfo task={task} />}
          {activeTab === 'ai-mentor' && <AiMentor task={task} />}
        </div>
      ) : (
        <div className="border-accent flex h-full w-26 shrink-0 flex-col items-center gap-8 border-r">
          <Link
            href={`/lesson/${courseId}`}
            className="flex flex-row gap-8 pt-6"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 cursor-pointer hover:opacity-50"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.8637 13.6337C18.5708 13.3408 18.0959 13.3408 17.803 13.6337L11.9697 19.467C11.829 19.6077 11.75 19.7984 11.75 19.9973C11.75 20.1962 11.829 20.387 11.9697 20.5277L17.803 26.361C18.0959 26.6539 18.5708 26.6539 18.8637 26.361C19.1566 26.0681 19.1566 25.5932 18.8637 25.3003L14.3107 20.7473H27.5C27.9142 20.7473 28.25 20.4116 28.25 19.9973C28.25 19.5831 27.9142 19.2473 27.5 19.2473H14.3107L18.8637 14.6944C19.1566 14.4015 19.1566 13.9266 18.8637 13.6337Z"
                fill="#F2F2F2"
              />
            </svg>
          </Link>
          <div className="relative">
            <div className="absolute bottom-0 left-0 flex origin-left rotate-90 flex-row items-center justify-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
                    <div className="text-secondary/50 text-xs whitespace-nowrap">
                      {x}
                    </div>
                    {i !== labels.length - 1 && (
                      <div className="flex items-center justify-center px-2">
                        <div className="bg-secondary h-1 w-1 rounded-full opacity-50"></div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <TaskStatusBadge status={task.status} className="ml-6" />
            </div>
          </div>
          <button
            className="group/collapse-button mt-auto mb-6 cursor-pointer rounded-[8px] bg-[#14171C] p-2.5"
            onClick={() => setCollapsed(false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 group-hover/collapse-button:opacity-50"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.894 4.55806C8.13807 4.31398 8.5338 4.31398 8.77788 4.55806L13.7779 9.55806C14.022 9.80214 14.022 10.1979 13.7779 10.4419L8.77788 15.4419C8.5338 15.686 8.13807 15.686 7.894 15.4419C7.64992 15.1979 7.64992 14.8021 7.894 14.5581L12.4521 10L7.894 5.44194C7.64992 5.19786 7.64992 4.80214 7.894 4.55806Z"
                fill="#F2F2F2"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="flex flex-col">
        <MonacoView
          setIsAiMentorActive={setIsAiMentorActive}
          isCollapsed={collapsed}
        />
        <div className="w-full flex-1 bg-blue-300"></div>
      </div>
    </div>
  );
}
