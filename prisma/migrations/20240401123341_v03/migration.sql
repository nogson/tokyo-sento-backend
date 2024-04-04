/*
  Warnings:

  - You are about to drop the column `nicName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "nicName",
ADD COLUMN     "nickName" TEXT;
