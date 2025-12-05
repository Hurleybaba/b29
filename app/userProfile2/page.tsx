// /pages/userProfile2/index.tsx
"use client";

import React, { useEffect, useState } from "react";

type Listing = {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  area: number;
  image: string;
};

const SAMPLE_LISTINGS: Listing[] = [
  {
    id: "l1",
    title: "Sunnyvale Villa",
    location: "Beverly Hills, CA",
    price: 450000,
    beds: 4,
    area: 2500,
    image:
      "https://images.unsplash.com/photo-1560184897-6f4b5e3f7f2f?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: "l2",
    title: "Modern Townhome",
    location: "Beverly Hills, CA",
    price: 450000,
    beds: 4,
    area: 2500,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: "l3",
    title: "Sunnyvale Villa",
    location: "Beverly Hills, CA",
    price: 450000,
    beds: 4,
    area: 2500,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: "l4",
    title: "Sunnyvale Villa",
    location: "Beverly Hills, CA",
    price: 450000,
    beds: 4,
    area: 2500,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=60",
  },
];

export default function BusinessProfilePage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <TopNav />

      <main className="max-w-7xl mx-auto">
        <HeroSection />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 lg:px-0 -mt-12">
          {/* Main column */}
          <div className="lg:col-span-2">
            <BusinessHeader />

            <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
              <AboutUs />
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Featured Listings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SAMPLE_LISTINGS.map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-6 sticky top-28">
              <ContactCard />
              <OpeningHours />
            </div>
          </aside>
        </div>
      </main>

      <FloatingBubble />
      <footer className="max-w-7xl mx-auto p-6 text-sm text-gray-500">
        © {new Date().getFullYear()} B23 — Demo UI
      </footer>
    </div>
  );
}

/* Top Navigation */
function TopNav() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-orange-500 font-bold text-xl">B23</div>
            <div className="hidden sm:block text-sm text-gray-600">Search</div>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-3 py-1 rounded-full border text-sm">Search</button>
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm">ME</div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* Hero */
function HeroSection() {
  // Using the Unsplash image you chose (luxury real estate background)
  const bg =
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=70";

  return (
    <section className="relative">
      <div
        className="h-56 sm:h-72 md:h-80 lg:h-96 rounded-b-lg overflow-hidden"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay */}
        <div className="w-full h-full bg-gradient-to-r from-black/60 via-black/35 to-black/10"></div>
      </div>

      {/* Avatar card overlapping hero */}
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        <div className="flex items-end -mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-600">NP</div>
            <div>
              <h1 className="text-2xl font-bold">Nexus Properties Ltd.</h1>
              <p className="text-sm text-gray-500">Premium Real Estate & Architecture</p>
              <div className="flex items-center mt-2 gap-2">
                <div className="flex items-center gap-1 text-yellow-400">
                  {/* 5 stars */}
                  <Star /> <Star /> <Star /> <Star /> <Star />
                </div>
                <div className="text-sm text-gray-400">(48 Reviews)</div>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow">Contact Us</button>
            <button className="border rounded-lg px-4 py-2 bg-white">Website</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Business header small card area (below hero) */
function BusinessHeader() {
  return (
    <div className="mt-6 flex items-start justify-between">
      <div>
        {/* Title repeated for accessibility; main title already visible in avatar card */}
      </div>
    </div>
  );
}

/* About us */
function AboutUs() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <IconCircle /> About Us
      </h3>
      <p className="text-gray-600 leading-relaxed">
        We are a leading real estate agency specializing in luxury properties and modern architecture. With over 15 years of experience in the
        market, we help our clients find their dream homes and investment opportunities. Our team of dedicated professionals ensures a seamless
        experience from viewing to handing over the keys.
      </p>
    </div>
  );
}

/* Listing Card component */
function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative bg-gray-100 h-48">
        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-3 right-3 bg-white/95 text-sm font-semibold text-gray-800 px-3 py-1 rounded-md shadow">
          ${listing.price.toLocaleString()}
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-gray-900">{listing.title}</h4>
        <p className="text-sm text-gray-500 mt-1">{listing.location}</p>

        <div className="mt-3 flex items-center text-sm text-gray-500 gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>{listing.beds} Bed</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>{listing.area} sqft</span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* Sidebar contact card */
function ContactCard() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h4 className="font-semibold mb-3">Contact Info</h4>
      <p className="text-sm text-gray-500">123 Business Avenue, Suite 400<br />San Francisco, CA 94107</p>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M3 10l7 7 11-11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          +1 (555) 123-4567
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M3 7h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          contact@nexusproperties.com
        </div>
      </div>
    </div>
  );
}

/* Opening hours */
function OpeningHours() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h4 className="font-semibold mb-3">Opening Hours</h4>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>Mon - Fri: 9:00 AM - 6:00 PM</li>
        <li>Sat: 10:00 AM - 4:00 PM</li>
        <li>Sun: Closed</li>
      </ul>
    </div>
  );
}

/* Floating purple bubble (dismissible) */
function FloatingBubble() {
  const KEY = "business_profile_bubble_dismissed";
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const d = localStorage.getItem(KEY);
      setDismissed(d === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  function close() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div className="relative bg-purple-600 text-white px-6 py-4 rounded-3xl shadow-lg max-w-xs">
        <button onClick={close} className="absolute -top-3 -right-3 bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center shadow-sm">x</button>
        <p className="text-sm leading-snug">
          This is how your Public Business Profile looks to other users. It showcases your brand, listings, and contact info.
        </p>
        {/* small pointer */}
        <div style={{ width: 0, height: 0 }} className="absolute left-6 -bottom-3 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-600"></div>
      </div>
    </div>
  );
}

/* Small icons */
function IconCircle() {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600">
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  );
}
function Star() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.79 1.402 8.17L12 18.896 4.664 23.17l1.402-8.17L.132 9.21l8.2-1.192z" />
    </svg>
  );
}