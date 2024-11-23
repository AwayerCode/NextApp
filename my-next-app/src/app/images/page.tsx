'use client'

import { ImageUpload } from '@/components/images/ImageUpload'
import { ImageList } from '@/components/images/ImageList'
import { useState } from 'react'
import Link from 'next/link'

export default function ImagesPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleUploadComplete = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">图片管理</h1>
      
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          返回首页
        </Link>
      </div>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">上传新图片</h2>
        <ImageUpload onUploadComplete={handleUploadComplete} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">图片列表</h2>
        <ImageList key={refreshKey} />
      </section>
    </div>
  )
}