"use client";

import { useRef } from "react";

export default function SignUpConfirmEmailForm() {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  return (
    <>
      {/* Main heading */}
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
              placeholder={"-"}
              id={`username-${index}`}
              name={`username-${index}`}
              type="text"
              maxLength={1}
              onKeyDown={(e) => {
                e.preventDefault();
                console.log("onKeyDown event");
                console.log(e.key);
                const newDigit = e.key.replace(/[^0-9]/g, "");
                console.log(newDigit);

                if (e.key === "Backspace") {
                  if (index > 0) {
                    e.currentTarget.value = "";
                    inputRefs.current[index - 1]?.focus();
                  }
                  console.log("Backspace event");
                }

                if (newDigit.length > 0) {
                  e.currentTarget.value = e.key;
                  console.log("New digit event");

                  if (index < 4) {
                    inputRefs.current[index + 1]?.focus();
                    console.log("Focus event");
                  }
                }
              }}
              onInput={(e) => {
                console.log("onInput event");
                console.log(e.currentTarget.value);
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  "",
                );
              }}
              onPaste={(e) => {
                console.log("onPaste event");
                e.preventDefault();
                const pasteData = e.clipboardData.getData("text/plain");
                const sanitizedData = pasteData.replace(/[^0-9]/g, "");
                e.currentTarget.value = sanitizedData[0] || "";
                for (let i = 0; i < Math.min(sanitizedData.length, 5); i++) {
                  if (inputRefs.current[i]) {
                    inputRefs.current[i]!.value = sanitizedData[i] || "";
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
