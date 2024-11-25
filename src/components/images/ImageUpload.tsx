'use client'

import { useState } from 'react'

interface ImageUploadProps {
  onUploadComplete: () => void
}

export function ImageUpload({ onUploadComplete }: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('userId', '1') // 假设用户ID为1

    try {
      const response = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      setTitle('')
      setDescription('')
      setFile(null)
      onUploadComplete()
    } catch (error) {
      console.error('Upload error:', error)
      alert('上传失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <div>
        <label className="block text-sm font-medium mb-1">图片</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">标题</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">描述</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows={3}
        />
      </div>
      <button
        type="submit"
        disabled={!file || loading}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? '上传中...' : '上传'}
      </button>
    </form>
  )
}