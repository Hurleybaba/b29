"use client";
import Link from "next/link";
import { useState } from "react";

export default function FeedPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [showLocationFilterMsg, setShowLocationFilterMsg] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- New Color Constants (from user update) ---
  const ORANGE = "#ff5720";
  const BLACK = "#1f1f1f";
  const WHITE = "#f1f1f1"; // Used for main bg where 'gray-50' was

  // Function to simulate walking near a business
  const simulateProximity = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000); // Hide after 5 seconds
  };

  // Function to toggle location filter message
  const toggleLocationFilter = () => {
    setShowLocationFilterMsg(true);
    setTimeout(() => setShowLocationFilterMsg(false), 4000);
  };

  // Updated mock array with Pinterest-style varying heights and widths
  const newPostItems = [
    {
      id: 1,
      text: "Broken Glass",
      color: "bg-black",
      height: "h-80",
      width: "w-full",
    },
    {
      id: 2,
      text: "Cat w/ Flower Crown",
      color: "bg-pink-100",
      height: "h-48",
      width: "w-full",
    },
    {
      id: 3,
      text: "Hand Gesture",
      color: "bg-orange-200",
      height: "h-64",
      width: "w-full",
    },
    {
      id: 4,
      text: "Yellow Funny Face",
      color: "bg-yellow-100",
      height: "h-96",
      width: "w-full",
    },
    {
      id: 5,
      text: "Doraemon with eyes closed",
      color: "bg-white",
      height: "h-56",
      width: "w-full",
    },
    {
      id: 6,
      text: "Green Abstract Pattern",
      color: "bg-green-100",
      height: "h-72",
      width: "w-full",
    },
    {
      id: 7,
      text: "Anime Action Scene",
      color: "bg-gray-800",
      height: "h-80",
      width: "w-full",
    },
    {
      id: 8,
      text: "Cat with Attitude",
      color: "bg-white",
      height: "h-64",
      width: "w-full",
    },
    {
      id: 9,
      text: "Abstract Glitch",
      color: "bg-black",
      height: "h-96",
      width: "w-full",
    },
    {
      id: 10,
      text: "Spotlight on an Idea",
      color: "bg-gray-700",
      height: "h-60",
      width: "w-full",
    },
    {
      id: 11,
      text: "Text Banner",
      color: "bg-red-900",
      height: "h-48",
      width: "w-full",
    },
    {
      id: 12,
      text: "Smiling Hamster",
      color: "bg-orange-100",
      height: "h-72",
      width: "w-full",
    },
    {
      id: 13,
      text: "Luxury Villa",
      color: "bg-blue-200",
      height: "h-80",
      width: "w-full",
    },
    {
      id: 14,
      text: "Modern Architecture",
      color: "bg-white",
      height: "h-64",
      width: "w-full",
    },
    {
      id: 15,
      text: "Doraemon Sad",
      color: "bg-gray-100",
      height: "h-40",
      width: "w-full",
    },
    {
      id: 16,
      text: "Forest Path",
      color: "bg-green-700",
      height: "h-96",
      width: "w-full",
    },
    {
      id: 17,
      text: "Minimal Design",
      color: "bg-gray-300",
      height: "h-52",
      width: "w-full",
    },
    {
      id: 18,
      text: "Vibrant Colors",
      color: "bg-purple-300",
      height: "h-88",
      width: "w-full",
    },
    {
      id: 19,
      text: "Urban Street",
      color: "bg-gray-600",
      height: "h-64",
      width: "w-full",
    },
    {
      id: 20,
      text: "Coffee Art",
      color: "bg-amber-100",
      height: "h-76",
      width: "w-full",
    },
  ];

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

          <h2
            className="text-xl font-bold text-gray-900 mb-6 pl-4 lg:pl-0 pt-4"
            style={{ color: BLACK }}
          >
            Discover & Trending
          </h2>

          {/* MASONRY GRID IMPLEMENTATION */}
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-4 lg:px-0">
            {newPostItems.map((item) => (
              <div
                key={item.id}
                className={`relative w-full rounded-xl overflow-hidden shadow-lg cursor-pointer group mb-4 break-inside-avoid ${item.height}`}
              >
                {/* Placeholder Content Area */}
                <div
                  className={`w-full h-full flex items-center justify-center ${item.color}`}
                >
                  <p
                    className="text-white font-semibold text-center text-sm p-4 opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{
                      color: [
                        "bg-white",
                        "bg-pink-100",
                        "bg-yellow-100",
                        "bg-orange-200",
                        "bg-green-100",
                        "bg-blue-200",
                        "bg-gray-100",
                        "bg-amber-100",
                        "bg-purple-300",
                        "bg-gray-300",
                      ].includes(item.color)
                        ? BLACK
                        : WHITE,
                    }}
                  >
                    {item.text}
                  </p>
                </div>

                {/* Save Button Mock - Updated Color */}
                <button
                  className="absolute top-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                  style={{
                    backgroundColor: "rgba(31, 31, 31, 0.5)",
                    color: WHITE,
                  }}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
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

      {/* NOTIFICATION TOAST (Nearby Alert) - Updated Color */}
      {showNotification && (
        <div
          className="fixed bottom-24 right-8 bg-white border-l-4 shadow-2xl rounded-lg p-4 max-w-sm animate-bounce z-50"
          style={{ borderColor: ORANGE }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: ORANGE }}
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
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-bold text-gray-900">You're nearby!</p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-semibold" style={{ color: ORANGE }}>
                  Nexus Properties
                </span>{" "}
                is 50m away. Check out their open house event happening now!
              </p>
              <div className="mt-2 flex">
                <Link
                  href="/pages/eventDetails"
                  className="text-xs font-medium hover:text-orange-800"
                  style={{ color: ORANGE }}
                >
                  View Event Details &rarr;
                </Link>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => setShowNotification(false)}
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
