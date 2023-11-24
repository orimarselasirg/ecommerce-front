/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dlvvul5du/image/upload/**",
      },
    ],
  },
};

module.exports = nextConfig;
