import { chromium } from 'playwright';
import { storage } from './storage';

// 格式化URL，确保包含协议前缀
function formatUrl(url: string): string {
    url = url.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // 默认使用https
        return `https://${url}`;
    }
    return url;
}

// 爬取单个URL
async function crawlUrl(url: string) {
    const browser = await chromium.launch();
    try {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        await page.goto(url);
        const title = await page.title();
        
        storage.addResult({
            url,
            title,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error(`爬取 ${url} 失败:`, error);
    } finally {
        await browser.close();
    }
}

// 启动爬虫
export async function runCrawler(startUrls: string[]) {
    const formattedUrls = startUrls.map(formatUrl);
    
    // 并行爬取所有URL
    await Promise.all(
        formattedUrls.map(url => crawlUrl(url))
    );
} 