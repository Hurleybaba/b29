// "use client";
// import Link from "next/link";
// import { useState } from "react";

// export default function BusinessDashboard() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50 md:flex">
//       {/* Mobile Header */}
//       <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30">
//         <span className="text-xl font-bold text-[#ff5720]">B23 Business</span>
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="text-gray-600 focus:outline-none"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             {isOpen ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             )}
//           </svg>
//         </button>
//       </div>

//       {/* Sidebar Overlay (Mobile) */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 md:hidden"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transition-transform duration-300 transform 
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//         md:translate-x-0 md:sticky md:top-0 md:h-screen`}
//       >
//         <div>
//           <div className="p-6">
//             <span className="text-xl font-bold text-[#ff5720]">
//               B23 Business
//             </span>
//           </div>
//           <nav className="mt-6 px-4 space-y-2">
//             <Link
//               href="/pages/businessDashboard"
//               className="flex items-center gap-3 px-4 py-3 text-[#ff5720] hover:bg-orange-50 rounded-lg font-medium"
//             >
//               Overview
//             </Link>
//             <Link
//               href="/pages/businessEvents"
//               className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-orange-50 rounded-lg font-medium"
//             >
//               My Events
//             </Link>
//             <Link
//               href="/pages/businessAnalysis"
//               className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-orange-50 rounded-lg font-medium"
//             >
//               Analytics
//             </Link>
//             <Link
//               href="/pages/businessSettings"
//               className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-orange-50 rounded-lg font-medium"
//             >
//               Settings
//             </Link>
//           </nav>
//         </div>

//         {/* Bottom Nav Items */}
//         <div className="p-4 border-t border-gray-100 space-y-2 bg-white">
//           <Link
//             href="/pages/businessProfile"
//             className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-[#ff5720] font-medium transition"
//           >
//             View Public Profile
//           </Link>
//           <Link
//             href="/"
//             className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-[#ff5720] font-medium transition"
//           >
//             &larr; Back to Home
//           </Link>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-4 md:p-8">
//         <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//             <p className="text-gray-500">Welcome back, Nexus Properties</p>
//           </div>
//           <Link
//             href="/pages/createEvent"
//             className="bg-[#ff5720] hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition flex items-center gap-2 w-full md:w-auto justify-center"
//           >
//             <span>+</span> Create Event
//           </Link>
//         </header>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <p className="text-sm text-gray-500">Total Profile Views</p>
//             <p className="text-3xl font-bold text-gray-900 mt-2">1,248</p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <p className="text-sm text-gray-500">Event Signups</p>
//             <p className="text-3xl font-bold text-gray-900 mt-2">86</p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <p className="text-sm text-gray-500">Nearby Notifications Sent</p>
//             <p className="text-3xl font-bold text-gray-900 mt-2">430</p>
//           </div>
//         </div>

//         {/* Recent Activity/Events List */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="p-6 border-b border-gray-100 flex justify-between items-center">
//             <h3 className="font-bold text-gray-900">Your Upcoming Events</h3>
//             <Link
//               href="/pages/businessEvents"
//               className="text-sm text-[#ff5720] hover:underline"
//             >
//               View All
//             </Link>
//           </div>
//           <div className="p-6">
//             <div className="border border-gray-100 rounded-lg p-4 flex items-center justify-between">
//               <div>
//                 <h4 className="font-semibold text-gray-900">
//                   Luxury Open House
//                 </h4>
//                 <p className="text-sm text-gray-500">March 15th • 2:00 PM</p>
//               </div>
//               <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
//                 Active
//               </span>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";
import Link from "next/link";
import { useState } from "react";
import { SpeechBubble } from "@/app/components/Chat";

