"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { SpeechBubble } from "@/app/components/Chat";

// --- Animated Chart Component ---
const AnimatedChart = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="transition-all duration-1000 ease-out"
    >
      {children}
    </motion.div>
  );
};

export default function BusinessAnalysis() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("30days");

  // Event analysis data
  const eventPerformanceData = [
    { name: "Jan", events: 4, signups: 120, revenue: 4200 },
    { name: "Feb", events: 6, signups: 145, revenue: 5300 },
    { name: "Mar", events: 5, signups: 135, revenue: 4800 },
    { name: "Apr", events: 7, signups: 170, revenue: 6100 },
    { name: "May", events: 8, signups: 195, revenue: 7200 },
    { name: "Jun", events: 7, signups: 180, revenue: 6800 },
    { name: "Jul", events: 9, signups: 220, revenue: 8500 },
  ];

  const eventTypeData = [
    { name: "Open House", value: 35, color: "#ff5720" },
    { name: "Property Tours", value: 25, color: "#ff8a50" },
    { name: "Investment Seminars", value: 20, color: "#1453A0" },
    { name: "Networking Events", value: 15, color: "#10b981" },
    { name: "Other", value: 5, color: "#8b5cf6" },
  ];

  const audienceData = [
    { age: "18-24", count: 320 },
    { age: "25-34", count: 580 },
    { age: "35-44", count: 450 },
    { age: "45-54", count: 280 },
    { age: "55+", count: 170 },
  ];

  const conversionData = [
    { stage: "Profile Views", count: 1248, conversion: 100 },
    { stage: "Event Views", count: 892, conversion: 71.5 },
    { stage: "Signups", count: 86, conversion: 6.9 },
    { stage: "Attendees", count: 72, conversion: 5.8 },
    { stage: "Leads Generated", count: 24, conversion: 1.9 },
  ];

  const timePerformanceData = [
    { time: "Morning", events: 15, attendance: 65 },
    { time: "Afternoon", events: 22, attendance: 75 },
    { time: "Evening", events: 18, attendance: 82 },
    { time: "Weekend", events: 25, attendance: 88 },
  ];

  const geographyData = [
    { area: "Downtown", events: 12, interest: 85 },
    { area: "Suburbs", events: 18, interest: 72 },
    { area: "North Side", events: 9, interest: 64 },
    { area: "East Side", events: 7, interest: 58 },
    { area: "West Side", events: 14, interest: 79 },
  ];

  const summaryStats = [
    {
      title: "Total Profile Views",
      value: "1,248",
      change: "+12.5%",
      trend: "up",
      icon: "👁️",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Event Signups",
      value: "86",
      change: "+8.2%",
      trend: "up",
      icon: "📋",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Conversion Rate",
      value: "6.9%",
      change: "+2.3%",
      trend: "up",
      icon: "📈",
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Avg. Event Rating",
      value: "4.7",
      change: "+0.3",
      trend: "up",
      icon: "⭐",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Lead Generation",
      value: "24",
      change: "+18.4%",
      trend: "up",
      icon: "🎯",
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Revenue Impact",
      value: "$12.5k",
      change: "+15.2%",
      trend: "up",
      icon: "💰",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-orange-200/50">
          <p className="font-bold text-gray-900 mb-2 text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium text-gray-700">{entry.name}:</span>
              <span className="text-sm font-bold" style={{ color: entry.color }}>
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = (props: any) => {
    const { name, value, percent, x, y, midAngle } = props;
    const RADIAN = Math.PI / 180;
    const radius = 25;
    const cx = x + radius * Math.cos(-midAngle * RADIAN);
    const cy = y + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={cx}
        y={cy}
        fill="white"
        textAnchor={cx > x ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-bold drop-shadow-lg"
      >
        {`${name}: ${value}%`}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 md:flex"
    >
      {/* Mobile Header */}
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
        />
      )}

      {/* Sidebar */}
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
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/pages/businessDashboard"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-100 rounded-lg transition"
              >
                Overview
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/pages/businessEvents"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-100 rounded-lg transition"
              >
                My Events
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/pages/businessAnalysis"
                className="flex items-center gap-3 px-4 py-3 text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-md"
              >
                Analytics
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/pages/businessSettings"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-100 rounded-lg transition"
              >
                Settings
              </Link>
            </motion.div>
          </nav>
        </div>

        {/* Bottom Nav Items */}
        <div className="p-4 border-t border-orange-200/60">
          {/* Pro Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-xl bg-gradient-to-br from-[#ff5720] to-orange-700 p-4 text-white shadow-lg relative overflow-hidden group mb-6"
          >
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
          </motion.div>

          <div className="space-y-2">
            <Link
              href="/pages/businessProfile"
              className="block text-sm text-gray-700 hover:text-orange-600 transition"
            >
              View Public Profile
            </Link>
            <Link
              href="/"
              className="block text-sm text-gray-700 hover:text-orange-600 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <motion.header
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Business Analytics
            </h1>
            <p className="text-gray-600 mt-2">
              Track performance, insights, and growth metrics
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="pl-4 pr-10 py-3 border border-orange-200 rounded-xl bg-white/70 backdrop-blur-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full appearance-none shadow-sm"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-[#1f1f1f] to-gray-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
            >
              <span className="text-lg">📊</span>
              Export Report
            </motion.button>
          </div>
        </motion.header>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-3">
          {["overview", "events", "audience", "conversion", "geography"].map(
            (tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-orange-50 shadow-sm"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            )
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {summaryStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-orange-200/40 hover:shadow-orange-300/40 transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-md`}>
                    {stat.icon}
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    stat.trend === "up" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {stat.trend === "up" ? "↑" : "↓"} {stat.change}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-3">{stat.value}</p>
                
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Event Performance Chart */}
          <AnimatedChart delay={100}>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-orange-200/40 p-6 hover:shadow-orange-300/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Event Performance Trends
                </h3>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                  Live Data
                </span>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={eventPerformanceData}>
                  <defs>
                    <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1453A0" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1453A0" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff5720" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ff5720" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="signups"
                    stroke="#1453A0"
                    fill="url(#colorSignups)"
                    name="Signups"
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ff5720"
                    fill="url(#colorRevenue)"
                    name="Revenue ($)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AnimatedChart>

          {/* Event Types Distribution */}
          <AnimatedChart delay={200}>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-orange-200/40 p-6 hover:shadow-orange-300/40 transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Event Types Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={eventTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {eventTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value, name) => [`${value}%`, name]}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 152, 0, 0.2)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </AnimatedChart>

          {/* Audience Demographics */}
          <AnimatedChart delay={300}>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-orange-200/40 p-6 hover:shadow-orange-300/40 transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Audience Age Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={audienceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="age" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="count" 
                    fill="#ff5720" 
                    radius={[8, 8, 0, 0]}
                    className="hover:opacity-80 transition-opacity"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedChart>

          {/* Conversion Funnel */}
          <AnimatedChart delay={400}>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-orange-200/40 p-6 hover:shadow-orange-300/40 transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Conversion Funnel
              </h3>
              <div className="space-y-6">
                {conversionData.map((stage, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 10 }}
                    className="space-y-3 group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 flex items-center justify-center text-orange-600 font-bold shadow-sm">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900">{stage.stage}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{stage.count}</div>
                        <div className="text-sm text-gray-500">({stage.conversion}%)</div>
                      </div>
                    </div>
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stage.conversion}%` }}
                        transition={{ delay: index * 0.2, duration: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-[#ff5720] to-orange-400 rounded-full group-hover:opacity-90"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedChart>

          {/* Time Performance */}
          <AnimatedChart delay={500}>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-orange-200/40 p-6 hover:shadow-orange-300/40 transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Time-based Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="events"
                    fill="#1453A0"
                    name="Events"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="attendance"
                    fill="#ff8a50"
                    name="Avg. Attendance %"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedChart>

          {/* Geographic Interest */}
          <AnimatedChart delay={600}>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-orange-200/40 p-6 hover:shadow-orange-300/40 transition-all duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Geographic Interest Levels
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={geographyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="area" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="events"
                    fill="#1f1f1f"
                    name="Events Held"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="interest"
                    fill="#10b981"
                    name="Interest Score"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedChart>
        </div>

        {/* Recommendations Section */}
        <AnimatedChart delay={700}>
          <div className="bg-gradient-to-r from-white/70 to-orange-50/50 backdrop-blur-xl rounded-2xl shadow-lg border border-orange-200/40 overflow-hidden mb-10">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Intelligent Insights</h3>
                  <p className="text-gray-600">AI-powered recommendations based on your data</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <span className="text-blue-600">📈</span>
                    Top Performing Areas
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 p-4 bg-white/50 rounded-xl border border-blue-100 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
                      <div>
                        <p className="font-medium text-gray-800">Evening events have 15% higher attendance</p>
                        <p className="text-sm text-gray-500 mt-1">Consider scheduling more events in the evening</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-4 bg-white/50 rounded-xl border border-blue-100 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
                      <div>
                        <p className="font-medium text-gray-800">Open House events generate 45% of all leads</p>
                        <p className="text-sm text-gray-500 mt-1">Focus marketing efforts on Open House events</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <span className="text-orange-600">🎯</span>
                    Actionable Opportunities
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 p-4 bg-white/50 rounded-xl border border-orange-100 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold">1</div>
                      <div>
                        <p className="font-medium text-gray-800">Increase social media promotion by 30%</p>
                        <p className="text-sm text-gray-500 mt-1">Projected to increase signups by 25%</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-4 bg-white/50 rounded-xl border border-orange-100 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold">2</div>
                      <div>
                        <p className="font-medium text-gray-800">Target 25-34 age group more effectively</p>
                        <p className="text-sm text-gray-500 mt-1">Highest conversion rate among all age groups</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AnimatedChart>

        {/* Quick Stats */}
        <AnimatedChart delay={800}>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-orange-200/40 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-8">Key Performance Indicators</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Best Day", value: "Saturday", icon: "📅", color: "#ff5720" },
                { label: "Peak Time", value: "6-8 PM", icon: "⏰", color: "#10b981" },
                { label: "Avg. Cost/Lead", value: "$42", icon: "💰", color: "#3b82f6" },
                { label: "ROI", value: "3.2x", icon: "📈", color: "#8b5cf6" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-6 rounded-xl hover:bg-white/50 transition-all duration-300 cursor-pointer"
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-3xl shadow-lg"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    {item.icon}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{item.label}</p>
                  <p className="text-xl font-bold text-gray-900">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedChart>

        {/* Speech Bubble */}
        <div className="fixed bottom-6 right-6 z-50">
          <SpeechBubble
            text="Dive into your business analytics. View charts for event performance, audience demographics, and conversion funnels."
            color="#800080"
          />
        </div>
      </main>
    </motion.div>
  );
}