import MainLayout from '@/components/mainpage/MainLayout';
import ImageCard from '@/components/mainpage/ImageCard';
import { images } from '@/lib/db';

async function getImages(searchQuery?: string) {
  // 先同步文件系统和数据库
  await images.syncWithUploadFolder();
  
  // 然后获取图片，如果有搜索词则过滤
  const imageList = await images.findMany({
    where: searchQuery ? {
      OR: [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } }
      ]
    } : undefined,
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return imageList;
}

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const imageList = await getImages(searchParams.q);

  return (
    <MainLayout>
      {imageList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchParams.q 
              ? `没有找到与"${searchParams.q}"相关的图片` 
              : '暂无图片'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {imageList.map(image => (
            <ImageCard
              key={image.id}
              id={image.id.toString()}
              src={image.url}
              title={image.title || '未命名'}
              uploadTime={new Date(image.createdAt).toLocaleDateString('zh-CN')}
            />
          ))}
        </div>
      )}
    </MainLayout>
  );
}