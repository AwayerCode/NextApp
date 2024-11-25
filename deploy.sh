#!/bin/bash

# 输出颜色设置
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 输出带颜色的信息函数
log_info() {
    echo -e "${GREEN}[INFO] $1${NC}"
}

log_error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

# 检查错误的函数
check_error() {
    if [ $? -ne 0 ]; then
        log_error "$1"
        exit 1
    fi
}

# 进入项目目录
cd /home/NextApp/my-next-app
check_error "进入项目目录失败"

log_info "1. 保存本地修改"
git stash
check_error "Git stash 失败"

log_info "2. 拉取最新代码"
git pull origin main
check_error "Git pull 失败"

log_info "3. 恢复本地修改"
git stash pop || true  # 即使失败也继续执行

log_info "4. 安装依赖"
npm install
check_error "npm install 失败"

log_info "5. 构建项目"
npm run build
check_error "构建失败"

log_info "6. 重启 PM2 应用"
pm2 delete nextapp || true  # 即使应用不存在也继续执行
pm2 start ecosystem.config.js
check_error "PM2 启动失败"

log_info "7. 检查应用状态"
pm2 list
check_error "PM2 状态检查失败"

log_info "部署完成！"

# 显示最新日志
log_info "显示最新日志（按 Ctrl+C 退出）："
pm2 logs nextapp