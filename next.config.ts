import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';


const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
      },
      {
        protocol: 'https',
        hostname: 'rose-app.elevate-bootcamp.cloud',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: "/**",
      },
    ],
  },
};



const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
