import React, { useState, useEffect } from 'react';
import { StarIcon, StarIconFilled } from '../TaskView/MonacoView';
import { api } from '~/trpc/react';
import { useExamStore } from '@/store/examStore';
import Confetti from 'react-confetti';

interface ChatSuccessProps {
  examId?: string;
}

const ChatSuccess = ({ examId }: ChatSuccessProps) => {
  const [rating, setRating] = useState<number | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const [confettiActive, setConfettiActive] = useState(true);
  const utils = api.useUtils();
  const { updateCompletionStatus } = useExamStore();

  // Set window dimensions for confetti
  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initialize dimensions
    updateWindowDimensions();

    // Add event listener
    window.addEventListener('resize', updateWindowDimensions);

    // Auto-disable confetti after 5 seconds
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 9000);

    // Clean up
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
      clearTimeout(timer);
    };
  }, []);

  // Fetch chat history to get correctAnswers and totalQuestions
  const { data: chatHistoryData } = api.examAi.getChatHistory.useQuery(
    { examId: examId || '' },
    { enabled: !!examId }
  );

  // Fetch existing rating if available
  const { data: ratingData } = api.examAi.getUserExamRating.useQuery(
    { examId: examId || '' },
    {
      enabled: !!examId,
    }
  );

  // Set rating if we have data from the API
  React.useEffect(() => {
    if (ratingData?.rating) {
      setRating(ratingData.rating);
    }
  }, [ratingData]);

  // Rating mutation
  const rateExamMutation = api.examAi.rateExam.useMutation({
    onSuccess: () => {
      // No need to invalidate anything, as the rating doesn't affect displayed data
    },
  });

  const handleRating = (newRating: number) => {
    if (rating === newRating) {
      // Clicking the same rating again clears it
      setRating(null);
    } else {
      setRating(newRating);

      // Submit the rating if we have an examId
      if (examId) {
        rateExamMutation.mutate({
          examId,
          rating: newRating,
        });
      }
    }
  };

  const correctAnswers = chatHistoryData?.correctAnswers || 0;
  const totalQuestions = chatHistoryData?.totalQuestions || 0;

  const restartExamMutation = api.examAi.restartExam.useMutation({
    onSuccess: () => {
      // Reset completion status in the store
      updateCompletionStatus(false, false);

      // Reset the chat history query to trigger a refetch
      if (examId) {
        utils.examAi.getChatHistory.reset({ examId });
      }
    },
  });

  const handleRestartExam = () => {
    if (examId) {
      restartExamMutation.mutate({ examId });
    }
  };

  const shareText = `Я успешно прошел зачет с результатом ${correctAnswers} из ${totalQuestions} правильных ответов!`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (network: string) => {
    let shareLink = '';

    switch (network) {
      case 'Вконтакте':
        shareLink = `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
        break;
      case 'Facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'Twitter (X)':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'Telegram':
        shareLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      default:
        return;
    }

    window.open(shareLink, '_blank', 'width=600,height=400');
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  return (
    <div className="mt-auto mb-auto flex flex-col items-center gap-12 p-8">
      {confettiActive && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
          run
        />
      )}

      <div className="flex flex-col items-center gap-10">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-30 w-30"
        >
          <path
            d="M120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60ZM1.8 60C1.8 92.143 27.857 118.2 60 118.2C92.143 118.2 118.2 92.143 118.2 60C118.2 27.857 92.143 1.8 60 1.8C27.857 1.8 1.8 27.857 1.8 60Z"
            fill="#33CF8E"
            fill-opacity="0.5"
          />
          <path
            d="M0 60C0 93.1371 26.8629 120 60 120C93.1371 120 120 93.1371 120 60C120 26.8629 93.1371 0 60 0C26.8629 0 0 26.8629 0 60ZM118.2 60C118.2 92.143 92.143 118.2 60 118.2C27.857 118.2 1.8 92.143 1.8 60C1.8 27.857 27.857 1.8 60 1.8C92.143 1.8 118.2 27.857 118.2 60Z"
            fill="#33CF8E"
          />
          <path
            d="M45.5 60.9091L54.5625 70L74.5 50"
            stroke="#33CF8E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-5">
            <span className="text-2xl">Зачет пройден!</span>
            <span className="text-secondary text-center text-sm">
              Поздравляем! Вы успешно прошли зачет и получили доступ к следующим
              материалам курса. Вы уверенно приближаетесь к достижению цели!
            </span>
          </div>

          {examId && (
            <button
              onClick={handleRestartExam}
              disabled={restartExamMutation.isPending}
              className="border-primary hover:bg-primary flex cursor-pointer flex-row rounded-[5.2083vw] border px-10 py-3.5 text-sm"
            >
              {restartExamMutation.isPending
                ? 'Перезапуск...'
                : 'Пройти зачет снова'}
              {!restartExamMutation.isPending && (
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5"
                >
                  <path
                    d="M14.7305 4.43173C15.0107 4.16285 15.4458 4.15427 15.7354 4.40048L15.7911 4.45321L20.4063 9.26181C20.6848 9.55201 20.6848 10.0107 20.4063 10.3009L15.7911 15.1095C15.5042 15.4083 15.0294 15.4178 14.7305 15.1309C14.432 14.8441 14.4223 14.3691 14.709 14.0704L18.8252 9.78134L14.709 5.49228L14.6583 5.43368C14.4245 5.1343 14.4506 4.7005 14.7305 4.43173Z"
                    fill="#F2F2F2"
                  />
                </svg>
              )}
            </button>
          )}

          <div className="flex h-fit w-fit flex-row items-center gap-2 rounded-[0.4167vw] bg-white/5 px-5 py-3">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4.25"
            >
              <path
                d="M6.09375 12.3245V5.5512C6.09375 5.28453 6.17375 5.02453 6.32042 4.80453L8.14042 2.09787C8.42708 1.66453 9.14042 1.35787 9.74708 1.58453C10.4004 1.80453 10.8337 2.53787 10.6937 3.1912L10.3471 5.3712C10.3204 5.5712 10.3737 5.7512 10.4871 5.8912C10.6004 6.01787 10.7671 6.09787 10.9471 6.09787H13.6871C14.2138 6.09787 14.6671 6.3112 14.9337 6.68453C15.1871 7.04453 15.2338 7.5112 15.0671 7.98453L13.4271 12.9779C13.2204 13.8045 12.3204 14.4779 11.4271 14.4779H8.82708C8.38042 14.4779 7.75375 14.3245 7.46708 14.0379L6.61375 13.3779C6.28708 13.1312 6.09375 12.7379 6.09375 12.3245Z"
                fill="#33CF8E"
              />
              <path
                d="M3.97203 4.25781H3.28536C2.25203 4.25781 1.83203 4.65781 1.83203 5.64448V12.3511C1.83203 13.3378 2.25203 13.7378 3.28536 13.7378H3.97203C5.00536 13.7378 5.42536 13.3378 5.42536 12.3511V5.64448C5.42536 4.65781 5.00536 4.25781 3.97203 4.25781Z"
                fill="#33CF8E"
              />
            </svg>

            <span className="text-xs leading-4">
              Количество правильных ответов — {correctAnswers} из{' '}
              {totalQuestions}.{' '}
              {correctAnswers >= Math.floor(totalQuestions * 0.7)
                ? 'Отличный результат!'
                : 'Хороший результат!'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-row">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              className="group cursor-pointer"
              key={index}
              onClick={() => handleRating(index + 1)}
            >
              {rating ? (
                <> {index < rating ? <StarIconFilled /> : <StarIcon />}</>
              ) : (
                <>
                  <StarIcon className="block not-first:ml-[-0.0521vw] group-hover:hidden group-has-[~button:hover]:hidden" />
                  <StarIconFilled className="hidden group-hover:block group-has-[~button:hover]:block" />
                </>
              )}
            </button>
          ))}
        </div>
        {rating ? (
          <span className="text-xs text-[#FEF360]/50">Спасибо за оценку!</span>
        ) : (
          <span className="text-xs text-[#FEF360]/50">
            Пожалуйста, оцените задачу
          </span>
        )}
      </div>
      <div className="flex w-full flex-col items-center gap-5">
        <div className="grid w-full grid-cols-5 gap-3">
          {[
            {
              name: 'Вконтакте',
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <rect width="16" height="16" rx="8" fill="#0077FF" />
                  <path
                    d="M8.39457 10.8031C5.38795 10.8031 3.67302 8.70102 3.60156 5.20312H5.10762C5.15709 7.77049 6.2674 8.85798 7.14685 9.0822V5.20312H8.56496V7.41734C9.43342 7.32204 10.3458 6.31303 10.6537 5.20312H12.0718C11.9558 5.77876 11.7246 6.32379 11.3926 6.80413C11.0606 7.28446 10.6351 7.68978 10.1425 7.99472C10.6923 8.27335 11.178 8.66772 11.5674 9.15182C11.9568 9.63592 12.2411 10.1987 12.4016 10.8031H10.8405C10.6965 10.2782 10.4037 9.80825 9.99892 9.45225C9.59412 9.09626 9.09529 8.87003 8.56496 8.80192V10.8031H8.39457V10.8031Z"
                    fill="#F2F2F2"
                  />
                </svg>
              ),
              onClick: () => handleShare('Вконтакте'),
            },
            {
              name: 'Facebook',
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <rect width="16" height="16" rx="8" fill="#0B84EE" />
                  <path
                    d="M8.66439 8.14905H10.1533L10.387 6.62734H8.66409V5.79566C8.66409 5.16352 8.86939 4.60297 9.45713 4.60297H10.4016V3.27502C10.2356 3.25248 9.88468 3.20312 9.22155 3.20312C7.83684 3.20312 7.02503 3.93884 7.02503 5.61501V6.62734H5.60156V8.14905H7.02503V12.3315C7.30694 12.3742 7.59248 12.4031 7.88559 12.4031C8.15054 12.4031 8.40913 12.3788 8.66439 12.344V8.14905Z"
                    fill="#F2F2F2"
                  />
                </svg>
              ),
              onClick: () => handleShare('Facebook'),
            },
            {
              name: 'Twitter (X)',
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <g clip-path="url(#clip0_3828_45729)">
                    <rect width="16" height="16" rx="8" fill="#01050D" />
                    <path
                      d="M8.59552 7.38246L11.2307 4.38281H10.6065L8.31738 6.98683L6.49047 4.38281H4.38281L7.14607 8.32092L4.38281 11.4661H5.00704L7.4228 8.7156L9.35257 11.4661H11.4602M5.23234 4.84379H6.19133L10.606 11.0278H9.64676"
                      fill="#F2F2F2"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3828_45729">
                      <rect width="16" height="16" rx="8" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ),
              onClick: () => handleShare('Twitter (X)'),
            },
            {
              name: 'Telegram',
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <rect width="16" height="16" rx="8" fill="#1EA1DD" />
                  <path
                    d="M11.2016 5.03777L9.99939 11.3138C9.99939 11.3138 9.83119 11.7489 9.36912 11.5402L6.59539 9.33791L6.58253 9.33142C6.9572 8.98303 9.86252 6.27794 9.9895 6.15532C10.1861 5.96542 10.064 5.85237 9.83581 5.99582L5.54428 8.81806L3.88862 8.24118C3.88862 8.24118 3.62807 8.14521 3.603 7.93652C3.5776 7.72749 3.89719 7.61443 3.89719 7.61443L10.6468 4.87245C10.6468 4.87245 11.2016 4.62005 11.2016 5.03777V5.03777Z"
                    fill="#F2F2F2"
                  />
                </svg>
              ),
              onClick: () => handleShare('Telegram'),
            },
            {
              name: linkCopied ? 'Скопировано!' : 'Ссылка',
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <g clip-path="url(#clip0_3828_45741)">
                    <path
                      d="M10.4 8.53375V11.0538C10.4 13.1538 9.56 13.9938 7.46 13.9938H4.94C2.84 13.9938 2 13.1538 2 11.0538V8.53375C2 6.43375 2.84 5.59375 4.94 5.59375H7.46C9.56 5.59375 10.4 6.43375 10.4 8.53375Z"
                      stroke="#F2F2F2"
                      stroke-width="0.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.0016 4.94V7.46C14.0016 9.56 13.1616 10.4 11.0616 10.4H10.4016V8.54C10.4016 6.44 9.56156 5.6 7.46156 5.6H5.60156V4.94C5.60156 2.84 6.44156 2 8.54156 2H11.0616C13.1616 2 14.0016 2.84 14.0016 4.94Z"
                      stroke="#F2F2F2"
                      stroke-width="0.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3828_45741">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ),
              onClick: copyLinkToClipboard,
            },
          ].map((x) => (
            <div
              key={x.name.replace(' ', '-')}
              onClick={x.onClick}
              className="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-[5.2083vw] border border-[#F2F2F2]/20 py-3 transition-colors hover:border-[#F2F2F2]"
            >
              <div className="flex flex-row items-center gap-2">
                {x.icon}
                <span className="text-sm leading-4">{x.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center gap-2">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4.25 w-4"
          >
            <path
              d="M10.5 2.39844V5.59844C4.1 5.59844 2.5 8.87844 2.5 13.5984C3.332 10.4304 5.7 8.79844 8.9 8.79844H10.5V11.9984L15.3 6.94244L10.5 2.39844Z"
              fill="#9AA6B5"
            />
          </svg>

          <span className="text-secondary text-xs">
            Поделитесь успехом в социальных сетях
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatSuccess;
