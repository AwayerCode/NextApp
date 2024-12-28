'use client';

import { useState, useEffect } from 'react';

interface CrawlResult {
  url: string;
  title: string;
  timestamp: string;
}

export default function Home() {
  const [urls, setUrls] = useState<string>('');
  const [results, setResults] = useState<CrawlResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const startCrawl = async () => {
    try {
      setLoading(true);
      setMessage('');
      const urlList = urls.split('\n').filter(url => url.trim());
      
      const response = await fetch('/api/crawl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: urlList }),
      });
      
      if (!response.ok) {
        throw new Error('爬虫启动失败');
      }
      
      setMessage('爬虫任务已启动');
      fetchResults();
    } catch (error) {
      setMessage('启动爬虫失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/results');
      if (!response.ok) {
        throw new Error('获取结果失败');
      }
      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      setMessage('获取结果失败');
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchResults, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">网页爬虫控制台</h1>
      
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          输入要爬取的URL（每行一个）
        </label>
        <textarea
          className="w-full h-32 p-2 border rounded"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="https://example.com"
        />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          onClick={startCrawl}
          disabled={loading}
        >
          {loading ? '正在启动...' : '开始爬取'}
        </button>
        {message && (
          <p className="mt-2 text-sm text-gray-600">{message}</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">爬取结果</h2>
        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="p-4 border rounded">
              <p className="font-medium">{result.title}</p>
              <a href={result.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                {result.url}
              </a>
              <p className="text-sm text-gray-500">
                爬取时间: {new Date(result.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}