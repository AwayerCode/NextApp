'use client'

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  // 从 URL 参数中获取搜索词
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  // 处理搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/');
    }
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* 左侧 Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg 
            className="w-8 h-8 text-blue-500" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v8l4-2 4 2V6H4zm0 12h16v-2l-4-4-4 4-4-4-4 4v2z"/>
          </svg>
          <span className="text-xl font-semibold text-gray-800">
            图片库
          </span>
        </Link>

        {/* 中间搜索框 */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索图片..."
              className="w-full px-4 py-2 pl-10 pr-4 rounded-full border 
                       border-gray-300 focus:border-blue-500 focus:ring-1 
                       focus:ring-blue-500 focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </form>

        {/* 右侧上传按钮 */}
        <Link 
          href="/images" 
          className="flex items-center gap-1 px-4 py-2 rounded-full 
                   bg-blue-500 text-white hover:bg-blue-600 
                   transition-colors duration-200 shrink-0"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
          <span>上传</span>
        </Link>
      </div>
    </nav>
  );
} 