"use client";
import Link from "next/link";
import { useState } from "react";
import { SpeechBubble } from "@/app/components/Chat";

// --- TYPES ---
type BillingCycle = 'monthly' | 'yearly';

interface BillingHistoryItem {
  date: string;
  price: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface NavItem {
  name: string;
  href: string;
}

// --- CUSTOM TOP ICONS (Metaphors) ---
// Added JSX.Element return type for strictness
const PaperPlaneIcon = () => (
  <svg className="w-8 h-8 text-[#ff5720]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-8 h-8 text-[#ff5720]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 10.5V6.75a4.5 4.5 0 119 9v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 011.06 0l1.591 1.591a.75.75 0 11-1.06 1.061l-1.591-1.591a.75.75 0 010-1.06zm9.193 0a.75.75 0 011.06 0l1.591 1.591a.75.75 0 11-1.06 1.061l-1.591-1.591a.75.75 0 010-1.06zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CrownIcon = () => (
  <svg className="w-8 h-8 text-[#ff5720]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.7 2.805a.75.75 0 01.6 0A17.5 17.5 0 0116.5 6.7c1.3.9 2.8 1.4 4.3 1.4a.75.75 0 01.712.962l-1.8 8.1a.75.75 0 01-.733.588H5.02a.75.75 0 01-.733-.588l-1.8-8.1a.75.75 0 01.712-.962 17.5 17.5 0 004.3-1.4 17.5 17.5 0 014.2-3.9zM4.75 19a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H4.75z" />
  </svg>
);

export default function SubscriptionPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // Explicitly typing this ensures you can't accidentally set it to "month" or "Yearly" (case sensitive)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly'); 

  // Data definitions (Moved out or typed inline to prevent 'implicit any' errors in strict mode)
  const navItems: NavItem[] = [
    { name: "Overview", href: "/pages/businessDashboard" },
    { name: "My Events", href: "/pages/businessEvents" },
    { name: "Analytics", href: "/pages/businessAnalysis" },
    { name: "Settings", href: "/pages/businessSettings" },
  ];

  const billingHistory: BillingHistoryItem[] = [
    { date: 'Oct 01, 2025', price: '$50.00' },
    { date: 'Sep 01, 2025', price: '$50.00' },
    { date: 'Aug 01, 2025', price: '$50.00' }
  ];

