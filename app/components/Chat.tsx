'use client';

import React from 'react';

/**
 * Reusable Next.js Component: SpeechBubble
 * * Usage:
 * import SpeechBubble from './components/SpeechBubble';
 * * <SpeechBubble text="Hello World" color="#FF0000" />
 */
export const SpeechBubble = ({ 
  text = "Hello! This is a speech bubble.", 
  className = "",
  color = "#800080" // Default color
}) => {
  return (
    <div className={`relative inline-block max-w-sm ${className}`}>
      {/* Bubble Body */}
      <div 
        className="text-white px-8 py-6 rounded-[2.5rem] rounded-br-none text-sm font-medium leading-snug shadow-sm"
        style={{ backgroundColor: color }}
      >
        {text}
      </div>
      
      {/* The Tail (SVG) */}
      <svg 
        className="absolute bottom-0 -right-[18px] w-[26px] h-[26px] fill-current"
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

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Default</h2>
        <SpeechBubble />
      </div>
    </main>
  );
}