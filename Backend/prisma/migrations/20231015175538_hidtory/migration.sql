/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Achievements` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `MatchHistory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Stats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MatchHistory_userId_key";

-- AlterTable
ALTER TABLE "Achievements" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Achievements_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Stats" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Stats_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Achievements_id_key" ON "Achievements"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MatchHistory_id_key" ON "MatchHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stats_id_key" ON "Stats"("id");