  const faqs: FAQItem[] = [
    { q: "Can I change plans anytime?", a: "Yes, you can upgrade or downgrade immediately. Upgrades are pro-rated." },
    { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee for all new subscriptions." },
    { q: "What happens to my data if I downgrade?", a: "Your data remains safe, but some features may become locked until you upgrade again." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:flex font-sans">
      
      {/* ======================= MOBILE HEADER ======================= */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <span className="text-xl font-extrabold text-[#ff5720]">B23 Business</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 focus:outline-none hover:bg-gray-100 p-1 rounded-md transition"
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
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ======================= SIDEBAR ======================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transition-transform duration-300 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:sticky md:top-0 md:h-screen shadow-lg md:shadow-none`}
      >
        <div>
          <div className="p-6">
            <span className="text-2xl font-extrabold text-[#ff5720]">B23 Business</span>
          </div>
          <nav className="mt-6 px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-orange-50 hover:text-[#ff5720] rounded-lg font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 space-y-4 bg-white">
          {/* Fixed bg-linear to bg-gradient for Tailwind compatibility */}
          <div className="rounded-xl bg-gradient-to-br from-[#ff5720] to-orange-700 p-4 text-white shadow-lg relative overflow-hidden group hover:shadow-orange-500/20 transition-all">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="font-black text-lg italic tracking-wider mb-1">PRO PLAN</h3>
            <p className="text-xs text-orange-100 mb-3 font-medium">You are viewing plans</p>
            <ul className="text-[10px] text-orange-100 mb-0 space-y-1">
              <li className="flex items-center gap-1">✨ Upgrade anytime</li>
            </ul>
          </div>
          <div className="space-y-2">
            <Link href="/pages/businessProfile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-[#ff5720] font-medium transition">View Public Profile</Link>
            <Link href="/" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-[#ff5720] font-medium transition">&larr; Back to Home</Link>
          </div>
        </div>
      </aside>

      {/* ======================= MAIN CONTENT ======================= */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Subscription & Billing</h1>
            <p className="text-gray-500 text-lg">Manage your plan, payments, and billing history</p>
          </div>

          {/* --- MONTHLY / YEARLY TOGGLE --- */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
            <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-14 h-8 bg-gray-200 rounded-full p-1 transition-colors duration-300 focus:outline-none ring-2 ring-transparent focus:ring-orange-200"
            >
                <div className={`w-6 h-6 bg-[#ff5720] rounded-full shadow-md transform transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-sm font-bold ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Yearly <span className="text-[#ff5720] text-xs ml-1 bg-orange-100 px-2 py-0.5 rounded-full">Save 20%</span>
            </span>
          </div>

          {/* --- CURRENT PLAN SUMMARY --- */}
          <div className="w-full max-w-2xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-md border-2 border-green-500/20 p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm">ACTIVE STATUS</div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-1 font-bold">Current Plan</p>
                  <h2 className="text-3xl font-bold text-gray-900">Professional</h2>
                </div>
                <div className="mt-4 sm:mt-0 text-right">
                  <p className="text-4xl font-extrabold text-[#ff5720]">
                    ${billingCycle === 'monthly' ? '50' : '480'} <span className="text-lg text-gray-400 font-medium">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center border border-gray-100 gap-2">
                <span className="text-gray-600 text-sm font-bold">Next Billing Date</span>
                <span className="text-gray-900 font-bold">November 01, 2025</span>
              </div>

              <button className="w-full py-3 px-4 rounded-lg border border-gray-200 text-gray-500 font-bold hover:border-red-600 hover:text-red-700 hover:bg-red-50 transition duration-200">
                Cancel Subscription
              </button>
            </div>
          </div>

          {/* --- PRICING GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-20">
            
            {/* 1. BASIC (White BG) */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#ff5720]/10 transition-colors">
                <PaperPlaneIcon />
              </div>
              <h4 className="text-xl font-bold text-gray-700 mb-4 group-hover:text-[#ff5720] transition-colors">Basic</h4>
              <p className="text-4xl font-extrabold text-gray-900 mb-6">
                ${billingCycle === 'monthly' ? '20' : '190'} <span className="text-lg text-gray-400 font-medium">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </p>
              <ul className="space-y-4 mb-8 grow">
                {['5 Business Listings', 'Basic Analytics', 'Email Support'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm font-bold">
                    <span className="text-[#ff5720] text-lg leading-none">●</span> {feat}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-4 rounded-xl border border-gray-300 text-gray-600 font-bold hover:border-[#ff5720] hover:text-[#ff5720] hover:bg-orange-50 transition duration-200">
                Downgrade
              </button>
            </div>

            {/* 2. PROFESSIONAL (Orange-50 BG - Distinct) */}
            <div className="bg-orange-50 rounded-2xl shadow-md border border-[#ff5720] ring-4 ring-orange-100/50 p-6 relative flex flex-col transform md:-translate-y-2">
              <div className="absolute top-0 right-0 left-0 bg-[#ff5720] text-white text-xs font-bold py-1.5 text-center rounded-t-lg">YOUR CURRENT PLAN</div>
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-4 mt-4 shadow-sm border border-orange-100">
                <RocketIcon />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Professional</h4>
              <p className="text-4xl font-extrabold text-[#ff5720] mb-6">
                ${billingCycle === 'monthly' ? '50' : '480'} <span className="text-lg text-gray-500 font-medium">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </p>
              <ul className="space-y-4 mb-8 grow">
                {['20 Business Listings', 'Advanced Analytics', 'Priority Support', 'Custom Branding'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-800 text-sm font-bold">
                    <span className="text-[#ff5720] text-lg leading-none">●</span> {feat}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-4 rounded-xl bg-[#ff5720]/10 text-[#ff5720] font-bold cursor-not-allowed opacity-70">
                Plan Active
              </button>
            </div>

            {/* 3. ENTERPRISE (Dark BG) */}
            <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 p-6 flex flex-col hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              {/* Fixed bg-linear to bg-gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
              <div className="w-14 h-14 bg-gray-800 rounded-lg flex items-center justify-center mb-4 border border-gray-700 group-hover:border-orange-500/50 transition-colors">
                <CrownIcon />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">Enterprise</h4>
              <p className="text-4xl font-extrabold text-white mb-6">
                ${billingCycle === 'monthly' ? '100' : '960'} <span className="text-lg text-slate-500 font-medium">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </p>
              <ul className="space-y-4 mb-8 grow text-gray-300">
                {['Unlimited Listings', 'Premium Analytics', '24/7 Dedicated Support', 'White Label'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-bold">
                    <span className="text-[#ff5720] text-lg leading-none">●</span> <span className="text-white">{feat}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff5720] to-orange-600 text-white font-bold hover:shadow-lg hover:shadow-orange-500/30 hover:to-orange-500 transition duration-200">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* --- BILLING HISTORY TABLE --- */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-16">
             <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-900">Billing History</h3>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
                  <thead className="bg-gray-50 font-bold text-gray-900">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Plan</th>
                      <th className="px-6 py-4 text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {billingHistory.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium">{row.date}</td>
                        <td className="px-6 py-4 font-bold text-gray-900">{row.price}</td>
                        <td className="px-6 py-4">Professional Plan</td>
                        <td className="px-6 py-4 text-right">
                            <button className="text-[#ff5720] hover:text-orange-700 font-bold text-xs border border-orange-200 hover:bg-orange-50 px-3 py-1.5 rounded transition">Download PDF</button>
                        </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>

          {/* --- FAQ SECTION --- */}
          <div className="max-w-3xl mx-auto mb-12">
             <h3 className="text-xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
             <div className="space-y-4">
                {faqs.map((item, i) => (
                    <details key={i} className="group bg-white rounded-xl border border-gray-200 p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:border-orange-200 transition">
                        <summary className="flex items-center justify-between font-bold text-gray-900">
                            {item.q}
                            <span className="ml-5 shrink-0 transition duration-300 group-open:-rotate-180 text-[#ff5720]">
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </span>
                        </summary>
                        <p className="mt-4 leading-relaxed text-gray-600 text-sm font-medium">{item.a}</p>
                    </details>
                ))}
             </div>
          </div>

        </div>
      </main>

      {/* SPEECH BUBBLE */}
      <div className="fixed bottom-6 right-6 z-50">
        <SpeechBubble text="Manage your subscription plan and billing details here." color="#007AFF" />
      </div>
    </div>
  );
}