const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ],
  }
}

module.exports = withBundleAnalyzer(nextConfig)