export default function BusinessDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 md:flex font-inter">
      {/* Mobile Header */}
      <div className="md:hidden bg-white/70 backdrop-blur-lg border-b border-orange-200/50 p-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <span className="text-2xl font-extrabold text-[#ff5720] drop-shadow-sm tracking-tight">
          B23 Business
        </span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <svg
            className="w-7 h-7"
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/70 backdrop-blur-xl border-r border-orange-200/60 shadow-lg flex flex-col justify-between transition-transform duration-300 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:sticky md:top-0 md:h-screen`}
      >
        <div>
          <div className="p-6 border-b border-orange-200/60">
            <span className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text drop-shadow">
              B23 Business
            </span>
          </div>

          <nav className="mt-6 px-4 space-y-2">
            {[
              { href: "/pages/businessDashboard", label: "Overview", active: true },
              { href: "/pages/businessEvents", label: "My Events" },
              { href: "/pages/businessAnalysis", label: "Analytics" },
              { href: "/pages/businessSettings", label: "Settings" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-3 rounded-lg font-semibold transition-all 
                  ${
                    item.active
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-300"
                      : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Nav Items */}
        <div className="p-4 border-t border-gray-100 space-y-4 bg-white">
          {/* Subscription Ad Card - Updated to Orange Theme */}
          <div className="rounded-xl bg-gradient-to-br from-[#ff5720] to-orange-700 p-4 text-white shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white opacity-10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>
            <h3 className="font-black text-lg italic tracking-wider mb-1">
              PRO PLAN
            </h3>
            <p className="text-xs text-orange-100 mb-3 font-medium">
              Unlock full potential
            </p>
            <ul className="text-[10px] text-orange-100 mb-4 space-y-1">
              <li className="flex items-center gap-1">✨ Advanced Analytics</li>
              <li className="flex items-center gap-1">🚀 Boosted Events</li>
            </ul>
            <Link
              href="/pages/subscription"
              className="block w-full py-2 bg-white text-[#ff5720] text-xs font-bold text-center rounded-lg shadow hover:bg-gray-50 transition"
            >
              Manage Subscription
            </Link>
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
        <div className="p-4 border-t border-orange-200/60 bg-white/50 backdrop-blur-sm space-y-3">
          <Link
            href="/pages/businessProfile"
            className="block text-gray-700 hover:text-orange-600 transition font-medium"
          >
            View Public Profile
          </Link>
          <Link
            href="/"
            className="block text-gray-700 hover:text-orange-600 transition font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-sm">
              Dashboard
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Welcome back, Nexus Properties 👋
            </p>
          </div>

          <Link
            href="/pages/createEvent"
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white px-7 py-3 rounded-xl font-semibold shadow-lg shadow-orange-300 transition-all"
          >
            + Create Event
          </Link>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-12">
          {[
            { label: "Total Profile Views", value: "1,248" },
            { label: "Event Signups", value: "86" },
            { label: "Nearby Notifications Sent", value: "430" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-orange-200/40 hover:shadow-orange-300/40 transform hover:-translate-y-1 transition-all"
            >
              <p className="text-sm text-gray-600">{item.label}</p>
              <p className="text-4xl font-extrabold text-gray-900 mt-3 tracking-tight">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-md border border-orange-200/50 overflow-hidden">
          <div className="p-6 border-b border-orange-200/50 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">
              Your Upcoming Events
            </h3>
            <Link
              href="/pages/businessEvents"
              className="text-sm font-semibold text-orange-600 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="p-6 space-y-5">
            {/* CRAZY STYLED EVENT CARD */}
            <div className="group bg-white rounded-2xl shadow-lg border border-orange-200/40 p-6 flex items-center gap-5 hover:shadow-2xl hover:shadow-orange-300/40 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              {/* Thumbnail */}
              <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg">
                  Luxury Open House
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  March 15th • 2:00 PM
                </p>

                <div className="flex items-center gap-5 mt-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span>86 Signups</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span>430 Notifications</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold shadow-sm">
                Active
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* SPEECH BUBBLE */}
      <div className="fixed bottom-6 right-6 z-50">
        <SpeechBubble
          text="Welcome to the Business Dashboard. Here you can see an overview of your stats, manage events, and access settings."
          color="#800080"
        />
      </div>
    </div>
  );
}
