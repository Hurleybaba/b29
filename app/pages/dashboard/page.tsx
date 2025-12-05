"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SpeechBubble } from "@/app/components/Chat";
import { originalPostItems, nearbyPostItems, OriginalPostItemsProps } from "../../utils/feedData";
import {
  SearchBar,
  AnimatedItem,
  SmartVideo,
} from "@/app/components/FeddHelpers";
import { MediaModal } from "@/app/components/MediaModal";

export default function FeedPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProgress, setNotificationProgress] = useState(100);
  const [showLocationFilterMsg, setShowLocationFilterMsg] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showNearbyResults, setShowNearbyResults] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedShareItem, setSelectedShareItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [dots, setDots] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [selectedMediaItem, setSelectedMediaItem] = useState<any | null>(null);

  // --- Theme Constants ---
  const ORANGE = "#ff5720";
  const BLACK = "#1f1f1f";
  const WHITE = "#f1f1f1";
  const GRAY_BG = "#f8f9fa";

  // Timer logic for notification
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showNotification) {
      interval = setInterval(() => {
        setNotificationProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setShowNotification(false);
            return 0;
          }
          return prev - 1; 
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [showNotification]);

  const simulateProximity = () => {
    setNotificationProgress(100);
    setShowNotification(true);
  };

  const toggleLocationFilter = () => {
    setIsLocationModalOpen(true);
    setIsScanning(true);
    setScanProgress(0);
    setDots([]);
    setShowLocationFilterMsg(false);

    const intervals: NodeJS.Timeout[] = [];

    // Generate random dots at intervals
    const dotInterval = setInterval(() => {
      if (scanProgress >= 100) {
        clearInterval(dotInterval);
        return;
      }

      // Add 1-3 random dots
      const numDots = Math.floor(Math.random() * 3) + 1;
      const newDots = Array.from({ length: numDots }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 200 - 100, // -100 to 100
        y: Math.random() * 200 - 100, // -100 to 100
      }));

      setDots((prev) => [...prev, ...newDots].slice(-20)); // Keep only last 20 dots
    }, 800);

    intervals.push(dotInterval);

    // Animate progress from 0 to 100 over 5 seconds
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(dotInterval);
          intervals.forEach(clearInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 100 steps over 5 seconds = 0.05s per step

    intervals.push(progressInterval);

    // Start scanning for 5 seconds
    setTimeout(() => {
      setIsScanning(false);

      // After showing results for 2 seconds, close modal and update feed
      setTimeout(() => {
        setIsLocationModalOpen(false);
        setShowNearbyResults(true);
        setDots([]);
      }, 2000);
    }, 5000);

    // Cleanup function
    return () => {
      intervals.forEach(clearInterval);
    };
  };

  const [displayItems, setDisplayItems] = useState<OriginalPostItemsProps[]>(originalPostItems);
  
  useEffect(() => {
    setDisplayItems(showNearbyResults ? nearbyPostItems : originalPostItems);
  }, [showNearbyResults]);

  const handleShare = (e: React.MouseEvent, itemId: number) => {
    e.stopPropagation();
    setSelectedShareItem(itemId);
    setShareModalOpen(true);
  };

  const filteredItems = displayItems.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative font-sans text-slate-800" style={{ backgroundColor: GRAY_BG }}>
      
      {/* Modern Glass Navbar */}
      <nav className="sticky top-0 z-50 px-4 py-3 border-b border-gray-200/60 shadow-sm backdrop-blur-xl bg-white/80 transition-all">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center gap-6">
          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          {/* Logo Area */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-lg">B</div>
            <span className="font-bold text-xl tracking-tight hidden sm:block" style={{ color: BLACK }}>B23<span style={{color: ORANGE}}>Feed</span></span>
          </div>

          {/* Center Search (Mobile: Hidden, Desktop: Visible) */}
          <div className="hidden lg:block flex-1 max-w-xl mx-auto">
             <SearchBar
              ORANGE={ORANGE}
              WHITE="#ffffff"
              BLACK={BLACK}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
             <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-orange-50 text-gray-600 hover:text-orange-500 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
             </button>
             <Link
              href="/pages/userProfile"
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-orange-500 transition shadow-sm"
            >
              <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-full h-full object-cover" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 py-2 bg-white border-b border-gray-100">
         <SearchBar
              ORANGE={ORANGE}
              WHITE="#ffffff"
              BLACK={BLACK}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
      </div>

      {/* Location Modal with Radar Animation */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 transition-opacity"
            onClick={() => {
              setIsLocationModalOpen(false);
              setIsScanning(false);
              setDots([]);
            }}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 z-10">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: ORANGE }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isScanning ? "Scanning Nearby..." : "Results Found!"}
                </h2>
                <p className="text-gray-600 mb-6">
                  {isScanning
                    ? "Searching for posts within 5km-10km radius..."
                    : "Found nearby posts based on your location"}
                </p>
              </div>

              {isScanning ? (
                <>
                  {/* Improved Radar Animation */}
                  <div className="relative w-64 h-64 mx-auto mb-6">
                    {/* Radar container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Circular grid lines */}
                      <div className="absolute w-full h-full rounded-full border-2 border-gray-300 opacity-50"></div>
                      <div className="absolute w-3/4 h-3/4 rounded-full border-2 border-gray-300 opacity-50"></div>
                      <div className="absolute w-1/2 h-1/2 rounded-full border-2 border-gray-300 opacity-50"></div>
                      <div className="absolute w-1/4 h-1/4 rounded-full border-2 border-gray-300 opacity-50"></div>

                      {/* Cross lines */}
                      <div className="absolute w-full h-px bg-gray-300 opacity-30"></div>
                      <div className="absolute h-full w-px bg-gray-300 opacity-30"></div>

                      {/* Rotating scanning beam */}
                      <div
                        className="absolute left-1/2 top-1/2 w-1 h-1/2"
                        style={{
                          transform: `translate(-50%, -100%) rotate(${
                            scanProgress * 3.6
                          }deg)`,
                          transformOrigin: "50% 100%",
                        }}
                      >
                        <div
                          className="w-full h-full bg-gradient-to-t from-orange-400/80 to-transparent"
                          style={{
                            boxShadow: `0 0 12px 3px rgba(255, 87, 32, 0.5)`,
                          }}
                        ></div>
                      </div>

                      {/* Pulsing center circle */}
                      <div
                        className="absolute w-8 h-8 rounded-full animate-ping"
                        style={{
                          backgroundColor: ORANGE,
                          opacity: 0.4,
                        }}
                      ></div>
                      <div
                        className="absolute w-6 h-6 rounded-full z-10"
                        style={{ backgroundColor: ORANGE }}
                      ></div>

                      {/* Signal waves emanating from center */}
                      <div
                        className="absolute rounded-full border border-orange-400 opacity-40 animate-ping"
                        style={{
                          width: "50%",
                          height: "50%",
                          animationDelay: "0s",
                        }}
                      ></div>

                      <div
                        className="absolute rounded-full border border-orange-400 opacity-30 animate-ping"
                        style={{
                          width: "40%",
                          height: "40%",
                          animationDelay: "0.5s",
                        }}
                      ></div>

                      <div
                        className="absolute rounded-full border border-orange-400 opacity-20 animate-ping"
                        style={{
                          width: "20%",
                          height: "20%",
                          animationDelay: "1s",
                        }}
                      ></div>

                      {/* Random dots representing detected signals */}
                      {dots.map((dot, index) => {
                        const distance = Math.sqrt(dot.x * dot.x + dot.y * dot.y);
                        if (distance > 120) return null;

                        return (
                          <div
                            key={dot.id}
                            className="absolute w-3 h-3 rounded-full bg-orange-500 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in"
                            style={{
                              left: `calc(50% + ${dot.x}px)`,
                              top: `calc(50% + ${dot.y}px)`,
                              zIndex: 20,
                              boxShadow: `0 0 8px 2px rgba(255, 87, 32, 0.7)`,
                              animationDelay: `${index * 0.1}s`,
                            }}
                          ></div>
                        );
                      })}

                      {/* Static UI dots at the edges */}
                      <div className="absolute top-0 left-1/2 w-2 h-2 bg-orange-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute right-0 top-1/2 w-2 h-2 bg-orange-500 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-orange-500 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
                      <div className="absolute left-0 top-1/2 w-2 h-2 bg-orange-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Scanning radius: 5km</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-100"
                        style={{
                          width: `${scanProgress}%`,
                          backgroundColor: ORANGE,
                          backgroundImage: `linear-gradient(90deg, ${ORANGE}, #ff8a65)`,
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      Detecting {dots.length} nearby locations...
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
                      <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: "#10B981" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-gray-900">
                      Found {nearbyPostItems.length} nearby posts!
                    </p>
                    <p className="text-gray-600 mt-2">
                      The feed has been updated with location-based results.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Filter Applied:
                    </h3>
                    <p className="text-sm text-gray-600">
                      5km-10km radius around your location
                    </p>
                  </div>
                </>
              )}

              <button
                onClick={() => {
                  setIsLocationModalOpen(false);
                  setIsScanning(false);
                  setDots([]);
                }}
                className="mt-6 w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition"
              >
                {isScanning ? "Cancel Scan" : "Close"}
              </button>
            </div>

            {/* Add CSS for animations */}
            <style jsx>{`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }

              .animate-fade-in {
                animation: fadeIn 0.5s ease-in;
              }

              @keyframes ping {
                0% {
                  transform: scale(0.8);
                  opacity: 0.8;
                }
                80%,
                100% {
                  transform: scale(2.5);
                  opacity: 0;
                }
              }

              .animate-ping {
                animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
              }

              @keyframes pulse {
                0%,
                100% {
                  opacity: 0.1;
                }
                50% {
                  opacity: 0.3;
                }
              }

              .animate-pulse {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
              }
            `}</style>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShareModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={() => setShareModalOpen(false)}>✕</button>
            <h2 className="text-lg font-bold text-gray-800 text-center mb-4">Share Post</h2>
            <p className="text-sm text-gray-500 text-center mb-6">Select a platform below</p>

            {/* Social Icons Grid */}
            <div className="grid grid-cols-4 gap-y-6 gap-x-4">
              {[
                { name: "WhatsApp", src: "/socials/whatsapp.jpeg" },
                { name: "Facebook", src: "/socials/facebook.jpeg" },
                { name: "Instagram", src: "/socials/Instagram nuevo.jpeg" },
                { name: "Twitter", src: "/socials/New Twitter logo X 2023 Twitter X logo vector download _ Premium Vector.jpeg" },
                { name: "Telegram", src: "/socials/telegram.jpeg" },
                { name: "Snapchat", src: "/socials/snapchat.jpeg" },
                { name: "LinkedIn", src: "/socials/Premium Vector _ Square Linkedin Logo Isolated on White Background.jpeg" },
                { name: "TikTok", src: "/socials/tiktok.jpeg" },
                { name: "Threads", src: "/socials/threads.jpeg" },
                { name: "YouTube", src: "/socials/YouTube.jpeg" },
              ].map((item) => (
                <button key={item.name} className="flex flex-col items-center gap-2 text-xs font-medium group">
                  <div className="w-14 h-14 rounded-full overflow-hidden shadow-md group-hover:scale-110 transition-transform border border-gray-100 relative">
                    <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-gray-600 whitespace-nowrap">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
         <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="relative bg-white w-3/4 max-w-xs h-full p-6 shadow-2xl">
               <h2 className="text-xl font-bold mb-6">Menu</h2>
               <button className="w-full text-left py-2 border-b">My Profile</button>
               <button className="w-full text-left py-2 border-b">Settings</button>
            </div>
         </div>
      )}

      {/* MAIN GRID LAYOUT */}
      <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[260px_1fr_300px] gap-8 px-4 lg:px-8 py-8">
        
        {/* Left Sidebar - Navigation & Shortcuts */}
        <div className="hidden lg:block space-y-6 sticky top-24 h-fit">
           {/* Navigation Card */}
           <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50">
             <div className="space-y-1">
               <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-orange-50 text-orange-600 rounded-xl font-medium transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                  <span>Feed</span>
               </button>
               <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  <span>Favorites</span>
               </button>
               <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                  <span>Near Me</span>
               </button>
             </div>
           </div>

           {/* Demo Widget */}
           <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-2xl transform translate-x-6 -translate-y-6"></div>
             <h3 className="font-bold text-lg mb-1 relative z-10">Demo Mode</h3>
             <p className="text-white/90 text-sm mb-4 relative z-10">Test location triggers instantly.</p>
             <button
               onClick={simulateProximity}
               className="w-full bg-white text-orange-600 text-sm font-bold py-2.5 rounded-xl shadow-sm hover:bg-gray-50 transition relative z-10"
             >
               Trigger "Near Business"
             </button>
           </div>
        </div>

        {/* Center - Content Feed */}
        <div className="w-full min-h-screen">
          
          {/* Feed Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
             <div>
               <h1 className="text-2xl font-bold text-gray-900">
                 {showNearbyResults ? "Nearby Places" : "Discover"}
               </h1>
               <p className="text-gray-500 text-sm mt-1">
                 {showNearbyResults ? "Showing results within 5km radius" : "Trending videos and posts for you"}
               </p>
             </div>
             
             {showNearbyResults && (
               <button 
                 onClick={() => setShowNearbyResults(false)}
                 className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-full hover:bg-gray-50 transition shadow-sm"
               >
                 <span>✕ Clear Filter</span>
               </button>
             )}
          </div>

          {/* MASONRY GRID */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                 <div className="text-4xl mb-4">🔍</div>
                 <h3 className="text-lg font-bold text-gray-900">No results found</h3>
                 <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <AnimatedItem key={item.id} delay={index * 50}>
                  <div
                    onClick={() => setSelectedMediaItem(item)}
                    className={`relative w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group break-inside-avoid bg-white ${item.height}`}
                  >
                    {/* Media */}
                    <div className="w-full h-full relative">
                       {item.type === "video" ? (
                        <SmartVideo src={item.src} className="w-full h-full object-cover" />
                      ) : (
                        <img src={item.src} alt={item.text} className="w-full h-full object-cover" loading="lazy" />
                      )}
                      
                      {/* Modern Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                      
                      {/* Top Info Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.distance && (
                          <span className="px-2 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/10">
                            {item.distance}
                          </span>
                        )}
                        {item.timeLeft && (
                           <span className="px-2 py-1 bg-orange-500/80 backdrop-blur-md text-white text-[10px] font-bold rounded-md flex items-center gap-1">
                             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                             {item.timeLeft}
                           </span>
                        )}
                      </div>

                      {/* Bottom Text */}
                      <div className="absolute bottom-0 left-0 p-5 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-bold text-lg leading-tight shadow-black drop-shadow-md">{item.text}</h3>
                        
                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                           <button 
                             onClick={(e) => handleShare(e, item.id)}
                             className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white hover:text-black text-white transition-colors"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                           </button>
                           <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white hover:text-red-500 text-white transition-colors">
                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedItem>
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar - Trends & Suggestions */}
        <div className="hidden lg:block space-y-6 sticky top-24 h-fit">
           
           {/* Trending Box */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <div className="flex items-center justify-between mb-4">
               <h3 className="font-bold text-gray-900">Trending Now</h3>
               <span className="text-xs font-semibold text-orange-500 cursor-pointer">View All</span>
             </div>
             <div className="flex flex-wrap gap-2">
               {["#SummerVibes", "#Tech2024", "#Foodie", "#Art", "#Travel", "#Coffee"].map(tag => (
                 <span key={tag} className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg hover:bg-orange-50 hover:text-orange-600 transition cursor-pointer">
                   {tag}
                 </span>
               ))}
             </div>
           </div>

           {/* Suggestions Box */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h3 className="font-bold text-gray-900 mb-4">Suggested for you</h3>
             <ul className="space-y-4">
               {[1,2,3].map((i) => (
                 <li key={i} className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                     <img src={`https://i.pravatar.cc/150?img=${i + 20}`} alt="user" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-bold text-gray-900 truncate">Creative Studio</p>
                     <p className="text-xs text-gray-500 truncate">@creative_studio</p>
                   </div>
                   <button className="text-xs font-bold text-orange-500 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition">
                     Follow
                   </button>
                 </li>
               ))}
             </ul>
           </div>

        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={toggleLocationFilter}
          className="group relative flex items-center justify-center w-14 h-14 bg-gray-900 text-white rounded-full shadow-2xl hover:bg-orange-600 transition-all duration-300 transform hover:scale-110 active:scale-95"
        >
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded mb-2 whitespace-nowrap">Scan Area</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
      </div>

      {/* Notification Toast */}
      {showNotification && (
         <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-lg bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 p-4 border border-gray-100 flex items-center gap-4 animate-fade-in-up">
           <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
           </div>
           <div className="flex-1">
             <p className="text-sm font-bold text-gray-900">Business Nearby!</p>
             <p className="text-xs text-gray-500">Nexus Properties is just 50m away.</p>
           </div>
           <button onClick={() => setShowNotification(false)} className="text-gray-400 hover:text-gray-600">✕</button>
           {/* Progress Line */}
           <div className="absolute bottom-0 left-4 right-4 h-1 bg-gray-100 rounded-full overflow-hidden">
             <div className="h-full bg-green-500 transition-all duration-100" style={{width: `${notificationProgress}%`}}></div>
           </div>
         </div>
      )}

      {/* Media Modal */}
      {selectedMediaItem && (
        <MediaModal
          item={selectedMediaItem}
          items={filteredItems}
          onNext={
            () => {
              const currentIndex = filteredItems.findIndex(i => i.id === selectedMediaItem.id);
              const nextIndex = (currentIndex + 1) % filteredItems.length;
              setSelectedMediaItem(filteredItems[nextIndex]);
          }}
          onPrevious={() => {
            const currentIndex = filteredItems.findIndex(i => i.id === selectedMediaItem.id);
            const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
            setSelectedMediaItem(filteredItems[prevIndex]);
          }}
          onClose={() => setSelectedMediaItem(null)}
          onShare={() => {
             setSelectedShareItem(selectedMediaItem.id);
             setShareModalOpen(true);
          }}
        />
      )}

      {/* Helper Speech Bubble */}
      <div className="fixed bottom-10 left-10 z-50 hidden xl:block">
        <SpeechBubble
          text="Welcome to the updated Dashboard UI!"
          color="#ff5720"
          size="sm"
          maxWidth="max-w-[200px]"
        />
      </div>

    </div>
  );
}