'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MonacoView from './MonacoView';
import TaskInfo from './TaskInfo';
import { cn } from '~/helpers';
import AiMentor from './AiMentor';
import YourAssistant from './assets/your-assistant.png';
import Image from 'next/image';

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
    <div className="fixed top-0 left-0 z-1000 flex h-full w-full flex-row justify-between bg-[#0F1217]">
      <div className="border-accent flex h-full w-150 flex-col border-r">
        <div className="flex flex-row items-center px-8 py-6">
          <div
            className="group/back-button cursor-pointer p-2.5"
            onClick={handleClose}
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
                d="M8.86366 3.63374C8.57077 3.34084 8.0959 3.34084 7.80301 3.63373L1.96967 9.46701C1.82902 9.60766 1.75 9.79842 1.75 9.99734C1.75 10.1962 1.82902 10.387 1.96967 10.5277L7.803 16.361C8.0959 16.6539 8.57077 16.6539 8.86366 16.361C9.15656 16.0681 9.15656 15.5932 8.86366 15.3003L4.31066 10.7473H17.5C17.9142 10.7473 18.25 10.4116 18.25 9.99734C18.25 9.58313 17.9142 9.24734 17.5 9.24734H4.31067L8.86366 4.6944C9.15655 4.4015 9.15656 3.92663 8.86366 3.63374Z"
                fill="#F2F2F2"
                className="group-hover/back-button:fill-foreground/50"
              />
            </svg>
          </div>
          <div className="mr-auto ml-auto flex h-10 w-71.5 flex-row rounded-[5.2083vw] bg-[#01050D]">
            <button
              className={cn(
                'flex h-10 w-35.75 cursor-pointer items-center justify-center rounded-[5.2083vw]',
                activeTab === 'info' && 'bg-foreground'
              )}
              onClick={() => setActiveTab('info')}
            >
              <span
                className={cn(
                  'text-foreground text-sm font-medium',
                  activeTab === 'info' && 'text-[#01050D]'
                )}
              >
                Условие
              </span>
            </button>
            <button
              className={cn(
                'flex h-10 w-35.75 cursor-pointer items-center justify-center gap-2 rounded-[5.2083vw]',
                'relative',
                activeTab === 'ai-mentor' && 'bg-foreground'
              )}
              onClick={() => setActiveTab('ai-mentor')}
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
                  activeTab === 'ai-mentor' && 'text-[#01050D]'
                )}
              >
                AI ментор
              </span>
              {isAiMentorActive && (
                <div className="bg-error h-1.5 w-1.5 rounded-full"></div>
              )}
            </button>
          </div>

          <div className="group/hide-button cursor-pointer rounded-[0.4167vw] bg-[#14171C] p-2.5">
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
          </div>
        </div>

        {activeTab === 'info' && <TaskInfo task={task} />}
        {activeTab === 'ai-mentor' && <AiMentor task={task} />}
      </div>
      <div className="flex flex-col">
        <MonacoView />
        <div className="w-full flex-1 bg-blue-300"></div>
      </div>
    </div>
  );
}
