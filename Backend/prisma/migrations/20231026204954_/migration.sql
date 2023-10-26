/*
  Warnings:

  - Made the column `otherid` on table `MatchHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MatchHistory" ALTER COLUMN "otherid" SET NOT NULL;
