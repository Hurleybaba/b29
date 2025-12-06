
"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/app/components/BusinessNavbar";

export default function BusinessDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 md:flex font-inter"
    >
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
      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-4 md:p-8">

        {/* HEADER */}
        <motion.header
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 text-sm">Welcome back, Nexus Properties</p>
          </div>

          <Link
            href="/pages/createEvent"
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-2.5 rounded-lg shadow-md transition"
          >
            + Create Event
          </Link>
        </motion.header>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Profile Views", value: "1,248" },
            { label: "Event Signups", value: "86" },
            { label: "Nearby Notifications Sent", value: "430" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white/70 backdrop-blur-xl p-6 rounded-xl shadow-lg border border-orange-200/40 hover:shadow-orange-300/40 transition"
            >
              <p className="text-sm text-gray-600">{item.label}</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ================= EVENT LIST ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl rounded-xl shadow-md border border-orange-200/50"
        >
          <div className="p-6 border-b border-orange-200/50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Your Upcoming Events</h3>

            <Link
              href="/pages/businessEvents"
              className="text-sm text-orange-600 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="p-6 space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group bg-white rounded-xl shadow-lg border border-orange-200/40 p-5 flex items-center gap-4 hover:shadow-2xl hover:shadow-orange-200/50 transform transition-all cursor-pointer"
            >
              {/* Image */}
              <div className="w-20 h-20 rounded-lg overflow-hidden shadow">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Luxury Open House</h4>
                <p className="text-sm text-gray-500">March 15th • 2:00 PM</p>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    86 Signups
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    430 Notifications
                  </div>
                </div>
              </div>

              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Active
              </span>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
