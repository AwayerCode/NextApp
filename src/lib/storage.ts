import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

export const storage = {
  async init() {
    try {
      await fs.access(UPLOAD_DIR)
    } catch {
      await fs.mkdir(UPLOAD_DIR, { recursive: true })
    }
  },

  generateFilename(originalName: string) {
    const ext = path.extname(originalName)
    const hash = crypto.randomBytes(8).toString('hex')
    return `${hash}${ext}`
  },

  async saveFile(file: Buffer, filename: string) {
    const filePath = path.join(UPLOAD_DIR, filename)
    await fs.writeFile(filePath, file)
    return `/uploads/${filename}`
  },

  async deleteFile(filename: string) {
    const filePath = path.join(UPLOAD_DIR, filename)
    await fs.unlink(filePath)
  }
}

// 初始化上传目录
storage.init().catch(console.error)