import Image from 'next/image';
import { notFound } from 'next/navigation';

export default function ImageDetail({ params }: { params: { id: string } }) {
  // 在实际应用中，这里应该从API获取数据
  const image = {
    id: params.id,
    src: '/images/photo1.jpg',
    title: '美丽的风景照片',
    author: 'photographer1',
    views: 1234,
    uploadTime: '3天前',
    description: '这是一张美丽的风景照片...'
  };

  if (!image) return notFound();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 图片展示区 */}
      <div className="relative aspect-video mb-4">
        <Image
          src={image.src}
          alt={image.title}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* 信息区 */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{image.title}</h1>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden relative">
            <Image
              src={`/avatars/${image.author}.jpg`}
              alt={image.author}
              fill
              className="object-cover"
            />
          </div>
          
          <div>
            <p className="font-medium">{image.author}</p>
            <p className="text-sm text-gray-600">
              {image.views} 次查看 • {image.uploadTime}
            </p>
          </div>
        </div>

        <p className="text-gray-700">{image.description}</p>
      </div>
    </div>
  );
}