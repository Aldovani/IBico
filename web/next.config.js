/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:8080/v1/',
    LOCAL_STORAGE_KEY: 'ibico:dev',
  },
}

module.exports = nextConfig
