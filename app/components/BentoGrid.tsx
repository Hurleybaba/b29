"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Helper to handle the varying sizes based on your sketch
const getCardStyle = (index: number) => {
  // Mapping indices to the specific shapes in your hand-drawn sketch
  const sketchLayouts = [
    "col-span-1 row-span-2 h-full", // 1. Left Tall Box
    "col-span-2 row-span-1 h-64",   // 2. Top Right Wide Box
    "col-span-1 row-span-2 h-full", // 3. Middle Vertical Box
    "col-span-1 row-span-1 h-64",   // 4. Right Square Box
    "col-span-1 row-span-2 h-full", // 5. Right Tall Box (below square)
    "col-span-2 row-span-1 h-48",   // 6. Bottom Wide Box
  ];

  // Fallback for items beyond the sketch count
  return sketchLayouts[index] || "col-span-1 row-span-1 h-64";
};

interface CardProps {
  id: number;
  title: string;
  subtitle: string;
  image?: string;
  index: number;
  category?: string;
}

const BentoCard = ({ id, title, subtitle, image, index, category }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative group overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 ${getCardStyle(
        index
      )}`}
    >
      {/* Background Image / Color */}
      <div className="absolute inset-0 bg-gray-200">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-orange-50 group-hover:to-orange-100 transition-colors duration-500" />
        )}
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        {category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
              {category}
            </span>
          </div>
        )}
        
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-bold mb-1 leading-tight">{title}</h3>
          <p className="text-white/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            {subtitle}
          </p>
        </div>

        {/* Arrow Icon */}
        <div className="absolute top-4 right-4 bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default function BentoGrid() {
  // Mock Data mimicking the variety in your app
  const items = [
    {
      id: 1,
      title: "Vertical Story",
      subtitle: "A tall detailed view of the new architecture project.",
      category: "Design",
      image: "https://images.unsplash.com/photo-1506097425191-7ad538b29cef?auto=format&fit=crop&w=800&q=80", // Vertical
    },
    {
      id: 2,
      title: "Featured Event",
      subtitle: "Join us for the grand opening in Downtown.",
      category: "Event",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80", // Wide
    },
    {
      id: 3,
      title: "Mobile App Design",
      subtitle: "New features coming to the B23 platform.",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80", // Vertical
    },
    {
      id: 4,
      title: "Community",
      subtitle: "Meet the team.",
      category: "Social",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", // Square
    },
    {
      id: 5,
      title: "Trends 2025",
      subtitle: "What is coming next in real estate.",
      category: "News",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", // Vertical
    },
    {
      id: 6,
      title: "Exclusive Offer",
      subtitle: "Get 50% off your first month of Pro.",
      category: "Promo",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80", // Wide
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Grid Definition:
         - Mobile: 1 column
         - Tablet: 2 columns
         - Desktop: 3 columns (matching your sketch density)
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
        {items.map((item, idx) => (
          <BentoCard
            key={item.id}
            index={idx}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}