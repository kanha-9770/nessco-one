import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
// Import the bundle analyzer using the ES module syntax
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "tinypng.com", // Removed 'https://' here to make it match without 'www.'
      },
      {
        protocol: "https",
        hostname: "www.youtube.com", // This is fine, 'www.' is already included.
      },
      {
        protocol: "https",
        hostname: "in.pinterest.com",
      },
      {
        protocol: "https",
        hostname: "restcountries.com",
      },
      {
        protocol: "https",
        hostname: "assets.nesscoindustries.com",
      },
      {
        protocol: "https",
        hostname: "www.nesscoindia.com", // This is fine, 'www.' is already included.
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      // Allow for any 'www.' hostnames
      {
        protocol: "https",
        hostname: "www.*", // This will allow all 'www.' subdomains under 'https://'
      },
    ],
  },
  swcMinify: true,
  // experimental: {
  //   optimizePackageImports: [
  //     '@mantine/core',     // Add Mantine components
  //     '@mantine/hooks',    // Add Mantine hooks
  //     'lodash',            // Add Lodash for tree shaking
  //   ],  // List any additional packages you'd like to optimize
  // }
};
// Export the configuration with the bundle analyzer applied
export default withNextIntl(nextConfig);
