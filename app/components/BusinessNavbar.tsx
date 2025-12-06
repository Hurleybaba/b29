"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"; // Import this hook
import { motion } from "framer-motion";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  // Define all navigation items in one array
  const navLinks = [
    { href: "/pages/businessDashboard", label: "Overview" },
    { href: "/pages/businessEvents", label: "My Events" },
    { href: "/pages/businessAnalysis", label: "Analytics" },
    { href: "/pages/businessSettings", label: "Settings" },
  ];

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden bg-white/70 backdrop-blur-lg border-b border-orange-200/50 p-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <span className="text-xl font-bold text-[#ff5720] tracking-tight">
          B23 Business
        </span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* ================= OVERLAY ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/70 backdrop-blur-xl border-r border-orange-200/60 shadow-lg flex flex-col justify-between transition-transform duration-300 transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:sticky md:top-0 md:h-screen`}
      >
        <div>
          <div className="p-6 border-b border-orange-200/60">
            <span className="text-xl font-bold text-orange-600">
              B23 Business
            </span>
          </div>

          <nav className="mt-6 px-4 space-y-2">
            {navLinks.map((nav, i) => {
              // Check if the current path matches the link href
              const isActive = pathname === nav.href;

              return (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href={nav.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive
                        ? "text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-md" // Active Styles
                        : "text-gray-700 hover:bg-orange-100" // Inactive Styles
                    }`}
                  >
                    {nav.label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>

        {/* ================= SIDEBAR BOTTOM ================= */}
        <div className="p-4 border-t border-orange-200/60">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-xl bg-gradient-to-br from-[#ff5720] to-orange-700 p-4 text-white shadow-lg relative overflow-hidden group mb-10"
          >
            <div className="absolute top-0 right-0 mt-4 -mr-4 w-20 h-20 bg-white opacity-10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>
            <h3 className="font-black text-lg italic tracking-wider mb-1">
              PRO PLAN
            </h3>
            <p className="text-xs text-orange-100 mb-3 font-medium">
              Unlock full potential
            </p>
            <ul className="text-[10px] text-orange-100 mb-4 space-y-1">
              <li>✨ Advanced Analytics</li>
              <li>🚀 Boosted Events</li>
            </ul>
            <Link
              href="/pages/subscription"
              className="block w-full py-2 bg-white text-[#ff5720] text-xs font-bold text-center rounded-lg shadow hover:bg-gray-50 transition"
            >
              Manage Subscription
            </Link>
          </motion.div>

          <Link href="/pages/businessProfile" className="block text-sm text-gray-700 hover:text-orange-600 mb-2">
            View Public Profile
          </Link>

          <Link href="/" className="block text-sm text-gray-700 hover:text-orange-600">
            ← Back to Home
          </Link>
        </div>
      </aside>
    </>
  );
}