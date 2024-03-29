/** @type {import('next').NextConfig} */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const compressionPlugin = require('compression-webpack-plugin');

const nextConfig = {
  reactStrictMode: false,
  compress: true,
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
  },
  env: {
    BASE_API_URL: process.env.BASE_API_URL,
    JWT_DOMAIN: process.env.JWT_DOMAIN,
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    KAKAO_REDIRECT_URL: process.env.KAKAO_REDIRECT_URL,
  },
  images: {
    domains: ['unsplash.com', 'resource.with-you.io'],
    deviceSizes: [640, 768, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [],
  },
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production';
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    const plugins = [...config.plugins];
    if (prod) {
      plugins.push(new compressionPlugin());
    }
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      plugins: plugins,
    };
  },
};

module.exports = withBundleAnalyzer(nextConfig);
