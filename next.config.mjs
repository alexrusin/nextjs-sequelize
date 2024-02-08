/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.ignoreWarnings = [
      {
        module: /sequelize/, // A RegExp
      },
    ];
    return config;
  },
};

export default nextConfig;
