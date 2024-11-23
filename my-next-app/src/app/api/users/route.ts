import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PrismaClient } from '@prisma/client'

// 定义请求数据类型
interface CreatePostData {
  title: string
  content: string
  authorId: number
}

// 定义事务上下文类型
type TransactionPrisma = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>

export async function POST(request: Request) {
  try {
    const data = await request.json() as CreatePostData
    
    // 使用事务确保数据一致性
    const result = await prisma.$transaction(async (tx: TransactionPrisma) => {
      // 创建文章
      const post = await tx.post.create({
        data: {
          title: data.title,
          content: data.content,
          authorId: data.authorId
        }
      })
      
      // 不再需要更新 postCount
      return post
    })
    
    return NextResponse.json(result)
  } catch (err) {
    console.error('创建文章失败:', err)
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    )
  }
}