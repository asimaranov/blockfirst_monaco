'use client';

import { useEffect, useRef, useState } from 'react';

export default function SignUpConfirmEmailForm() {
  const [activeInput, setActiveInput] = useState(0);

  useEffect(() => {
    if (activeInput <= 4) {
      setTimeout(() => {
        inputRefs.current[activeInput]!.value = '';
        inputRefs.current[activeInput]!.focus();
      }, 100);
    }
  }, [activeInput]);

  const inputRefs = useRef<HTMLInputElement[]>([]);
  return (
    <>
      <div className="mb-[40px]">
        <h1 className="text-center text-[40px] font-bold uppercase leading-[48px] tracking-tight text-white">
          Подтвердите
          <br />
          Ваш e-mail
        </h1>
        <p className="mt-6 text-center text-[14px] leading-5 text-secondary">
          Мы выслали на ваш электронный адрес ссылку для подтверждения.
        </p>
        <div className="flex flex-row gap-[16px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <input
              ref={(node: HTMLInputElement | null) => {
                if (node) inputRefs.current[index] = node;
              }}
              className="h-[58px] w-[58px] border-b bg-transparent text-center text-[24px] text-foreground placeholder:text-center focus:outline-none"
              placeholder={'-'}
              id={`username-${index}`}
              name={`username-${index}`}
              type="text"
              maxLength={1}
              onKeyDown={(e) => {
                const newDigit = e.key.replace(/[^0-9]/g, '');

                if (e.key === 'Backspace') {
                  if (index > 0) {
                    e.currentTarget.value = '';
                    inputRefs.current[index - 1]?.focus();
                  }
                }

                if (newDigit.length > 0) {
                  e.currentTarget.value = e.key;
                  setActiveInput(index + 1);
                }
              }}
              onPaste={(e) => {
                const pasteData = e.clipboardData.getData('text/plain');
                const sanitizedData = pasteData.replace(/[^0-9]/g, '');

                for (let i = 0; i < Math.min(sanitizedData.length, 5); i++) {
                  if (inputRefs.current[i]) {
                    inputRefs.current[i]!.value = sanitizedData[i] || '';
                  }
                }
              }}
            ></input>
          ))}
        </div>
      </div>
    </>
  );
}
