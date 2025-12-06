"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SpeechBubble } from "@/app/components/Chat";
import {
  originalPostItems,
  nearbyPostItems,
  OriginalPostItemsProps,
} from "../../utils/feedData";
import { SearchBar, SmartVideo } from "@/app/components/FeddHelpers";
import { MediaModal } from "@/app/components/MediaModal";

// --- BENTO GRID HELPER ---
const getCardStyle = (index: number) => {
  const modIndex = index % 6;
  const sketchLayouts = [
    "lg:col-span-1 lg:row-span-2 h-[400px] lg:h-full", // 1. Tall Left
    "lg:col-span-2 lg:row-span-1 h-[250px]", // 2. Wide Top Right
    "lg:col-span-1 lg:row-span-2 h-[400px] lg:h-full", // 3. Tall Middle (Vertical)
    "lg:col-span-1 lg:row-span-1 h-[250px]", // 4. Square Right
    "lg:col-span-1 lg:row-span-2 h-[400px] lg:h-full", // 5. Tall Right (below square)
    "lg:col-span-2 lg:row-span-1 h-[250px]", // 6. Wide Bottom
  ];
  return sketchLayouts[modIndex];
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
  const [searchQuery, setSearchQuery] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [dots, setDots] = useState<Array<{ x: number; y: number; id: number }>>(
    []
  );
  const [selectedMediaItem, setSelectedMediaItem] = useState<any | null>(null);
  const [displayItems, setDisplayItems] =
    useState<OriginalPostItemsProps[]>(originalPostItems);

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

  useEffect(() => {
    return () => {
      setDots([]);
    };
  }, []);

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
      setDots([]);
    };
  };

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
    <div
      className="min-h-screen relative font-sans text-slate-800"
      style={{ backgroundColor: GRAY_BG }}
    >
      {/* Modern Glass Navbar */}
      <nav className="sticky top-0 z-50 px-4 py-3 border-b border-gray-200/60 shadow-sm backdrop-blur-xl bg-white/80 transition-all">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center gap-6">
          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo Area */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <span
              className="font-bold text-xl tracking-tight hidden sm:block"
              style={{ color: BLACK }}
            >
              B23<span style={{ color: ORANGE }}>Feed</span>
            </span>
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
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <Link
              href="/pages/userProfile"
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-orange-500 transition shadow-sm"
            >
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Profile"
                className="w-full h-full object-cover"
              />
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
          {/* Glass Backdrop Overlay */}
          <div
            className={`absolute inset-0 transition-all duration-700 ${
              isScanning
                ? "bg-gray-900/30 backdrop-blur-xl"
                : "bg-black/70 backdrop-blur-lg"
            }`}
            onClick={() => {
              setIsLocationModalOpen(false);
              setIsScanning(false);
              setDots([]);
            }}
          ></div>

          {/* Futuristic Glass Card */}
          <div
            className={`relative rounded-3xl overflow-hidden transition-all duration-500 max-w-md w-full mx-4 z-10 border border-white/20
      ${
        isScanning
          ? "bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-black/80 backdrop-blur-xl shadow-[0_0_50px_rgba(255,87,32,0.3)]"
          : "bg-gradient-to-br from-gray-900 to-black shadow-2xl"
      }`}
          >
            {/* Animated Glow Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 via-cyan-500/10 to-orange-500/20 animate-gradient-border"></div>

            {/* Inner Container */}
            <div className="relative bg-gradient-to-b from-gray-900/30 to-black/30 backdrop-blur-sm p-8 z-10">
              {/* Header Section */}
              <div className="mb-8">
                {isScanning ? (
                  <div className="flex flex-col items-center">
                    {/* Futuristic Badge */}
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-500/20 to-cyan-500/20 border border-orange-500/30 rounded-full mb-3 backdrop-blur-md animate-pulse">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-cyan-500 animate-ping"></div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-cyan-400 font-mono text-xs font-bold tracking-widest uppercase">
                          RADAR SCANNING
                        </span>
                        <div
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-cyan-500 animate-ping"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent tracking-tight">
                      Scanning Area
                    </h2>

                    {/* Coordinates Display */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-cyan-500 rounded-lg blur opacity-30"></div>
                        <div className="relative bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-700">
                          <span className="text-xs font-mono text-orange-300">
                            LAT: 9.0820°N
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-lg blur opacity-30"></div>
                        <div className="relative bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-700">
                          <span className="text-xs font-mono text-cyan-300">
                            LNG: 8.6753°E
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-emerald-300 rounded-full animate-ping opacity-20"></div>
                      <div className="absolute inset-2 bg-gradient-to-tr from-green-400 to-emerald-200 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                        <svg
                          className="w-10 h-10 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                      Targets Acquired
                    </h2>
                    <p className="text-gray-300 mt-1">
                      Found {nearbyPostItems.length} locations nearby
                    </p>
                  </>
                )}
              </div>

              {isScanning ? (
                /* FUTURISTIC RADAR SCREEN */
                <div className="relative w-80 h-80 mx-auto mb-8">
                  {/* Outer Glow Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 via-cyan-500/5 to-orange-500/10 blur-xl"></div>

                  {/* Radar Bezel */}
                  <div className="absolute inset-0 rounded-full border-2 border-gray-700/50 bg-gradient-to-b from-gray-900 to-black shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] overflow-hidden">
                    {/* Grid Lines - Concentric Circles */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {[1, 2, 3, 4].map((ring) => (
                        <div
                          key={ring}
                          className="absolute rounded-full border border-gray-700/30"
                          style={{
                            width: `${ring * 40}%`,
                            height: `${ring * 40}%`,
                          }}
                        ></div>
                      ))}
                    </div>

                    {/* Crosshair Lines */}
                    <div className="absolute inset-0">
                      <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent"></div>
                      <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-gray-700/40 to-transparent"></div>
                    </div>

                    {/* Diagonal Grid Lines */}
                    <div className="absolute inset-0 rotate-45">
                      <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-700/20 to-transparent"></div>
                      <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-gray-700/20 to-transparent"></div>
                    </div>

                    {/* Sweeping Beam - Enhanced with Gradient */}
                    {/* Sweeping Beam - Enhanced with Gradient */}
                    <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
                      {/* Main Beam */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 320deg, rgba(255,87,32,0.2) 340deg, rgba(255,87,32,0.8) 360deg)`,
                          filter: "blur(1px)",
                        }}
                      ></div>
                      
                      {/* Secondary Blue Tint for "Scanner" feel */}
                      <div 
                         className="absolute inset-0"
                         style={{
                            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 345deg, rgba(100,220,255,0.5) 355deg, transparent 360deg)`,
                            mixBlendMode: "screen"
                         }}
                      ></div>
                    </div>

                    {/* Sweeping Beam Trail Effect */}
                    <div
                      className="absolute inset-0 animate-[spin_3s_linear_infinite]"
                      style={{ animationDelay: "-0.1s" }} 
                    >
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 280deg, rgba(255,87,32,0.4) 360deg)`,
                          filter: "blur(8px)",
                        }}
                      ></div>
                    </div>

                    {/* Center Crosshair */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4">
                        <div className="absolute inset-0 border-2 border-orange-500/50 rounded-full animate-ping"></div>
                        <div className="absolute inset-1 bg-gradient-to-r from-orange-500 to-cyan-500 rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 w-8 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent transform -translate-x-1/2"></div>
                        <div className="absolute top-1/2 left-1/2 h-8 w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent transform -translate-y-1/2"></div>
                      </div>
                    </div>

                    {/* Distance Markers */}
                    <div className="absolute inset-0">
                      {[1, 2, 3].map((marker) => (
                        <div
                          key={marker}
                          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[8px] font-mono text-gray-500 font-bold"
                          style={{
                            marginTop: `-${marker * 70}px`,
                          }}
                        >
                          {marker}km
                        </div>
                      ))}
                    </div>

                    {/* Detected Blips with Trail Effect */}
                    {dots.map((dot, index) => {
                      const distance = Math.sqrt(dot.x * dot.x + dot.y * dot.y);
                      const size = Math.max(2, 6 - distance / 30);
                      const intensity = Math.max(0.3, 1 - distance / 200);

                      return (
                        <div key={dot.id} className="absolute">
                          {/* Pulse Ring */}
                          <div
                            className="absolute rounded-full bg-gradient-to-r from-orange-500/30 to-cyan-500/30"
                            style={{
                              left: `calc(50% + ${dot.x}px)`,
                              top: `calc(50% + ${dot.y}px)`,
                              width: `${size * 6}px`,
                              height: `${size * 6}px`,
                              transform: "translate(-50%, -50%)",
                              animation: "pulseRing 2s ease-out infinite",
                              animationDelay: `${index * 0.1}s`,
                              opacity: intensity,
                            }}
                          ></div>

                          {/* Main Blip */}
                          <div
                            className="absolute rounded-full bg-gradient-to-r from-orange-500 to-cyan-500 shadow-[0_0_15px_rgba(255,87,32,0.8)]"
                            style={{
                              left: `calc(50% + ${dot.x}px)`,
                              top: `calc(50% + ${dot.y}px)`,
                              width: `${size}px`,
                              height: `${size}px`,
                              transform: "translate(-50%, -50%)",
                              animation: "blipGlow 1.5s ease-in-out infinite",
                              animationDelay: `${index * 0.2}s`,
                            }}
                          ></div>

                          {/* Trail Effect */}
                          <div
                            className="absolute rounded-full bg-gradient-to-r from-orange-400/20 to-cyan-400/20"
                            style={{
                              left: `calc(50% + ${dot.x * 0.7}px)`,
                              top: `calc(50% + ${dot.y * 0.7}px)`,
                              width: `${size * 2}px`,
                              height: `${size * 2}px`,
                              transform: "translate(-50%, -50%)",
                              filter: "blur(2px)",
                              opacity: intensity * 0.5,
                            }}
                          ></div>
                        </div>
                      );
                    })}

                    {/* HUD Elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-6">
                      <div className="text-[10px] font-bold text-cyan-400 tracking-widest">
                        N
                      </div>
                      <div className="text-[8px] text-gray-500 mt-1">0°</div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-6 text-[10px] font-bold text-cyan-400 tracking-widest">
                      S
                    </div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 text-[10px] font-bold text-orange-400 tracking-widest">
                      W
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 text-[10px] font-bold text-orange-400 tracking-widest">
                      E
                    </div>

                    {/* Radar Scan Lines Effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      <div
                        className="absolute inset-0 animate-scanlines"
                        style={{
                          background: `repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(0,255,255,0.03) 1px, rgba(0,255,255,0.03) 2px)`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Bottom Status Bar */}
                  <div className="absolute -bottom-6 left-0 right-0 flex justify-between items-center px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-cyan-500 animate-pulse"></div>
                      <span className="text-[10px] text-gray-400 font-mono">
                        ACTIVE
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono">
                      {dots.length} SIGNALS
                    </div>
                  </div>
                </div>
              ) : (
                /* Results State */
                <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg rounded-2xl p-5 mb-6 border border-gray-700/50 shadow-inner">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 animate-pulse"></div>
                      <span className="text-sm font-bold text-gray-200">
                        FILTER APPLIED
                      </span>
                    </div>
                    <span className="text-xs text-white bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-1 rounded-full shadow-lg">
                      ACTIVE
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Radius:</span>
                      <span className="font-semibold text-white bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
                        5km
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="font-semibold text-white">
                        All Categories
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Precision:</span>
                      <span className="font-semibold text-emerald-400">
                        98.7%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Bar / Footer */}
              {isScanning ? (
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-cyan-500 animate-ping"></div>
                      <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">
                        SIGNAL STRENGTH
                      </span>
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-cyan-400 font-mono text-xl font-bold tracking-wider">
                      {Math.floor(scanProgress)}%
                    </span>
                  </div>

                  {/* Futuristic Progress Bar */}
                  <div className="relative w-full h-3 bg-gray-900/50 backdrop-blur-sm rounded-full overflow-hidden border border-gray-700/50">
                    {/* Glowing Track */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-cyan-500/10 to-orange-500/10"></div>

                    {/* Animated Progress Fill */}
                    <div className="relative h-full">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 via-cyan-500 to-orange-500 shadow-[0_0_20px_rgba(255,87,32,0.5)] transition-all duration-100"
                        style={{ width: `${scanProgress}%` }}
                      >
                        {/* Animated Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                      </div>
                    </div>

                    {/* Pulsing End Cap */}
                    <div
                      className="absolute top-1/2 w-4 h-4 -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-500 to-cyan-500 shadow-[0_0_15px_rgba(255,87,32,0.8)]"
                      style={{ left: `calc(${scanProgress}% - 8px)` }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-cyan-500 animate-ping"></div>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="flex justify-between mt-2 px-1">
                    {[0, 25, 50, 75, 100].map((point) => (
                      <div key={point} className="flex flex-col items-center">
                        <div
                          className={`w-1 h-1 rounded-full ${
                            scanProgress >= point
                              ? "bg-cyan-400"
                              : "bg-gray-600"
                          }`}
                        ></div>
                        <span className="text-[8px] text-gray-500 mt-1">
                          {point}%
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setIsLocationModalOpen(false);
                      setIsScanning(false);
                      setDots([]);
                    }}
                    className="mt-6 text-gray-400 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 group"
                  >
                    <svg
                      className="w-4 h-4 group-hover:rotate-90 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    ABORT SCAN
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsLocationModalOpen(false);
                    setIsScanning(false);
                    setDots([]);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,87,32,0.5)] transition-all duration-300 shadow-lg hover:-translate-y-0.5 group relative overflow-hidden"
                >
                  {/* Button Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-cyan-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>

                  {/* Button Content */}
                  <div className="relative flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 group-hover:rotate-12 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    VIEW RESULTS
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {shareModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShareModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
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
                  <div className="w-14 h-14 rounded-full overflow-hidden shadow-md group-hover:scale-110 transition-transform border border-gray-100 relative">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-cover"
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

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="relative bg-white w-3/4 max-w-xs h-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-6">Menu</h2>
            <button className="w-full text-left py-2 border-b">
              My Profile
            </button>
            <button className="w-full text-left py-2 border-b">Settings</button>
          </div>
        </div>
      )}

      {/* MAIN GRID LAYOUT */}
      <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[260px_1fr_300px] gap-8 px-4 lg:px-8 py-8 ">
        {/* Left Sidebar - Navigation & Shortcuts - SCROLLABLE UPDATED */}
        <div className="hidden lg:block sticky top-24 h-[calc(100vh-3rem)] overflow-y-scroll no-scrollbar space-y-6 pb-64">
          {/* Navigation Card - UPDATED WITH MORE ITEMS */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50">
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-orange-50 text-orange-600 rounded-xl font-medium transition">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <span>Feed</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>Favorites</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <span>Near Me</span>
              </button>
              {/* New Added Items */}
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span>Messages</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span>Notifications</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span>Analytics</span>
              </button>
            </div>
          </div>

          {/* NEW SECTION 1: Subscriptions - ADDED ITEMS */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 text-sm">Subscriptions</h3>
              <Link
                href="#"
                className="text-xs text-orange-500 font-semibold hover:underline"
              >
                See all
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { name: "Urban Explorer", img: 32, new: true },
                { name: "Tech Daily", img: 11, new: false },
                { name: "Foodie Haven", img: 44, new: true },
                { name: "Cinema Scope", img: 65, new: false }, // New
                { name: "Fitness Pro", img: 68, new: true }, // New
              ].map((sub, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-1.5 hover:bg-gray-50 rounded-lg transition cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={`https://i.pravatar.cc/150?img=${sub.img}`}
                        alt={sub.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {sub.new && (
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {sub.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* NEW SECTION 2: Your Activity */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/50">
            <h3 className="font-bold text-gray-900 text-sm mb-3">
              Your Activity
            </h3>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-medium transition">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>History</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-medium transition">
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span>Scheduled</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-medium transition">
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center - Content Feed with BENTO GRID */}
        <div className="w-full min-h-screen">
          {/* Feed Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {showNearbyResults ? "Nearby Places" : "Discover"}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {showNearbyResults
                  ? "Showing results within 5km radius"
                  : "Trending videos and posts for you"}
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

          {/* BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
            {filteredItems.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-900">
                  No results found
                </h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedMediaItem(item)}
                  className={`relative group overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100 ${getCardStyle(
                    index
                  )}`}
                >
                  {/* Media Content */}
                  <div className="absolute inset-0 bg-gray-100">
                    {item.type === "video" ? (
                      <SmartVideo
                        src={item.src!}
                        className="w-full h-full object-cover"
                      />
                    ) : item.type === "text" ? (
                      <div
                        className="w-full h-full flex items-center justify-center p-8 text-center"
                        style={{ backgroundColor: item.bgColor || "#000" }}
                      >
                        <p className="text-white font-bold text-2xl leading-tight">
                          {item.text}
                        </p>
                      </div>
                    ) : (
                      <img
                        src={item.src!}
                        alt={item.text}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>

                  {/* Gradient Overlay (Only for non-text posts) */}
                  {item.type !== "text" && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  )}

                  {/* Top Info Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.distance && (
                      <span className="px-2 py-1 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md border border-white/10">
                        {item.distance}
                      </span>
                    )}
                    {item.timeLeft && (
                      <span className="px-2 py-1 bg-orange-500/80 backdrop-blur-md text-white text-[10px] font-bold rounded-md flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {item.timeLeft}
                      </span>
                    )}
                  </div>

                  {/* Bottom Text */}
                  {item.type !== "text" && (
                    <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-xl leading-tight shadow-black drop-shadow-md line-clamp-2">
                        {item.text}
                      </h3>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        <button
                          onClick={(e) => handleShare(e, item.id)}
                          className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white hover:text-black text-white transition-colors"
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
                        </button>
                        <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white hover:text-red-500 text-white transition-colors">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar - Trends & Suggestions - SCROLLABLE UPDATED */}
        <div className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar space-y-6 pb-32">
          {/* Demo Widget - MOVED HERE FROM LEFT COLUMN
          <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-2xl transform translate-x-6 -translate-y-6"></div>
            <h3 className="font-bold text-lg mb-1 relative z-10">Demo Mode</h3>
            <p className="text-white/90 text-sm mb-4 relative z-10">
              Test location triggers instantly.
            </p>
            <button
              onClick={simulateProximity}
              className="w-full bg-white text-orange-600 text-sm font-bold py-2.5 rounded-xl shadow-sm hover:bg-gray-50 transition relative z-10"
            >
              Trigger "Near Business"
            </button>
          </div> */}

          {/* Trending Box - ADDED MORE TAGS */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Trending Now</h3>
              <span className="text-xs font-semibold text-orange-500 cursor-pointer">
                View All
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "#SummerVibes",
                "#Tech2024",
                "#Foodie",
                "#Art",
                "#Travel",
                "#Coffee",
                "#Crypto",
                "#Design",
                "#Fitness",
                "#Music",
                "#Startups",
                "#Nature",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium rounded-lg hover:bg-orange-50 hover:text-orange-600 transition cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Suggestions Box - ADDED MORE ITEMS */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Suggested for you</h3>
            <ul className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                    <img
                      src={`https://i.pravatar.cc/150?img=${i + 20}`}
                      alt="user"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      Creative Studio
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      @creative_studio
                    </p>
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
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition bg-black text-white text-xs px-2 py-1 rounded mb-2 whitespace-nowrap">
            Scan Area
          </span>
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
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-lg bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 p-4 border border-gray-100 flex items-center gap-4 animate-fade-in-up">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900">Business Nearby!</p>
            <p className="text-xs text-gray-500">
              Nexus Properties is just 50m away.
            </p>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
          {/* Progress Line */}
          <div className="absolute bottom-0 left-4 right-4 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-100"
              style={{ width: `${notificationProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Media Modal */}
      {selectedMediaItem && (
        <MediaModal
          item={selectedMediaItem}
          items={filteredItems}
          onNext={() => {
            const currentIndex = filteredItems.findIndex(
              (i) => i.id === selectedMediaItem.id
            );
            const nextIndex = (currentIndex + 1) % filteredItems.length;
            setSelectedMediaItem(filteredItems[nextIndex]);
          }}
          onPrevious={() => {
            const currentIndex = filteredItems.findIndex(
              (i) => i.id === selectedMediaItem.id
            );
            const prevIndex =
              (currentIndex - 1 + filteredItems.length) % filteredItems.length;
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
          text="The FeedPage component presents a professional social discovery platform featuring a modular bento-grid interface, integrated proximity-based scanning technology, and interactive media engagement tools designed to optimize user discovery and content interaction through location-aware functionality"
          color="#800080"
          size="md"
          maxWidth="max-w-[400px]"
        />
      </div>
    </div>
  );
}
