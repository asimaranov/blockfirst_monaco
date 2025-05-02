import Image from 'next/image';
import BfRobot from './assets/bf-robot.png';
import BfRobotBadge from './assets/bf-robot-badge.svg';
import { InfoPopover } from '../shared/InfoPopover';
import { useEffect, useState } from 'react';
import RobotImage from './assets/bf-robot.png';
import { api } from '~/trpc/react';
import { format } from 'date-fns';
import PlateEditor from '../LessonPage/PlateEditor';
import { createEditor } from '@udecode/plate';
import AiMessage from './AiMessage';
import ChatInput from './ChatInput';
import AiTokensInfo from './AiTokensInfo';

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

const ServiceMessage = ({
  header,
  content,
  type,
}: {
  header: string;
  content: string;
  type: 'error' | 'success';
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3">
        {type == 'error' ? <ErrorSvg /> : <SuccessSvg />}
        <ErrorSvg />
        <span className="text-error text-base">{header}</span>
      </div>
      <span className="text-sm">{content}</span>
    </div>
  );
};

export default function AiMentor({ task }: { task: any }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingText, setLoadingText] = useState('Generating');

  const [messages, setMessages] = useState<
    {
      role: string;
      content: string;
      timestamp: Date;
      feedback?: 'upvote' | 'downvote' | null;
      // serviceType: 'error' | 'success';
    }[]
  >([]);

  console.log('Chat id', task);

  // Animation for generating text
  useEffect(() => {
    if (!isGenerating) return;

    const loadingStates = [
      'Generating',
      'Generating.',
      'Generating..',
      'Generating...',
    ];
    let currentState = 0;

    const interval = setInterval(() => {
      setLoadingText(loadingStates[currentState]);
      currentState = (currentState + 1) % loadingStates.length;
    }, 400);

    return () => clearInterval(interval);
  }, [isGenerating]);

  // Load chat history from API
  const { data: chatHistory, isLoading } = api.ai.getChatHistory.useQuery(
    {
      taskId: task?.id,
    },
    {
      // Ensure the query is refetched when the task ID changes
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    }
  );

  // Initialize AI chat
  useEffect(() => {
    if (
      chatHistory &&
      chatHistory.messages &&
      chatHistory.messages.length > 0
    ) {
      // Ensure messages are properly parsed with date objects
      const parsedMessages = chatHistory.messages.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(parsedMessages);
    }
  }, [chatHistory]);

  // Send message mutation
  const sendMessageMutation = api.ai.sendMessage.useMutation({
    onSuccess: (data) => {
      setIsGenerating(false);
      setMessages((prev) => [...prev, data.message]);
    },
    onError: (error) => {
      setIsGenerating(false);
      console.error('Error sending message:', error);
    },
  });

  // Feedback mutation
  const updateFeedbackMutation = api.ai.updateMessageFeedback.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => {
        const newMessages = [...prev];
        if (newMessages[data.messageIndex]) {
          newMessages[data.messageIndex].feedback = data.feedback;
        }
        return newMessages;
      });
    },
    onError: (error) => {
      console.error('Error updating message feedback:', error);
    },
  });

  // Handle message feedback
  const handleFeedback = (
    messageIndex: number,
    feedback: 'upvote' | 'downvote' | 'none'
  ) => {
    if (!task?.id) return;

    updateFeedbackMutation.mutateAsync({
      taskId: task.id,
      messageIndex,
      feedback,
    });
  };

  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const newMessage = {
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsGenerating(true);

    try {
      await sendMessageMutation.mutateAsync({
        content: messageContent,
        taskId: task?.id,
      });
    } catch (error) {
      // Error handling is done in the onError callback
    }
  };

  // Format date for display
  const formatMessageDate = (date: Date) => {
    return format(new Date(date), 'dd MMMM, HH:mm');
  };

  return (
    <>
      {messages.length == 0 ? (
        <div className="mt-auto mb-auto flex flex-col items-center justify-center gap-8">
          <div className="relative">
            <Image
              src={BfRobot}
              alt="AI ментор"
              width={80}
              height={80}
              className="h-20 w-20"
            />
            <div className="absolute bottom-0 left-1/2 h-7 w-35 -translate-x-1/2 translate-y-1/2 backdrop-blur-[10px]">
              <Image src={BfRobotBadge} alt="" className="h-7 w-35" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 px-8">
            <span className="text-2xl">Чем я могу помочь?</span>
            <span className="text-secondary text-center text-sm">
              Я ваш персональный AI — ментор, готовый оказать поддержку в поиске
              решений, анализе данных и многом другом
            </span>
          </div>
        </div>
      ) : (
        <div className="mb-auto flex flex-col gap-8 overflow-y-scroll px-8 pt-6 pb-5">
          {messages.map((x, index) =>
            x.role == 'assistant' ? (
              <div className="flex flex-row gap-4" key={`assistant-${index}`}>
                <Image
                  src={RobotImage}
                  alt="Robot"
                  width={36}
                  height={36}
                  className="h-9 w-9"
                />

                <div className="flex max-w-[calc(100%-(5+8)*var(--spacing))] flex-[0_1_auto] flex-col gap-4">
                  <div className="">
                    <AiMessage richText={(x as any).md} />
                  </div>
                  <div className="flex flex-row gap-6">
                    <div className="flex flex-row gap-2">
                      <button
                        className="group/upvote-button cursor-pointer"
                        onClick={() => {
                          const newFeedback =
                            x.feedback === 'upvote' ? 'none' : 'upvote';
                          handleFeedback(index, newFeedback);
                        }}
                      >
                        {x.feedback !== 'upvote' ? (
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
                            x.feedback === 'downvote' ? 'none' : 'downvote';
                          handleFeedback(index, newFeedback);
                        }}
                      >
                        {x.feedback !== 'downvote' ? (
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
                      {formatMessageDate(x.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-row gap-4 self-end"
                key={`user-${index}`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-4">
                    <span className="ml-20 w-fit self-end rounded-[0.4167vw] bg-[#14171C] px-4 py-2 text-sm">
                      {x.content}
                    </span>
                    <div className="bg-primary h-9 w-9 shrink-0 self-end rounded-full"></div>
                  </div>
                  <span className="text-secondary/50 mr-13 self-end text-xs">
                    {formatMessageDate(x.timestamp)}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      )}
      <div className="flex flex-col">
        {isGenerating && (
          <div className="font-delight flex flex-row gap-3 px-8 py-5 text-sm">
            <Image
              src={BfRobot}
              alt="Robot"
              width={20}
              height={20}
              className="h-5 w-5 shrink-0"
            />
            <span className="font-delight bg-[linear-gradient(98deg,#FF20A2_1.97%,#FF5B20_104.5%)] bg-clip-text leading-5 text-transparent">
              {loadingText}
            </span>
          </div>
        )}
        <ChatInput
          onSendMessage={handleSendMessage}
          isGenerating={isGenerating}
        />
      </div>

      <div className="border-accent sticky bottom-0 border-t px-8 py-4">
        <div className="flex flex-row items-center gap-5">
          <div className="flex flex-row items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <g clip-path="url(#clip0_3913_29688)">
                <path
                  d="M3.44459 10.475L6.39438 8.81995L6.44398 8.6762L6.39438 8.59624H6.25063L5.75765 8.56587L4.0722 8.52032L2.61047 8.45958L1.19428 8.38366L0.83796 8.30773L0.503906 7.86739L0.538324 7.64773L0.83796 7.44628L1.26717 7.48374L2.21568 7.54852L3.63894 7.64671L4.67147 7.70745L6.20103 7.86638H6.44398L6.4784 7.76819L6.39539 7.70745L6.3306 7.64671L4.85773 6.6486L3.26339 5.59381L2.42826 4.98644L1.97678 4.6787L1.74901 4.3902L1.65082 3.76056L2.0608 3.30908L2.61148 3.34654L2.75219 3.38399L3.30995 3.8132L4.50141 4.73539L6.05729 5.88129L6.28505 6.07059L6.37616 6.00581L6.38729 5.96025L6.28505 5.78918L5.43878 4.25962L4.53583 2.70374L4.13395 2.05891L4.02766 1.67222C3.99021 1.51329 3.96287 1.37967 3.96287 1.2167L4.42954 0.583008L4.68767 0.5L5.31022 0.583008L5.5724 0.810771L5.9591 1.69551L6.5857 3.08841L7.55749 4.98239L7.84194 5.5442L7.99378 6.06452L8.05047 6.22345H8.14866V6.13234L8.22863 5.06539L8.37643 3.7555L8.52017 2.07005L8.56977 1.59529L8.80462 1.02639L9.27129 0.718653L9.6357 0.892766L9.93534 1.32197L9.89384 1.59934L9.71568 2.75739L9.36644 4.5714L9.13867 5.78614H9.27129L9.42313 5.6343L10.0376 4.8184L11.0701 3.52774L11.5256 3.01552L12.0571 2.44966L12.3982 2.18039H13.043L13.5178 2.88595L13.3052 3.61479L12.6412 4.45701L12.0905 5.17067L11.3009 6.23357L10.8079 7.08389L10.8535 7.15171L10.9709 7.14057L12.7545 6.76097L13.7182 6.58685L14.8682 6.38946L15.3885 6.63241L15.4452 6.8794L15.2407 7.38453L14.0108 7.68822L12.5683 7.97672L10.4202 8.48488L10.3939 8.50412L10.4243 8.54157L11.392 8.63268L11.806 8.65495H12.8193L14.7062 8.79566L15.1992 9.12161L15.4948 9.52045L15.4452 9.82413L14.686 10.2108L13.6616 9.96788L11.2705 9.39898L10.4506 9.1945H10.3372V9.26232L11.0205 9.93042L12.2727 11.0611L13.8407 12.5188L13.9207 12.8792L13.7193 13.1637L13.5067 13.1333L12.129 12.0967L11.5975 11.63L10.3939 10.6168H10.3139V10.723L10.5913 11.129L12.0561 13.3307L12.132 14.0059L12.0257 14.2255L11.6461 14.3581L11.229 14.2822L10.3716 13.0786L9.4869 11.7232L8.77324 10.5084L8.68618 10.558L8.26508 15.0941L8.06768 15.3259L7.61215 15.5L7.23255 15.2115L7.0311 14.7448L7.23255 13.8227L7.4755 12.619L7.67289 11.6624L7.85105 10.474L7.95734 10.0792L7.95026 10.0529L7.8632 10.064L6.96733 11.294L5.6048 13.1353L4.52672 14.2893L4.26858 14.3916L3.82116 14.1597L3.86266 13.7457L4.11269 13.3772L5.6048 11.4792L6.50472 10.3029L7.08577 9.6237L7.08172 9.52551H7.0473L3.08421 12.0987L2.37865 12.1898L2.07497 11.9054L2.11242 11.4387L2.25617 11.2869L3.44762 10.4669L3.44357 10.471L3.44459 10.475Z"
                  fill="#D97757"
                />
              </g>
              <defs>
                <clipPath id="clip0_3913_29688">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className="text-secondary/50 text-sm leading-4">
              Claude 3.5
            </span>
          </div>

          <div className="ml-auto flex flex-row items-center gap-2">
            <AiTokensInfo />
          </div>
        </div>
      </div>
    </>
  );
}
