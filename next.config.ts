/** @type {import('next').NextConfig} */
const nextConfig = {
  // 删除 experimental 配置
  images: {
    domains: [
      'your-bucket.obs.cn-north-4.myhuaweicloud.com'
    ]
  }
};

module.exports = nextConfig;