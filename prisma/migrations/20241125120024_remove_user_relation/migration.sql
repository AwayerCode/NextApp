/*
  Warnings:

  - You are about to drop the column `userId` on the `ImageInfo` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ImageInfo" DROP CONSTRAINT "ImageInfo_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "ImageInfo" DROP COLUMN "userId";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";
