'use client'

import { useState, useEffect } from 'react'
import { ImageCard } from './ImageCard'
import { ImageEdit } from './ImageEdit'

// 定义图片类型接口
interface Image {
  id: number
  url: string
  title?: string
  description?: string
  userId: number
  createdAt: string
  updatedAt: string
}

export function ImageList() {
  const [images, setImages] = useState<Image[]>([])
  const [editingImage, setEditingImage] = useState<Image | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/images')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setImages(data)
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这张图片吗？')) return

    try {
      const response = await fetch(`/api/images?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Delete failed')

      fetchImages()
    } catch (error) {
      console.error('Delete error:', error)
      alert('删除失败')
    }
  }

  if (loading) {
    return <div className="text-center py-8">加载中...</div>
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onEdit={() => setEditingImage(image)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {editingImage && (
        <ImageEdit
          image={editingImage}
          onClose={() => setEditingImage(null)}
          onSave={fetchImages}
        />
      )}
    </div>
  )
}