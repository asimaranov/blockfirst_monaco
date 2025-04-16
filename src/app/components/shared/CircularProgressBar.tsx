'use client';

import React from 'react';

interface CircularProgressBarProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
  className?: string;
}

export function CircularProgressBar({
  progress,
  size = 20,
  strokeWidth = 1.8,
  trackColor = '#195AF4',
  progressColor = '#195AF4',
  className = '',
}: CircularProgressBarProps) {
  // Ensure progress is between 0 and 1
  const normalizedProgress = Math.min(Math.max(progress, 0), 1);

  // Calculate the circumference of the circle
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  // Calculate the arc length based on progress
  const arcLength = circumference * (1 - normalizedProgress);

  // Calculate SVG path for the progress arc
  const getProgressPath = () => {
    // Start at top of circle
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + 2 * Math.PI * normalizedProgress;

    const x1 = size / 2 + radius * Math.cos(startAngle);
    const y1 = size / 2 + radius * Math.sin(startAngle);
    const x2 = size / 2 + radius * Math.cos(endAngle);
    const y2 = size / 2 + radius * Math.sin(endAngle);

    // Determine if we need to draw a large arc (more than 180 degrees)
    const largeArcFlag = normalizedProgress > 0.5 ? 1 : 0;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Track Circle (background) */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={trackColor}
        strokeWidth={strokeWidth}
        opacity="0.5"
        fill="none"
      />

      {/* Progress Arc */}
      {normalizedProgress > 0 && (
        <path
          d={getProgressPath()}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
}
