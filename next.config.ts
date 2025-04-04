import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "my-aws-blog-bucket-123.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
