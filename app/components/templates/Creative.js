// b29/app/components/templates/Creative.js
import React from 'react';

export default function Creative({ data }) {
  const { 
    name = "Creative Studio", 
    description = "We break boundaries and build experiences.", 
    createdAt = "2024", 
    tags = ["Design", "Art", "Future"], 
    interest = "Digital Art", 
    location = "Metaverse",
    contact = "hello@create.xyz"
  } = data || {};

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative selection:bg-purple-500 selection:text-white">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-600 rounded-full blur-[120px] opacity-20 translate-y-1/3 -translate-x-1/3"></div>

      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col min-h-screen">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-16">
          <div className="text-xl font-black tracking-tighter">B23<span className="text-purple-500">.</span></div>
          <div className="text-sm font-bold bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {location} • Since {createdAt}
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="relative">
            <h2 className="text-sm md:text-base text-pink-500 font-bold tracking-[0.2em] uppercase mb-4 ml-1">
              {interest}
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              {name}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div className="lg:col-span-7">
              <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed border-l-4 border-purple-500 pl-6">
                {description}
              </p>
            </div>
            
            {/* Tags Cloud */}
            <div className="lg:col-span-5 flex flex-wrap gap-3 content-start">
              {tags.map((tag, i) => (
                <span 
                  key={i} 
                  className={`px-4 py-2 rounded-lg text-sm font-bold border ${
                    i % 2 === 0 
                      ? 'border-purple-500/50 text-purple-200 bg-purple-900/20' 
                      : 'border-pink-500/50 text-pink-200 bg-pink-900/20'
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer / Contact */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <a href={`mailto:${contact}`} className="text-2xl font-bold hover:text-purple-400 transition-colors underline decoration-2 decoration-purple-500 underline-offset-4">
            {contact}
          </a>
          <button className="px-8 py-4 bg-white text-black font-black uppercase tracking-wider hover:bg-gray-200 transition-transform hover:-translate-y-1 rounded-sm">
            Work With Us
          </button>
        </div>

      </div>
    </div>
  );
}