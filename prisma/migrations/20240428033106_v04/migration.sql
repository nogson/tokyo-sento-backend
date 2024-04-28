/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "Commnet" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,
    "bathId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Commnet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Commnet" ADD CONSTRAINT "Commnet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
