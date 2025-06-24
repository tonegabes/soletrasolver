import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },

  // Use environment variables for conditional configuration
  assetPrefix: process.env.NODE_ENV === 'production' ? '/soletrasolver/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/soletrasolver' : '',

  // Optimize for static export
  compress: true,

  // Ensure static files are properly handled
  webpack: (config, { isServer }) => {
    // Handle large text files better
    config.module.rules.push({
      test: /\.txt$/,
      type: 'asset/resource',
      generator: {
        filename: '[name][ext]'
      }
    });

    // Disable webpack cache for production builds to avoid size issues
    if (!isServer && process.env.NODE_ENV === 'production') {
      config.cache = false;
    }

    return config;
  },

  // Disable source maps in production to reduce file size
  productionBrowserSourceMaps: false
};

export default nextConfig;
