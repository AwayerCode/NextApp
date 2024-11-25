'use client'

import Image from 'next/image'

interface ImageCardProps {
  image: {
    id: number
    url: string
    title?: string
    description?: string
  }
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export function ImageCard({ image, onEdit, onDelete }: ImageCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="relative h-48">
        <Image
          src={image.url}
          alt={image.title || 'Image'}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{image.title || 'Untitled'}</h3>
        <p className="text-sm text-gray-600">{image.description || 'No description'}</p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onEdit(image.id)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            编辑
          </button>
          <button
            onClick={() => onDelete(image.id)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  )
}