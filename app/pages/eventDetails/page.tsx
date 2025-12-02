"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function EventDetailsPage() {
  // Mock event date: 3 days from now
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 12, minutes: 45, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Event Banner with Countdown Overlay */}
        <div className="h-80 bg-gray-900 relative group">
          <div className="absolute top-4 left-4 z-10">
            <Link href="/pages/dashboard" className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm transition">
              &larr; Back to Feed
            </Link>
          </div>
          
          {/* Background Image Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90"></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-600 opacity-20 text-4xl font-bold">
            [Event Banner Image]
          </div>

          {/* COUNTDOWN TIMER */}
          <div className="absolute bottom-0 w-full p-6 flex flex-col sm:flex-row justify-between items-end sm:items-center text-white">
            <div>
               <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Luxury Villa Open House</h1>
               <p className="text-gray-300 font-medium text-lg">Hosted by Nexus Properties Ltd.</p>
            </div>
            
            <div className="mt-6 sm:mt-0 flex gap-4 text-center bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <div>
                <span className="block text-2xl font-bold">{timeLeft.days}</span>
                <span className="text-xs text-gray-300 uppercase tracking-wide">Days</span>
              </div>
              <div className="text-2xl font-light">:</div>
              <div>
                <span className="block text-2xl font-bold">{timeLeft.hours}</span>
                <span className="text-xs text-gray-300 uppercase tracking-wide">Hrs</span>
              </div>
              <div className="text-2xl font-light">:</div>
              <div>
                <span className="block text-2xl font-bold">{timeLeft.minutes}</span>
                <span className="text-xs text-gray-300 uppercase tracking-wide">Mins</span>
              </div>
              <div className="text-2xl font-light">:</div>
              <div>
                <span className="block text-2xl font-bold text-[#4aa3ff]">{timeLeft.seconds}</span>
                <span className="text-xs text-gray-300 uppercase tracking-wide">Secs</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-gray-100 pb-8 mb-8">
            <div className="flex gap-4 items-center">
               <div className="bg-blue-50 text-[#1453A0] p-3 rounded-lg text-center min-w-[80px]">
                 <span className="block text-xs font-bold uppercase">Mar</span>
                 <span className="block text-2xl font-bold">15</span>
               </div>
               <div>
                 <p className="text-gray-900 font-semibold text-lg">Saturday, 2:00 PM - 6:00 PM</p>
                 <p className="text-gray-500 text-sm">Add to Calendar</p>
               </div>
            </div>
            
            <div className="flex w-full md:w-auto gap-3">
              <button className="flex-1 md:flex-none bg-[#1453A0] hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-bold shadow-sm transition">
                Register for Free
              </button>
              <button className="flex-1 md:flex-none border border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition">
                Share
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">About this event</h3>
                <p className="text-gray-600 leading-relaxed space-y-4">
                  Join us for an exclusive look at our newest property in Beverly Hills. This modern architectural masterpiece features 4 bedrooms, 5 baths, and stunning panoramic views. We will be serving light refreshments and champagne.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  This is a great opportunity to network with other real estate enthusiasts and potentially find your dream home.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
                <div className="flex gap-2 flex-wrap">
                  {['Real Estate', 'Luxury', 'Open House', 'Networking', 'Design'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="md:col-span-1 space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Location</h3>
                <p className="text-sm text-gray-600 mb-4 font-medium">123 Palm Drive<br/>Beverly Hills, CA 90210</p>
                <div className="h-40 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-xs mb-4">
                  [Map View]
                </div>
                <button className="w-full text-[#1453A0] text-sm font-semibold hover:underline">Get Directions</button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                <h3 className="font-bold text-gray-900 mb-2">Organizer</h3>
                <div className="w-16 h-16 bg-white rounded-full mx-auto mb-3 shadow-sm flex items-center justify-center font-bold text-[#1453A0] text-xl">NP</div>
                <p className="font-medium text-gray-900">Nexus Properties</p>
                <Link href="/pages/businessProfile" className="text-sm text-[#1453A0] hover:underline mt-2 inline-block">View Profile</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}