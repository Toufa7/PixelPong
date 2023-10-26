/*
  Warnings:

  - Made the column `other` on table `MatchHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MatchHistory" ALTER COLUMN "other" SET NOT NULL;
