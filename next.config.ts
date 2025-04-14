import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Ensures compatibility with serverless environments
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  },
  webpack: (config) => {
    // Fixes for certain module resolutions and compatibility
    config.resolve.fallback = { fs: false, path: false, os: false };
    return config;
  },
  images: {
    domains: [
      'https://pozzgnsaptyuwhrrpebw.supabase.co',
      'localhost'
      ],
  },
};

export default nextConfig;




