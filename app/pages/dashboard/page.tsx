"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// --- Animation Component ---
const AnimatedItem = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
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
        rootMargin: '50px'
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
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

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
  const [scanProgress, setScanProgress] = useState(0);
  const [dots, setDots] = useState<Array<{ x: number; y: number; id: number }>>(
    []
  );

  // --- Theme Constants ---
  const ORANGE = "#ff5720";
  const BLACK = "#1f1f1f";
  const WHITE = "#f1f1f1"; 

  // Function to simulate walking near a business
  const simulateProximity = () => {
    setNotificationProgress(100);
    setShowNotification(true);
  };

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

  // Original mock array
  const originalPostItems = [
    {
      id: 1,
      text: "Broken Glass",
      color: "bg-black",
      height: "h-80",
      width: "w-full",
      timeLeft: "2h 30m", // Added time left for timer
    },
    {
      id: 2,
      text: "Cat w/ Flower Crown",
      color: "bg-pink-100",
      height: "h-48",
      width: "w-full",
      timeLeft: "1d 5h",
    },
    {
      id: 3,
      text: "Hand Gesture",
      color: "bg-orange-200",
      height: "h-64",
      width: "w-full",
      timeLeft: "45m",
    },
    {
      id: 4,
      text: "Yellow Funny Face",
      color: "bg-yellow-100",
      height: "h-96",
      width: "w-full",
      timeLeft: "3h 15m",
    },
    {
      id: 5,
      text: "Doraemon with eyes closed",
      color: "bg-white",
      height: "h-56",
      width: "w-full",
      timeLeft: "6h",
    },
    {
      id: 6,
      text: "Green Abstract Pattern",
      color: "bg-green-100",
      height: "h-72",
      width: "w-full",
      timeLeft: "12h 30m",
    },
    {
      id: 7,
      text: "Anime Action Scene",
      color: "bg-gray-800",
      height: "h-80",
      width: "w-full",
      timeLeft: "1d",
    },
    {
      id: 8,
      text: "Cat with Attitude",
      color: "bg-white",
      height: "h-64",
      width: "w-full",
      timeLeft: "4h",
    },
    {
      id: 9,
      text: "Abstract Glitch",
      color: "bg-black",
      height: "h-96",
      width: "w-full",
      timeLeft: "8h 45m",
    },
    {
      id: 10,
      text: "Spotlight on an Idea",
      color: "bg-gray-700",
      height: "h-60",
      width: "w-full",
      timeLeft: "2d",
    },
    {
      id: 11,
      text: "Text Banner",
      color: "bg-red-900",
      height: "h-48",
      width: "w-full",
      timeLeft: "1h 30m",
    },
    {
      id: 12,
      text: "Smiling Hamster",
      color: "bg-orange-100",
      height: "h-72",
      width: "w-full",
      timeLeft: "5h",
    },
    {
      id: 13,
      text: "Luxury Villa",
      color: "bg-blue-200",
      height: "h-80",
      width: "w-full",
      timeLeft: "1d 3h",
    },
    {
      id: 14,
      text: "Modern Architecture",
      color: "bg-white",
      height: "h-64",
      width: "w-full",
      timeLeft: "9h 20m",
    },
    {
      id: 15,
      text: "Doraemon Sad",
      color: "bg-gray-100",
      height: "h-40",
      width: "w-full",
      timeLeft: "7h",
    },
    {
      id: 16,
      text: "Forest Path",
      color: "bg-green-700",
      height: "h-96",
      width: "w-full",
      timeLeft: "2d 4h",
    },
    {
      id: 17,
      text: "Minimal Design",
      color: "bg-gray-300",
      height: "h-52",
      width: "w-full",
      timeLeft: "3h 45m",
    },
    {
      id: 18,
      text: "Vibrant Colors",
      color: "bg-purple-300",
      height: "h-88",
      width: "w-full",
      timeLeft: "14h",
    },
    {
      id: 19,
      text: "Urban Street",
      color: "bg-gray-600",
      height: "h-64",
      width: "w-full",
      timeLeft: "1d 8h",
    },
    {
      id: 20,
      text: "Coffee Art",
      color: "bg-amber-100",
      height: "h-76",
      width: "w-full",
      timeLeft: "6h 30m",
    },
  ];

  // Filtered results based on location
  const nearbyPostItems = [
    {
      id: 101,
      text: "Nearby Cafe - 50m",
      color: "bg-amber-100",
      height: "h-64",
      width: "w-full",
      distance: "50m",
      timeLeft: "1h 15m",
    },
    {
      id: 102,
      text: "Local Art Gallery - 120m",
      color: "bg-purple-200",
      height: "h-80",
      width: "w-full",
      distance: "120m",
      timeLeft: "3h",
    },
    {
      id: 103,
      text: "Tech Meetup - 200m",
      color: "bg-blue-300",
      height: "h-56",
      width: "w-full",
      distance: "200m",
      timeLeft: "2h 30m",
    },
    {
      id: 104,
      text: "Fashion Pop-up - 80m",
      color: "bg-pink-200",
      height: "h-72",
      width: "w-full",
      distance: "80m",
      timeLeft: "45m",
    },
    {
      id: 105,
      text: "Food Truck - 150m",
      color: "bg-orange-100",
      height: "h-88",
      width: "w-full",
      distance: "150m",
      timeLeft: "5h",
    },
    {
      id: 106,
      text: "Book Store Event - 300m",
      color: "bg-yellow-100",
      height: "h-64",
      width: "w-full",
      distance: "300m",
      timeLeft: "1d",
    },
    {
      id: 107,
      text: "Yoga Studio - 250m",
      color: "bg-green-100",
      height: "h-96",
      width: "w-full",
      distance: "250m",
      timeLeft: "8h",
    },
    {
      id: 108,
      text: "Live Music - 180m",
      color: "bg-red-100",
      height: "h-60",
      width: "w-full",
      distance: "180m",
      timeLeft: "2h",
    },
    {
      id: 109,
      text: "Street Market - 400m",
      color: "bg-teal-100",
      height: "h-72",
      width: "w-full",
      distance: "400m",
      timeLeft: "6h 30m",
    },
    {
      id: 110,
      text: "Photography Exhibit - 220m",
      color: "bg-indigo-100",
      height: "h-80",
      width: "w-full",
      distance: "220m",
      timeLeft: "4h 15m",
    },
    {
      id: 111,
      text: "Coffee Shop Live - 90m",
      color: "bg-amber-50",
      height: "h-56",
      width: "w-full",
      distance: "90m",
      timeLeft: "1h 45m",
    },
    {
      id: 112,
      text: "Park Cleanup Event - 350m",
      color: "bg-emerald-100",
      height: "h-64",
      width: "w-full",
      distance: "350m",
      timeLeft: "3d",
    },
  ];

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

  // Fixed SearchBar component with ORANGE color updates
  const SearchBar = () => (
    <div className="w-full">
      <div
        className="flex overflow-hidden bg-white rounded-lg shadow-md"
        style={{ border: `2px solid ${ORANGE}` }}
      >
        <input
          type="text"
          placeholder="Search"
          className="flex-1 pl-6 pr-4 py-4 text-base text-gray-800 focus:outline-none w-full"
          style={{ backgroundColor: WHITE, color: BLACK }}
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

  // Share button handler
  const handleShare = (e: React.MouseEvent, itemId: number) => {
    e.stopPropagation();
    setSelectedShareItem(itemId);
    setShareModalOpen(true);
  };

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
            <SearchBar />
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
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
            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  name: "WhatsApp",
                  c: "#25D366",
                  icon: (
                    <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white">
                      <path d="M16 .5C7.6.5.5 7.6.5 16c0 2.8.7 5.4 2.1 7.8L.5 31.5l7.9-2.1c2.3 1.3 4.9 2 7.6 2 8.4 0 15.5-7.1 15.5-15.5S24.4.5 16 .5zm0 28c-2.4 0-4.7-.6-6.8-1.9L7 27l.5-2.1C5.1 22.4 4 19.3 4 16 4 9.4 9.4 4 16 4s12 5.4 12 12-5.4 12-12 12zm6.8-9c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.7-.2-1 .2-.3.4-1.2 1.5-1.5 1.8-.2.3-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.3-2.2-2.7-.2-.4 0-.6.2-.8l.7-.8c.2-.2.3-.4.4-.7.1-.2 0-.5 0-.7 0-.2-.8-2-1.1-2.7-.3-.8-.6-.7-.8-.8h-.7c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.6 1.1 2.9.2.3 1.9 2.9 4.6 4.1 2.7 1.3 2.7.9 3.2.8.5-.1 1.6-.6 1.8-1.2.2-.6.2-1.1.1-1.2-.1-.1-.4-.1-.8-.3z" />
                    </svg>
                  ),
                },
                {
                  name: "Facebook",
                  c: "#1877F2",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 0 1 3.7-3.9c.7 0 1.5 0 2.3.1v2.7H15a1.3 1.3 0 0 0-1.5 1.4V12H18l-.5 3h-3v7A10 10 0 0 0 22 12" />
                    </svg>
                  ),
                },
                {
                  name: "Instagram",
                  c: "#C13584",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                      <path d="M7 2C4.2 2 2 4.3 2 7v10c0 2.7 2.2 5 5 5h10c2.7 0 5-2.3 5-5V7c0-2.7-2.3-5-5-5H7zm10 2c1.7 0 3 1.4 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.6 1.3-3 3-3h10zm-5 3.4A4.6 4.6 0 1 0 16.6 12 4.6 4.6 0 0 0 12 7.4zm0 2A2.6 2.6 0 1 1 9.4 12 2.6 2.6 0 0 1 12 9.4zM17.5 6a1.1 1.1 0 1 0 1.1 1.1A1.1 1.1 0 0 0 17.5 6z" />
                    </svg>
                  ),
                },
                {
                  name: "Twitter",
                  c: "#1DA1F2",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                      <path d="M23 3a10.9 10.9 0 0 1-3.1 1A4.5 4.5 0 0 0 22.4.4a9.2 9.2 0 0 1-3 1.2A4.6 4.6 0 0 0 16.1 0c-2.5 0-4.5 2.1-4.5 4.8 0 .4.1.8.2 1.1A13 13 0 0 1 1.7.9a4.9 4.9 0 0 0-.6 2.4 4.9 4.9 0 0 0 2 4A4.2 4.2 0 0 1 .9 6v.1c0 2.3 1.6 4.3 3.7 4.8-.4.1-.8.2-1.3.2a3 3 0 0 1-.8-.1c.6 2.1 2.5 3.6 4.6 3.6A9.4 9.4 0 0 1 0 19.6a13.2 13.2 0 0 0 7.3 2.3c8.8 0 13.7-7.7 13.7-14.3 0-.2 0-.4 0-.6A10.3 10.3 0 0 0 23 3" />
                    </svg>
                  ),
                },
                {
                  name: "Telegram",
                  c: "#0088cc",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                      <path d="M9.8 16.7l-.4 5.3c.6 0 .9-.2 1.2-.5l2.8-2.7 5.8 4.2c1 .5 1.7.2 1.9-.9L24 1.5C24 .4 23.3 0 22.4.3L.8 9C-.4 9.6-.4 10.5.6 10.8l5.4 1.7 12.6-7.9c.6-.4 1-.2.6.3" />
                    </svg>
                  ),
                },
                {
                  name: "Snapchat",
                  c: "#FFFC00",
                  icon: (
                    <svg viewBox="0 0 32 32" className="w-6 h-6 fill-black">
                      <path d="M16 2c-5.1 0-9.2 4.3-9.2 9.6 0 4.8 1.8 8.9 5.5 11.2v6.6c0 1.6 1.7 2.6 3.3 1.9 1.8-.8 3.4-2.3 5-4.4 1.6 2.1 3.2 3.6 5 4.4 1.6.7 3.3-.3 3.3-1.9v-6.6c3.7-2.3 5.5-6.4 5.5-11.2C25.2 6.3 21.1 2 16 2z" />
                    </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  c: "#0077B5",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4.9v16H.5zM9 8h4.7v2.2h.1c.6-1.1 2.2-2.2 4.6-2.2C22.5 8 24 10 24 14.3V24h-4.9v-9c0-2.1-.7-3.6-2.5-3.6-1.4 0-2.2 1-2.6 2-.1.2-.1.6-.1.9V24H9V8z" />
                    </svg>
                  ),
                },
                {
                  name: "TikTok",
                  c: "#000",
                  icon: (
                    <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white">
                      <path d="M20.4 2h3.1c.2 1.7.9 3.2 2.1 4.4a7 7 0 0 0 4.4 2v3.2a10.8 10.8 0 0 1-6.2-2.1v9.2c0 5.6-4.3 10.3-10.4 10.3S3 24.2 3 18.6 7.3 8.2 13 8.2c1 0 2 .1 3 .4V12c-1-.5-2.2-.8-3.4-.8A6.6 6.6 0 1 0 19.6 18V2h.8z" />
                    </svg>
                  ),
                },
                {
                  name: "Pinterest",
                  c: "#BD081C",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                      <path d="M12.04 2a10 10 0 0 0-3.2 19.5c-.2-1-.4-2-.4-3l1.3-5.4a.4.4 0 0 0-.1-.3 4 4 0 0 1-.2-4.4c.4-.7.8-1 1.2-1 .6 0 .9.4 1 1a6.7 6.7 0 0 1 .2 1.8c0 .4 0 1-.2 1.4-.1.4-.1.7.3.8 1.1.5 2.3-.7 2.6-2.5.4-2.6-1.1-4.6-4-4.6-3.2 0-5.3 2.4-5.3 5.3 0 1 .3 2.1 1 2.8.2.3.3.6.2.9l-.3 1.3c-.1.6-.3.7-.9.7a7.7 7.7 0 1 1 7.2 5.4 8.1 8.1 0 0 1-2.4-.4l.4-2.5c.2-.8.5-1.7.8-2.4.3-.8.6-1.6.7-2.2a4 4 0 0 0-.4-2.7 2.2 2.2 0 0 1 .4-2.5 4.8 4.8 0 0 0 .7-1.3v0z" />
                    </svg>
                  ),
                },
                {
                  name: "YouTube",
                  c: "#FF0000",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7 fill-white -ml-[2px]"
                    >
                      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.2C19 3.5 12 3.5 12 3.5s-7 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.2c2.3.5 9.4.5 9.4.5s7 0 9.4-.5a3 3 0 0 0 2.1-2.2A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.7 15.3V8.7l6 3.3-6 3.3Z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <button
                  key={item.name}
                  className="flex flex-col items-center gap-1 text-xs font-medium"
                >
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                    style={{ backgroundColor: item.c }}
                  >
                    {item.icon}
                  </span>
                  <span className="text-gray-600 whitespace-nowrap">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Animation */}
          <style jsx>{`
            @keyframes fadeUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fade-in-up {
              animation: fadeUp 0.25s ease-out;
            }
          `}</style>
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
            className="hidden lg:block sticky top-[64px] z-30 py-4 -mx-6 px-6"
            style={{
              backgroundColor: WHITE,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
            }}
          >
            <SearchBar />
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
            {displayItems.map((item, index) => (
              <AnimatedItem key={item.id} delay={index * 50}>
                <div
                  className={`relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer group mb-4 break-inside-avoid ${item.height}`}
                >
                  {/* Placeholder Content Area */}
                  <div
                    className={`w-full h-full flex items-center justify-center ${item.color}`}
                  >
                    <div className="text-center p-4 w-full">
                      <p
                        className="text-white font-semibold text-sm opacity-70 group-hover:opacity-100 transition-opacity mb-2 px-2"
                        style={{
                          color: [
                            "bg-white",
                            "bg-pink-100",
                            "bg-pink-200",
                            "bg-yellow-100",
                            "bg-orange-200",
                            "bg-orange-100",
                            "bg-green-100",
                            "bg-blue-200",
                            "bg-blue-300",
                            "bg-gray-100",
                            "bg-amber-100",
                            "bg-amber-50",
                            "bg-purple-300",
                            "bg-purple-200",
                            "bg-gray-300",
                            "bg-red-100",
                            "bg-teal-100",
                            "bg-indigo-100",
                            "bg-emerald-100",
                          ].includes(item.color)
                            ? BLACK
                            : WHITE,
                        }}
                      >
                        {item.text}
                      </p>
                      {item.distance && (
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                          {item.distance} away
                        </div>
                      )}
                    </div>
                  </div>

                  {/* UPDATED SHARE BUTTON - Top Left */}
                  <button
                    onClick={(e) => handleShare(e, item.id)}
                    className="absolute top-2 left-2 pl-2 pr-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105 z-20 flex items-center gap-1.5 shadow-md"
                    style={{
                      backgroundColor: "rgba(31, 31, 31, 0.9)",
                      color: WHITE,
                      backdropFilter: "blur(4px)"
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

                  {/* Save Button Mock - Updated Color */}
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
            ))}
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
                <div className="w-8 h-8 rounded-full bg-red-600 flex-shrink-0"></div>
                <p className="text-sm font-medium text-gray-800">Fashion Hub</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex-shrink-0"></div>
                <p className="text-sm font-medium text-gray-800">
                  Tech Solutions
                </p>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-600 flex-shrink-0"></div>
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
            <div className="flex-shrink-0">
              <div className="p-2 bg-orange-50 rounded-full">
                <svg className="w-6 h-6 text-[#ff5720]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            
            {/* Content - Horizontal Layout */}
            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
               <div className="text-sm truncate">
                 <span className="font-bold text-gray-900 block sm:inline mr-2">You're nearby!</span>
                 <span className="text-gray-600">
                   <span className="font-bold text-[#ff5720]">Nexus Properties</span> is 50m away.
                 </span>
               </div>
               
               <Link href="/pages/eventDetails" className="text-sm font-bold text-[#ff5720] hover:text-orange-700 whitespace-nowrap flex-shrink-0">
                 View Details &rarr;
               </Link>
            </div>

            {/* Close */}
            <button onClick={() => setShowNotification(false)} className="text-gray-400 hover:text-gray-500">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
    </div>
  );
}