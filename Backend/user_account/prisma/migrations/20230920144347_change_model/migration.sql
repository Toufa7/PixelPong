/*
  Warnings:

  - You are about to drop the column `firstlogin` on the `Friendrequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Friendrequest" DROP COLUMN "firstlogin";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstlogin" BOOLEAN NOT NULL DEFAULT true;
