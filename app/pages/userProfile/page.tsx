"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SpeechBubble } from "@/app/components/Chat";

export default function UserProfile() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  const handleUpgradeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowUpgradeModal(true);
  };

  const handleModalConfirm = () => {
    setShowUpgradeModal(false);
    router.push("/pages/businessDashboard");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white pb-12 relative">
      {/* Premium Header/Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-bold text-2xl bg-linear-to-b from-[#ff5720] to-orange-600 bg-clip-text text-transparent">
            B23
          </div>
          <div className="flex gap-6 items-center">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-[#ff5720] transition"
            >
              Home
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#ff5720] flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Hero Profile Section */}
        <div className="mb-12">
          {/* Banner Background */}
          <div className="h-32 bg-linear-to-r from-[#ff5720] via-orange-500 to-orange-400 rounded-3xl shadow-lg mb-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2220%22 cy=%2220%22 r=%2215%22/><circle cx=%2280%22 cy=%2280%22 r=%2220%22/></svg>')] bg-repeat"></div>
            </div>
          </div>

          {/* Profile Card - Overlapping Banner */}
          <div className="relative -mt-16 px-6 mb-8">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-linear-to-br from-[#ff5720] to-orange-600 overflow-hidden border-4 border-white shadow-lg flex items-center justify-center">
                    <svg
                      className="w-20 h-20 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <button className="absolute bottom-2 right-2 bg-white text-[#ff5720] p-2.5 rounded-full hover:bg-gray-100 transition shadow-lg border border-gray-200 cursor-pointer">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </button>
                </div>

                {/* Profile Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-4xl font-bold text-gray-900">
                      Alex Johnson
                    </h1>
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-linear-to-r from-[#ff5720] to-orange-600">
                      ⭐ Standard User
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 mt-2">Product Designer</p>
                  <p className="text-sm text-gray-500 mt-3">
                    📍 San Francisco, CA • Joined 2 years ago
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-4 flex-wrap">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#ff5720]">24</div>
                    <p className="text-xs text-gray-500 mt-1">Events Attended</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#ff5720]">12</div>
                    <p className="text-xs text-gray-500 mt-1">Saved Items</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#ff5720]">8</div>
                    <p className="text-xs text-gray-500 mt-1">Following</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-8 border-t border-gray-100">
                <button
                  onClick={handleUpgradeClick}
                  className="bg-linear-to-r from-[#ff5720] to-orange-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition transform hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  🚀 Upgrade to Business
                </button>
                <button className="border-2 border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:border-[#ff5720] hover:text-[#ff5720] transition cursor-pointer">
                  Edit Profile
                </button>
                <button className="border-2 border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:border-[#ff5720] hover:text-[#ff5720] transition cursor-pointer">
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-1 mb-8 border-b border-gray-200 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "preferences", label: "Preferences", icon: "⚙️" },
            { id: "saved", label: "Saved Items", icon: "💾" },
            { id: "activity", label: "Activity", icon: "📅" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium text-sm transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "text-[#ff5720] border-b-2 border-[#ff5720]"
                  : "text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Business Card */}
            <div className="bg-linear-to-br from-[#ff5720] to-orange-600 rounded-2xl shadow-lg p-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 opacity-10 text-6xl">🏢</div>
              <h3 className="font-bold text-lg mb-2 relative z-10">
                Have a Business?
              </h3>
              <p className="text-orange-100 text-sm mb-6 relative z-10">
                Unlock event hosting, analytics, and premium tools.
              </p>
              <button
                onClick={handleUpgradeClick}
                className="w-full py-3 bg-white text-[#ff5720] rounded-xl font-bold hover:bg-orange-50 transition transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Get Started
              </button>
            </div>

            {/* Business Dashboard (if upgraded) */}
            <div className="bg-white rounded-2xl shadow-md border-2 border-[#ff5720] p-6">
              <h3 className="font-bold text-[#ff5720] text-lg mb-3">
                ✓ Nexus Properties
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Your business account is active and ready
              </p>
              <Link
                href="/pages/businessDashboard"
                className="block w-full px-4 py-3 bg-linear-to-r from-[#ff5720] to-orange-600 text-white rounded-xl font-bold hover:shadow-lg transition transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Manage Business
              </Link>
            </div>

            {/* Settings Menu */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-900">Account Settings</h3>
              </div>
              <div className="divide-y divide-gray-100">
                <button className="w-full text-left px-6 py-4 text-gray-700 hover:bg-orange-50 hover:text-[#ff5720] flex items-center gap-3 transition font-medium cursor-pointer">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                  Support & Help
                </button>
                <button className="w-full text-left px-6 py-4 text-gray-700 hover:bg-orange-50 hover:text-[#ff5720] flex items-center gap-3 transition font-medium cursor-pointer">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Privacy Policy
                </button>
                <Link
                  href="/"
                  className="w-full text-left px-6 py-4 text-red-600 hover:bg-red-50 flex items-center gap-3 transition font-medium"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  Log Out
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center hover:shadow-lg transition">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎫</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">24</div>
                    <p className="text-sm text-gray-600 mt-1">Events Attended</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center hover:shadow-lg transition">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💾</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">12</div>
                    <p className="text-sm text-gray-600 mt-1">Saved Items</p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center hover:shadow-lg transition">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">8</div>
                    <p className="text-sm text-gray-600 mt-1">Following</p>
                  </div>
                </div>

                {/* Recent Activity Card */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    📅 Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {[
                      { action: "Attended Tech Summit 2024", date: "2 days ago" },
                      {
                        action: "Saved Design Workshop",
                        date: "1 week ago",
                      },
                      { action: "Followed Creative Studio", date: "2 weeks ago" },
                      {
                        action: "Joined Networking Event",
                        date: "3 weeks ago",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                      >
                        <p className="text-gray-700 font-medium">{item.action}</p>
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {item.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  ⚙️ Notification Preferences
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      title: "Email Notifications",
                      desc: "Get updates about events and activities",
                    },
                    {
                      title: "Location Alerts",
                      desc: "Notifications when nearby events match your interests",
                    },
                    {
                      title: "New Follower Alerts",
                      desc: "Be notified when someone follows your profile",
                    },
                    {
                      title: "Event Reminders",
                      desc: "Reminders for events you've saved",
                    },
                  ].map((pref, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {pref.title}
                        </p>
                        <p className="text-sm text-gray-500">{pref.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-12 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#ff5720]"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full bg-linear-to-r from-[#ff5720] to-orange-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition transform hover:scale-[1.02] active:scale-95 cursor-pointer">
                  Save Preferences
                </button>
              </div>
            )}

            {/* Saved Items Tab */}
            {activeTab === "saved" && (
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  💾 Saved Items
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
                    >
                      <div className="h-40 bg-linear-to-br from-orange-200 to-orange-300 rounded-t-xl relative overflow-hidden flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-orange-500 opacity-30"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-[#ff5720] transition">
                              Modern Architecture Design
                            </h4>
                            <p className="text-xs text-gray-500 mt-2">
                              Saved 2 days ago
                            </p>
                          </div>
                          <button className="text-[#ff5720] hover:scale-110 transition cursor-pointer">
                            <svg
                              className="w-6 h-6 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  📅 Activity Timeline
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: "🎫",
                      title: "Attended Tech Summit 2024",
                      date: "Dec 2, 2024",
                    },
                    {
                      icon: "💾",
                      title: "Saved Design Workshop",
                      date: "Nov 25, 2024",
                    },
                    {
                      icon: "👥",
                      title: "Followed Creative Studio",
                      date: "Nov 18, 2024",
                    },
                    {
                      icon: "🎪",
                      title: "Joined Networking Event",
                      date: "Nov 11, 2024",
                    },
                  ].map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0 text-xl">
                        {activity.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center transform transition-all scale-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-500 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Account Upgraded!
            </h2>
            <p className="text-gray-600 mb-8">
              Welcome to Business. You now have access to all professional
              features.
            </p>
            <button
              onClick={handleModalConfirm}
              className="w-full bg-[#ff5720] hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-xl transition transform hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              OK, Let's Go!
            </button>
          </div>
        </div>
      )}

      {/* SPEECH BUBBLE */}
      <div className="fixed bottom-6 right-1 z-5000">
        <SpeechBubble
          text="This is the User Profile page where users can manage their personal info, view saved activity, and upgrade to a business account."
          color="#007AFF"
        />
      </div>
    </div>
  );
}
