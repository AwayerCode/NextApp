import MainLayout from '@/components/mainpage/MainLayout';
import ImageCard from '@/components/mainpage/ImageCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '图片库',
  description: '一个现代的图片库应用',
}

// 使用静态图片数据
const images = [
  {
    id: 1,
    url: '/uploads/image1.jpg',
    title: '示例图片1',
    uploadTime: '2024-03-20'
  },
  {
    id: 2,
    url: '/uploads/image2.jpg',
    title: '示例图片2',
    uploadTime: '2024-03-21'
  }
]

export default function Page() {
  return (
    <MainLayout>
      {images.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">暂无图片</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              src={image.url}
              title={image.title}
              uploadTime={image.uploadTime}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}