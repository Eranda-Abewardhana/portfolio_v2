/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: { qualities: [75, 88, 90, 100] },
  devIndicators: false,
};

export default nextConfig;
