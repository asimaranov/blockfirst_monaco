import { useEffect, useState, useRef } from 'react';
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
    updateTotalQuestions,
    updateCorrectAnswers,
    totalQuestions,
    updateCompletionStatus,
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
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Add a reference to the token query to manually invalidate it
  const utils = api.useUtils();

  // Debug current state
  useEffect(() => {
    console.log('Current lives in store:', currentLives);
  }, [currentLives]);

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
        correctAnswers: chatHistory.correctAnswers,
        isCompleted: chatHistory.isCompleted,
        isFailed: chatHistory.isFailed,
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

      if (chatHistory.totalQuestions !== undefined) {
        updateTotalQuestions(chatHistory.totalQuestions);
      }

      // Update correct answers count
      if (chatHistory.correctAnswers !== undefined) {
        updateCorrectAnswers(chatHistory.correctAnswers);
      }

      // Update completion status
      if (
        chatHistory.isCompleted !== undefined ||
        chatHistory.isFailed !== undefined
      ) {
        updateCompletionStatus(
          !!chatHistory.isCompleted,
          !!chatHistory.isFailed
        );
      }
    }
  }, [
    chatHistory,
    updateLives,
    updateCurrentQuestion,
    updateTotalQuestions,
    updateCorrectAnswers,
    updateCompletionStatus,
  ]);

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

      // Update correct answers count if present
      if (data.correctAnswers !== undefined) {
        updateCorrectAnswers(data.correctAnswers);
      }

      // Update completion status if present in response
      if (data.isCompleted !== undefined || data.isFailed !== undefined) {
        updateCompletionStatus(!!data.isCompleted, !!data.isFailed);
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
        <div
          ref={chatContainerRef}
          className="flex h-177 flex-col-reverse gap-8 overflow-y-scroll px-8 pt-6 pb-5"
        >
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
                        : message.messageTypeExplanation === 'EXAM_COMPLETED'
                          ? 'Вы успешно прошли экзамен!'
                          : message.messageTypeExplanation ===
                              'INCORRECT_ANSWER'
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
                    : message.messageTypeExplanation === 'EXAM_COMPLETED'
                      ? {
                          content: '',
                          md: message.md,
                        }
                      : message.messageTypeExplanation === 'NO_LIVES_LEFT'
                        ? {
                            content: message.content,
                          }
                        : message.messageTypeExplanation === 'CORRECT_ANSWER'
                          ? {
                              content: '',
                              md: message.md,
                            }
                          : message.messageTypeExplanation ===
                              'INCORRECT_ANSWER'
                            ? {
                                content: '',
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
