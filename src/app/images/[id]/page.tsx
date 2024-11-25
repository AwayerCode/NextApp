import { images } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ImageDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const image = await images.findById(parseInt(params.id))

  if (!image) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          返回首页
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* 图片展示区 */}
        <div className="relative w-full" style={{ height: '70vh' }}>
          <Image
            src={image.url}
            alt={image.title || '未命名图片'}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* 图片信息区 */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">
            {image.title || '未命名图片'}
          </h1>
          
          {image.description && (
            <p className="text-gray-600 mb-4">{image.description}</p>
          )}
          
          <div className="text-sm text-gray-500">
            上传时间：{new Date(image.createdAt).toLocaleString('zh-CN')}
          </div>
        </div>
      </div>
    </div>
  )
} 