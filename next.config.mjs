import ts from 'typescript';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        net: false,
        tls: false,
        perf_hooks: false,
        fs: false,
        dns: false,
      };
    }

    return config;
  },
};

export default nextConfig;

