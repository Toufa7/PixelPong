/*
  Warnings:

  - You are about to drop the column `message` on the `Achievements` table. All the data in the column will be lost.
  - Added the required column `message` to the `MatchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Achievements" DROP COLUMN "message";

-- AlterTable
ALTER TABLE "MatchHistory" ADD COLUMN     "message" TEXT NOT NULL;
