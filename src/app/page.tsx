import MainLayout from '@/components/mainpage/MainLayout';
import ImageCard from '@/components/mainpage/ImageCard';
import { images } from '@/lib/db';
import { Metadata } from 'next';

// // 更新图片类型以匹配数据库返回的类型
// interface ImageType {
//   id: number;
//   url: string;
//   title: string | null;
//   description: string | null;
//   createdAt: Date;
//   updatedAt: Date;
// }

export const metadata: Metadata = {
  title: '图片库',
  description: '一个现代的图片库应用',
}

async function getImages() {
  await images.syncWithUploadFolder();
  
  const imageList = await images.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return imageList;
}

export default async function Page() {
  const imageList = await getImages();

  return (
    <MainLayout>
      {imageList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">暂无图片</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {imageList.map((image) => (
            <ImageCard
              key={image.id}
              src={image.url}
              title={image.title || '未命名'}
              uploadTime={image.createdAt.toLocaleDateString('zh-CN')}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}