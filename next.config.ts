import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ['127.0.0.1'],
  async redirects() {
    return [
      {
        source: '/assessment/role',
        destination: '/assessment',
        permanent: false,
      },
      {
        source: '/assessment/role/:roleId',
        destination: '/assessment/role-:roleId',
        permanent: false,
      },
      {
        source: '/assessment/results',
        destination: '/assessment',
        permanent: false,
      },
      {
        source: '/assessment/results/:path*',
        destination: '/assessment',
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
