/*
  Warnings:

  - A unique constraint covering the columns `[twofasecret]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "twofasecret" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_twofasecret_key" ON "User"("twofasecret");
