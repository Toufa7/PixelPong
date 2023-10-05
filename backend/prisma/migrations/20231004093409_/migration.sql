/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('PUBLIC', 'PRIVATE', 'PROTECTED');

-- CreateTable
CREATE TABLE "DMsChat" (
    "id" TEXT NOT NULL,
    "SenderId" TEXT NOT NULL,
    "ReceiverId" TEXT NOT NULL,
    "Messages" TEXT NOT NULL,

    CONSTRAINT "DMsChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupChat" (
    "id" TEXT NOT NULL,
    "SenderId" TEXT NOT NULL,
    "Messages" TEXT NOT NULL,
    "GroupType" "GroupType" NOT NULL,
    "Password" TEXT,

    CONSTRAINT "GroupChat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DMsChat_id_key" ON "DMsChat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GroupChat_id_key" ON "GroupChat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "DMsChat" ADD CONSTRAINT "DMsChat_SenderId_fkey" FOREIGN KEY ("SenderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DMsChat" ADD CONSTRAINT "DMsChat_ReceiverId_fkey" FOREIGN KEY ("ReceiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupChat" ADD CONSTRAINT "GroupChat_SenderId_fkey" FOREIGN KEY ("SenderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
