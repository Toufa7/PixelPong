/*
  Warnings:

  - The `status` column on the `Friendrequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACCEPTED', 'PENDING', 'DECLINED');

-- AlterTable
ALTER TABLE "Friendrequest" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
