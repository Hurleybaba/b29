"use client";
import Link from "next/link";
import { useState } from "react";

export default function FeedPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [showLocationFilterMsg, setShowLocationFilterMsg] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
          {/* HAMBURGER MENU (Mobile Only) */}
          <button
            className="md:hidden text-gray-600 focus:outline-none p-1"
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

          <div className="font-bold text-xl text-[#1453A0]">MyApp</div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search businesses, events, or people..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#1453A0] focus:ring-1 focus:ring-[#1453A0] outline-none text-sm"
              />
              <svg
                className="w-4 h-4 text-gray-400 absolute left-3 top-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>

          <Link
            href="/pages/userProfile"
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[#1453A0] font-bold text-xs hover:ring-2 hover:ring-[#1453A0]"
          >
            ME
          </Link>
        </div>

        {/* Mobile Search Bar (Visible only on small screens below main nav) */}
        <div className="sm:hidden mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 focus:bg-white focus:border-[#1453A0] focus:ring-1 focus:ring-[#1453A0] outline-none text-sm"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-100 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Sidebar Content */}
          <div className="relative bg-white w-3/4 max-w-xs h-full shadow-2xl p-6 flex flex-col gap-6 overflow-y-auto transform transition-transform">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-[#1453A0]">Menu</span>
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

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">Shortcuts</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2 hover:text-[#1453A0] cursor-pointer">
                  <span>📍</span> Events Near Me
                </li>
                <li className="flex items-center gap-2 hover:text-[#1453A0] cursor-pointer">
                  <span>🔖</span> Saved Posts
                </li>
                <li className="flex items-center gap-2 hover:text-[#1453A0] cursor-pointer">
                  <span>⭐</span> My Subscriptions
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

      <div className="max-w-5xl mx-auto px-4 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 pb-20 relative">
        {/* Left Sidebar - DESKTOP (Sticky) */}
        <div className="hidden md:block space-y-4 sticky top-24 h-fit">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">Shortcuts</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:bg-blue-50 hover:text-[#1453A0] p-2 rounded cursor-pointer transition">
                Events Near Me
              </li>
              <li className="hover:bg-blue-50 hover:text-[#1453A0] p-2 rounded cursor-pointer transition">
                Saved Posts
              </li>
              <li className="hover:bg-blue-50 hover:text-[#1453A0] p-2 rounded cursor-pointer transition">
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

        {/* Main Feed */}
        <div className="md:col-span-2 space-y-6">
          {/* Create Post Input */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
              <Link
                href="/pages/createPost"
                className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-full py-2.5 px-4 text-left text-sm cursor-text transition"
              >
                What's on your mind, Alex?
              </Link>
            </div>
            <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
              <button className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:bg-gray-50 px-2 py-1 rounded">
                <span className="text-[#1453A0]">📷</span> Photo
              </button>
              <button className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:bg-gray-50 px-2 py-1 rounded">
                <span className="text-[#1453A0]">📅</span> Event
              </button>
            </div>
          </div>

          {/* Post 1 (Business Event) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#1453A0] flex items-center justify-center text-white font-bold">
                NP
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">
                  Nexus Properties Ltd.
                </h4>
                <p className="text-xs text-gray-500">2 hours ago • Sponsored</p>
              </div>
            </div>
            <p className="text-gray-800 text-sm mb-3">
              We are hosting an exclusive open house this weekend for our newest
              luxury villa. Come join us for drinks and a tour! 🥂
            </p>
            <div className="bg-gray-100 h-48 rounded-lg mb-3 flex items-center justify-center text-gray-400">
              [Event Image Placeholder]
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button className="text-sm text-gray-500 hover:text-[#1453A0]">
                Like
              </button>
              <Link
                href="/pages/eventDetails"
                className="text-sm text-[#1453A0] font-medium hover:underline"
              >
                View Event Details
              </Link>
            </div>
          </div>

          {/* Post 2 (User Post - Text Only) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Jane Doe</h4>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <p className="text-gray-800 text-sm">
              Just visited the new coffee shop downtown. The latte art is
              amazing! ☕️ Anyone want to grab a cup later?
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
              <button className="text-sm text-gray-500 hover:text-[#1453A0]">
                Like
              </button>
              <button className="text-sm text-gray-500 hover:text-[#1453A0]">
                Comment
              </button>
            </div>
          </div>

          {/* Post 3 (Another Business Post - Image) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                BB
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">
                  Burger Bistro
                </h4>
                <p className="text-xs text-gray-500">8 hours ago</p>
              </div>
            </div>
            <p className="text-gray-800 text-sm mb-3">
              🍔 Buy 1 Get 1 Free on all gourmet burgers today only! Show this
              post to our cashier.
            </p>
            <div className="bg-orange-100 h-40 rounded-lg mb-3 flex items-center justify-center text-orange-400">
              [Burger Image]
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button className="text-sm text-gray-500 hover:text-[#1453A0]">
                Like
              </button>
              <button className="text-sm text-gray-500 hover:text-[#1453A0]">
                View Menu
              </button>
            </div>
          </div>

          {/* Post 4 (User Post - Review) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                MK
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Mike K.</h4>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <p className="text-gray-800 text-sm">
              Had a great workout session at Gold's Gym. The new equipment is
              top-notch. 💪 #Fitness #Goals
            </p>
          </div>
        </div>
      </div>

      {/* LOCATION FLOATING ACTION BUTTON */}
      <div className="fixed bottom-8 right-8 z-30 flex flex-col items-end gap-2">
        {/* Filter Message Toast */}
        {showLocationFilterMsg && (
          <div className="bg-black/80 text-white text-sm py-2 px-4 rounded-lg shadow-lg mb-2 animate-fade-in-up">
            This will filter feeds to 5km-10km around you.
          </div>
        )}

        {/* The Button */}
        <button
          onClick={toggleLocationFilter}
          className="bg-[#1453A0] hover:bg-blue-800 text-white p-4 rounded-full shadow-xl transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
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

      {/* NOTIFICATION TOAST (Nearby Alert) */}
      {showNotification && (
        <div className="fixed bottom-24 right-8 bg-white border-l-4 border-[#1453A0] shadow-2xl rounded-lg p-4 max-w-sm animate-bounce z-50">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-[#1453A0]"
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
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-bold text-gray-900">You're nearby!</p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-semibold text-[#1453A0]">
                  Nexus Properties
                </span>{" "}
                is 50m away. Check out their open house event happening now!
              </p>
              <div className="mt-2 flex">
                <Link
                  href="/pages/eventDetails"
                  className="text-xs font-medium text-[#1453A0] hover:text-blue-800"
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
