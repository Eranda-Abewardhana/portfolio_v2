/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: { qualities: [75, 88, 90, 100] },
  devIndicators: false,
  headers() {
    return [
      {
        source: "/_media/:path*",
        headers: [
          { key: "Content-Type", value: "application/octet-stream" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/cv/Eranda_Abewardhana_AI_CV.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Eranda_Abewardhana_AI_CV.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
