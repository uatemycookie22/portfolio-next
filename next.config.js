const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  output: 'standalone',
  sassOptions: {
    includePaths: ['./styles']
  },
  modularizeImports: {
    '@icons': {
      transform: '@icons/{{member}}',
    },

    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    }
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [25, 40, 65, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
        port: '',
        pathname: '/id/**',
      },

      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8090',
        pathname: '/api/**',
      },

      {
        protocol: 'https',
        hostname: 'db.lysanderh.com',
        port: '',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'blogstoragestack-storageblogimagesbuckete71fadd1-1yjbhzk68klr.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
}

module.exports = withBundleAnalyzer(nextConfig)
