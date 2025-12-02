"use client";
import Link from "next/link";
import { useState } from "react";

export default function BusinessDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30">
        <span className="text-xl font-bold text-[#1453A0]">MyApp Business</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
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
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transition-transform duration-300 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:sticky md:top-0 md:h-screen`}
      >
        <div>
          <div className="p-6">
            <span className="text-xl font-bold text-[#1453A0]">
              MyApp Business
            </span>
          </div>
          <nav className="mt-6 px-4 space-y-2">
            <Link
              href="/pages/businessDashboard"
              className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-[#1453A0] rounded-lg font-medium"
            >
              Overview
            </Link>
            <Link
              href="/pages/businessEvents"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
            >
              My Events
            </Link>
            <Link
              href="/pages/businessSettings"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
            >
              Settings
            </Link>
          </nav>
        </div>

        {/* Bottom Nav Items - Fixed at bottom via flex-col justify-between */}
        <div className="p-4 border-t border-gray-100 space-y-2 bg-white">
          <Link
            href="/pages/businessProfile"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-[#1453A0] font-medium transition"
          >
            View Public Profile
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-[#1453A0] font-medium transition"
          >
            &larr; Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back, Nexus Properties</p>
          </div>
          <Link
            href="/pages/createEvent"
            className="bg-[#1453A0] hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition flex items-center gap-2 w-full md:w-auto justify-center"
          >
            <span>+</span> Create Event
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Profile Views</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">1,248</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Event Signups</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">86</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Nearby Notifications Sent</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">430</p>
          </div>
        </div>

        {/* Recent Activity/Events List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Your Upcoming Events</h3>
            <Link
              href="/pages/businessEvents"
              className="text-sm text-[#1453A0] hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="p-6">
            <div className="border border-gray-100 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">
                  Luxury Open House
                </h4>
                <p className="text-sm text-gray-500">March 15th • 2:00 PM</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
