import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import AiMessage from '../AiMessage';
import BfRobot from '../assets/bf-robot.png';
import { InfoPopover } from '../../shared/InfoPopover';

interface AiMessageItemProps {
  message: {
    content: string;
    timestamp: Date;
    feedback?: 'upvote' | 'downvote' | null;
    md?: any;
  };
  index: number;
  handleFeedback: (
    messageIndex: number,
    feedback: 'upvote' | 'downvote' | 'none'
  ) => void;
}

const AiMessageItem: React.FC<AiMessageItemProps> = ({
  message,
  index,
  handleFeedback,
}) => {
  // Format date for display
  const formatMessageDate = (date: Date) => {
    return format(new Date(date), 'dd MMMM, HH:mm');
  };

  return (
    <div className="flex flex-row gap-4">
      <Image
        src={BfRobot}
        alt="Robot"
        width={36}
        height={36}
        className="h-9 w-9"
      />

      <div className="flex max-w-[calc(100%-(5+8)*var(--spacing))] flex-[0_1_auto] flex-col gap-4">
        <div className="">
          <AiMessage richText={message.md || message.content} />
        </div>
        <div className="flex flex-row gap-6">
          <div className="flex flex-row gap-2">
            <button
              className="group/upvote-button cursor-pointer"
              onClick={() => {
                const newFeedback =
                  message.feedback === 'upvote' ? 'none' : 'upvote';
                handleFeedback(index, newFeedback);
              }}
            >
              {message.feedback !== 'upvote' ? (
                <InfoPopover
                  title={''}
                  content={''}
                  position="left"
                  offsetSide={10}
                  popoverClassName="w-fit px-3 py-2 rounded-[0.4167vw]"
                  className="!block"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      <path
                        d="M4.98828 12.2336L7.05495 13.8336C7.32161 14.1003 7.92161 14.2336 8.32161 14.2336H10.8549C11.6549 14.2336 12.5216 13.6336 12.7216 12.8336L14.3216 7.96697C14.6549 7.03364 14.0549 6.23364 13.0549 6.23364H10.3883C9.98828 6.23364 9.65495 5.9003 9.72161 5.43364L10.0549 3.3003C10.1883 2.7003 9.78828 2.03364 9.18828 1.83364C8.65495 1.63364 7.98828 1.9003 7.72161 2.3003L4.98828 6.36697"
                        stroke="#9AA6B5"
                        stroke-miterlimit="10"
                        className="group-hover/upvote-button:stroke-foreground"
                      />
                      <path
                        d="M1.58594 12.2297V5.69635C1.58594 4.76302 1.98594 4.42969 2.91927 4.42969H3.58594C4.51927 4.42969 4.91927 4.76302 4.91927 5.69635V12.2297C4.91927 13.163 4.51927 13.4964 3.58594 13.4964H2.91927C1.98594 13.4964 1.58594 13.163 1.58594 12.2297Z"
                        stroke="#9AA6B5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="group-hover/upvote-button:stroke-foreground"
                      />
                    </svg>
                  }
                >
                  <span className="text-xs">Хороший ответ</span>
                </InfoPopover>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <path
                    d="M5.59375 12.3245V5.5512C5.59375 5.28453 5.67375 5.02453 5.82042 4.80453L7.64042 2.09787C7.92708 1.66453 8.64042 1.35787 9.24708 1.58453C9.90042 1.80453 10.3337 2.53787 10.1937 3.1912L9.84708 5.3712C9.82042 5.5712 9.87375 5.7512 9.98708 5.8912C10.1004 6.01787 10.2671 6.09787 10.4471 6.09787H13.1871C13.7138 6.09787 14.1671 6.3112 14.4338 6.68453C14.6871 7.04453 14.7338 7.5112 14.5671 7.98453L12.9271 12.9779C12.7204 13.8045 11.8204 14.4779 10.9271 14.4779H8.32708C7.88042 14.4779 7.25375 14.3245 6.96708 14.0379L6.11375 13.3779C5.78708 13.1312 5.59375 12.7379 5.59375 12.3245Z"
                    fill="#F2F2F2"
                  />
                  <path
                    d="M3.47203 4.25H2.78536C1.75203 4.25 1.33203 4.65 1.33203 5.63667V12.3433C1.33203 13.33 1.75203 13.73 2.78536 13.73H3.47203C4.50536 13.73 4.92536 13.33 4.92536 12.3433V5.63667C4.92536 4.65 4.50536 4.25 3.47203 4.25Z"
                    fill="#F2F2F2"
                  />
                </svg>
              )}
            </button>
            <button
              className="group/downvote-button cursor-pointer"
              onClick={() => {
                const newFeedback =
                  message.feedback === 'downvote' ? 'none' : 'downvote';
                handleFeedback(index, newFeedback);
              }}
            >
              {message.feedback !== 'downvote' ? (
                <InfoPopover
                  title={''}
                  content={''}
                  position="left"
                  offsetSide={10}
                  popoverClassName="w-fit px-3 py-2 rounded-[0.4167vw]"
                  className="!block"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 cursor-pointer"
                    >
                      <path
                        d="M11.0158 3.76563L8.94909 2.16562C8.68243 1.89896 8.08243 1.76562 7.68243 1.76562H5.14909C4.34909 1.76562 3.48243 2.36562 3.28243 3.16562L1.68243 8.03229C1.34909 8.96562 1.94909 9.76563 2.94909 9.76563H5.61576C6.01576 9.76563 6.34909 10.099 6.28243 10.5656L5.94909 12.699C5.81576 13.299 6.21576 13.9656 6.81576 14.1656C7.34909 14.3656 8.01576 14.099 8.28243 13.699L11.0158 9.63229"
                        stroke="#9AA6B5"
                        stroke-miterlimit="10"
                        className="group-hover/downvote-button:stroke-foreground"
                      />
                      <path
                        d="M14.4154 3.76667V10.3C14.4154 11.2333 14.0154 11.5667 13.082 11.5667H12.4154C11.482 11.5667 11.082 11.2333 11.082 10.3V3.76667C11.082 2.83333 11.482 2.5 12.4154 2.5H13.082C14.0154 2.5 14.4154 2.83333 14.4154 3.76667Z"
                        stroke="#9AA6B5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="group-hover/downvote-button:stroke-foreground"
                      />
                    </svg>
                  }
                >
                  <span className="text-xs">Плохой ответ</span>
                </InfoPopover>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 shrink-0"
                >
                  <path
                    d="M10.4062 3.67547V10.4488C10.4062 10.7155 10.3263 10.9755 10.1796 11.1955L8.35958 13.9021C8.07292 14.3355 7.35958 14.6421 6.75292 14.4155C6.09958 14.1955 5.66625 13.4621 5.80625 12.8088L6.15292 10.6288C6.17958 10.4288 6.12625 10.2488 6.01292 10.1088C5.89958 9.98213 5.73292 9.90213 5.55292 9.90213H2.81292C2.28625 9.90213 1.83292 9.6888 1.56625 9.31547C1.31292 8.95547 1.26625 8.4888 1.43292 8.01547L3.07292 3.02213C3.27958 2.19547 4.17958 1.52213 5.07292 1.52213H7.67292C8.11958 1.52213 8.74625 1.67547 9.03292 1.96213L9.88625 2.62213C10.2129 2.8688 10.4062 3.26213 10.4062 3.67547Z"
                    fill="#F2F2F2"
                  />
                  <path
                    d="M12.528 11.75H13.2146C14.248 11.75 14.668 11.35 14.668 10.3633V3.65667C14.668 2.67 14.248 2.27 13.2146 2.27H12.528C11.4946 2.27 11.0746 2.67 11.0746 3.65667V10.3633C11.0746 11.35 11.4946 11.75 12.528 11.75Z"
                    fill="#F2F2F2"
                  />
                </svg>
              )}
            </button>
          </div>
          <span className="text-secondary/50 text-xs">
            {formatMessageDate(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AiMessageItem;
