"use client";
import Link from "next/link";
import { useState } from "react";
import { SpeechBubble } from "@/app/components/Chat";

export default function SubscriptionPage() {
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
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-orange-50 rounded-lg font-medium"
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
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-orange-50 rounded-lg font-medium"
            >
              Settings
            </Link>
          </nav>
        </div>

        {/* Bottom Nav Items */}
        <div className="p-4 border-t border-gray-100 space-y-4 bg-white">
          {/* Subscription Ad Card (Visual Indicator that we are on this page context) */}
          <div className="rounded-xl bg-gradient-to-br from-[#ff5720] to-orange-700 p-4 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
            <h3 className="font-black text-lg italic tracking-wider mb-1">
              PRO PLAN
            </h3>
            <p className="text-xs text-orange-100 mb-3 font-medium">
              You are viewing plans
            </p>
            <ul className="text-[10px] text-orange-100 mb-0 space-y-1">
              <li className="flex items-center gap-1">✨ Upgrade anytime</li>
            </ul>
          </div>

          <div className="space-y-2">
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Subscription & Billing
            </h1>
            <p className="text-gray-500 text-lg">
              Manage your plan, payments, and billing history
            </p>
          </div>

          {/* Current Plan Section */}
          <div className="w-full max-w-2xl mx-auto mb-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 relative">
              <div className="absolute top-4 right-4 sm:right-6 bg-[#ff5720] text-white text-xs font-bold px-3 py-1 rounded-full">
                Active
              </div>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">
                Current Plan
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Professional
              </h2>
              <p className="text-4xl font-bold text-[#ff5720] mb-2">
                $50{" "}
                <span className="text-lg text-gray-500 font-medium">
                  /month
                </span>
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Next billing date: November 01, 2025
              </p>
              <button className="w-full py-3 px-4 rounded-lg border-2 border-[#ff5720] text-[#ff5720] font-semibold hover:bg-[#ff5720] hover:text-white transition duration-200">
                Cancel Subscription
              </button>
            </div>
          </div>

          {/* Available Plans Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Available Plans
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic Plan */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200 flex flex-col">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Basic</h4>
                <p className="text-4xl font-bold text-gray-900 mb-6">
                  $20{" "}
                  <span className="text-lg text-gray-500 font-medium">/mo</span>
                </p>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-gray-600 text-sm">
                    <span className="text-[#ff5720] font-bold">●</span>5
                    Business Listings
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 text-sm">
                    <span className="text-[#ff5720] font-bold">●</span>
                    Basic Analytics
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 text-sm">
                    <span className="text-[#ff5720] font-bold">●</span>
                    Email Support
                  </li>
                </ul>

                <button className="w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:border-[#ff5720] hover:text-[#ff5720] transition duration-200">
                  Select Plan
                </button>
              </div>

              {/* Professional Plan (Recommended) */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-[#ff5720] p-6 relative transform md:-translate-y-2 flex flex-col">
                <div className="absolute top-0 right-0 bg-[#ff5720] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Current Plan
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Professional
                </h4>
                <p className="text-4xl font-bold text-[#ff5720] mb-6">
                  $50{" "}
                  <span className="text-lg text-gray-500 font-medium">/mo</span>
                </p>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-gray-700 text-sm font-medium">
                    <span className="text-[#ff5720] font-bold">●</span>
                    20 Business Listings
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 text-sm font-medium">
                    <span className="text-[#ff5720] font-bold">●</span>
                    Advanced Analytics
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 text-sm font-medium">
                    <span className="text-[#ff5720] font-bold">●</span>
                    Priority Support
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 text-sm font-medium">
                    <span className="text-[#ff5720] font-bold">●</span>
                    Custom Branding
                  </li>
                </ul>

                <button className="w-full py-3 px-4 rounded-lg bg-[#ff5720] text-white font-semibold cursor-default opacity-90">
                  Select Plan
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200 flex flex-col">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Enterprise
                </h4>
                <p className="text-4xl font-bold text-gray-900 mb-6">
                  $100{" "}
                  <span className="text-lg text-gray-500 font-medium">/mo</span>
                </p>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-3 text-gray-600 text-sm">
                    <span className="text-[#ff5720] font-bold">●</span>
                    Unlimited Listings
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 text-sm">
                    <span className="text-[#ff5720] font-bold">●</span>
                    Premium Analytics
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 text-sm">
                    <span className="text-[#ff5720] font-bold">●</span>
                    24/7 Dedicated Support
                  </li>
                  <li className="flex items-start gap-3 text-gray-600 text-sm">
                    <span className="text-[#ff5720] font-bold">●</span>
                    White Label
                  </li>
                </ul>

                <button className="w-full py-3 px-4 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition duration-200">
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SPEECH BUBBLE */}
      <div className="fixed bottom-6 right-6 z-50">
        <SpeechBubble
          text="Manage your subscription plan and billing details here. Business owners will be able to subscribe to a plan as needed."
          color="#007AFF"
        />
      </div>
    </div>
  );
}
