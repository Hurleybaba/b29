'use client';

import React, { useRef, useEffect } from 'react';

/**
 * Cesium loads workers, assets, and widgets relative to this base URL.
 * Your webpack config copies these folders into /public/Cesium/,
 * so this MUST match that path exactly.
 */
(window as any).CESIUM_BASE_URL = '/Cesium/';

import * as Cesium from 'cesium';
import type { Viewer } from 'cesium';

/**
 * Widget CSS (timeline, buttons, etc.)
 * Even if you disable most widgets, Cesium still expects this CSS.
 */
import 'cesium/Build/Cesium/Widgets/widgets.css';

interface CesiumMapProps {
  kmlUrl: string;
}

const CesiumMap: React.FC<CesiumMapProps> = ({ kmlUrl }) => {
  const cesiumContainerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    /**
     * Guard clause:
     * - container must exist
     * - viewer must NOT already exist (prevents double-init in React)
     */
    if (!cesiumContainerRef.current || viewerRef.current) {
      return;
    }

    /**
     * ================================
     * CESIUM VIEWER OPTIONS
     * ================================
     *
     * ⚠️ OPTION A EXPLANATION (IMPORTANT)
     *
     * We DO NOT specify an imageryProvider here.
     *
     * Why?
     * - Cesium's Viewer constructor automatically injects
     *   a safe, Ion-free OpenStreetMap imagery provider
     * - This provider is internally tested and correctly configured
     * - No subdomains, no templates, no silent tile failures
     *
     * This avoids the "blue globe" problem entirely.
     */

    const viewerOptions: Cesium.Viewer.ConstructorOptions = {
      // UI cleanup
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,

      /**
       * Terrain:
       * Explicitly use EllipsoidTerrainProvider to avoid:
       * - Cesium World Terrain
       * - Ion authentication
       * - Surprise network calls
       */
      terrainProvider: new Cesium.EllipsoidTerrainProvider(),

      /**
       * Credits:
       * Cesium injects a credit widget by default.
       * Replacing the container hides it completely.
       * (Legal note: OSM attribution is still required in production.)
       */
      creditContainer: document.createElement('div'),
    };

    /**
     * Create the Cesium Viewer
     */
    const viewer = new Cesium.Viewer(
      cesiumContainerRef.current,
      viewerOptions
    );

    viewerRef.current = viewer;

    /**
     * ================================
     * LOAD KML DATA
     * ================================
     *
     * KML loading is async and returns a DataSource.
     * Cesium does NOT auto-add it to the viewer.
     */
    const loadKML = async () => {
      try {
        const kmlDataSource = await Cesium.KmlDataSource.load(kmlUrl, {
          camera: viewer.scene.camera,
          canvas: viewer.scene.canvas,
        });

        viewer.dataSources.add(kmlDataSource);

        /**
         * ================================
         * FORCE BOUNDARY-ONLY RENDERING
         * ================================
         */
        const entities = kmlDataSource.entities.values;

        for (const entity of entities) {
          // If the KML feature is a Polygon
          if (entity.polygon) {
            // Disable the filled surface
            entity.polygon.material = new Cesium.ColorMaterialProperty(
              Cesium.Color.TRANSPARENT
            );


            // Enable and style the outline
            entity.polygon.outline = new Cesium.ConstantProperty(true);

            entity.polygon.outlineColor = new Cesium.ConstantProperty(
              Cesium.Color.YELLOW
            );

            // NOTE:
            // outlineWidth is largely ignored by WebGL, but still typed correctly
            entity.polygon.outlineWidth = new Cesium.ConstantProperty(2);

            // Clamp polygon to the ellipsoid (ground)
            entity.polygon.height = new Cesium.ConstantProperty(0);
          }
        }

        await viewer.flyTo(kmlDataSource);
        console.log('KML loaded with boundary-only styling');
      } catch (error) {
        console.error('Failed to load KML:', error);
      }
    };

    loadKML();

    /**
     * ================================
     * CLEANUP
     * ================================
     *
     * Cesium allocates:
     * - WebGL context
     * - Workers
     * - Event listeners
     *
     * Failing to destroy the viewer WILL leak memory.
     */
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [kmlUrl]);

  /**
   * Cesium renders into this div.
   * Width and height MUST be non-zero.
   */
  return (
    <div
      ref={cesiumContainerRef}
      style={{ width: '100%', height: '100vh' }}
    />
  );
};

export default CesiumMap;