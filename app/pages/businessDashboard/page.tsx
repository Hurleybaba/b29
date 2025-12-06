"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/app/components/BusinessNavbar";

// --- MOCK DATA FOR NEW UI ---
const stats = [
  { 
    label: "Total Revenue", 
    value: "₦2,450,000", 
    trend: "+12.5%", 
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )
  },
  { 
    label: "Event Signups", 
    value: "86", 
    trend: "+5.2%", 
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
    )
  },
  { 
    label: "Profile Views", 
    value: "1,248", 
    trend: "-2.1%", 
    positive: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    )
  }
];

const recentSales = [
  { user: "Sarah J.", event: "Luxury Open House", amount: "₦5,000", time: "2m ago", img: "32" },
  { user: "Mike T.", event: "Tech Meetup", amount: "₦2,500", time: "15m ago", img: "12" },
  { user: "Amara K.", event: "Luxury Open House", amount: "₦5,000", time: "32m ago", img: "45" },
];

const activityLog = [
  { text: "Campaign 'Summer Vibes' ended", time: "2h ago", type: "alert" },
  { text: "Your profile was viewed by Nexus Corp", time: "5h ago", type: "view" },
  { text: "Wallet withdrawal processed", time: "1d ago", type: "money" },
];

// --- CUSTOM CHART COMPONENT ---
const ActivityChart = () => (
  <div className="relative h-48 w-full mt-4 overflow-hidden">
    <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-300">
       <div className="border-b border-dashed border-gray-100 w-full h-0"></div>
       <div className="border-b border-dashed border-gray-100 w-full h-0"></div>
       <div className="border-b border-dashed border-gray-100 w-full h-0"></div>
       <div className="border-b border-dashed border-gray-100 w-full h-0"></div>
    </div>
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff5720" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ff5720" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,100 Q150,50 300,80 T600,40 T900,90 T1200,30 V150 H0 Z" fill="url(#chartGradient)" />
      <path d="M0,100 Q150,50 300,80 T600,40 T900,90 T1200,30" fill="none" stroke="#ff5720" strokeWidth="3" strokeLinecap="round" />
    </svg>
    <div className="absolute top-[20%] left-[50%] w-3 h-3 bg-[#ff5720] rounded-full border-2 border-white shadow-md"></div>
    <div className="absolute top-[8%] left-[46%] bg-gray-900 text-white text-[10px] py-1 px-2 rounded-md">
       2,403 Views
    </div>
  </div>
);

export default function BusinessDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FB] md:flex font-inter text-slate-800">
      
      {/* ================= MOBILE HEADER (Restored) ================= */}
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

      {/* ================= OVERLAY (Restored) ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ================= SIDEBAR (Restored) ================= */}
      <Sidebar />

      {/* ================= MAIN CONTENT (Upgraded UI) ================= */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 text-sm">Welcome back, Nexus Properties 👋</p>
            </motion.div>
            
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3">
               <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition shadow-sm relative">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                 <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
               </button>
               <Link href="/pages/createEvent" className="px-5 py-2.5 bg-[#ff5720] hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-200 transition flex items-center gap-2">
                 <span>+</span> Create Event
               </Link>
            </motion.div>
          </div>

          {/* 1. STATS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-lg ${i === 0 ? 'bg-orange-50 text-orange-500' : 'bg-gray-50 text-gray-500'} group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stat.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-1">{stat.label}</h3>
                <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* 2. MAIN GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
            
            {/* LEFT COLUMN (Wider) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* NEW: ANALYTICS CHART CARD */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                 <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">Profile Performance</h3>
                    <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-gray-600 outline-none">
                       <option>This Week</option>
                       <option>This Month</option>
                    </select>
                 </div>
                 <p className="text-sm text-gray-500">You gained <span className="text-green-600 font-bold">+124</span> new followers</p>
                 <ActivityChart />
              </div>

              {/* FEATURED EVENT CARD (Hero) */}
              <div className="relative w-full h-56 rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
                 <img 
                   src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" 
                   alt="Luxury House" 
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="px-2 py-0.5 bg-[#ff5720] text-white text-[10px] font-bold uppercase rounded shadow-lg">Active</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">Luxury Open House</h3>
                    <p className="text-gray-300 text-sm mb-4">Lagos Island • March 15th</p>
                    
                    <button className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold rounded-lg hover:bg-white hover:text-black transition">
                       View Details
                    </button>
                 </div>
              </div>

              {/* NEW: RECENT TICKET SALES TABLE */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                 <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">Recent Sales</h3>
                    <button className="text-xs text-[#ff5720] font-bold hover:underline">View All</button>
                 </div>
                 <div className="p-0">
                    {recentSales.map((sale, i) => (
                       <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition border-b border-gray-50 last:border-0">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                                <img src={`https://i.pravatar.cc/150?img=${sale.img}`} alt="User" />
                             </div>
                             <div>
                                <p className="text-sm font-bold text-gray-900">{sale.user}</p>
                                <p className="text-xs text-gray-400">{sale.event}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-sm font-bold text-green-600">{sale.amount}</p>
                             <p className="text-xs text-gray-400">{sale.time}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* RIGHT COLUMN (Narrower) */}
            <div className="space-y-8">
               
               {/* QUICK ACTIONS GRID */}
               <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                     {[
                       { label: "Promote", icon: "🚀", color: "bg-blue-50 text-blue-600" },
                       { label: "Edit", icon: "✏️", color: "bg-orange-50 text-orange-600" },
                       { label: "Scanner", icon: "📷", color: "bg-purple-50 text-purple-600" },
                       { label: "Share", icon: "🔗", color: "bg-gray-50 text-gray-600" },
                     ].map((action, i) => (
                        <button key={i} className={`flex flex-col items-center justify-center p-4 rounded-2xl transition hover:opacity-80 ${action.color}`}>
                           <span className="text-xl mb-1">{action.icon}</span>
                           <span className="text-[10px] font-bold uppercase">{action.label}</span>
                        </button>
                     ))}
                  </div>
               </div>

               {/* DEMOGRAPHICS */}
               <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm">Audience</h3>
                  <div className="space-y-4">
                     <div>
                        <div className="flex justify-between text-xs mb-1">
                           <span className="text-gray-500 font-medium">Lagos</span>
                           <span className="text-gray-900 font-bold">62%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full bg-[#ff5720] w-[62%] rounded-full"></div>
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-xs mb-1">
                           <span className="text-gray-500 font-medium">Abuja</span>
                           <span className="text-gray-900 font-bold">24%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-[24%] rounded-full"></div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* RECENT ACTIVITY LOG */}
               <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm">Activity Log</h3>
                  <div className="space-y-6 relative pl-2">
                     <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-100"></div>
                     {activityLog.map((log, i) => (
                        <div key={i} className="relative pl-6">
                           <div className={`absolute -left-[5px] top-1.5 w-3 h-3 rounded-full border-2 border-white ${log.type === 'money' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                           <p className="text-xs font-bold text-gray-800">{log.text}</p>
                           <p className="text-[10px] text-gray-400 mt-0.5">{log.time}</p>
                        </div>
                     ))}
                  </div>
               </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}