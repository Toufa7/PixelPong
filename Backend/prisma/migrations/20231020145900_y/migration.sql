/*
  Warnings:

  - Added the required column `name` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "recivername" TEXT,
ALTER COLUMN "status" DROP NOT NULL;
