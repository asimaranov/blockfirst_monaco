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
import Token10K from './assets/token-10k.svg';
import Clock from './assets/clock.svg';
import { TARIFFS } from '~/app/lib/constants/tariff';
import Link from 'next/link';

export default function AiMentor({ task }: { task: any }) {
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const canWrite = message.length > 0 && !isGenerating;

  const [messages, setMessages] = useState<
    { role: string; content: string; timestamp: Date }[]
  >([]);

  console.log('Chat id', task);

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

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
    setIsGenerating(true);

    try {
      await sendMessageMutation.mutateAsync({
        content: message,
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

                <div className="flex flex-col gap-2">
                  <div className="px-4 py-2">
                    <AiMessage richText={(x as any).md} />
                  </div>
                  <span className="text-secondary/50 text-xs">
                    {formatMessageDate(x.timestamp)}
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-row gap-4 self-end"
                key={`user-${index}`}
              >
                <div className="flex flex-col gap-2">
                  <span className="w-fit self-end rounded-[0.4167vw] bg-[#14171C] px-4 py-2">
                    {x.content}
                  </span>
                  <span className="text-secondary/50 self-end text-xs">
                    {formatMessageDate(x.timestamp)}
                  </span>
                </div>
                <div className="bg-primary h-9 w-9 rounded-full"></div>
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
              Generating...
            </span>
          </div>
        )}
        <div className="border-accent flex flex-row gap-8 border-t px-8 py-6">
          <textarea
            className="placeholder:text-secondary w-full resize-none rounded-lg py-2.5 text-sm outline-hidden"
            placeholder="Введите сообщение ..."
            onInput={(e) => {
              (e.target as HTMLTextAreaElement).style.height = 'auto';
              (e.target as HTMLTextAreaElement).style.height =
                (e.target as HTMLTextAreaElement).scrollHeight + 'px';
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && canWrite) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />

          <button
            className="border-primary h-fit self-end rounded-full border p-2.5 not-disabled:cursor-pointer disabled:opacity-50"
            onClick={handleSendMessage}
            disabled={!canWrite}
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
                d="M10 3.53906C10.1658 3.53906 10.3247 3.60491 10.4419 3.72212L15.4419 8.72212C15.686 8.9662 15.686 9.36193 15.4419 9.606C15.1979 9.85008 14.8021 9.85008 14.5581 9.606L10.625 5.67295L10.625 15.8307C10.625 16.1759 10.3452 16.4557 10 16.4557C9.65482 16.4557 9.375 16.1759 9.375 15.8307L9.375 5.67295L5.44194 9.60601C5.19786 9.85008 4.80214 9.85008 4.55806 9.60601C4.31398 9.36193 4.31398 8.9662 4.55806 8.72212L9.55806 3.72212C9.67527 3.60491 9.83424 3.53906 10 3.53906Z"
                fill="#F2F2F2"
              />
            </svg>
          </button>
        </div>
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
            <InfoPopover
              // className="h-4 w-4"
              popoverClassName="w-150"
              offsetTop={0}
              offsetSide={-58.5}
              title=""
              position="top"
              content=""
            >
              <div className="flex flex-col gap-10">
                <div className="flex flex-row gap-6">
                  <Image
                    src={Token10K}
                    alt="Token"
                    width={75}
                    height={75}
                    className="h-18.75 w-18.75"
                  />
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between">
                      <span className="text-xl">AI токены</span>
                      <div className="flex flex-row gap-0.5">
                        <span className="text-secondary/50 text-xs">
                          До ресета —{' '}
                        </span>
                        <div className="flex flex-row gap-1">
                          <Image
                            src={Clock}
                            alt="Clock"
                            width={16}
                            height={17}
                            className="h-4.25 w-4"
                          />
                          <span className="text-foreground text-xs">
                            16ч 48м
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-secondary text-xs">
                      Каждая буква в вашем запросе учитывается как отдельный
                      токен. Количество доступных токенов обновляется
                      автоматически ежедневно.
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col gap-6">
                    <span className="text-success bg-success/10 rounded-[0.4167vw] py-2.25 pl-3 text-sm">
                      Активный тариф
                    </span>
                    <div className="flex flex-row gap-4">
                      <Image
                        src={TARIFFS[0].bigIcon}
                        alt="Tariff"
                        width={40}
                        height={40}
                        className="h-10 w-10"
                      />
                      <div className="flex flex-col gap-1.5">
                        <span>10K /день</span>
                        <span className="text-secondary/50 text-xs">Free</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <Link
                      href="/tariffs"
                      className="flex items-center justify-between rounded-[0.4167vw] bg-[#195AF4]/10 px-3 py-2.25 text-sm"
                    >
                      Апгрейд
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.73278 2.48409C7.97198 2.24489 8.35979 2.24489 8.59899 2.48408L12.6823 6.56737C12.7972 6.68224 12.8617 6.83803 12.8617 7.00048C12.8617 7.16292 12.7972 7.31872 12.6823 7.43358L8.59899 11.5169C8.35979 11.7561 7.97198 11.7561 7.73278 11.5169C7.49359 11.2777 7.49359 10.8899 7.73278 10.6507L10.7705 7.61298H1.74922C1.41094 7.61298 1.13672 7.33875 1.13672 7.00048C1.13672 6.66221 1.41094 6.38798 1.74922 6.38798H10.7705L7.73278 3.35029C7.49359 3.1111 7.49359 2.72328 7.73278 2.48409Z"
                          fill="#195AF4"
                        />
                      </svg>
                    </Link>
                    <div className="flex flex-row gap-4">
                      <Image
                        src={TARIFFS[1].bigIcon}
                        alt="Tariff"
                        width={40}
                        height={40}
                        className="h-10 w-10"
                      />
                      <div className="flex flex-col gap-1.5">
                        <span>100K /день</span>
                        <span className="text-secondary/50 text-xs">
                          Starter
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <Link
                      href="/tariffs"
                      className="flex items-center justify-between rounded-[0.4167vw] bg-[#195AF4]/10 px-3 py-2.25 text-sm"
                    >
                      Апгрейд
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.73278 2.48409C7.97198 2.24489 8.35979 2.24489 8.59899 2.48408L12.6823 6.56737C12.7972 6.68224 12.8617 6.83803 12.8617 7.00048C12.8617 7.16292 12.7972 7.31872 12.6823 7.43358L8.59899 11.5169C8.35979 11.7561 7.97198 11.7561 7.73278 11.5169C7.49359 11.2777 7.49359 10.8899 7.73278 10.6507L10.7705 7.61298H1.74922C1.41094 7.61298 1.13672 7.33875 1.13672 7.00048C1.13672 6.66221 1.41094 6.38798 1.74922 6.38798H10.7705L7.73278 3.35029C7.49359 3.1111 7.49359 2.72328 7.73278 2.48409Z"
                          fill="#195AF4"
                        />
                      </svg>
                    </Link>
                    <div className="flex flex-row gap-4">
                      <Image
                        src={TARIFFS[2].bigIcon}
                        alt="Tariff"
                        width={40}
                        height={40}
                        className="h-10 w-10"
                      />
                      <div className="flex flex-col gap-1.5">
                        <span>1М /день</span>
                        <span className="text-secondary/50 text-xs">Pro</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </InfoPopover>
            <span className="text-secondary/50 text-sm leading-4">
              AI токены –{' '}
              <span className="font-delight bg-[linear-gradient(98deg,#FF20A2_1.97%,#FF5B20_104.5%)] bg-clip-text leading-4 text-transparent">
                10k
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
