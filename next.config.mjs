/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "img.wenku8.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
