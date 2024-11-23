import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // 使用事务确保数据一致性
    const result = await prisma.$transaction(async (tx) => {
      // 创建文章
      const post = await tx.post.create({
        data: {
          title: data.title,
          content: data.content,
          authorId: data.authorId
        }
      })
      
      // 更新用户的文章计数
      await tx.user.update({
        where: { id: data.authorId },
        data: {
          postCount: { increment: 1 }
        }
      })
      
      return post
    })
    
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    )
  }
}