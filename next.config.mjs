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
};

export default nextConfig;
