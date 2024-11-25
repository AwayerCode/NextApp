import Image from 'next/image';
import Link from 'next/link';

interface ImageCardProps {
    id: string;
    src: string;
    title: string;
    uploadTime: string;
  }

export default function ImageCard({
  id,
  src,
  title,
  uploadTime
}: ImageCardProps) {
  return (
    <Link href={`/images/${id}`}>
      <div className="cursor-pointer hover:opacity-90 transition-opacity">
        <div className="relative aspect-video mb-2">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        
        <div>
          <h3 className="font-medium line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600">
            上传时间：{uploadTime}
          </p>
        </div>
      </div>
    </Link>
  );
}