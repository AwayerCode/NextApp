'use client'

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
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
      </div>
    </nav>
  );
} 