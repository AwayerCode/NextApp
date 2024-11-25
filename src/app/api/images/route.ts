import { NextResponse } from 'next/server'
import { images } from '@/lib/db'

interface ImageInfo {
  id: number
  url: string
  title: string | null
  description: string | null
  createdAt: Date
  updatedAt: Date
}

interface ErrorResponse {
  error: string
  details?: unknown
}

type ApiResponse<T> = NextResponse<T | ErrorResponse>

export async function GET(): Promise<ApiResponse<ImageInfo[]>> {
  try {
    // 先同步文件系统和数据库
    await images.syncWithUploadFolder()
    // 然后获取所有图片
    const imageList = await images.findMany()
    return NextResponse.json(imageList)
  } catch (error) {
    console.error('获取图片列表失败:', error)
    return NextResponse.json(
      { error: '获取图片列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request): Promise<ApiResponse<ImageInfo>> {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: '没有上传文件' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = (file as File).name || 'unnamed-file'

    const image = await images.create({
      file: {
        buffer,
        originalname: filename,
      },
      title,
      description
    })

    return NextResponse.json(image)
  } catch (error) {
    console.error('上传图片失败:', error)
    return NextResponse.json(
      { 
        error: '上传图片失败',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request): Promise<ApiResponse<{success: boolean}>> {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '')

    if (isNaN(id)) {
      return NextResponse.json(
        { error: '无效的图片ID' },
        { status: 400 }
      )
    }

    await images.delete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('删除图片失败:', error)
    return NextResponse.json(
      { error: '删除图片失败' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request): Promise<ApiResponse<ImageInfo>> {
  try {
    const data = await request.json()
    const { id, title, description } = data

    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { error: '无效的图片ID' },
        { status: 400 }
      )
    }

    const updatedImage = await images.update(id, { title, description })
    return NextResponse.json(updatedImage)
  } catch (error) {
    console.error('更新图片失败:', error)
    return NextResponse.json(
      { error: '更新图片失败' },
      { status: 500 }
    )
  }
}