/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      expo: false,
      "react-native": false,
      "react-native-webview": false,
    };
    return config;
  },
};

export default nextConfig;
