import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
import ChatInput from '../TaskView/ChatInput';
import { authClient } from '~/server/auth/client';
import { useExamStore } from '@/store/examStore';

// Import new components
import ServiceMessage from '../TaskView/AiMentor/ServiceMessage';
import AiMessageItem from '../TaskView/AiMentor/AiMessageItem';
import UserMessageItem from '../TaskView/AiMentor/UserMessageItem';
import ChatFooter from '../TaskView/AiMentor/ChatFooter';
import LoadingIndicator from '../TaskView/AiMentor/LoadingIndicator';
import EmptyState from '../TaskView/AiMentor/EmptyState';
import ChatLoading from '../TaskView/AiMentor/ChatLoading';

export default function ExamChat({ examId }: { examId: string }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    totalLives,
    currentLives,
    currentQuestionId,
    updateLives,
    updateCurrentQuestion,
  } = useExamStore();
  const [messages, setMessages] = useState<
    {
      role: string;
      content: string;
      timestamp: Date;
      feedback?: 'upvote' | 'downvote' | null;
      messageType?: 'error' | 'success' | null;
      messageTypeExplanation?: string | null;
      md?: any;
    }[]
  >([]);

  // Add a reference to the token query to manually invalidate it
  const utils = api.useUtils();

  // Debug current state
  useEffect(() => {
    console.log('Current lives in store:', currentLives);
  }, [currentLives]);

  // Load chat history from API
  const { data: chatHistory, isLoading } = api.examAi.getChatHistory.useQuery(
    {
      examId: examId,
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
      // Debug chatHistory data
      console.log('Chat history loaded:', {
        totalLives: chatHistory.totalLives,
        currentLives: chatHistory.currentLives,
        currentQuestionId: chatHistory.currentQuestionId,
      });

      if (chatHistory.messages.every((msg) => msg.role === 'assistant')) {
        for (const [i, msg] of chatHistory.messages.entries()) {
          if (msg.delay) {
            setIsGenerating(true);
            setTimeout(() => {
              if (i === chatHistory.messages.length - 1) {
                setIsGenerating(false);
              }

              setMessages((prev) => [
                ...prev,
                { ...msg, timestamp: new Date(msg.timestamp) },
              ]);
            }, msg.delay);
          } else {
            setMessages((prev) => [
              ...prev,
              { ...msg, timestamp: new Date(msg.timestamp) },
            ]);
          }
        }
      } else {
        const parsedMessages = chatHistory.messages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(parsedMessages);
      }

      // Set lives and current question ID from chat history
      if (
        chatHistory.totalLives !== undefined &&
        chatHistory.currentLives !== undefined
      ) {
        console.log(
          'Updating lives from chat history:',
          chatHistory.currentLives,
          chatHistory.totalLives
        );
        updateLives(chatHistory.currentLives, chatHistory.totalLives);
      }

      if (chatHistory.currentQuestionId !== undefined) {
        updateCurrentQuestion(chatHistory.currentQuestionId);
      }
    }
  }, [chatHistory, updateLives, updateCurrentQuestion]);

  // Send message mutation
  const sendMessageMutation = api.examAi.sendMessage.useMutation({
    onSuccess: (data) => {
      setIsGenerating(false);
      console.log('Message response data:', data);
      setMessages((prev) => [...prev, data.message]);

      // Update lives and current question ID in the store
      if (data.currentLives !== undefined) {
        const currentLivesValue = Number(data.currentLives);
        console.log(
          'Updating lives from response:',
          currentLivesValue,
          data.totalLives || totalLives
        );

        if (!isNaN(currentLivesValue)) {
          updateLives(
            currentLivesValue,
            data.totalLives !== undefined ? Number(data.totalLives) : totalLives
          );
        }
      }

      if (data.currentQuestionId !== undefined) {
        const questionIdValue = Number(data.currentQuestionId);
        if (!isNaN(questionIdValue)) {
          updateCurrentQuestion(questionIdValue);
        }
      }

      // Invalidate the chat history query to refresh the data
      utils.examAi.getChatHistory.invalidate({ examId });

      // Invalidate token data to refresh token count
      utils.examAi.getRemainingTokens.invalidate();
    },
    onError: (error) => {
      setIsGenerating(false);
      console.error('Error sending message:', error);

      // Still invalidate token data in case tokens were used
      utils.examAi.getRemainingTokens.invalidate();
    },
  });

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
      console.log('Sending message with current lives:', currentLives);
      await sendMessageMutation.mutateAsync({
        content: messageContent,
        examId: examId,
      });
    } catch (error) {
      // Error handling is done in the onError callback
    }
  };

  return (
    <>
      {isLoading ? (
        <ChatLoading />
      ) : (
        <div className="flex h-177 flex-col-reverse gap-8 overflow-y-scroll px-8 pt-6 pb-5">
          {[...messages].reverse().map((message, index) =>
            message.role === 'assistant' && !message.messageType ? (
              <AiMessageItem
                key={`assistant-${index}-${message.content}`}
                message={message}
                index={messages.length - 1 - index}
                showFeedback={false}
                handleFeedback={() => {}}
              />
            ) : message.role === 'assistant' && message.messageType ? (
              <ServiceMessage
                key={`service-${index}`}
                header={
                  message.messageTypeExplanation === 'NO_TOKENS'
                    ? 'Недостаточно AI токенов'
                    : message.messageTypeExplanation === 'NO_LIVES_LEFT'
                      ? 'Недостаточно попыток'
                      : message.messageTypeExplanation === 'CORRECT_ANSWER'
                        ? 'Верно!'
                        : message.messageTypeExplanation === 'INCORRECT_ANSWER'
                          ? 'Неверно!'
                          : message.messageTypeExplanation === 'UNKNOWN_ERROR'
                            ? 'Неизвестная ошибка'
                            : 'Неизвестная ошибка'
                }
                message={
                  message.messageTypeExplanation === 'NO_TOKENS'
                    ? {
                        content:
                          'У вас исчерпаны AI-токены или недостаточно токенов для запроса. Пожалуйста, дождитесь обновления лимита или измените тарифный план.',
                      }
                    : message.messageTypeExplanation === 'NO_LIVES_LEFT'
                      ? {
                          content: message.content,
                        }
                      : message.messageTypeExplanation === 'CORRECT_ANSWER'
                        ? {
                            md: message.md,
                          }
                        : message.messageTypeExplanation === 'INCORRECT_ANSWER'
                          ? {
                              md: message.md,
                            }
                          : {
                              content: `Произошла неизвестная ошибка: ${message.messageTypeExplanation}`,
                            }
                }
                type={message.messageType}
              />
            ) : (
              <UserMessageItem key={`user-${index}`} message={message} />
            )
          )}
        </div>
      )}
      <div className="flex flex-col">
        <LoadingIndicator isGenerating={isGenerating} />
        <ChatInput
          onSendMessage={handleSendMessage}
          isGenerating={isGenerating}
          disabled={currentLives <= 0}
        />
      </div>

      {/* <ChatFooter /> */}
    </>
  );
}
