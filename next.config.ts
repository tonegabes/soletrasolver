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

  // Optimize for static export and SEO
  compress: true,

  // SEO and performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react']
  },

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

    // Optimize for better performance
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },

  // Disable source maps in production to reduce file size
  productionBrowserSourceMaps: false,

  // Enable static optimization
  swcMinify: true,

  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=43200',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
