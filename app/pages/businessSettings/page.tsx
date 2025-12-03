"use client";
import Link from "next/link";
import { useState } from "react";

export default function BusinessSettingsPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30">
        <span className="text-xl font-bold text-[#ff5720]">B23 Business</span>
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
            <span className="text-xl font-bold text-[#ff5720]">
              B23 Business
            </span>
          </div>
          <nav className="mt-6 px-4 space-y-2">
            <Link
              href="/pages/businessDashboard"
              className="flex items-center gap-3 px-4 py-3  hover:bg-orange-50 rounded-lg text-gray-600 font-medium"
            >
              Overview
            </Link>
            <Link
              href="/pages/businessEvents"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-orange-50 rounded-lg font-medium"
            >
              My Events
            </Link>
            <Link
              href="/pages/businessAnalysis"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-orange-50 rounded-lg font-medium"
            >
              Analytics
            </Link>
            <Link
              href="/pages/businessSettings"
              className="flex items-center gap-3 px-4 py-3  text-[#ff5720] hover:bg-orange-50 rounded-lg font-medium"
            >
              Settings
            </Link>
          </nav>
        </div>

        {/* Bottom Nav Items */}
        <div className="p-4 border-t border-gray-100 space-y-2 bg-white">
          <Link
            href="/pages/businessProfile"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-[#ff5720] font-medium transition"
          >
            View Public Profile
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-[#ff5720] font-medium transition"
          >
            &larr; Back to Home
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Business Settings
          </h1>

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-6">
            {/* Branding Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Branding
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#ff5720] hover:text-[#ff5720] transition shrink-0">
                  Upload
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Nexus Properties Ltd."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5720] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="contact@nexusproperties.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5720] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5720] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                defaultValue="123 Business Avenue, Suite 400"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5720] outline-none mb-2"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  defaultValue="San Francisco"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5720] outline-none"
                />
                <input
                  type="text"
                  defaultValue="94107"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5720] outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About Us
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5720] outline-none resize-none"
                defaultValue="We are a leading real estate agency specializing in luxury properties..."
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 border-t border-gray-100">
              <button className="bg-[#ff5720] hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-sm w-full sm:w-auto">
                Save Changes
              </button>
              <button className="text-gray-500 hover:text-gray-700 px-4 py-2 font-medium w-full sm:w-auto">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
