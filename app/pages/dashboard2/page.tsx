"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-10 scale-95'
      }`}
    >
      {children}
    </div>
  );
};

// --- Floating Action Button Component ---
const FloatingActionButton = ({ 
  icon, 
  onClick, 
  label, 
  position = 'bottom-right' 
}: { 
  icon: React.ReactNode; 
  onClick: () => void; 
  label?: string;
  position?: 'bottom-right' | 'bottom-left';
}) => {
  const [showLabel, setShowLabel] = useState(false);
  
  const positions = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  return (
    <div className={`fixed ${positions[position]} z-40 flex flex-col items-end gap-2`}>
      {label && showLabel && (
        <div className="bg-black/90 text-white text-sm py-2 px-4 rounded-lg shadow-xl animate-fade-in-up backdrop-blur-sm">
          {label}
        </div>
      )}
      <button
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        onClick={onClick}
        className="group relative w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 text-xl">{icon}</span>
        <div className="absolute -inset-1 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity" />
      </button>
    </div>
  );
};

// --- Search Bar Component ---
const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
      <div className={`flex overflow-hidden bg-white/95 backdrop-blur-sm rounded-xl shadow-lg transition-all duration-300 ${
        isFocused ? 'ring-2 ring-orange-500/50 shadow-orange-500/20' : ''
      }`}>
        <input
          type="text"
          placeholder="Search events, businesses, tags..."
          className="flex-1 pl-6 pr-4 py-4 text-base text-gray-800 focus:outline-none w-full bg-transparent placeholder-gray-400"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button className="w-16 flex items-center justify-center text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// --- Post Card Component ---
const PostCard = ({ 
  item, 
  index, 
  onShare 
}: { 
  item: any; 
  index: number; 
  onShare: (id: number) => void; 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer mb-4 break-inside-avoid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
        isHovered ? 'shadow-2xl scale-[1.02]' : 'shadow-lg'
      }`}>
        {/* Main Card Content */}
        <div className={`${item.height} ${item.color} relative`}>
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Content */}
          <div className="relative w-full h-full flex items-center justify-center p-6">
            <div className="text-center">
              <h3 className={`text-lg font-bold mb-2 transition-all duration-500 ${
                isHovered ? 'text-white' : item.textColor || 'text-gray-800'
              }`}>
                {item.text}
              </h3>
              {item.distance && (
                <span className="inline-flex items-center gap-1 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.distance} away
                </span>
              )}
            </div>
          </div>

          {/* Top Action Buttons */}
          <div className={`absolute top-4 left-4 flex gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}>
            {/* Share Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare(item.id);
              }}
              className="p-2.5 bg-black/90 backdrop-blur-sm rounded-full hover:bg-black transition-all duration-300 hover:scale-110 shadow-lg"
              title="Share"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            
            {/* Category Badge */}
            {item.category && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full shadow-lg">
                {item.category}
              </span>
            )}
          </div>

          {/* Timer Badge */}
          <div className={`absolute top-4 right-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
          }`}>
            <div className="flex items-center gap-1.5 bg-black/90 backdrop-blur-sm text-red-400 px-3 py-1.5 rounded-full shadow-lg">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-bold">{item.timeLeft}</span>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className={`absolute bottom-4 right-4 flex gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            {/* Save Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSaved(!isSaved);
              }}
              className={`p-2.5 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110 ${
                isSaved ? 'bg-red-500' : 'bg-black/90'
              }`}
              title={isSaved ? "Saved" : "Save"}
            >
              <svg className={`w-4 h-4 ${isSaved ? 'text-white' : 'text-white'}`} fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>

            {/* Like Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`p-2.5 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110 ${
                isLiked ? 'bg-pink-500' : 'bg-black/90'
              }`}
              title={isLiked ? "Liked" : "Like"}
            >
              <svg className={`w-4 h-4 ${isLiked ? 'text-white' : 'text-white'}`} fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FeedPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationProgress, setNotificationProgress] = useState(100);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showNearbyResults, setShowNearbyResults] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedShareItem, setSelectedShareItem] = useState<number | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [dots, setDots] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // --- Theme Constants ---
  const ORANGE = "#ff5720";
  const BLACK = "#1f1f1f";
  const WHITE = "#f1f1f1";

  // Original post items with enhanced data
  const originalPostItems = [
    {
      id: 1,
      text: "Luxury Villa Open House",
      color: "bg-gradient-to-br from-gray-900 to-black",
      height: "h-80",
      timeLeft: "2h 30m",
      category: "Real Estate",
      textColor: "text-white"
    },
    {
      id: 2,
      text: "Art Gallery Exhibition",
      color: "bg-gradient-to-br from-pink-100 to-pink-300",
      height: "h-48",
      timeLeft: "1d 5h",
      category: "Art",
      textColor: "text-gray-800"
    },
    {
      id: 3,
      text: "Tech Startup Networking",
      color: "bg-gradient-to-br from-orange-200 to-orange-400",
      height: "h-64",
      timeLeft: "45m",
      category: "Tech",
      textColor: "text-gray-800"
    },
    {
      id: 4,
      text: "Gourmet Food Festival",
      color: "bg-gradient-to-br from-yellow-100 to-yellow-300",
      height: "h-96",
      timeLeft: "3h 15m",
      category: "Food",
      textColor: "text-gray-800"
    },
    {
      id: 5,
      text: "Fashion Week Pop-up",
      color: "bg-gradient-to-br from-white to-gray-100",
      height: "h-56",
      timeLeft: "6h",
      category: "Fashion",
      textColor: "text-gray-800"
    },
    {
      id: 6,
      text: "Yoga & Wellness Retreat",
      color: "bg-gradient-to-br from-green-100 to-green-300",
      height: "h-72",
      timeLeft: "12h 30m",
      category: "Wellness",
      textColor: "text-gray-800"
    },
    {
      id: 7,
      text: "Investor Pitch Night",
      color: "bg-gradient-to-br from-gray-800 to-black",
      height: "h-80",
      timeLeft: "1d",
      category: "Business",
      textColor: "text-white"
    },
    {
      id: 8,
      text: "Wine Tasting Event",
      color: "bg-gradient-to-br from-purple-100 to-purple-300",
      height: "h-64",
      timeLeft: "4h",
      category: "Food",
      textColor: "text-gray-800"
    },
    {
      id: 9,
      text: "Photography Workshop",
      color: "bg-gradient-to-br from-blue-100 to-blue-300",
      height: "h-96",
      timeLeft: "8h 45m",
      category: "Learning",
      textColor: "text-gray-800"
    },
    {
      id: 10,
      text: "Live Music Concert",
      color: "bg-gradient-to-br from-red-100 to-red-300",
      height: "h-60",
      timeLeft: "2d",
      category: "Music",
      textColor: "text-gray-800"
    },
  ];

  // Nearby post items
  const nearbyPostItems = [
    {
      id: 101,
      text: "Nearby Cafe Event",
      color: "bg-gradient-to-br from-amber-100 to-amber-300",
      height: "h-64",
      timeLeft: "1h 15m",
      distance: "50m",
      category: "Food",
      textColor: "text-gray-800"
    },
    {
      id: 102,
      text: "Local Art Gallery",
      color: "bg-gradient-to-br from-purple-200 to-purple-400",
      height: "h-80",
      timeLeft: "3h",
      distance: "120m",
      category: "Art",
      textColor: "text-gray-800"
    },
    {
      id: 103,
      text: "Tech Meetup",
      color: "bg-gradient-to-br from-blue-300 to-blue-500",
      height: "h-56",
      timeLeft: "2h 30m",
      distance: "200m",
      category: "Tech",
      textColor: "text-white"
    },
    {
      id: 104,
      text: "Fashion Pop-up",
      color: "bg-gradient-to-br from-pink-200 to-pink-400",
      height: "h-72",
      timeLeft: "45m",
      distance: "80m",
      category: "Fashion",
      textColor: "text-gray-800"
    },
    {
      id: 105,
      text: "Food Truck Festival",
      color: "bg-gradient-to-br from-orange-100 to-orange-300",
      height: "h-88",
      timeLeft: "5h",
      distance: "150m",
      category: "Food",
      textColor: "text-gray-800"
    },
  ];

  // Filter items based on active filter
  const getDisplayItems = () => {
    const baseItems = showNearbyResults ? nearbyPostItems : originalPostItems;
    
    if (activeFilter === 'all') return baseItems;
    return baseItems.filter(item => item.category.toLowerCase() === activeFilter.toLowerCase());
  };

  const displayItems = getDisplayItems();

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
          return prev - 1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [showNotification]);

  // Function to toggle location filter
  const toggleLocationFilter = () => {
    setIsLocationModalOpen(true);
    setIsScanning(true);
    setScanProgress(0);
    setDots([]);

    const intervals: NodeJS.Timeout[] = [];

    // Generate random dots
    const dotInterval = setInterval(() => {
      if (scanProgress >= 100) {
        clearInterval(dotInterval);
        return;
      }

      const numDots = Math.floor(Math.random() * 3) + 1;
      const newDots = Array.from({ length: numDots }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
      }));

      setDots((prev) => [...prev, ...newDots].slice(-20));
    }, 800);

    intervals.push(dotInterval);

    // Animate progress
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
    }, 50);

    intervals.push(progressInterval);

    setTimeout(() => {
      setIsScanning(false);
      setTimeout(() => {
        setIsLocationModalOpen(false);
        setShowNearbyResults(true);
        setDots([]);
      }, 2000);
    }, 5000);

    return () => {
      intervals.forEach(clearInterval);
    };
  };

  // Handle share
  const handleShare = (itemId: number) => {
    setSelectedShareItem(itemId);
    setShareModalOpen(true);
  };

  // Filter categories
  const filterCategories = ['All', 'Real Estate', 'Art', 'Tech', 'Food', 'Fashion', 'Wellness', 'Business', 'Music', 'Learning'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative">
      {/* Modern Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 px-4 py-3 shadow-sm">
        <div className="w-full flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">B23</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Business23
            </span>
          </div>

          {/* Mobile Search */}
          <div className="sm:block lg:hidden flex-1 mx-4">
            <SearchBar />
          </div>

          {/* Profile */}
          <Link
            href="/pages/userProfile"
            className="relative group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-sm text-white shadow-lg transition-transform group-hover:scale-110">
              ME
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </Link>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative bg-white w-80 h-full shadow-2xl animate-slide-in-left">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">B23</span>
                  </div>
                  <span className="font-bold text-xl">Menu</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Filters */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {filterCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveFilter(cat === 'All' ? 'all' : cat.toLowerCase());
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        (cat === 'All' && activeFilter === 'all') || 
                        cat.toLowerCase() === activeFilter
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Demo Tools */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-5 border border-orange-200">
                <h3 className="font-bold text-orange-900 mb-3">Demo Features</h3>
                <button
                  onClick={() => {
                    simulateProximity();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                >
                  Simulate Nearby Business
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-0 pb-20 relative">
        {/* Left Sidebar - Desktop */}
        <div className="hidden lg:block space-y-6 sticky top-24 h-fit pl-8 pr-4">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Filters</h3>
            <div className="space-y-2">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat === 'All' ? 'all' : cat.toLowerCase())}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    (cat === 'All' && activeFilter === 'all') || 
                    cat.toLowerCase() === activeFilter
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-5 text-white">
            <h3 className="font-bold mb-3">Premium Features</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                Advanced Analytics
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                Priority Support
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                Unlimited Events
              </li>
            </ul>
          </div>
        </div>

        {/* Main Feed */}
        <div className="w-full px-0 lg:px-6 min-h-screen">
          {/* Sticky Header for Desktop */}
          <div className="hidden lg:block sticky top-[64px] z-30 py-6 -mx-6 px-6 bg-white/80 backdrop-blur-lg">
            <SearchBar />
          </div>

          {/* Feed Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 lg:px-0 pt-8 pb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {showNearbyResults ? "Events Near You" : "Discover Events"}
              </h1>
              <p className="text-gray-600 mt-1">
                {showNearbyResults 
                  ? "Within 5km radius • Showing 12 results" 
                  : "Explore trending events and businesses"}
              </p>
            </div>

            {showNearbyResults && (
              <button
                onClick={() => setShowNearbyResults(false)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Show All Events
              </button>
            )}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 px-6 lg:px-0">
            {displayItems.map((item, index) => (
              <AnimatedItem key={item.id} delay={index * 50}>
                <PostCard item={item} index={index} onShare={handleShare} />
              </AnimatedItem>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-12 px-6 lg:px-0">
            <button className="px-8 py-3.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-medium rounded-xl transition-all duration-300 hover:shadow-lg">
              Load More Events
            </button>
          </div>
        </div>

        {/* Right Sidebar - Desktop */}
        <div className="hidden lg:block space-y-6 sticky top-24 h-fit pr-8 pl-4">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Trending Now</h3>
            <div className="space-y-3">
              {['#RealEstate', '#Luxury', '#Tech', '#Foodie', '#Networking'].map((tag) => (
                <div key={tag} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <span className="font-medium">{tag}</span>
                  <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">245</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white">
            <h3 className="font-bold mb-3">Create Event</h3>
            <p className="text-sm mb-4">Share your business event with thousands of users</p>
            <Link href="/pages/createEvent">
              <button className="w-full bg-white text-orange-600 font-bold py-3 px-4 rounded-xl hover:bg-gray-100 transition-all duration-300">
                + New Event
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <FloatingActionButton
        icon="📍"
        onClick={toggleLocationFilter}
        label="Find Nearby Events"
        position="bottom-right"
      />
      
      <FloatingActionButton
        icon="📱"
        onClick={simulateProximity}
        label="Test Notification"
        position="bottom-left"
      />

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in-up border border-gray-100">
          <div className="p-5 flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">You're nearby an event!</h4>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-bold text-orange-600">Nexus Properties</span> is hosting an event 50m away from you.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link 
                href="/pages/eventDetails" 
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
              >
                View Details
              </Link>
              <button 
                onClick={() => setShowNotification(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="h-1 w-full bg-gray-200">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-100 ease-linear" 
              style={{ width: `${notificationProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Share Event</h3>
              <button onClick={() => setShareModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {['📱', '📧', '💬', '🐦', '📘', '📷', '🎥', '🔗'].map((icon, i) => (
                <button key={i} className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-105">
                  <span className="text-2xl">{icon}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}