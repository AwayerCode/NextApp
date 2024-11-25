import { prisma } from './prisma'
import { storage } from './storage'
import fs from 'fs/promises'
import path from 'path'

interface UploadFileData {
  file: {
    buffer: Buffer
    originalname: string
  }
  title?: string
  description?: string
}

export const images = {
  async create({ file, title, description }: UploadFileData) {
    const filename = storage.generateFilename(file.originalname)
    const url = await storage.saveFile(file.buffer, filename)

    return prisma.imageInfo.create({
      data: {
        url,
        title,
        description,
      }
    })
  },

  async findMany(options = {}) {
    return prisma.imageInfo.findMany(options)
  },

  async findById(id: number) {
    return prisma.imageInfo.findUnique({
      where: { id }
    })
  },

  async update(id: number, data: { title?: string; description?: string }) {
    return prisma.imageInfo.update({
      where: { id },
      data
    })
  },

  async delete(id: number) {
    const image = await prisma.imageInfo.findUnique({
      where: { id }
    })

    if (!image) throw new Error('Image not found')

    const filename = image.url.split('/').pop()
    if (filename) {
      await storage.deleteFile(filename)
    }

    return prisma.imageInfo.delete({
      where: { id }
    })
  },

  async syncWithUploadFolder() {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    
    try {
      // 读取上传目录中的所有文件
      const files = await fs.readdir(uploadDir)
      const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      )

      // 获取数据库中的所有图片记录
      const dbImages = await prisma.imageInfo.findMany()
      const dbImageUrls = new Set(dbImages.map(img => img.url))

      // 同步新文件到数据库
      for (const filename of imageFiles) {
        const url = `/uploads/${filename}`
        
        // 如果数据库中没有该图片记录，则创建新记录
        if (!dbImageUrls.has(url)) {
          await prisma.imageInfo.create({
            data: {
              url,
              title: path.parse(filename).name, // 使用文件名作为标题
              description: null
            }
          })
        }
      }

      // 返回同步后的所有图片
      return await prisma.imageInfo.findMany()
    } catch (error) {
      console.error('同步图片失败:', error)
      throw error
    }
  }
}