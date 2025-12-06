// b29/app/components/templates/Corporate.js
import React from 'react';

export default function Corporate({ data }) {
  const { 
    name = "Corporate Entity", 
    description = "Leading the industry with innovative solutions.", 
    createdAt = "2023", 
    tags = ["Business", "Finance"], 
    interest = "Consulting", 
    location = "Global HQ",
    contact = "contact@corp.com"
  } = data || {};

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar / Brand Panel */}
      <aside className="w-full md:w-1/3 lg:w-1/4 bg-slate-900 text-white p-10 flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 bg-blue-600 rounded mb-6"></div>
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-1">{interest}</h2>
          <h1 className="text-3xl font-serif font-bold leading-tight">{name}</h1>
          <div className="mt-6 w-16 h-1 bg-blue-600"></div>
        </div>
        
        <div className="mt-12 md:mt-0 space-y-6 text-sm text-slate-400">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Established</p>
            <p className="text-white">{createdAt}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Location</p>
            <p className="text-white">{location}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Contact</p>
            <p className="text-white">{contact}</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 lg:p-16">
        <div className="max-w-3xl">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Company Overview</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Core Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 flex flex-col justify-center items-start">
              <h4 className="font-bold text-blue-900 mb-2">Ready to collaborate?</h4>
              <p className="text-sm text-blue-700 mb-4">Schedule a consultation with our team today.</p>
              <button className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-bold hover:bg-blue-700 transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}