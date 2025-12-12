// app/components/CesiumMap.tsx
'use client'; 

import React, { useRef, useEffect } from 'react';
(window as any).CESIUM_BASE_URL = '/Cesium/';
// 1. **FIX THIS LINE:** Use the standard ES module import style.
//    Webpack now knows 'cesium' maps to the Source folder.
import * as Cesium from 'cesium'; 
import type { Viewer } from 'cesium'; // Keep the type import

// 2. **FIX THIS LINE:** Import the CSS from the aliased path (which is the /Source folder).
//    The Widgets folder is directly inside the Source folder.
import 'cesium/Build/Cesium/Widgets/widgets.css';

interface CesiumMapProps {
  kmlUrl: string; 
}

const CesiumMap: React.FC<CesiumMapProps> = ({ kmlUrl }) => {
// ... The rest of your code remains the same ...
// You will reference Cesium.Viewer and Cesium.KmlDataSource later
// which now resolves correctly thanks to the 'import * as Cesium from 'cesium';'
  const cesiumContainerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    if (!cesiumContainerRef.current || viewerRef.current) {
      return; 
    }

    // 2. Initialize the Cesium Viewer
    const viewerOptions = {
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      
      // *** CRITICAL OVERRIDES ***
      
      // 1. Explicitly set a non-Cesium default imagery provider
      imageryProvider: new Cesium.OpenStreetMapImageryProvider({
        url : 'https://tile.openstreetmap.org/',
        fileExtension: 'png' // Specify the file extension
      }),
      
      // 2. Explicitly prevent the default terrain (often uses Ion assets)
      terrainProvider: new Cesium.EllipsoidTerrainProvider(), // Flat globe, but safe
      
      // 3. Hide the credit widget entirely
      creditContainer: document.createElement('div'), 
      
      // 4. Force a clean initial scene (optional, but helps with stability)
      useDefaultRenderLoop: false, 
    } as Cesium.Viewer.ConstructorOptions; 

    const viewer = new Cesium.Viewer(cesiumContainerRef.current, viewerOptions);
    viewer.useDefaultRenderLoop = true; // Re-enable the loop after setup

    viewerRef.current = viewer; // Store the viewer instance

    Cesium.KmlDataSource.load(kmlUrl, {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
    })
    .then((kmlDataSource) => {
        viewer.dataSources.add(kmlDataSource);
        viewer.flyTo(kmlDataSource);
        console.log("KML Loaded Successfully!");
    })
    // This .catch() is essential for handling promise rejections!
    .catch((error) => {
        console.error('Cesium failed to load KML data source:', error);
        // Optionally, display a message to the user here
    });

    // 3. Load the KML file
    const loadKML = async () => {
      try {
        const kmlDataSource = await Cesium.KmlDataSource.load(kmlUrl, {
          camera: viewer.scene.camera,
          canvas: viewer.scene.canvas,
        });
        viewer.dataSources.add(kmlDataSource);
        viewer.flyTo(kmlDataSource);
      } catch (error) {
        console.error('Error loading KML data source:', error);
      }
    };

    loadKML();

    // 4. Cleanup function: Destroys the viewer when the component unmounts
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [kmlUrl]); // Re-run effect only if kmlUrl changes

  // 5. Render the container for the Cesium Viewer
  // Ensure it has width and height via CSS!
  return (
    <div 
      ref={cesiumContainerRef} 
      style={{ width: '100%', height: '100vh' }}
    />
  );
};

export default CesiumMap;