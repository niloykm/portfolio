import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1600],
    imageSizes: [48, 96, 192, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/niloy.pdf',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
