/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      S3_BUCKET: process.env.S3_BUCKET,
      S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
      S3_SECRET_KEY: process.env.S3_SECRET_KEY,
      S3_REGION: process.env.S3_REGION,
      DIGITAL_OCEAN_ENDPOINT: process.env.DIGITAL_OCEAN_ENDPOINT,
    },
  }
  
  export default nextConfig
  