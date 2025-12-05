"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { SpeechBubble } from "@/app/components/Chat";
import { originalPostItems, nearbyPostItems } from "../../utils/feedData";
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
  const [selectedShareItem, setSelectedShareItem] = useState<number | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const [scanProgress, setScanProgress] = useState(0);
  const [dots, setDots] = useState<Array<{ x: number; y: number; id: number }>>(
    []
  );
  const [selectedMediaItem, setSelectedMediaItem] = useState<any | null>(null);

  // --- Theme Constants ---
  const ORANGE = "#ff5720";
  const BLACK = "#1f1f1f";
  const WHITE = "#f1f1f1";

  // Function to simulate walking near a business
  const simulateProximity = () => {
    setNotificationProgress(100);
    setShowNotification(true);
  };

  // Filter items based on search query

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
          return prev - 1; // Decrement to simulate timer (approx 5s total with 50ms interval)
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [showNotification]);

  // Function to toggle location filter message
  const toggleLocationFilter = () => {
    setIsLocationModalOpen(true);
    setIsScanning(true);
    setScanProgress(0);
    setDots([]);
    setShowLocationFilterMsg(false);

    // Clear any existing interval
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

  // State to track which items to display
  const [displayItems, setDisplayItems] = useState(originalPostItems);

  // Update display items when showNearbyResults changes
  useEffect(() => {
    if (showNearbyResults) {
      setDisplayItems(nearbyPostItems);
    } else {
      setDisplayItems(originalPostItems);
    }
  }, [showNearbyResults]);

  // Share button handler
  const handleShare = (e: React.MouseEvent, itemId: number) => {
    e.stopPropagation();
    setSelectedShareItem(itemId);
    setShareModalOpen(true);
  };

  const filteredItems = displayItems.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: WHITE }}>
      {/* Sticky Navbar - Now only displays logo and profile link */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="w-full flex justify-between items-center gap-4">
          {/* HAMBURGER MENU (Mobile Only) */}
          <button
            className="lg:hidden text-gray-600 focus:outline-none p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo - Updated Color */}
          <div className="font-bold text-xl" style={{ color: ORANGE }}>
            B23
          </div>

          {/* Search Bar on Mobile */}
          <div className="sm:block lg:hidden flex-1 mx-4">
            <SearchBar
              ORANGE="#ff5720"
              WHITE="#f1f1f1"
              BLACK={"#1f1f1f"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Right Links */}
          <Link
            href="/pages/userProfile"
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs hover:ring-2"
            style={{ color: BLACK, borderColor: ORANGE }}
          >
            ME
          </Link>
        </div>
      </nav>

      {/* Location Scanning Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
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
                          className="w-full h-full bg-linear-to-t from-orange-400/80 to-transparent"
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
                        // Calculate if dot is within radar range (within 100 units)
                        const distance = Math.sqrt(
                          dot.x * dot.x + dot.y * dot.y
                        );
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

      {/* MOBILE SIDEBAR DRAWER (Kept for mobile navigation) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Sidebar Content */}
          <div className="relative bg-white w-3/4 max-w-xs h-full shadow-2xl p-6 flex flex-col gap-6 overflow-y-auto transform transition-transform">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold" style={{ color: ORANGE }}>
                Menu
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500"
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
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">Shortcuts</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:bg-gray-100 p-2 rounded cursor-pointer transition">
                  Events Near Me
                </li>
                <li className="hover:bg-gray-100 p-2 rounded cursor-pointer transition">
                  Saved Posts
                </li>
                <li className="hover:bg-gray-100 p-2 rounded cursor-pointer transition">
                  My Subscriptions
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">
                Featured Businesses
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600 shrink-0"></div>
                  <p className="text-sm font-medium text-gray-800">
                    Fashion Hub
                  </p>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500 shrink-0"></div>
                  <p className="text-sm font-medium text-gray-800">
                    Tech Solutions
                  </p>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-600 shrink-0"></div>
                  <p className="text-sm font-medium text-gray-800">
                    Coffee Corner
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <h3 className="font-bold text-yellow-800 text-xs uppercase mb-2">
                Demo Tools
              </h3>
              <button
                onClick={() => {
                  simulateProximity();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 text-xs font-bold py-2 px-4 rounded transition shadow-sm"
              >
                Simulate "Near Business"
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {shareModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-999 flex items-center justify-center p-4"
          onClick={() => setShareModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={() => setShareModalOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
              Share Post
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Select a platform below
            </p>

            {/* Social Icons Grid */}
            <div className="grid grid-cols-4 gap-y-6 gap-x-4">
              {[
                { name: "WhatsApp", src: "/socials/whatsapp.jpeg" },
                { name: "Facebook", src: "/socials/facebook.jpeg" },
                { name: "Instagram", src: "/socials/Instagram nuevo.jpeg" },
                {
                  name: "Twitter",
                  src: "/socials/New Twitter logo X 2023 Twitter X logo vector download _ Premium Vector.jpeg",
                },
                { name: "Telegram", src: "/socials/telegram.jpeg" },
                { name: "Snapchat", src: "/socials/snapchat.jpeg" },
                {
                  name: "LinkedIn",
                  src: "/socials/Premium Vector _ Square Linkedin Logo Isolated on White Background.jpeg",
                },
                { name: "TikTok", src: "/socials/tiktok.jpeg" },
                { name: "Threads", src: "/socials/threads.jpeg" },
                { name: "YouTube", src: "/socials/YouTube.jpeg" },
              ].map((item) => (
                <button
                  key={item.name}
                  className="flex flex-col items-center gap-2 text-xs font-medium group"
                >
                  {/* Icon Container - Increased Size & Removed Background Color */}
                  <div className="w-14 h-14 rounded-full overflow-hidden shadow-md group-hover:scale-110 transition-transform border border-gray-100 relative">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      // 'object-cover' ensures the image fills the circle completely
                    />
                  </div>
                  <span className="text-gray-600 whitespace-nowrap">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid: 3 columns layout, taking full screen width */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[250px_1fr_300px] gap-0 pb-20 relative pt-4 lg:pt-6">
        {/* Left Sidebar - DESKTOP (Column 1) */}
        <div className="hidden lg:block space-y-6 sticky top-24 h-fit pl-6">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">Shortcuts</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:bg-gray-100 p-2 rounded cursor-pointer transition">
                Events Near Me
              </li>
              <li className="hover:bg-gray-100 p-2 rounded cursor-pointer transition">
                Saved Posts
              </li>
              <li className="hover:bg-gray-100 p-2 rounded cursor-pointer transition">
                My Subscriptions
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">
              Featured Businesses
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-600 shrink-0"></div>
                <p className="text-sm font-medium text-gray-800">Fashion Hub</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500 shrink-0"></div>
                <p className="text-sm font-medium text-gray-800">
                  Tech Solutions
                </p>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-600 shrink-0"></div>
                <p className="text-sm font-medium text-gray-800">
                  Coffee Corner
                </p>
              </li>
            </ul>
          </div>

          {/* DEMO TOOL FOR PRESENTATION */}
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <h3 className="font-bold text-yellow-800 text-xs uppercase mb-2">
              Demo Tools
            </h3>
            <button
              onClick={simulateProximity}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 text-xs font-bold py-2 px-4 rounded transition shadow-sm"
            >
              Simulate "Near Business"
            </button>
          </div>
        </div>

        {/* --- Main Feed: Pinterest-Style Grid (Column 2 - Takes Max Width) --- */}
        <div className="w-full px-0 lg:px-6 min-h-screen">
          {/* Sticky Search Bar for Desktop - Takes full width of middle section */}
          <div
            className="hidden lg:block sticky top-16 z-30 py-4 -mx-6 px-6"
            style={{
              backgroundColor: WHITE,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <SearchBar
              ORANGE="#ff5720"
              WHITE="#f1f1f1"
              BLACK={"#1f1f1f"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mb-6 pl-4 lg:pl-0 pt-4">
            <h2
              className="text-xl font-bold text-gray-900 flex items-center gap-2"
              style={{ color: BLACK }}
            >
              {showNearbyResults ? (
                <>
                  <svg
                    className="w-5 h-5"
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
                  Near Me • 5km radius
                </>
              ) : (
                "Discover & Trending"
              )}
            </h2>

            {showNearbyResults && (
              <button
                onClick={() => setShowNearbyResults(false)}
                className="text-sm px-3 py-1 rounded-full hover:bg-gray-100 transition"
                style={{ color: ORANGE }}
              >
                Show All Posts
              </button>
            )}
          </div>

          {/* MASONRY GRID IMPLEMENTATION */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-4 lg:px-0">
            {filteredItems.length === 0 ? (
              <div className="text-center text-gray-600 w-full py-10 text-lg font-medium">
                🔍 Search not found
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <AnimatedItem key={item.id} delay={index * 50}>
                  <div
                    onClick={() => setSelectedMediaItem(item)}
                    className={`relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer group mb-4 break-inside-avoid ${item.height}`}
                  >
                    {/* MEDIA DISPLAY AREA */}
                    <div className="w-full h-full bg-gray-200">
                      {item.type === "video" ? (
                        <SmartVideo
                          src={item.src}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={item.text}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}

                      {/* Gradient Overlay for Text Readability */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent pointer-events-none"></div>

                      {/* Text Content */}
                      <div className="absolute bottom-0 left-0 p-4 w-full z-10">
                        <p className="text-white font-semibold text-sm opacity-90 group-hover:opacity-100 transition-opacity mb-2">
                          {item.text}
                        </p>
                        {item.distance && (
                          <div className="inline-block bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full border border-white/30">
                            {item.distance} away
                          </div>
                        )}
                      </div>
                    </div>

                    {/* SHARE BUTTON - Top Left */}
                    <button
                      onClick={(e) => handleShare(e, item.id)}
                      className="absolute top-2 left-2 pl-2 pr-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 z-20 flex items-center gap-1.5 shadow-md"
                      style={{
                        backgroundColor: "rgba(31, 31, 31, 0.9)",
                        color: WHITE,
                        backdropFilter: "blur(4px)",
                      }}
                      title="Share"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      <span className="text-xs font-bold">Share</span>
                    </button>

                    {/* TIMER - Top Right */}
                    <div
                      className="absolute top-2 right-2 p-1.5 px-2.5 rounded-full z-20"
                      style={{
                        backgroundColor: "rgba(31, 31, 31, 0.85)",
                        color: "#ff6b6b",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <div className="flex items-center gap-1 text-xs font-semibold">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{item.timeLeft}</span>
                      </div>
                    </div>

                    {/* Save Button */}
                    <button
                      className="absolute bottom-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition z-20"
                      style={{
                        backgroundColor: "rgba(31, 31, 31, 0.8)",
                        color: WHITE,
                      }}
                      title="Save"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </AnimatedItem>
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar - DESKTOP (Column 3) */}
        <div className="hidden lg:block space-y-6 sticky top-24 h-fit pr-6">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Trending Tags</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "#RealEstate",
                "#Luxury",
                "#Networking",
                "#Design",
                "#Gourmet",
                "#NewOpenings",
                "#Sale",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full hover:bg-gray-200 transition cursor-pointer"
                  style={{
                    backgroundColor: WHITE,
                    border: `1px solid ${WHITE}`,
                    color: BLACK,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">
              Featured Businesses
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-600 shrink-0"></div>
                <p className="text-sm font-medium text-gray-800">Fashion Hub</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500 shrink-0"></div>
                <p className="text-sm font-medium text-gray-800">
                  Tech Solutions
                </p>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-600 shrink-0"></div>
                <p className="text-sm font-medium text-gray-800">
                  Coffee Corner
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* LOCATION FLOATING ACTION BUTTON - Updated Color */}
      <div className="fixed bottom-8 right-8 z-30 flex flex-col items-end gap-2">
        {/* Filter Message Toast */}
        {showLocationFilterMsg && (
          <div
            className="text-white text-sm py-2 px-4 rounded-lg shadow-lg mb-2 animate-fade-in-up"
            style={{ backgroundColor: BLACK }}
          >
            This will filter feeds to 5km-10km around you.
          </div>
        )}

        {/* The Button - Updated Color */}
        <button
          onClick={toggleLocationFilter}
          className="text-white p-4 rounded-full shadow-xl transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
          style={{
            backgroundColor: ORANGE,
            boxShadow: `0 4px 14px rgba(255, 87, 32, 0.4)`,
          }}
          title="Filter by Location"
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
        </button>
      </div>

      {/* NOTIFICATION TOAST (Horizontal Bar) - Updated Design */}
      {showNotification && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl bg-white rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col border border-gray-100 animate-fade-in-up">
          <div className="flex items-center p-4 gap-4">
            {/* Icon */}
            <div className="shrink-0">
              <div className="p-2 bg-orange-50 rounded-full">
                <svg
                  className="w-6 h-6 text-[#ff5720]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Content - Horizontal Layout */}
            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-sm truncate">
                <span className="font-bold text-gray-900 block sm:inline mr-2">
                  You're nearby!
                </span>
                <span className="text-gray-600">
                  <span className="font-bold text-[#ff5720]">
                    Nexus Properties
                  </span>{" "}
                  is 50m away.
                </span>
              </div>

              <Link
                href="/pages/eventDetails"
                className="text-sm font-bold text-[#ff5720] hover:text-orange-700 whitespace-nowrap shrink-0"
              >
                View Details &rarr;
              </Link>
            </div>

            {/* Close */}
            <button
              onClick={() => setShowNotification(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1 w-full bg-orange-100">
            <div
              className="h-full bg-[#ff5720] transition-all duration-100 ease-linear"
              style={{ width: `${notificationProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* FULL SCREEN MEDIA MODAL */}
      {selectedMediaItem && (
        <MediaModal
          item={selectedMediaItem}
          onClose={() => setSelectedMediaItem(null)}
        />
      )}

      <div className="fixed bottom-10 right-30 z-50">
        <SpeechBubble
          text="This page features a sticky top navigation with branding, a mobile menu and user profile, a dynamic masonry feed with image and Smart Video previews, a floating button for location-based business results, interactive sidebars and mobile drawer shortcuts, and a share modal for quick social sharing"
          color="#800080"
          size="sm"
          maxWidth="max-w-[150px]"
        />
      </div>
    </div>
  );
}
