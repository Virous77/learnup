/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: true,
  },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
