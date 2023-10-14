/*
  Warnings:

  - You are about to drop the column `GroupType` on the `Groupchat` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `Groupchat` table. All the data in the column will be lost.
  - You are about to drop the column `SenderId` on the `Groupchat` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `MessageGB` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `grouptype` to the `Groupchat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idsuperadmin` to the `Groupchat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namegb` to the `Groupchat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Grouptype" AS ENUM ('PUBLIC', 'PRIVATE', 'PROTECTED');

-- DropForeignKey
ALTER TABLE "Groupchat" DROP CONSTRAINT "Groupchat_SenderId_fkey";

-- DropForeignKey
ALTER TABLE "MessageGB" DROP CONSTRAINT "MessageGB_SenderId_fkey";

-- DropForeignKey
ALTER TABLE "MessageGB" DROP CONSTRAINT "MessageGB_id_fkey";

-- AlterTable
ALTER TABLE "Groupchat" DROP COLUMN "GroupType",
DROP COLUMN "Password",
DROP COLUMN "SenderId",
ADD COLUMN     "grouptype" "Grouptype" NOT NULL,
ADD COLUMN     "idsuperadmin" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "namegb" TEXT NOT NULL,
ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "MessageGB";

-- DropEnum
DROP TYPE "GroupType";

-- CreateTable
CREATE TABLE "Messagegb" (
    "id" TEXT NOT NULL,
    "SenderId" TEXT NOT NULL,
    "Message" TEXT NOT NULL,

    CONSTRAINT "Messagegb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupChat" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_adminsGroupChat" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Messagegb_id_key" ON "Messagegb"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupChat_AB_unique" ON "_GroupChat"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupChat_B_index" ON "_GroupChat"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_adminsGroupChat_AB_unique" ON "_adminsGroupChat"("A", "B");

-- CreateIndex
CREATE INDEX "_adminsGroupChat_B_index" ON "_adminsGroupChat"("B");

-- AddForeignKey
ALTER TABLE "Groupchat" ADD CONSTRAINT "Groupchat_idsuperadmin_fkey" FOREIGN KEY ("idsuperadmin") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messagegb" ADD CONSTRAINT "Messagegb_SenderId_fkey" FOREIGN KEY ("SenderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messagegb" ADD CONSTRAINT "Messagegb_id_fkey" FOREIGN KEY ("id") REFERENCES "Groupchat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupChat" ADD CONSTRAINT "_GroupChat_A_fkey" FOREIGN KEY ("A") REFERENCES "Groupchat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupChat" ADD CONSTRAINT "_GroupChat_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adminsGroupChat" ADD CONSTRAINT "_adminsGroupChat_A_fkey" FOREIGN KEY ("A") REFERENCES "Groupchat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adminsGroupChat" ADD CONSTRAINT "_adminsGroupChat_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
