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
  TooltipProps as RechartsTooltipProps,
} from "recharts";

// Define TypeScript interfaces
interface EventData {
  name: string;
  events: number;
  signups: number;
  revenue: number;
}

interface EventTypeData {
  name: string;
  value: number;
  color: string;
}

interface AudienceData {
  age: string;
  count: number;
}

interface ConversionData {
  stage: string;
  count: number;
  conversion: number;
}

interface TimePerformanceData {
  time: string;
  events: number;
  attendance: number;
}

interface GeographyData {
  area: string;
  events: number;
  interest: number;
}

interface SummaryStat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
}

// Proper type for recharts tooltip payload
interface TooltipPayloadItem {
  name: string;
  value: number;
  payload: any;
  color: string;
  dataKey: string | number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

// Animation wrapper component
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
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

export default function BusinessAnalysis() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("30days");

  // Event analysis data
  const eventPerformanceData: EventData[] = [
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

  const audienceData: AudienceData[] = [
    { age: "18-24", count: 320 },
    { age: "25-34", count: 580 },
    { age: "35-44", count: 450 },
    { age: "45-54", count: 280 },
    { age: "55+", count: 170 },
  ];

  const conversionData: ConversionData[] = [
    { stage: "Profile Views", count: 1248, conversion: 100 },
    { stage: "Event Views", count: 892, conversion: 71.5 },
    { stage: "Signups", count: 86, conversion: 6.9 },
    { stage: "Attendees", count: 72, conversion: 5.8 },
    { stage: "Leads Generated", count: 24, conversion: 1.9 },
  ];

  const timePerformanceData: TimePerformanceData[] = [
    { time: "Morning", events: 15, attendance: 65 },
    { time: "Afternoon", events: 22, attendance: 75 },
    { time: "Evening", events: 18, attendance: 82 },
    { time: "Weekend", events: 25, attendance: 88 },
  ];

  const geographyData: GeographyData[] = [
    { area: "Downtown", events: 12, interest: 85 },
    { area: "Suburbs", events: 18, interest: 72 },
    { area: "North Side", events: 9, interest: 64 },
    { area: "East Side", events: 7, interest: 58 },
    { area: "West Side", events: 14, interest: 79 },
  ];

  const summaryStats: SummaryStat[] = [
    {
      title: "Total Profile Views",
      value: "1,248",
      change: "+12.5%",
      trend: "up",
      icon: "👁️",
    },
    {
      title: "Event Signups",
      value: "86",
      change: "+8.2%",
      trend: "up",
      icon: "📋",
    },
    {
      title: "Conversion Rate",
      value: "6.9%",
      change: "+2.3%",
      trend: "up",
      icon: "📈",
    },
    {
      title: "Avg. Event Rating",
      value: "4.7",
      change: "+0.3",
      trend: "up",
      icon: "⭐",
    },
    {
      title: "Lead Generation",
      value: "24",
      change: "+18.4%",
      trend: "up",
      icon: "🎯",
    },
    {
      title: "Revenue Impact",
      value: "$12.5k",
      change: "+15.2%",
      trend: "up",
      icon: "💰",
    },
  ];

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom label renderer for Pie chart
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
        className="text-xs font-medium"
      >
        {`${name}: ${value}%`}
      </text>
    );
  };

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
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transition-transform duration-300 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:sticky md:top-0 md:h-screen`}
      >
        <div>
          <div className="p-6">
            <span className="text-xl font-bold text-[#ff5720]">
              B23 Business
            </span>
          </div>
          <nav className="mt-6 px-4 space-y-2">
            <Link
              href="/pages/businessDashboard"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-orange-50 rounded-lg font-medium"
            >
              Overview
            </Link>
            <Link
              href="/pages/businessEvents"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-orange-50 rounded-lg font-medium"
            >
              My Events
            </Link>
            <Link
              href="/pages/businessAnalysis"
              className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 text-[#ff5720] rounded-lg font-medium"
            >
              Analytics
            </Link>
            <Link
              href="/pages/businessSettings"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-orange-50 rounded-lg font-medium"
            >
              Settings
            </Link>
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Business Analytics
            </h1>
            <p className="text-gray-500">
              Track performance, insights, and growth metrics
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1453A0] focus:border-transparent w-full md:w-auto"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
            <button className="px-4 py-2.5 bg-[#1f1f1f] hover:bg-gray-800 text-white rounded-lg font-medium transition flex items-center gap-2 w-full md:w-auto justify-center">
              📊 Export Report
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {["overview", "events", "audience", "conversion", "geography"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition ${
                  activeTab === tab
                    ? "bg-[#ff5720] text-white"
                    : "bg-white text-gray-700  hover:bg-orange-50"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Stats Overview - Add animation to stats too */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {summaryStats.map((stat, index) => (
            <AnimatedChart key={index} delay={index * 100}>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                    <div
                      className={`flex items-center gap-1 mt-2 text-sm ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <span>{stat.trend === "up" ? "↑" : "↓"}</span>
                      <span>{stat.change}</span>
                      <span>from last period</span>
                    </div>
                  </div>
                  <div className="text-2xl">{stat.icon}</div>
                </div>
              </div>
            </AnimatedChart>
          ))}
        </div>

        {/* Charts Grid with staggered animations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Event Performance Chart */}
          <AnimatedChart delay={100}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6">
                Event Performance Trends
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={eventPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="signups"
                    stroke="#1453A0"
                    fill="#1453A0"
                    fillOpacity={0.1}
                    name="Signups"
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ff5720"
                    fill="#ff5720"
                    fillOpacity={0.1}
                    name="Revenue ($)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AnimatedChart>

          {/* Event Types Distribution */}
          <AnimatedChart delay={200}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6">
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
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </AnimatedChart>

          {/* Audience Demographics */}
          <AnimatedChart delay={300}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6">
                Audience Age Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={audienceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="age" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <RechartsTooltip />
                  <Bar dataKey="count" fill="#ff5720" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedChart>

          {/* Conversion Funnel */}
          <AnimatedChart delay={400}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6">
                Conversion Funnel
              </h3>
              <div className="space-y-4">
                {conversionData.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        {stage.stage}
                      </span>
                      <span className="text-gray-600">
                        {stage.count} ({stage.conversion}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#ff5720] h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${stage.conversion}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedChart>

          {/* Time Performance */}
          <AnimatedChart delay={500}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6">
                Time-based Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <RechartsTooltip />
                  <Bar
                    dataKey="events"
                    fill="#1453A0"
                    name="Events"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="attendance"
                    fill="#ff8a50"
                    name="Avg. Attendance %"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedChart>

          {/* Geographic Interest */}
          <AnimatedChart delay={600}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6">
                Geographic Interest Levels
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={geographyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="area" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <RechartsTooltip />
                  <Bar
                    dataKey="events"
                    fill="#1f1f1f"
                    name="Events Held"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="interest"
                    fill="#10b981"
                    name="Interest Score"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedChart>
        </div>

        {/* Recommendations Section */}
        <AnimatedChart delay={700}>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <h3 className="font-bold text-gray-900 mb-4">
              Insights & Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-[#1453A0] mb-2">
                  📈 Top Performing
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Evening events have 15% higher attendance</li>
                  <li>• Open House events generate 45% of all leads</li>
                  <li>• Suburbs show highest growth potential</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-[#ff5720] mb-2">
                  🎯 Opportunities
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Increase social media promotion by 30%</li>
                  <li>• Target 25-34 age group more effectively</li>
                  <li>• Expand weekend event offerings</li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedChart>

        {/* Quick Stats */}
        <AnimatedChart delay={800}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#f1f1f1] p-4 rounded-lg">
              <p className="text-sm text-gray-600">Best Day</p>
              <p className="text-lg font-bold text-[#1f1f1f]">Saturday</p>
            </div>
            <div className="bg-[#f1f1f1] p-4 rounded-lg">
              <p className="text-sm text-gray-600">Peak Time</p>
              <p className="text-lg font-bold text-[#1f1f1f]">6-8 PM</p>
            </div>
            <div className="bg-[#f1f1f1] p-4 rounded-lg">
              <p className="text-sm text-gray-600">Avg. Cost/Lead</p>
              <p className="text-lg font-bold text-[#1f1f1f]">$42</p>
            </div>
            <div className="bg-[#f1f1f1] p-4 rounded-lg">
              <p className="text-sm text-gray-600">ROI</p>
              <p className="text-lg font-bold text-[#1f1f1f]">3.2x</p>
            </div>
          </div>
        </AnimatedChart>
      </main>
    </div>
  );
}
