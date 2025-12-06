
'use client';

import { useState, useEffect } from 'react';
import TemplateRenderer from '../../components/TemplateRenderer';

// Mock Data (Simulating your future DB)
const BUSINESS_DATA = {
  name: "Acme Innovations",
  description: "We build the future of widgets and gadgets.",
  contact: "hello@acme.com"
};

const TEMPLATE_KEYS = ['minimalist', 'corporate', 'creative'];

export default function BusinessProfileBuilder() {
  const [currentTemplate, setCurrentTemplate] = useState('minimalist');
  const [isClient, setIsClient] = useState(false);

  // Hydration fix: Ensure random logic only runs on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const randomize = () => {
    const randomKey = TEMPLATE_KEYS[Math.floor(Math.random() * TEMPLATE_KEYS.length)];
    setCurrentTemplate(randomKey);
  };

  if (!isClient) return null; // or a loading spinner

  return (
    <div>
      {/* --- Control Panel (The GUI for the user) --- */}
      <div className="fixed top-4 right-4 bg-white p-4 shadow-xl rounded-lg z-50 border">
        <p className="font-bold mb-2">Theme Switcher</p>
        <div className="flex gap-2 mb-4">
          {TEMPLATE_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setCurrentTemplate(key)}
              className={`px-3 py-1 text-sm rounded ${
                currentTemplate === key ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        <button 
          onClick={randomize}
          className="w-full bg-purple-600 text-white py-1 rounded hover:bg-purple-700"
        >
          🎲 Randomize
        </button>
      </div>

      {/* --- The Dynamic Template Area --- */}
      <TemplateRenderer templateId={currentTemplate} data={BUSINESS_DATA} />
    </div>
  );
}