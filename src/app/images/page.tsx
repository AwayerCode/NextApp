'use client'

import { ImageUpload } from '@/components/images/ImageUpload'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ImagesPage() {
  const router = useRouter()

  const handleUploadComplete = () => {
    toast.success('图片上传成功！')
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">上传图片</h1>
        <Link 
          href="/" 
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          返回首页
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <ImageUpload onUploadComplete={handleUploadComplete} />
      </div>
    </div>
  )
}