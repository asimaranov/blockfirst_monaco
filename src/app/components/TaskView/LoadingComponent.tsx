'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import BfLogo from './assets/bf-logo.svg';
import BfBadge from './assets/bf-badge.svg';
import { InfoPopover, InfoPopoverIcon } from '../shared/InfoPopover';

export default function LoadingComponent() {
  const [progress, setProgress] = useState(0);
  const [stageProgress, setStageProgress] = useState([0, 0, 0]);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageProgress((prev) => {
        const newProgress = [...prev];

        // Only update the current stage
        if (currentStage < 3) {
          newProgress[currentStage] = Math.min(
            100,
            newProgress[currentStage] + 1
          );

          // Move to next stage when current one completes
          if (newProgress[currentStage] === 100 && currentStage < 2) {
            setCurrentStage(currentStage + 1);
          }
        }

        // Calculate the global progress (average of all stages)
        const totalProgress = Math.floor(
          newProgress.reduce((sum, p) => sum + p, 0) / 3
        );
        setProgress(totalProgress);

        return newProgress;
      });
    }, 5);

    return () => clearInterval(interval);
  }, [currentStage]);

  // useEffect(() => {
  //   if (progress === 100) {
  //     setProgress(0);
  //     setCurrentStage(0);
  //     setStageProgress([0, 0, 0]);
  //   }
  // }, [progress]);

  // Calculate the progress arc parameters for main progressbar
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress / 100);

  // Calculate the progress arc parameters for stage icons
  const stageRadius = 7.5;
  const stageCircumference = 2 * Math.PI * stageRadius;

  return (
    <div className="absolute top-0 left-0 flex h-full w-272 flex-col items-center justify-between pt-6 pb-5 border-accent border-l">
      <Image src={BfBadge} alt="logo" className="h-10 w-36.25" />
      <div className="flex flex-col items-center gap-10">
        <div className="relative h-fit w-fit">
          <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
            <span className="text-2xl">
              {progress}
              <span className="text-base">%</span>
            </span>
          </div>
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-25 w-25"
          >
            <g clipPath="url(#clip0_4374_33182)">
              <path
                d="M0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50ZM98.5 50C98.5 76.7858 76.7858 98.5 50 98.5C23.2142 98.5 1.5 76.7858 1.5 50C1.5 23.2142 23.2142 1.5 50 1.5C76.7858 1.5 98.5 23.2142 98.5 50Z"
                fill="#195AF4"
                fillOpacity="0.5"
              />
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="#195AF4"
                strokeWidth="1.5"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                transform="rotate(-90, 50, 50)"
              />
            </g>
            <defs>
              <clipPath id="clip0_4374_33182">
                <rect width="100" height="100" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="flex flex-row gap-10">
          <div className="flex flex-row gap-3">
            {stageProgress[0] === 100 ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M5.44922 10.65L8.04922 13.25L14.5492 6.75"
                  stroke="#33CF8E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  opacity="0.5"
                  d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM3.04 10C3.04 13.8439 6.1561 16.96 10 16.96C13.8439 16.96 16.96 13.8439 16.96 10C16.96 6.1561 13.8439 3.04 10 3.04C6.1561 3.04 3.04 6.1561 3.04 10Z"
                  fill="#9AA6B5"
                />
                <circle
                  cx="10"
                  cy="10"
                  r={stageRadius}
                  fill="none"
                  stroke={currentStage === 0 ? '#9AA6B5' : '#9AA6B5'}
                  strokeWidth="1.5"
                  strokeDasharray={stageCircumference}
                  strokeDashoffset={
                    stageCircumference * (1 - stageProgress[0] / 100)
                  }
                  transform="rotate(-90, 10, 10)"
                />
              </svg>
            )}
            <span
              className={`text-sm ${stageProgress[0] === 100 ? '' : currentStage === 0 ? '' : 'text-secondary'}`}
            >
              Подготовка среды ...
            </span>
          </div>
          <div className="flex flex-row gap-3">
            {stageProgress[1] === 100 ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M5.44922 10.65L8.04922 13.25L14.5492 6.75"
                  stroke="#33CF8E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  opacity="0.5"
                  d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM3.04 10C3.04 13.8439 6.1561 16.96 10 16.96C13.8439 16.96 16.96 13.8439 16.96 10C16.96 6.1561 13.8439 3.04 10 3.04C6.1561 3.04 3.04 6.1561 3.04 10Z"
                  fill="#9AA6B5"
                />
                <circle
                  cx="10"
                  cy="10"
                  r={stageRadius}
                  fill="none"
                  stroke={currentStage === 1 ? '#9AA6B5' : '#9AA6B5'}
                  strokeWidth="1.5"
                  strokeDasharray={stageCircumference}
                  strokeDashoffset={
                    stageCircumference * (1 - stageProgress[1] / 100)
                  }
                  transform="rotate(-90, 10, 10)"
                />
              </svg>
            )}
            <span
              className={`text-sm ${stageProgress[1] === 100 ? '' : currentStage === 1 ? '' : 'text-secondary'}`}
            >
              Настройка IDE...
            </span>
          </div>
          <div className="flex flex-row gap-3">
            {stageProgress[2] === 100 ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M5.44922 10.65L8.04922 13.25L14.5492 6.75"
                  stroke="#33CF8E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  opacity="0.5"
                  d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM3.04 10C3.04 13.8439 6.1561 16.96 10 16.96C13.8439 16.96 16.96 13.8439 16.96 10C16.96 6.1561 13.8439 3.04 10 3.04C6.1561 3.04 3.04 6.1561 3.04 10Z"
                  fill="#9AA6B5"
                />
                <circle
                  cx="10"
                  cy="10"
                  r={stageRadius}
                  fill="none"
                  stroke={currentStage === 2 ? '#9AA6B5' : '#9AA6B5'}
                  strokeWidth="1.5"
                  strokeDasharray={stageCircumference}
                  strokeDashoffset={
                    stageCircumference * (1 - stageProgress[2] / 100)
                  }
                  transform="rotate(-90, 10, 10)"
                />
              </svg>
            )}
            <span
              className={`text-sm ${stageProgress[2] === 100 ? '' : currentStage === 2 ? '' : 'text-secondary'}`}
            >
              Загрузка практики...
            </span>
          </div>
        </div>
      </div>
      <div className="text-secondary/50 flex items-center justify-center gap-2">
        <InfoPopover
          title="Идет загрузка"
          content="Пожалуйста подождите"
          className="opacity-50"
          icon={<InfoPopoverIcon className="!h-3.5 !w-3.5" />}
        />
        <span className="text-xs leading-3.5">
          Идет загрузка, пожалуйста пододжите
        </span>
      </div>
    </div>
  );
}
