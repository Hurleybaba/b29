"use client";
import { useEffect, useState, useRef } from "react";

// Types from feedData.ts
interface Comment {
  id: number;
  user: string;
  avatarColor?: string; // Tailwind color class or hex
  text: string;
  time: string;
  replies?: Comment[];
}

interface Author {
  name: string;
  handle: string;
  avatarColor?: string;
  verified: boolean;
}

interface MediaItem {
  id: number;
  text: string;
  type: "image" | "video" | "text";
  src?: string;
  timeLeft: string;
  distance?: string;
  bgColor?: string; // For text posts
  
  // Required fields from feedData
  author: Author;
  likes: number;
  shares: number;
  saves: number;
  tags: string[];
  rating: number;
  reviewCount: number;
  comments: Comment[];
}

interface MediaModalProps {
  item: MediaItem;
  items: MediaItem[]; 
  onClose: () => void;
  onShare?: () => void;
  onNext?: () => void; 
  onPrevious?: () => void; 
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
  const [commentInput, setCommentInput] = useState("");
  
  // Scroll comments to top when item changes
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(items.findIndex(i => i.id === currentItem.id));
    if (commentsRef.current) {
        commentsRef.current.scrollTop = 0;
    }
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

  // Format large numbers
  const formatCount = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-[1010] p-2 bg-black/50 rounded-full"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Main Container - 3 Columns */}
      <div 
        className="relative w-full h-full max-h-[90vh] flex flex-col lg:flex-row items-stretch justify-center max-w-[95%] mx-auto gap-4 lg:gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* COLUMN 1: Details (Left) */}
        <div className="lg:w-[25%] flex flex-col bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden h-full order-2 lg:order-1">
          <div className="p-5 h-full overflow-y-auto custom-scrollbar">
            
