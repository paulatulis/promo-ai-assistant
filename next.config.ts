const nextConfig = {
  experimental: {
    serverActions: true,
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['www.promoplace.com'], 
  },
};

module.exports = nextConfig;


