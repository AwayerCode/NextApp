import { NextResponse } from 'next/server';
import { runCrawler } from '@/lib/crawler';
import { storage } from '@/lib/storage';

export async function POST(request: Request) {
    try {
        const { urls } = await request.json();
        
        if (!urls || !Array.isArray(urls)) {
            return NextResponse.json(
                { error: '请提供有效的URL数组' },
                { status: 400 }
            );
        }

        // 清除之前的结果
        storage.clear();
        
        // 异步启动爬虫
        runCrawler(urls).catch(console.error);

        return NextResponse.json({ message: '爬虫任务已启动' });
    } catch (error) {
        return NextResponse.json(
            { error: '服务器错误' },
            { status: 500 }
        );
    }
} 