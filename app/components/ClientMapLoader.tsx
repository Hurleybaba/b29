// app/components/ClientMapLoader.tsx
'use client'; // <-- This directive is ESSENTIAL!

import dynamic from 'next/dynamic';

// 1. Dynamically import the main CesiumMap component.
// 2. You can NOW use ssr: false because this entire file is a Client Component.
const CesiumMap = dynamic(() => import('./CesiumMap'), {
  // It's safe to use ssr: false here because we are in a Client Component.
  ssr: false, 
  loading: () => <p>Loading 3D Map...</p> // Optional loading state
});

export default function ClientMapLoader() {
  const kmlPath = '/others/lcu.kml'; 
  
  return (
    // Ensure the container has defined dimensions!
    <div style={{ width: '100%', height: '100vh' }}>
      <CesiumMap kmlUrl={kmlPath} />
    </div>
  );
}