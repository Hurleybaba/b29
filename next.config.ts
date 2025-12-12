import type { NextConfig } from "next";
import path from 'path';
import webpack from 'webpack';

const withTM = require('next-transpile-modules')(['cesium']);
const CopyWebpackPlugin = require('copy-webpack-plugin');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const nextConfig: NextConfig = {
  ...withTM,
  reactStrictMode: false,

  // Add Turbopack configuration here
  turbopack: {}, // Use default Turbopack behavior

  webpack: (config, { isServer }) => {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('/Cesium/'),
      })
    );

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      cesium: path.resolve(__dirname, cesiumSource),
    };

    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            { from: path.join(cesiumSource, cesiumWorkers), to: 'public/Cesium/Workers' },
            { from: path.join(cesiumSource, 'Assets'), to: 'public/Cesium/Assets' },
            { from: path.join(cesiumSource, 'Widgets'), to: 'public/Cesium/Widgets' },
            { from: path.join(cesiumSource, 'ThirdParty'), to: 'public/Cesium/ThirdParty' },
          ],
        }) as any
      );
    }

    const rule = config.module?.rules?.find((r: any) => r.oneOf)?.oneOf?.find((r: any) => r.test && r.test.test('.js'));
    if (rule && typeof rule === 'object' && rule.exclude) {
      if (Array.isArray(rule.exclude)) {
        rule.exclude.push(/node_modules\/cesium\/(Source|Build)/);
      } else {
        rule.exclude = [/node_modules\/cesium\/(Source|Build)/];
      }
    }

    return config;
  },
};

export default nextConfig;
