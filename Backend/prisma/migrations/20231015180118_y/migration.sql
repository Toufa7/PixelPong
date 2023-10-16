/*
  Warnings:

  - Added the required column `message` to the `Achievements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Achievements" ADD COLUMN     "message" TEXT NOT NULL;
