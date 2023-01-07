const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
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
}

module.exports = withBundleAnalyzer(nextConfig)
