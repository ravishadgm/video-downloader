/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `
      @use "src/styles/variables" as *;
    `,
  },
  images: {
    domains: [
      'instagram.fna.fbcdn.net',
      'scontent.cdninstagram.com',
      'scontent-ham3-1.cdninstagram.com',
      'instagram.famd5-2.fna.fbcdn.net',
      'instagram.famd5-3.fna.fbcdn.net',
      'scontent.xx.fbcdn.net',
      'video.xx.fbcdn.net',
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
