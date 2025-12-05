'use client';

import React from 'react';

type BubbleSize = 'sm' | 'md' | 'lg';

interface SpeechBubbleProps {
  text?: string;
  className?: string;
  color?: string;
  size?: BubbleSize;
  maxWidth?: string;
}

export const SpeechBubble = ({ 
  text = "Hello! This is a speech bubble.", 
  className = "",
  color = "#800080", // Default color
  size = "md",       // Default size
  maxWidth = "max-w-sm" // Default width constraint
}: SpeechBubbleProps) => {
  
  // Configuration for different sizes
  const sizeConfig = {
    sm: {
      body: "px-4 py-3 text-xs rounded-xl",
      tail: "w-[18px] h-[18px] -right-[12px]",
    },
    md: {
      body: "px-8 py-6 text-sm rounded-[2.5rem]",
      tail: "w-[26px] h-[26px] -right-[18px]",
    },
    lg: {
      body: "px-10 py-8 text-base rounded-[3rem]",
      tail: "w-[34px] h-[34px] -right-[24px]",
    }
  };

  const currentConfig = sizeConfig[size];

  return (
    <div className={`relative inline-block ${maxWidth} ${className}`}>
      {/* Bubble Body */}
      <div 
        className={`text-white font-medium leading-snug shadow-sm rounded-br-none transition-all duration-300 ${currentConfig.body}`}
        style={{ backgroundColor: color }}
      >
        {text}
      </div>
      
      {/* The Tail (SVG) */}
      <svg 
        className={`absolute bottom-0 fill-current transition-all duration-300 ${currentConfig.tail}`}
        style={{ color: color }}
        viewBox="0 0 30 30"
        aria-hidden="true" 
      >
        <path d="M0 0 Q 0 18 15 28 C 5 28 0 28 0 0 Z" /> 
        <path d="M0 0 L0 30 L-10 30 L-10 0 Z" /> 
      </svg>
    </div>
  );
};