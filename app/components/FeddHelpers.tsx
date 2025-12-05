import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  ORANGE: string;
  WHITE: string;
  BLACK: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
// --- Smart Video Component ---
// Handles the 5-second loop vs full play on hover logic
export const SmartVideo = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // If NOT hovering and we pass 5 seconds, reset to 0
      if (!isHovered && video.currentTime >= 5) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isHovered]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      muted
      autoPlay
      loop={isHovered} // Only loop the full video if hovering (otherwise we manually loop at 5s)
      playsInline
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

// --- Animation Component ---
export const AnimatedItem = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

export const SearchBar = ({ ORANGE, WHITE, BLACK, value, onChange }: SearchBarProps) => (
  <div className="w-full">
    <div
      className="flex overflow-hidden bg-white rounded-lg shadow-md transition-all focus-within:ring-2"
      style={{ 
        border: `2px solid ${ORANGE}`,
        // Add a subtle ring effect when focused using the orange color
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}
    >
      <input
        type="text"
        placeholder="Search posts..."
        value={value}
        onChange={onChange}
        className="flex-1 pl-6 pr-4 py-4 text-base text-gray-800 focus:outline-none w-full bg-transparent"
        style={{ color: BLACK }}
      />
      <button
        className="w-20 flex items-center justify-center text-white flex-shrink-0 hover:brightness-110 transition"
        style={{ backgroundColor: ORANGE }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
);