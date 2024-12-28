export interface CrawlResult {
    url: string;
    title: string;
    timestamp: string;
}

class Storage {
    private results: CrawlResult[] = [];

    addResult(result: CrawlResult) {
        this.results.unshift(result); // 新结果添加到前面
    }

    getResults() {
        return this.results;
    }

    clear() {
        this.results = [];
    }
}

// 创建单例
export const storage = new Storage(); 