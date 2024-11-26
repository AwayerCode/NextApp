import Image from 'next/image';

interface ImageCardProps {
    src: string;
    title: string;
    uploadTime: string;
  }

export default function ImageCard({
  src,
  title,
  uploadTime
}: ImageCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative aspect-video">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          上传时间：{uploadTime}
        </p>
      </div>
    </div>
  );
}