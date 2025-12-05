import Image from "next/image";
import Link from "next/link";
import { SpeechBubble } from "@/app/components/Chat";

export default function BusinessProfile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Nav */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#ff5720] to-orange-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-sm">B</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-[#ff5720] to-orange-500 bg-clip-text text-transparent">
              Business23
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </button>
            <Link
              href="/pages/userProfile"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-sm font-semibold">ME</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10"></div>
          <div
            className="w-full h-full bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-800"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(255, 87, 32, 0.1) 0%, rgba(124, 58, 237, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)",
            }}
          ></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:w-1/3 space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="relative">
                {/* Logo Container - Moved down from -top-16 to -top-12 */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <div className="w-36 h-36 bg-gradient-to-br from-white to-gray-50 p-2 rounded-2xl shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-br from-[#ff5720]/10 to-orange-500/20 rounded-xl flex items-center justify-center">
                      <div className="w-28 h-28 bg-gradient-to-br from-[#ff5720] to-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">
                          NP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Content - Adjusted padding-top from pt-24 to pt-28 */}
                <div className="pt-42 pb-8 px-6 text-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Nexus Properties Ltd.
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Premium Real Estate & Architecture
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      4.8 • (48 Reviews)
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <button className="flex-1 bg-gradient-to-r from-[#ff5720] to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        Contact Us
                      </span>
                    </button>
                    <button className="flex-1 bg-white border-2 border-gray-200 hover:border-[#ff5720] text-gray-700 hover:text-[#ff5720] px-6 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all">
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        Visit Website
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#ff5720]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ff5720]/10 to-orange-500/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#ff5720]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">
                      123 Business Avenue, Suite 400
                    </p>
                    <p className="text-gray-600">San Francisco, CA 94107</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ff5720]/10 to-orange-500/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#ff5720]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ff5720]/10 to-orange-500/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#ff5720]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">
                      contact@nexusproperties.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#ff5720]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Opening Hours
              </h3>
              <div className="space-y-4">
                {[
                  {
                    day: "Monday - Friday",
                    time: "9:00 AM - 6:00 PM",
                    status: "open",
                  },
                  {
                    day: "Saturday",
                    time: "10:00 AM - 4:00 PM",
                    status: "open",
                  },
                  { day: "Sunday", time: "Closed", status: "closed" },
                ].map((schedule, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    <span className="text-gray-700 font-medium">
                      {schedule.day}
                    </span>
                    <span
                      className={`font-semibold ${
                        schedule.status === "closed"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {schedule.time}
                      {schedule.status === "open" && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Open
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:w-2/3 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff5720]/10 to-orange-500/10 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#ff5720]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  About Nexus Properties
                </h2>
              </div>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  We are a leading real estate agency specializing in luxury
                  properties and modern architecture. With over 15 years of
                  experience in the market, we help our clients find their dream
                  homes and investment opportunities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#ff5720] rounded-full"></div>
                      Our Mission
                    </h4>
                    <p className="text-gray-600">
                      To revolutionize the real estate experience through
                      innovative technology and personalized service.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#ff5720] rounded-full"></div>
                      Our Values
                    </h4>
                    <p className="text-gray-600">
                      Integrity, innovation, and excellence in every transaction
                      we facilitate.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#ff5720]/5 to-orange-500/5 rounded-xl p-6 border border-[#ff5720]/10">
                  <h4 className="font-bold text-gray-900 mb-3">
                    Why Choose Us?
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "15+ years of industry experience",
                      "Award-winning customer service",
                      "Advanced virtual tour technology",
                      "Transparent pricing & no hidden fees",
                      "24/7 client support",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <svg
                          className="w-5 h-5 text-green-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Featured Listings */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ff5720]/10 to-orange-500/10 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#ff5720]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Featured Properties
                  </h2>
                </div>
                <button className="text-[#ff5720] font-semibold hover:text-orange-700 transition flex items-center gap-2">
                  View All Properties
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Sunnyvale Villa",
                    location: "Beverly Hills, CA",
                    price: "$450,000",
                    beds: 4,
                    sqft: 2500,
                    imageColor: "from-blue-500 to-cyan-400",
                  },
                  {
                    name: "Modern Loft",
                    location: "Downtown LA",
                    price: "$325,000",
                    beds: 2,
                    sqft: 1800,
                    imageColor: "from-purple-500 to-pink-500",
                  },
                  {
                    name: "Ocean View Penthouse",
                    location: "Santa Monica",
                    price: "$1,200,000",
                    beds: 3,
                    sqft: 3200,
                    imageColor: "from-emerald-500 to-teal-400",
                  },
                  {
                    name: "Mountain Retreat",
                    location: "Big Sur",
                    price: "$850,000",
                    beds: 5,
                    sqft: 4200,
                    imageColor: "from-amber-500 to-orange-400",
                  },
                ].map((property, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${property.imageColor} opacity-90`}
                      ></div>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                        <span className="font-bold text-gray-900">
                          {property.price}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white drop-shadow-md">
                          {property.name}
                        </h3>
                        <p className="text-white/90 text-sm">
                          {property.location}
                        </p>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                            </svg>
                            {property.beds} Beds
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            {property.sqft} sqft
                          </span>
                        </div>
                        <button className="text-[#ff5720] hover:text-orange-700 font-medium text-sm flex items-center gap-1">
                          View Details
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-[#ff5720] to-orange-500 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-8">Our Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: "500+", label: "Properties Sold" },
                  { value: "15+", label: "Years Experience" },
                  { value: "98%", label: "Client Satisfaction" },
                  { value: "$1.2B", label: "Total Value" },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-white/90">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SPEECH BUBBLE */}
      <div className="fixed bottom-6 right-6 z-50">
        <SpeechBubble
          text="This is how your Public Business Profile looks to other users. It showcases your brand, listings, and contact info."
          color="#800080"
        />
      </div>
    </div>
  );
}
