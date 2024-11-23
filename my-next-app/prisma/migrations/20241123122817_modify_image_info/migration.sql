/*
  Warnings:

  - Added the required column `userId` to the `ImageInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageInfo" ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ImageInfo" ADD CONSTRAINT "ImageInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
