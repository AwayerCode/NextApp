import MainLayout from '@/components/mainpage/MainLayout';
import ImageCard from '@/components/mainpage/ImageCard';
import { images } from '@/lib/db';

async function getImages() {
  const imageList = await images.findMany();
  return imageList;
}

export default async function Home() {
  const imageList = await getImages();

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {imageList.map(image => (
          <ImageCard
            key={image.id}
            id={image.id.toString()}
            src={image.url}
            title={image.title || '未命名'}
            author={image.user?.name || '匿名用户'}
            views={0}  // 暂时没有浏览次数
            uploadTime={new Date(image.createdAt).toLocaleDateString('zh-CN')}
          />
        ))}
      </div>
    </MainLayout>
  );
}