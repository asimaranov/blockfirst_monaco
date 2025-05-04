import React from 'react';
import { cn } from '~/helpers';
import AiMessage from '../AiMessage';

const ErrorSvg = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
    >
      <path
        d="M9.99609 1C14.9665 1 18.9959 5.02962 18.9961 10C18.9961 14.9706 14.9667 19 9.99609 19C5.02571 18.9998 0.996094 14.9704 0.996094 10C0.996305 5.02975 5.02584 1.00021 9.99609 1Z"
        fill="#CF3336"
      />
      <path
        d="M7.5 12.5L12.5 7.5M7.5 7.5L12.5 12.5"
        stroke="#F2F2F2"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const SuccessSvg = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
    >
      <path
        d="M9.99609 0.996094C14.9665 0.996094 18.9959 5.02571 18.9961 9.99609C18.9961 14.9667 14.9667 18.9961 9.99609 18.9961C5.02571 18.9959 0.996094 14.9665 0.996094 9.99609C0.996305 5.02584 5.02584 0.996305 9.99609 0.996094Z"
        fill="#33CF8E"
      />
      <path
        d="M6.36328 10.2273L8.63601 12.5L13.636 7.5"
        stroke="#01050D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

interface ServiceMessageProps {
  header: string;
  message: {
    content: string;
    md?: any;
  };
  type: 'error' | 'success';
}

const ServiceMessage: React.FC<ServiceMessageProps> = ({
  header,
  message,
  type,
}) => (
  <div className={cn(
      'flex flex-col gap-4 rounded-[0.4167vw] bg-[#191419] p-4',
      type == 'error' ? 'bg-[error]' : 'bg-[#111B1D]'
    )}
  >
    <div className="flex flex-row gap-3">
      {type == 'error' ? <ErrorSvg /> : <SuccessSvg />}
      <span
        className={cn(
          'text-base',
          type == 'error' ? 'text-error' : 'text-success'
        )}
      >
        {header}
      </span>
    </div>
    <AiMessage richText={message.md || message.content} />

    {/* <span className="text-sm">{content}</span> */}
  </div>
);

export default ServiceMessage;
