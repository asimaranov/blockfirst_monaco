import React from 'react';
import { api } from '~/trpc/react';

interface ChatFailProps {
  onRetry: () => void;
  examId: string;
}

const ChatFail = ({ onRetry, examId }: ChatFailProps) => {
  const utils = api.useUtils();
  const restartExamMutation = api.examAi.restartExam.useMutation({
    onSuccess: () => {
      utils.examAi.getChatHistory.reset({ examId });
      onRetry();
    },
  });

  const handleRestartExam = () => {
    restartExamMutation.mutate({ examId });
  };

  return (
    <div className="mt-auto mb-auto flex flex-col items-center gap-12 p-8">
      <div className="flex flex-col items-center gap-10">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-30 w-30"
        >
          <mask id="path-1-inside-1_4430_41842" fill="white">
            <path d="M120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60ZM1.8 60C1.8 92.143 27.857 118.2 60 118.2C92.143 118.2 118.2 92.143 118.2 60C118.2 27.857 92.143 1.8 60 1.8C27.857 1.8 1.8 27.857 1.8 60Z" />
          </mask>
          <path
            d="M120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60ZM1.8 60C1.8 92.143 27.857 118.2 60 118.2C92.143 118.2 118.2 92.143 118.2 60C118.2 27.857 92.143 1.8 60 1.8C27.857 1.8 1.8 27.857 1.8 60Z"
            stroke="url(#paint0_linear_4430_41842)"
            stroke-width="1.83206"
            mask="url(#path-1-inside-1_4430_41842)"
          />
          <path
            d="M66.6562 47.6484C70.7042 47.6485 73.996 50.946 73.9961 55.0332C73.9961 56.4999 73.7918 57.8675 73.4297 59.1475L73.2646 59.6904L73.2627 59.6973C72.1493 63.2206 69.8639 66.0694 67.3857 68.1992C65.0584 70.1993 62.6111 71.5218 60.9297 72.1504L60.6035 72.2666L60.5938 72.2705C60.4791 72.311 60.2621 72.3486 59.9961 72.3486C59.7301 72.3486 59.5131 72.311 59.3984 72.2705H59.3994L59.3887 72.2666L59.0625 72.1504C57.3811 71.5218 54.9338 70.1993 52.6064 68.1992C50.2057 66.1359 47.9855 63.3979 46.8369 60.0254L46.7295 59.6973L46.7275 59.6904L46.5625 59.1475C46.2004 57.8675 45.9961 56.4999 45.9961 55.0332C45.9962 50.946 49.288 47.6485 53.3359 47.6484C55.7211 47.6484 57.8602 48.8082 59.1953 50.5928L59.9961 51.6631L60.7969 50.5928C62.132 48.8082 64.2711 47.6484 66.6562 47.6484Z"
            stroke="url(#paint1_linear_4430_41842)"
            stroke-width="2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_4430_41842"
              x1="-14.6939"
              y1="120"
              x2="123.281"
              y2="140.012"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FF20A2" />
              <stop offset="1" stop-color="#FF5B20" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_4430_41842"
              x1="41.3226"
              y1="73.3484"
              x2="75.6308"
              y2="78.9396"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#FF20A2" />
              <stop offset="1" stop-color="#FF5B20" />
            </linearGradient>
          </defs>
        </svg>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-5">
            <span className="text-2xl">«Жизни» исчерпаны!</span>
            <span className="text-secondary text-center text-sm">
              Превышен допустимый лимит ошибок, требуется повторная сдача
              зачета. Рекомендуется повторно ознакомиться с теоретическим и
              практическим материалом по теме.
            </span>
          </div>
          <button
            onClick={handleRestartExam}
            disabled={restartExamMutation.isPending}
            className="border-primary hover:bg-primary flex cursor-pointer flex-row rounded-[5.2083vw] border px-10 py-3.5 text-sm"
          >
            {restartExamMutation.isPending
              ? 'Перезапуск...'
              : 'Повторить зачет'}
            {!restartExamMutation.isPending && (
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M14.7305 4.43173C15.0107 4.16285 15.4458 4.15427 15.7354 4.40048L15.7911 4.45321L20.4063 9.26181C20.6848 9.55201 20.6848 10.0107 20.4063 10.3009L15.7911 15.1095C15.5042 15.4083 15.0294 15.4178 14.7305 15.1309C14.432 14.8441 14.4223 14.3691 14.709 14.0704L18.8252 9.78134L14.709 5.49228L14.6583 5.43368C14.4245 5.1343 14.4506 4.7005 14.7305 4.43173Z"
                  fill="#F2F2F2"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatFail;
