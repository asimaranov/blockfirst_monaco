import React from 'react';
import Image from 'next/image';
import BfRobot from '../assets/bf-robot.png';
import BfRobotBadge from '../assets/bf-robot-badge.svg';

const EmptyState = () => {
  return (
    <div className="mt-auto mb-auto flex flex-col items-center justify-center gap-8">
      <div className="relative">
        <Image
          src={BfRobot}
          alt="AI ментор"
          width={80}
          height={80}
          className="h-20 w-20"
        />
        <div className="absolute bottom-0 left-1/2 h-7 w-35 -translate-x-1/2 translate-y-1/2 backdrop-blur-[10px]">
          <Image src={BfRobotBadge} alt="" className="h-7 w-35" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 px-8">
        <span className="text-2xl">Чем я могу помочь?</span>
        <span className="text-secondary text-center text-sm">
          Я ваш персональный AI — ментор, готовый оказать поддержку в поиске
          решений, анализе данных и многом другом
        </span>
      </div>
    </div>
  );
};

export default EmptyState;
