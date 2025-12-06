"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"; 
import { motion } from "framer-motion";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        ? "text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-md"
                        : "text-gray-700 hover:bg-orange-100"
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
        <div className="p-4 border-t border-orange-200/60 space-y-4">
          
          {/* CHANGE: Converted to a Link component. 
             Added hover effects (border color & subtle shadow) to indicate clickability.
          */}
          <Link 
            href="/pages/subscription"
            className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center gap-3 hover:bg-orange-50 hover:border-orange-200 transition group cursor-pointer"
          >
             <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[#ff5720]">
                {/* Crown Icon */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
             </div>
             <div className="flex-1">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Current Plan</p>
                <p className="text-sm font-bold text-gray-800 group-hover:text-[#ff5720] transition-colors">Pro Business</p>
             </div>
             {/* Subtle Chevron that appears on hover to hint navigation */}
             <svg className="w-4 h-4 text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
             </svg>
          </Link>

          <div className="space-y-1">
            <Link href="/pages/businessProfile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-orange-600 transition group">
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              View Public Profile
            </Link>

            <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-orange-600 transition group">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Home
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}