-- CreateTable
CREATE TABLE "VisitedBath" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bathId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "VisitedBath_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VisitedBath" ADD CONSTRAINT "VisitedBath_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
