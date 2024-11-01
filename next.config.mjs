/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  webpack: (config) => {
    // Modify the cache settings here
    config.cache = {
      type: "memory",
    };

    return config;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com", port: "" },
      { protocol: "https", hostname: "github.com", port: "" },
    ],
  },
};

export default nextConfig;
