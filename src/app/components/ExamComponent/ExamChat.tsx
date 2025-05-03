import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
import ChatInput from '../TaskView/ChatInput';
import { authClient } from '~/server/auth/client';

// Import new components
import ServiceMessage from '../TaskView/AiMentor/ServiceMessage';
import AiMessageItem from '../TaskView/AiMentor/AiMessageItem';
import UserMessageItem from '../TaskView/AiMentor/UserMessageItem';
import ChatFooter from '../TaskView/AiMentor/ChatFooter';
import LoadingIndicator from '../TaskView/AiMentor/LoadingIndicator';
import EmptyState from '../TaskView/AiMentor/EmptyState';
import ChatLoading from '../TaskView/AiMentor/ChatLoading';

export default function ExamChat({ task }: { task: any }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<
    {
      role: string;
      content: string;
      timestamp: Date;
      feedback?: 'upvote' | 'downvote' | null;
      serviceType?: 'error' | 'success' | null;
      md?: any;
    }[]
  >([]);

  // Add a reference to the token query to manually invalidate it
  const utils = api.useUtils();

  // const { data: session } = authClient.useSession();

  // Load chat history from API
  const { data: chatHistory, isLoading } = api.ai.getChatHistory.useQuery(
    {
      taskId: 'lakndf',
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

      // Invalidate token data to refresh token count
      utils.ai.getRemainingTokens.invalidate();
    },
    onError: (error) => {
      setIsGenerating(false);
      console.error('Error sending message:', error);

      // Still invalidate token data in case tokens were used
      utils.ai.getRemainingTokens.invalidate();
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

  useEffect(() => {
    if (messages.length === 0) {
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Приветсвую! Рад видеть тебя на зачете!',
            timestamp: new Date(),
          },
        ]);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'Объясните, что такое смарт-контракт в Solidity и опишите основные типы данных, которые используются при его разработке. Приведите пример простого смарт-контракта, который хранит и возвращает значение типа uint.',
            timestamp: new Date(),
          },
        ]);
      })();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <ChatLoading />
      ) : (
        <div className="flex h-177 flex-col-reverse gap-8 overflow-y-scroll px-8 pt-6 pb-5">
          {[...messages]
            .reverse()
            .map((message, index) =>
              message.role === 'assistant' && !message.serviceType ? (
                <AiMessageItem
                  key={`assistant-${index}-${message.content}`}
                  message={message}
                  index={messages.length - 1 - index}
                  handleFeedback={handleFeedback}
                />
              ) : message.role === 'assistant' && message.serviceType ? (
                <ServiceMessage
                  key={`service-${index}`}
                  header={
                    message.content === 'NO_TOKENS'
                      ? 'Недостаточно AI токенов'
                      : 'Неизвестная ошибка'
                  }
                  content={
                    message.content === 'NO_TOKENS'
                      ? 'У вас исчерпаны AI-токены или недостаточно токенов для запроса. Пожалуйста, дождитесь обновления лимита или измените тарифный план.'
                      : 'Произошла неизвестная ошибка'
                  }
                  type={message.serviceType}
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
        />
      </div>

      {/* <ChatFooter /> */}
    </>
  );
}
