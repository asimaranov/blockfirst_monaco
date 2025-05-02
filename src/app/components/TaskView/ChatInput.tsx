import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isGenerating: boolean;
}

export default function ChatInput({ onSendMessage, isGenerating }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canWrite = message.length > 0 && !isGenerating;

  // Set initial height to ensure it's a single line and centered
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage('');

    // Reset height after sending message
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <div className="border-accent flex flex-row items-center gap-8 border-t px-8 py-6">
      <textarea
        ref={textareaRef}
        className="placeholder:text-secondary flex w-full resize-none items-center justify-center text-sm outline-hidden"
        placeholder={`Введите сообщение.\nShift + Enter для переноса строки`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onInput={(e) => {
          (e.target as HTMLTextAreaElement).style.height = 'auto';
          (e.target as HTMLTextAreaElement).style.height =
            (e.target as HTMLTextAreaElement).scrollHeight + 'px';
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && canWrite) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
        rows={1}
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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 3.53906C10.1658 3.53906 10.3247 3.60491 10.4419 3.72212L15.4419 8.72212C15.686 8.9662 15.686 9.36193 15.4419 9.606C15.1979 9.85008 14.8021 9.85008 14.5581 9.606L10.625 5.67295L10.625 15.8307C10.625 16.1759 10.3452 16.4557 10 16.4557C9.65482 16.4557 9.375 16.1759 9.375 15.8307L9.375 5.67295L5.44194 9.60601C5.19786 9.85008 4.80214 9.85008 4.55806 9.60601C4.31398 9.36193 4.31398 8.9662 4.55806 8.72212L9.55806 3.72212C9.67527 3.60491 9.83424 3.53906 10 3.53906Z"
            fill="#F2F2F2"
          />
        </svg>
      </button>
    </div>
  );
}
