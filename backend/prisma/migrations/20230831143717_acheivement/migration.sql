-- CreateEnum
CREATE TYPE "Type" AS ENUM ('ADDFRIEND', 'FIRSTWIN', 'FIRSTLOSE', 'FIRSTMATCH', 'WIN10MATCHES');

-- CreateTable
CREATE TABLE "Achievements" (
    "name" TEXT NOT NULL,
    "achievementType" "Type" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "MatchHistory" (
    "numberOfMatches" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievements_userId_key" ON "Achievements"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchHistory_userId_key" ON "MatchHistory"("userId");

-- AddForeignKey
ALTER TABLE "Achievements" ADD CONSTRAINT "Achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchHistory" ADD CONSTRAINT "MatchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
