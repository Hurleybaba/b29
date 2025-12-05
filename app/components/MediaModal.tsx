"use client";
import { useEffect, useState } from "react";

interface MediaItem {
  id: number;
  type: string;
  src: string;
  text?: string;
  distance?: string;
  timeLeft?: string;
}

interface MediaModalProps {
  item: MediaItem;
  items: MediaItem[]; // Added array of all items
  onClose: () => void;
  onShare?: () => void;
  onNext?: () => void; // Added next callback
  onPrevious?: () => void; // Added previous callback
}

export const MediaModal = ({ 
  item, 
  items, 
  onClose, 
  onShare, 
  onNext, 
  onPrevious 
}: MediaModalProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(
    items.findIndex(i => i.id === item.id)
  );
  const [currentItem, setCurrentItem] = useState<MediaItem>(item);

  useEffect(() => {
    setCurrentIndex(items.findIndex(i => i.id === currentItem.id));
  }, [currentItem, items]);

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      const nextItem = items[currentIndex + 1];
      setCurrentItem(nextItem);
      onNext?.();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevItem = items[currentIndex - 1];
      setCurrentItem(prevItem);
      onPrevious?.();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, handleNext, handlePrevious]);

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-[1010] p-3"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div 
        className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto gap-6 lg:gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Column: Media */}
        <div className="lg:w-2/3 flex flex-col items-center justify-center relative">
          {/* Previous Button - Left Side */}
          {currentIndex > 0 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white/80 hover:text-white bg-black/50 backdrop-blur-sm p-4 rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110 group"
              title="Previous"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Previous
              </span>
            </button>
          )}

          <div className="relative w-full max-w-4xl">
            {currentItem.type === "video" ? (
              <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
                <video
                  src={currentItem.src}
                  className="w-full h-auto max-h-[80vh] rounded-lg outline-none"
                  controls
                  autoPlay
                  playsInline
                />
                {/* Video Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <div className="h-full bg-orange-500 w-1/3"></div>
                </div>
              </div>
            ) : (
              <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src={currentItem.src} 
                  alt={currentItem.text || "Full view"} 
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  loading="eager"
                />
                {/* Zoom Controls */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button className="text-white bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-black/80 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Next Button - Right Side */}
          {currentIndex < items.length - 1 && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white/80 hover:text-white bg-black/50 backdrop-blur-sm p-4 rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110 group"
              title="Next"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Next
              </span>
            </button>
          )}

          {/* Progress Indicator */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentItem(items[index]);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-orange-500 w-8" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="mt-2 text-white/70 text-sm">
            {currentIndex + 1} / {items.length}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:w-1/3 flex flex-col bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-h-[80vh] overflow-y-auto">
          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button className="text-white hover:bg-white/10 p-3 rounded-full transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
              {onShare && (
                <button 
                  onClick={onShare}
                  className="text-white hover:bg-white/10 p-3 rounded-full transition"
                  title="Share"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const link = document.createElement('a');
                  link.href = currentItem.src;
                  link.download = currentItem.type === "video" ? `video-${currentItem.id}.mp4` : `image-${currentItem.id}.jpg`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="text-white hover:bg-white/10 p-3 rounded-full transition"
                title="Download"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
            
            {/* Distance Badge */}
            {currentItem.distance && (
              <span className="px-3 py-1.5 bg-orange-500/20 text-orange-300 text-xs font-bold rounded-full border border-orange-500/30">
                {currentItem.distance}
              </span>
            )}
          </div>

          {/* Post Content */}
          <div className="mb-6">
            <h1 className="text-white text-xl font-bold mb-4">Post Details</h1>
            <div className="bg-white/5 rounded-xl p-4 mb-4">
              <h2 className="text-white font-bold text-lg mb-2">Urban Vibes</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                {currentItem.text || "Your school got this, your school got that. Your school got hospital?"}
              </p>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="mb-6">
            <h3 className="text-white/70 text-sm font-medium mb-3">ENGAGEMENT</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-white/5 rounded-xl p-4">
                <div className="text-white text-2xl font-bold">42</div>
                <div className="text-white/50 text-xs">Likes</div>
              </div>
              <div className="text-center bg-white/5 rounded-xl p-4">
                <div className="text-white text-2xl font-bold">18</div>
                <div className="text-white/50 text-xs">Shares</div>
              </div>
              <div className="text-center bg-white/5 rounded-xl p-4">
                <div className="text-white text-2xl font-bold">7</div>
                <div className="text-white/50 text-xs">Comments</div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-white/70 text-sm font-medium mb-3">TAGS</h3>
            <div className="flex flex-wrap gap-2">
              {["#Business", "#Friendship", "#Education", "#Community", "#UrbanVibes"].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-white/10 text-white/90 text-xs font-medium rounded-full border border-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Time Information */}
          {currentItem.timeLeft && (
            <div className="mb-6">
              <h3 className="text-white/70 text-sm font-medium mb-2">TIME LEFT</h3>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white font-bold">{currentItem.timeLeft}</span>
              </div>
            </div>
          )}

          {/* Author Info */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-orange-500 to-pink-500"></div>
              <div>
                <p className="text-white font-bold">Creative Studio</p>
                <p className="text-white/50 text-xs">Posted 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};