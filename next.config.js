const withPWA = require('next-pwa');

module.exports = {
  eslint: {
    // build: true,
    dev: true,
  },
  basePath: '',
  // reactStrictMode: true,
  future: {
    webpack5: true,
  },
};

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    swSrc: 'service-worker.js',
  },
});