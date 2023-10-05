/*
  Warnings:

  - A unique constraint covering the columns `[userId,achievementType]` on the table `Achievements` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Achievements_userId_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "token" DROP NOT NULL,
ALTER COLUMN "profileImage" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Achievements_userId_achievementType_key" ON "Achievements"("userId", "achievementType");
