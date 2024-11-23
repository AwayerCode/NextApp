import { prisma } from './prisma'
import { storage } from './storage' 

export async function getUsers() {
  return prisma.user.findMany()
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    include: { posts: true }
  })
}

export async function createUser(data: {
  email: string
  name?: string
}) {
  return prisma.user.create({
    data
  })
}

export async function updateUser(id: number, data: {
  email?: string
  name?: string
}) {
  return prisma.user.update({
    where: { id },
    data
  })
}

export async function deleteUser(id: number) {
  return prisma.user.delete({
    where: { id }
  })
}

// ... 保留现有的代码 ...

export const images = {
    async create({ file, userId, title, description }) {
        const filename = storage.generateFilename(file.originalname)
        const url = await storage.saveFile(file.buffer, filename)
    
        return prisma.imageInfo.create({
          data: {
            url,
            title,
            description,
            userId
          }
        })
      },
  
    async findMany(options = {}) {
      return prisma.imageInfo.findMany({
        ...options,
        include: {
          user: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })
    },
  
    async findById(id: number) {
      return prisma.imageInfo.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true
            }
          }
        }
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
    }
  }