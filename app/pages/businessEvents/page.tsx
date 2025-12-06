"use client";
import Link from "next/link";
import { useState } from "react";
import { SpeechBubble } from "@/app/components/Chat";
import Sidebar from "@/app/components/BusinessNavbar";

export default function BusinessEventsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  // Mock Data
  const eventsData = {
    upcoming: [
      {
        id: 1,
        title: "Luxury Villa Open House",
        date: "Mar 15, 2025",
        time: "2:00 PM",
        registered: 45,
        status: "upcoming",
      },
      {
        id: 2,
        title: "First Time Homebuyer Seminar",
        date: "Mar 22, 2025",
        time: "10:00 AM",
        registered: 12,
        status: "upcoming",
      },
    ],
    ongoing: [
      {
        id: 3,
        title: "Virtual Property Tour",
        date: "Now",
        time: "Live",
        registered: 120,
        status: "ongoing",
      },
    ],
    completed: [
      {
        id: 4,
        title: "Year-End Gala",
        date: "Dec 20, 2024",
        time: "7:00 PM",
        registered: 200,
        status: "completed",
      },
      {
        id: 5,
        title: "Summer Networking",
        date: "Aug 10, 2024",
        time: "5:00 PM",
        registered: 85,
        status: "completed",
      },
    ],
  };

  // Combine for 'all' view
  const allEvents = [
    ...eventsData.upcoming,
    ...eventsData.ongoing,
    ...eventsData.completed,
  ];

  // Helper to get current list
  // @ts-ignore
  const currentList = activeTab === "all" ? allEvents : eventsData[activeTab];

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
      <Sidebar />

      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">My Events</h1>
          <Link
            href="/pages/createEvent"
            className="bg-[#ff5720] hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition w-full md:w-auto text-center"
          >
            + Create New
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 overflow-x-auto">
          <div className="flex gap-8 min-w-max">
            {["all", "upcoming", "ongoing", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium capitalize transition relative ${
                  activeTab === tab
                    ? "text-[#ff5720]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff5720]"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Event List */}
        <div className="space-y-4">
          {currentList.map((event: any) => (
            <Link
              href="/pages/eventDetails"
              key={event.id}
              className="block group"
            >
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <div
                    className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center text-sm font-bold flex-shrink-0 ${
                      event.status === "ongoing"
                        ? "bg-red-50 text-red-600 animate-pulse"
                        : event.status === "completed"
                        ? "bg-gray-100 text-gray-500"
                        : "bg-orange-50 text-[#ff5720]"
                    }`}
                  >
                    {event.status === "ongoing" ? "LIVE" : "📅"}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[#ff5720] transition">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {event.date} • {event.time}
                      {activeTab === "all" && (
                        <span className="ml-2 capitalize text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                          {event.status}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Registered
                    </p>
                    <p className="font-bold text-gray-900">
                      {event.registered}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-300 group-hover:text-[#ff5720]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}

          {currentList.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">No events found.</p>
            </div>
          )}
        </div>
      </main>

      {/* SPEECH BUBBLE */}
      <div className="fixed bottom-6 right-6 z-50">
        <SpeechBubble
          text="Manage your upcoming, ongoing, and completed events here. You can also create new events."
          color="#007AFF"
        />
      </div>
    </div>
  );
}
