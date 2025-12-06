"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SpeechBubble } from "@/app/components/Chat";
import Sidebar from "@/app/components/BusinessNavbar";

// --- Utility Component: Countdown Timer ---
const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-3 text-center">
      <div className="flex flex-col">
        <span className="font-bold text-lg text-gray-800">{timeLeft.days}</span>
        <span className="text-[10px] uppercase text-gray-500 font-medium">Days</span>
      </div>
      <div className="font-bold text-gray-300">:</div>
      <div className="flex flex-col">
        <span className="font-bold text-lg text-gray-800">{timeLeft.hours}</span>
        <span className="text-[10px] uppercase text-gray-500 font-medium">Hrs</span>
      </div>
      <div className="font-bold text-gray-300">:</div>
      <div className="flex flex-col">
        <span className="font-bold text-lg text-gray-800">{timeLeft.minutes}</span>
        <span className="text-[10px] uppercase text-gray-500 font-medium">Mins</span>
      </div>
      <div className="font-bold text-gray-300">:</div>
      <div className="flex flex-col">
        <span className="font-bold text-lg text-[#ff5720]">{timeLeft.seconds}</span>
        <span className="text-[10px] uppercase text-gray-500 font-medium">Secs</span>
      </div>
    </div>
  );
};

export default function BusinessEventsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  // Mock Data - Updated with Image placeholders
  const eventsData = {
    upcoming: [
      {
        id: 1,
        title: "Luxury Villa Open House",
        date: "December 16, 2025 14:00:00", // Full date string for countdown
        displayDate: "Mar 15, 2025",
        time: "2:00 PM",
        location: "Beverly Hills, CA",
        registered: 45,
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=500",
      },
      {
        id: 2,
        title: "First Time Homebuyer Seminar",
        date: "December 10, 2025 10:00:45",
        displayDate: "Mar 22, 2025",
        time: "10:00 AM",
        location: "Online Webinar",
        registered: 12,
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=500",
      },
    ],
    ongoing: [
      {
        id: 3,
        title: "Virtual Property Tour: The Heights",
        date: "Now",
        displayDate: "Today",
        time: "Live",
        location: "Streaming Live",
        registered: 120,
        status: "ongoing",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=500",
      },
    ],
    completed: [
      {
        id: 4,
        title: "Year-End Real Estate Gala",
        date: "Dec 20, 2024",
        displayDate: "Dec 20, 2024",
        time: "7:00 PM",
        location: "Grand Hotel",
        registered: 200,
        status: "completed",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=500",
      },
      {
        id: 5,
        title: "Summer Networking Mixer",
        date: "Aug 10, 2024",
        displayDate: "Aug 10, 2024",
        time: "5:00 PM",
        location: "Rooftop Garden",
        registered: 85,
        status: "completed",
        image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=500",
      },
    ],
  };

  const allEvents = [
    ...eventsData.upcoming,
    ...eventsData.ongoing,
    ...eventsData.completed,
  ];

  // @ts-ignore
  const currentList = activeTab === "all" ? allEvents : eventsData[activeTab];

  const tabs = [
    { id: "all", label: "All Events", count: allEvents.length },
    { id: "upcoming", label: "Upcoming", count: eventsData.upcoming.length },
    { id: "ongoing", label: "Ongoing", count: eventsData.ongoing.length },
    { id: "completed", label: "Completed", count: eventsData.completed.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:flex font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <span className="text-xl font-bold text-[#ff5720]">B23 Business</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 focus:outline-none p-1 rounded-md hover:bg-gray-100"
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

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}

      <Sidebar />

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Events</h1>
              <p className="text-gray-600">Manage and track all your business events</p>
            </div>
            <Link
              href="/pages/createEvent"
              className="bg-[#ff5720] hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 w-full md:w-auto text-center flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create New Event
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Events", val: allEvents.length, icon: "📅", color: "bg-blue-50 text-blue-600" },
              { label: "Upcoming", val: eventsData.upcoming.length, icon: "⏳", color: "bg-orange-50 text-orange-600" },
              { label: "Live Now", val: eventsData.ongoing.length, icon: "🔴", color: "bg-red-50 text-red-600 animate-pulse" },
              { label: "Attendees", val: allEvents.reduce((s, e) => s + e.registered, 0), icon: "👥", color: "bg-green-50 text-green-600" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 mb-8">
          <div className="flex flex-wrap gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeTab === tab.id ? "bg-white/20" : "bg-gray-100 text-gray-600"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* New Card Design List */}
        <div className="space-y-6">
          {currentList.map((event: any) => (
            <Link href="/pages/eventDetails" key={event.id} className="block group">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-orange-200 flex flex-col md:flex-row">
                
                {/* Image Section (Left) */}
                <div className="md:w-72 h-48 md:h-auto relative shrink-0">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${event.status === 'completed' ? 'grayscale-[0.8]' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10"></div>
                  
                  {/* Status Overlay Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {event.status === "ongoing" && (
                      <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        LIVE NOW
                      </span>
                    )}
                    {event.status === "completed" && (
                      <span className="bg-gray-800/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        EVENT ENDED
                      </span>
                    )}
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {event.displayDate}
                    </span>
                  </div>
                </div>

                {/* Content Section (Right) */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-[#ff5720] uppercase tracking-wide">
                          {event.status === "ongoing" ? "Streaming Live" : event.status} Event
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#ff5720] transition-colors leading-tight">
                          {event.title}
                        </h3>
                      </div>
                      
                      {/* View Details Button (Hidden on mobile, visible on desktop hover) */}
                      <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 items-center text-[#ff5720] font-medium text-sm">
                        View Details
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer / Countdown Area */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    
                    {/* Dynamic Footer Content based on Status */}
                    {event.status === "upcoming" ? (
                      <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-400 font-medium uppercase">Starts In:</p>
                        <CountdownTimer targetDate={event.date} />
                      </div>
                    ) : event.status === "ongoing" ? (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full">
                         <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                          </span>
                          <span className="text-sm font-bold">Happening Now</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}

                    {/* Registered Count */}
                    <div className="flex items-center gap-3 ml-auto sm:ml-0">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold bg-gray-200 bg-[url('https://i.pravatar.cc/100?img=${event.id + i}')] bg-cover`}></div>
                        ))}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{event.registered}+</p>
                        <p className="text-xs text-gray-500">Registered</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </Link>
          ))}

          {currentList.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-6">
                You don't have any {activeTab} events at the moment.
              </p>
              <Link
                href="/pages/createEvent"
                className="inline-flex items-center gap-2 bg-[#ff5720] hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Create Event
              </Link>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <SpeechBubble
          text="Manage your upcoming, ongoing, and completed events here. You can also create new events."
          color="#007AFF"
        />
      </div>
    </div>
  );
}