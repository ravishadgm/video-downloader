/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true, 

  sassOptions: {
    additionalData: `
      @use "src/styles/variables" as *;
    `,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "*.fbcdn.net",
      },
    ],
  },

 experimental: {
    serverComponentsExternalPackages: []
  }

};

export default nextConfig;
