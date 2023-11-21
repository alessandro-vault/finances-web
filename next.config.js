const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "assets/stylesheets/scss/*")],
  },
};

module.exports = nextConfig;
