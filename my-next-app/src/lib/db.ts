import { prisma } from './prisma'

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