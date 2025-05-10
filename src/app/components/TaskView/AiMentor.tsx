import { useEffect, useState, useRef } from 'react';
import { api } from '~/trpc/react';
import ChatInput from './ChatInput';
import { authClient } from '~/server/auth/client';

// Import new components
import ServiceMessage from './AiMentor/ServiceMessage';
import AiMessageItem from './AiMentor/AiMessageItem';
import UserMessageItem from './AiMentor/UserMessageItem';
import ChatFooter from './AiMentor/ChatFooter';
import LoadingIndicator from './AiMentor/LoadingIndicator';
import EmptyState from './AiMentor/EmptyState';
import ChatLoading from './AiMentor/ChatLoading';

export default function AiMentor({ task }: { task: any }) {
  const [isGenerating, setIsGenerating] = useState(false);
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
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Add a reference to the token query to manually invalidate it
  const utils = api.useUtils();

  const { data: session } = authClient.useSession();

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

  // Handle scroll position
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    // Check if user is at the bottom (or close to it)
    const handleScroll = () => {
      if (!chatContainer) return;

      // In a reversed container, we need to check if scrollTop is close to 0 to determine if at the "bottom"
      const isAtBottom = chatContainer.scrollTop <= 10;
      setIsAtBottom(isAtBottom);
    };

    chatContainer.addEventListener('scroll', handleScroll);

    return () => {
      chatContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll handling when messages change
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    // If user was at the bottom before new messages, scroll back to bottom
    if (isAtBottom) {
      chatContainer.scrollTop = 0;
    }
  }, [messages, isAtBottom]);

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

  return (
    <>
      {isLoading ? (
        <ChatLoading />
      ) : messages.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          ref={chatContainerRef}
          className="mb-auto flex flex-col-reverse gap-8 overflow-y-scroll px-8 pt-6 pb-5"
        >
          {[...messages].reverse().map((message, index) =>
            message.role === 'assistant' && !message.messageType ? (
              <AiMessageItem
                key={`assistant-${index}`}
                message={message}
                index={messages.length - 1 - index}
                handleFeedback={handleFeedback}
              />
            ) : message.role === 'assistant' && message.messageType ? (
              <ServiceMessage
                key={`service-${index}`}
                header={
                  message.messageTypeExplanation === 'NO_TOKENS'
                    ? 'Недостаточно AI токенов'
                    : 'Неизвестная ошибка'
                }
                message={
                  message.messageTypeExplanation === 'NO_TOKENS'
                    ? {
                        content:
                          'У вас исчерпаны AI-токены или недостаточно токенов для запроса. Пожалуйста, дождитесь обновления лимита или измените тарифный план.',
                      }
                    : {
                        content: 'Произошла неизвестная ошибка',
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
        />
      </div>

      <ChatFooter />
    </>
  );
}
