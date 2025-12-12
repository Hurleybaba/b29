// app/pages/test-map/page.tsx (This is now cleaner and a Server Component)

import ClientMapLoader from '@/app/components/ClientMapLoader';

export default function MapPage() {
  // All the dynamic loading logic is now safely inside the ClientMapLoader
  return (
    <main>
      {/* This component tree is rendered on the server, but the actual map code 
          is only loaded and run on the client, thanks to the wrapper! */}
      <ClientMapLoader />
    </main>
  );
}