            {/* 1. Author Info */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div className={`w-12 h-12 rounded-full overflow-hidden ${currentItem.author?.avatarColor} ring-2 ring-white/20 flex items-center justify-center`}>
                 <span className="text-white font-bold text-xl uppercase">{currentItem.author.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-white font-bold text-lg">{currentItem.author.name}</p>
                <div className="flex items-center gap-2">
                  {currentItem.author.verified && (
                     <span className="text-orange-400 text-xs font-semibold flex items-center gap-0.5">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        Verified
                     </span>
                  )}
                  {currentItem.author.verified && <span className="text-white/40 text-xs">•</span>}
                  <p className="text-white/50 text-xs">{currentItem.timeLeft} ago</p>
                </div>
              </div>
            </div>

            {/* 2. Reviews & Ratings */}
            <div className="mb-6">
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className={`w-4 h-4 ${star <= Math.round(currentItem.rating) ? "text-yellow-500" : "text-gray-600"}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-white font-bold text-sm">{currentItem.rating}</span>
              </div>
              <p className="text-white/50 text-xs">Based on {currentItem.reviewCount} reviews</p>
            </div>

            {/* 3. Post Details */}
            <div className="mb-6">
              <h1 className="text-white text-xl font-bold mb-3 leading-snug">
                {currentItem.text.slice(0, 50) + (currentItem.text.length > 50 ? "..." : "")}
              </h1>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                {currentItem.text}
              </p>
              
              {/* Distance Badge */}
              {currentItem.distance && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-white/70 text-xs font-medium rounded-lg border border-white/10">
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {currentItem.distance} away
                </div>
              )}
            </div>

            {/* 4. Tags */}
            <div className="mb-6">
              <h3 className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {currentItem.tags.length > 0 ? (
                    currentItem.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-blue-300 text-xs rounded transition-colors cursor-pointer">
                        {tag}
                    </span>
                    ))
                ) : (
                    <span className="text-white/20 text-xs italic">No tags</span>
                )}
              </div>
            </div>

            {/* 5. Engagement Stats (Grid) */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="text-center">
                  <div className="text-white font-bold">{formatCount(currentItem.likes)}</div>
                  <div className="text-white/30 text-[10px] uppercase">Likes</div>
                </div>
                <div className="text-center border-l border-white/10">
                  <div className="text-white font-bold">{formatCount(currentItem.shares)}</div>
                  <div className="text-white/30 text-[10px] uppercase">Shares</div>
                </div>
                <div className="text-center border-l border-white/10">
                  <div className="text-white font-bold">{formatCount(currentItem.saves)}</div>
                  <div className="text-white/30 text-[10px] uppercase">Saves</div>
                </div>
            </div>
          </div>
        </div>


        {/* COLUMN 2: Media Content (Center) */}
        <div className="lg:w-[50%] flex flex-col relative w-full h-full justify-center order-1 lg:order-2">
          
          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              className="absolute left-4 z-20 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-3 rounded-full backdrop-blur-sm transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          
          {currentIndex < items.length - 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 z-20 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 p-3 rounded-full backdrop-blur-sm transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          )}

          {/* Media Display */}
          <div className="relative w-full h-full flex items-center justify-center bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
            {currentItem.type === "video" ? (
              <video
                src={currentItem.src}
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
              />
            ) : currentItem.type === "text" ? (
              <div 
                className="w-full h-full flex items-center justify-center p-12 text-center"
                style={{ backgroundColor: currentItem.bgColor || "#111" }}
              >
                 <p className="text-white font-bold text-3xl md:text-5xl leading-tight">
                   {currentItem.text}
                 </p>
              </div>
            ) : (
              <img 
                src={currentItem.src} 
                alt={currentItem.text} 
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Action Bar */}
          <div className="mt-4 flex items-center justify-between px-4">
             <div className="flex gap-1.5">
                {items.map((_, index) => (
                  <div key={index} className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-6 bg-orange-500" : "w-1.5 bg-white/20"}`} />
                ))}
             </div>
             <div className="flex gap-3">
               <button className="text-white hover:text-pink-500 transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
               </button>
               {onShare && (
                <button onClick={onShare} className="text-white hover:text-blue-400 transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                </button>
               )}
             </div>
          </div>
        </div>


        {/* COLUMN 3: Comments (Right) */}
        <div className="lg:w-[25%] flex flex-col bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden h-full order-3">
          
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h3 className="text-white font-semibold">Comments <span className="text-white/40 font-normal ml-1">({currentItem.comments.length})</span></h3>
            <button className="text-xs text-white/50 hover:text-white">Sort by Newest</button>
          </div>

          {/* Comment List */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4" ref={commentsRef}>
            {currentItem.comments.length > 0 ? (
                currentItem.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full ${comment.avatarColor} flex-shrink-0 flex items-center justify-center text-xs font-bold text-white`}>
                           {comment.user.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-baseline justify-between">
                                <span className="text-white text-sm font-bold">{comment.user}</span>
                                <span className="text-white/30 text-[10px]">{comment.time}</span>
                            </div>
                            <p className="text-white/80 text-xs mt-1">{comment.text}</p>
                            
                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-3 ml-2 pl-3 border-l border-white/10 space-y-3">
                                    {comment.replies.map(reply => (
                                        <div key={reply.id} className="flex gap-2">
                                            <div className={`w-6 h-6 rounded-full ${reply.avatarColor} flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white`}>
                                                {reply.user.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="text-white text-xs font-bold block">{reply.user}</span>
                                                <p className="text-white/70 text-xs">{reply.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button className="text-white/40 text-[10px] mt-2 hover:text-white transition-colors">Reply</button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-10">
                    <p className="text-white/30 text-sm">No comments yet. Be the first!</p>
                </div>
            )}
          </div>

          {/* Comment Input */}
          <div className="p-4 bg-white/5 border-t border-white/10">
             <div className="relative">
               <input 
                 type="text" 
                 placeholder="Add a comment..."
                 value={commentInput}
                 onChange={(e) => setCommentInput(e.target.value)}
                 className="w-full bg-black/50 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-orange-500/50 transition-all"
               />
               <button 
                className="absolute right-1.5 top-1.5 p-1.5 bg-orange-500 rounded-full text-white hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!commentInput.trim()}
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                 </svg>
               </button>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};