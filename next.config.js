/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Для Docker или VPS
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['romanov-master.ru'],
    formats: ['image/avif', 'image/webp'],
  },
  // Улучшенная кэширование
  headers: async () => {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ]
  },
  // Для SEO - канонические URL
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  // Переменные окружения
  env: {
    SITE_URL: 'https://romanov-master.ru',
    SITE_NAME: 'Дмитрий Романов - Мастер отделочник',
  },
}

module.exports = nextConfig