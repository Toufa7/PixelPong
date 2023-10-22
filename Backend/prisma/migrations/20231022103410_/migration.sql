/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Stats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Stats_userId_key";

-- AlterTable
ALTER TABLE "Stats" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Stats_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stats_id_key" ON "Stats"("id");
