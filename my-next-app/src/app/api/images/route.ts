import { NextResponse } from 'next/server'
import { images } from '@/lib/db'

export async function GET(request: Request) {
    try {
      const imageList = await images.findMany()
      return NextResponse.json(imageList)
    } catch (error) {
      return NextResponse.json(
        { error: '获取图片列表失败' },
        { status: 500 }
      )
    }
  }
  
  export async function POST(request: Request) {
    try {
      const formData = await request.formData()
      const file = formData.get('file')
      const title = formData.get('title') as string
      const description = formData.get('description') as string
      const userId = parseInt(formData.get('userId') as string)
  
      if (!file || !(file instanceof Blob)) {
        return NextResponse.json(
          { error: '没有上传文件' },
          { status: 400 }
        )
      }
  
      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = (file as any).name || 'unnamed-file'
  
      const image = await images.create({
        file: {
          buffer,
          originalname: filename,
        },
        userId,
        title,
        description
      })
  
      return NextResponse.json(image)
    } catch (error) {
      console.error('Upload error:', error)
      return NextResponse.json(
        { error: '上传图片失败' },
        { status: 500 }
      )
    }
  }
  
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const data = await request.json()
      const image = await images.update(parseInt(params.id), data)
      return NextResponse.json(image)
    } catch (error) {
      return NextResponse.json(
        { error: '更新图片失败' },
        { status: 500 }
      )
    }
  }
  
  export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      await images.delete(parseInt(params.id))
      return new NextResponse(null, { status: 204 })
    } catch (error) {
      return NextResponse.json(
        { error: '删除图片失败' },
        { status: 500 }
      )
    }
  }