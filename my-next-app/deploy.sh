#!/bin/bash

# 拉取最新代码
git pull

# 安装依赖
npm install

# 生成 Prisma 客户端
npx prisma generate

# 执行数据库迁移
npx prisma migrate deploy

# 构建应用
npm run build

# 使用 PM2 重启应用
pm2 restart ecosystem.config.js

# 保存 PM2 进程列表
pm2 save

# 设置开机自启
pm2 startup