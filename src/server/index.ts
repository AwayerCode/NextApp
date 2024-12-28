import express from 'express';
import cors from 'cors';
import { runCrawler } from '../crawler/index.js';
import { Dataset } from 'crawlee';
import { Request, Response } from 'express';

const app = express();
const startPort = parseInt(process.env.PORT || '3001');

app.use(cors());
app.use(express.json());

// 启动爬虫的接口
app.post('/api/crawl', async (req: Request, res: Response) => {
    try {
        const { urls } = req.body;
        if (!urls || !Array.isArray(urls)) {
            return res.status(400).json({ error: '请提供有效的URL数组' });
        }
        
        // 异步启动爬虫
        runCrawler(urls).catch(console.error);
        
        res.json({ message: '爬虫任务已启动' });
    } catch (error) {
        res.status(500).json({ error: '服务器错误' });
    }
});

// 获取爬虫结果的接口
app.get('/api/results', async (_req: Request, res: Response) => {
    try {
        const dataset = await Dataset.open();
        const items = await dataset.getData();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: '获取结果失败' });
    }
});

// 尝试在不同端口启动服务器
async function startServer(port: number) {
    try {
        await new Promise((resolve, reject) => {
            const server = app.listen(port, () => {
                console.log(`服务器运行在 http://localhost:${port}`);
                resolve(server);
            }).on('error', (err: any) => {
                if (err.code === 'EADDRINUSE') {
                    console.log(`端口 ${port} 已被占用，尝试端口 ${port + 1}`);
                    resolve(startServer(port + 1));
                } else {
                    reject(err);
                }
            });
        });
    } catch (error) {
        console.error('启动服务器失败:', error);
        process.exit(1);
    }
}

// 开始尝试启动服务器
startServer(startPort); 