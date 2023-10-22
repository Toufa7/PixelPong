/*
  Warnings:

  - You are about to drop the column `numberOfMatches` on the `MatchHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MatchHistory" DROP COLUMN "numberOfMatches";

-- AlterTable
ALTER TABLE "Stats" ADD COLUMN     "numberOfMatches" INTEGER NOT NULL DEFAULT 0;
