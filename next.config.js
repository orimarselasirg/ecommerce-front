/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com",
    //     port: "",
    //     pathname: "/dlvvul5du/image/upload/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "i2.wp.com",
    //     port: "",
    //     pathname: "/cdn.auth0.com/avatars/**",
    //   },
    // ],
    domains: [
      "res.cloudinary.com",
      "i2.wp.com",
      "cdn.auth0.com",
      "s.gravatar.com",
    ],
  },
};

module.exports = nextConfig;
