import Image from 'next/image';
import Link from 'next/link';

interface ImageCardProps {
    id: string;
    src: string;
    title: string;
    author: string;
    views: number;
    uploadTime: string;
  }

export default function ImageCard({
  id,
  src,
  title,
  author,
  views,
  uploadTime
}: ImageCardProps) {
  return (
    <Link href={`/images/${id}`}>
      <div className="cursor-pointer hover:opacity-90 transition-opacity">
        {/* 图片容器 */}
        <div className="relative aspect-video mb-2">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        
        {/* 信息区 */}
        <div className="flex gap-2">
          {/* 作者头像 */}
          <div className="w-9 h-9 rounded-full overflow-hidden relative">
            <Image
              src={`/avatars/${author}.jpg`}
              alt={author}
              fill
              className="object-cover"
            />
          </div>
          
          {/* 文字信息 */}
          <div>
            <h3 className="font-medium line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-600">{author}</p>
            <p className="text-sm text-gray-600">
              {views} 次查看 • {uploadTime}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}