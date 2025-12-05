"use client";
import { useEffect } from "react";

interface MediaItem {
  id: number;
  type: string;
  src: string;
  text?: string;
}

interface MediaModalProps {
  item: MediaItem;
  onClose: () => void;
}

export const MediaModal = ({ item, onClose }: MediaModalProps) => {
  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose} // Clicking the background closes the modal
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-[1010]"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div 
        className="relative w-full h-full flex flex-col items-center justify-center max-w-7xl mx-auto"
        onClick={(e) => e.stopPropagation()} // Clicking content does NOT close modal
      >
        {item.type === "video" ? (
          <video
            src={item.src}
            className="max-h-[85vh] max-w-full rounded-lg shadow-2xl outline-none"
            controls // Adds Play, Pause, Volume, Fullscreen, etc.
            autoPlay // Starts playing immediately
            playsInline
          />
        ) : (
          <img 
            src={item.src} 
            alt={item.text || "Full view"} 
            className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
          />
        )}
        
        {/* Optional: Show Caption at bottom */}
        {item.text && (
          <p className="mt-4 text-white text-lg font-medium text-center">
            {item.text}
          </p>
        )}
      </div>
    </div>
  );
};