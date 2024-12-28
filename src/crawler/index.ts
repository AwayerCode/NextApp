import { PlaywrightCrawler, Dataset } from 'crawlee';

// 格式化URL，确保包含协议前缀
function formatUrl(url: string): string {
    url = url.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // 默认使用https
        return `https://${url}`;
    }
    return url;
}

// 创建爬虫实例
const crawler = new PlaywrightCrawler({
    // 这里可以设置爬虫的各种选项
    maxRequestsPerCrawl: 10,
    async requestHandler({ request, page, enqueueLinks, log }) {
        const title = await page.title();
        log.info(`页面标题: ${title}`);

        // 将结果保存到数据集
        await Dataset.pushData({
            url: request.url,
            title,
            timestamp: new Date().toISOString(),
        });
    },
});

// 启动爬虫
export async function runCrawler(startUrls: string[]) {
    // 格式化所有URL
    const formattedUrls = startUrls.map(formatUrl);
    await crawler.run(formattedUrls);
} 