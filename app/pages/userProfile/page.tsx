import Image from "next/image";
import Link from "next/link";

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Navbar Placeholder */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl text-[#1453A0]">MyApp</div>
          <div className="flex gap-4 items-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Home
            </Link>
            {/* Added Log Out here for easier access in demo */}
            <Link href="/" className="text-sm text-red-600 hover:text-red-800">
              Log Out
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar: Personal Info & Menu */}
          <div className="space-y-6">
            {/* User Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-sm flex items-center justify-center">
                  {/* Placeholder for user avatar */}
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <button className="absolute bottom-0 right-0 bg-[#1453A0] text-white p-1.5 rounded-full hover:bg-blue-800 transition shadow-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Alex Johnson</h2>
              <p className="text-sm text-gray-500 mb-4">Product Designer</p>
              <div className="flex justify-center gap-2">
                <span className="px-3 py-1 bg-blue-50 text-[#1453A0] text-xs font-medium rounded-full">
                  Standard User
                </span>
              </div>
            </div>

            {/* UPGRADE CALL TO ACTION - NEW */}
            <div className="bg-gradient-to-br from-[#1453A0] to-blue-700 rounded-2xl shadow-md p-6 text-white text-center">
              <h3 className="font-bold text-lg mb-2">Have a Business?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Unlock event hosting, analytics, and business tools.
              </p>
              <Link
                href="/pages/subscription"
                className="block w-full py-2 bg-white text-[#1453A0] rounded-lg font-semibold hover:bg-blue-50 transition shadow-sm"
              >
                Upgrade Now
              </Link>
            </div>

            {/* Business Dashboard Access (Visible after upgrade) */}
            <div className="mt-4 bg-white border border-[#1453A0] rounded-2xl shadow-sm p-6 text-center">
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Nexus Properties
              </h3>
              <Link
                href="/pages/businessDashboard"
                className="block w-full py-2 bg-[#1453A0] text-white rounded-lg font-semibold hover:bg-blue-800 transition shadow-sm"
              >
                Manage Business
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Account</h3>
              </div>
              <div className="p-2">
                <button className="w-full text-left px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-3 transition">
                  <svg
                    className="w-5 h-5 text-gray-400"
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
                  Support
                </button>
                <Link
                  href="/"
                  className="w-full text-left px-4 py-3 rounded-lg text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition"
                >
                  <svg
                    className="w-5 h-5 text-red-400"
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

          {/* Main Content: Tabs/Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preferences Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Email Notifications
                    </p>
                    <p className="text-xs text-gray-500">
                      Receive updates about your account activity
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1453A0]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Nearby Alerts
                    </p>
                    <p className="text-xs text-gray-500">
                      Get notified when you are near favorite businesses
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1453A0]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Saved Activity
                </h3>
                <button className="text-sm text-[#1453A0] font-medium hover:underline">
                  View All
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="group border border-gray-100 rounded-xl p-4 hover:shadow-md transition cursor-pointer"
                  >
                    <div className="h-32 bg-gray-100 rounded-lg mb-3 relative overflow-hidden">
                      {/* Placeholder Image */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-50">
                        <svg
                          className="w-8 h-8"
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
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-[#1453A0] transition">
                          Modern Architecture Design
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Saved 2 days ago
                        </p>
                      </div>
                      <button className="text-[#1453A0]">
                        <svg
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
