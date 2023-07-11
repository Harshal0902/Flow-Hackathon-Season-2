/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
}
module.exports = nextConfig
module.exports = {
  resolve: {
    alias: {
      path: require.resolve('path-browserify'),
    },
  }
}