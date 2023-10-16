/*
  Warnings:

  - You are about to drop the column `image` on the `Friendrequest` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Friendrequest` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Friendrequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Friendrequest" DROP COLUMN "image",
DROP COLUMN "message",
DROP COLUMN "username";
