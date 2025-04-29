'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import BfLogo from './assets/bf-logo.svg';
import BfBadge from './assets/bf-badge.svg';
import { InfoPopover, InfoPopoverIcon } from '../shared/InfoPopover';
import LoadingComponent from './LoadingComponent';

const DynamicMonacoEditorReact = dynamic(() => import('./MonacoViewDynamic'), {
  ssr: false,
  loading: () => <LoadingComponent />,
});

// const DynamicMonacoEditorReact = LoadingComponent;

const FloatingActionBar = () => {
  const [position, setPosition] = useState({ bottom: 0, left: 0, width: 0 });
  const actionBarRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<
    | {
        message: string;
        tests: string[];
      }
    | undefined
  >({
    message: `Line 5: Char 5: error: non-void function does not return a value [-Werror,-Wreturn-type]
  5 |     }   
    |  
    ^
1 error generated.`,
    tests: ['Требование 2', 'Требование 3', 'Требование 4'],
  });

  useEffect(() => {
    const updatePosition = () => {
      const editorsDiv = document.getElementById('editorsDiv');
      if (editorsDiv) {
        const rect = editorsDiv.getBoundingClientRect();
        setPosition({
          bottom: window.innerHeight - rect.bottom,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    // Set initial position
    updatePosition();

    // Create a mutation observer to detect when editorsDiv is added to the DOM
    const observer = new MutationObserver((mutations) => {
      if (document.getElementById('editorsDiv')) {
        updatePosition();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Update position on resize
    window.addEventListener('resize', updatePosition);

    // Use ResizeObserver to detect changes in the editorsDiv
    let resizeObserver: ResizeObserver | null = null;
    const editorsDiv = document.getElementById('editorsDiv');

    if (editorsDiv && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(updatePosition);
      resizeObserver.observe(editorsDiv);
    }

    // Call updatePosition periodically during initialization
    const initInterval = setInterval(updatePosition, 500);
    setTimeout(() => clearInterval(initInterval), 2000);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updatePosition);
      if (resizeObserver && editorsDiv) {
        resizeObserver.unobserve(editorsDiv);
        resizeObserver.disconnect();
      }
      observer.disconnect();
      clearInterval(initInterval);
    };
  }, []);

  return (
    <div
      ref={actionBarRef}
      className="z-1000"
      style={{
        position: 'fixed',
        bottom: position.bottom,
        left: position.left,
        width: position.width || '0px',
        visibility: position.width ? 'visible' : 'hidden',
      }}
    >
      <div className="flex flex-col">
        {error && (
          <div className="border-t-error border-x-accent relative flex flex-col gap-8 border-x border-t bg-[#191419] px-8 py-6">
            <svg
              width="32"
              height="12"
              viewBox="0 0 32 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-1/2 mr-auto ml-auto -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            >
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="11"
                rx="5.5"
                fill="#0F1217"
                stroke="#CF3336"
              />
              <rect
                x="8"
                y="5.5"
                width="16"
                height="1"
                rx="0.5"
                fill="#F2F2F2"
              />
            </svg>
            <div className="flex w-full flex-row">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
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

                  <span className="text-base">Ошибка требований</span>
                </div>
                <span className="text-secondary text-sm">
                  Если вам не удалось решить задачи, обратитесь за помощью к
                  AI-ментору
                </span>
              </div>
              <div className="ml-auto pb-7 pl-7">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => {
                    setError(undefined);
                  }}
                >
                  <path
                    d="M5.91797 15.2474C5.5958 15.5696 5.07347 15.5696 4.7513 15.2474C4.42914 14.9252 4.42914 14.4029 4.7513 14.0807L8.83464 9.9974L4.7513 5.91406C4.42914 5.5919 4.42914 5.06956 4.7513 4.7474C5.07347 4.42523 5.5958 4.42523 5.91797 4.7474L10.0013 8.83073L14.0846 4.74739C14.4068 4.42523 14.9291 4.42523 15.2513 4.7474C15.5735 5.06956 15.5735 5.5919 15.2513 5.91406L11.168 9.9974L15.2513 14.0807C15.5735 14.4029 15.5735 14.9252 15.2513 15.2474C14.9291 15.5696 14.4068 15.5696 14.0846 15.2474L10.0013 11.1641L5.91797 15.2474Z"
                    fill="#F2F2F2"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-2">
                {error.tests.map((x) => (
                  <div className="border-error flex flex-row items-center gap-2 rounded-[0.4167vw] border-[0.026vw] px-4 py-2">
                    <div className="bg-error h-1 w-1 rounded-full" />
                    <span className="text-xs">{x}</span>
                  </div>
                ))}
              </div>
              <pre className="text-error text-xs">{error.message}</pre>
            </div>
          </div>
        )}

        <div className="border-accent flex flex-row items-center justify-center border-t shadow-lg">
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-row px-8 py-6">
              {/* Action buttons go here */}
              <div className="flex flex-row items-center gap-4">
                <Image
                  src={BfLogo}
                  alt="logo"
                  width={20}
                  height={20}
                  className="h-5 w-5 shrink-0"
                />
                <div className="flex items-center justify-center gap-1">
                  <span className="text-foreground text-xl leading-5">0</span>
                  <span className="text-secondary text-xs leading-5">
                    — Проверок кода
                  </span>
                </div>
              </div>
              <button className="bg-primary ml-auto flex cursor-pointer gap-2 rounded-[5.2083vw] px-6 py-3 text-sm">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M5.51953 12.0047V7.99469C5.51953 5.56965 5.51953 4.35713 6.30075 3.93063C7.08197 3.50412 8.10192 4.1598 10.1418 5.47116L13.2607 7.47616C15.0284 8.61257 15.9123 9.18077 15.9123 9.9997C15.9123 10.8186 15.0284 11.3868 13.2607 12.5232L10.1418 14.5282C8.10191 15.8396 7.08197 16.4953 6.30075 16.0688C5.51953 15.6423 5.51953 14.4297 5.51953 12.0047Z"
                    fill="#F2F2F2"
                  />
                </svg>
                <span className="text-sm">Проверить код</span>
              </button>
            </div>

            <div className="border-accent flex justify-center gap-1 border-x bg-[#14171C] py-2.25 text-xs">
              <div className="flex flex-row gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                >
                  <path
                    d="M6.11828 1.29969L3.20745 2.39635C2.53661 2.64719 1.98828 3.44052 1.98828 4.15219V8.48635C1.98828 9.17469 2.44328 10.0789 2.99745 10.493L5.50578 12.3655C6.32828 12.9839 7.68161 12.9839 8.50411 12.3655L11.0124 10.493C11.5666 10.0789 12.0216 9.17469 12.0216 8.48635V4.15219C12.0216 3.43469 11.4733 2.64135 10.8024 2.39052L7.89161 1.29969C7.39578 1.11885 6.60245 1.11885 6.11828 1.29969Z"
                    stroke="#9AA6B5"
                    stroke-width="0.875"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.28125 6.92464L6.22042 7.8638L8.72875 5.35547"
                    stroke="#9AA6B5"
                    stroke-width="0.875"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span className="text-secondary">Возникла проблема? </span>
              </div>

              <span className="underline">Написать нам</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MonacoView() {
  const [showActionBar, setShowActionBar] = useState(true);
  return (
    <div className="h-full w-272">
      <button
        onClick={() => setShowActionBar(!showActionBar)}
        className="absolute top-0 right-0 z-1000 h-10 w-10 bg-red-500"
      >
        {showActionBar ? 'hide' : 'show'}
      </button>
      {showActionBar && <DynamicMonacoEditorReact />}
      {showActionBar && <FloatingActionBar />}
    </div>
  );
}
