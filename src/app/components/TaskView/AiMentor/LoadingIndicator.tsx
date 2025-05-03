import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BfRobot from '../assets/bf-robot.png';

interface LoadingIndicatorProps {
  isGenerating: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  isGenerating,
}) => {
  const [loadingText, setLoadingText] = useState('Generating');

  // Animation for generating text
  useEffect(() => {
    if (!isGenerating) return;

    const loadingStates = [
      'Generating',
      'Generating.',
      'Generating..',
      'Generating...',
    ];
    let currentState = 0;

    const interval = setInterval(() => {
      setLoadingText(loadingStates[currentState]);
      currentState = (currentState + 1) % loadingStates.length;
    }, 400);

    return () => clearInterval(interval);
  }, [isGenerating]);

  if (!isGenerating) return null;

  return (
    <div className="font-delight flex flex-row gap-3 px-8 py-5 text-sm">
      <Image
        src={BfRobot}
        alt="Robot"
        width={20}
        height={20}
        className="h-5 w-5 shrink-0"
      />
      <span className="font-delight bg-[linear-gradient(98deg,#FF20A2_1.97%,#FF5B20_104.5%)] bg-clip-text leading-5 text-transparent">
        {loadingText}
      </span>
    </div>
  );
};

export default LoadingIndicator;
