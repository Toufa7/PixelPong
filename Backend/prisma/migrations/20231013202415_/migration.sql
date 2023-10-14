/*
  Warnings:

  - You are about to drop the column `grouptype` on the `Groupchat` table. All the data in the column will be lost.
  - You are about to drop the column `idsuperadmin` on the `Groupchat` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Groupchat` table. All the data in the column will be lost.
  - You are about to drop the column `namegb` on the `Groupchat` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Groupchat` table. All the data in the column will be lost.
  - You are about to drop the column `ingame` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Messagegb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupChat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_adminsGroupChat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `GroupType` to the `Groupchat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SenderId` to the `Groupchat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('PUBLIC', 'PRIVATE', 'PROTECTED');

-- DropForeignKey
ALTER TABLE "Groupchat" DROP CONSTRAINT "Groupchat_idsuperadmin_fkey";

-- DropForeignKey
ALTER TABLE "Messagegb" DROP CONSTRAINT "Messagegb_SenderId_fkey";

-- DropForeignKey
ALTER TABLE "Messagegb" DROP CONSTRAINT "Messagegb_id_fkey";

-- DropForeignKey
ALTER TABLE "_GroupChat" DROP CONSTRAINT "_GroupChat_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupChat" DROP CONSTRAINT "_GroupChat_B_fkey";

-- DropForeignKey
ALTER TABLE "_adminsGroupChat" DROP CONSTRAINT "_adminsGroupChat_A_fkey";

-- DropForeignKey
ALTER TABLE "_adminsGroupChat" DROP CONSTRAINT "_adminsGroupChat_B_fkey";

-- AlterTable
ALTER TABLE "Groupchat" DROP COLUMN "grouptype",
DROP COLUMN "idsuperadmin",
DROP COLUMN "image",
DROP COLUMN "namegb",
DROP COLUMN "password",
ADD COLUMN     "GroupType" "GroupType" NOT NULL,
ADD COLUMN     "Password" TEXT,
ADD COLUMN     "SenderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ingame",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Messagegb";

-- DropTable
DROP TABLE "_GroupChat";

-- DropTable
DROP TABLE "_adminsGroupChat";

-- DropEnum
DROP TYPE "Grouptype";

-- CreateTable
CREATE TABLE "MessageGB" (
    "id" TEXT NOT NULL,
    "SenderId" TEXT NOT NULL,
    "Message" TEXT NOT NULL,

    CONSTRAINT "MessageGB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MessageGB_id_key" ON "MessageGB"("id");

-- AddForeignKey
ALTER TABLE "Groupchat" ADD CONSTRAINT "Groupchat_SenderId_fkey" FOREIGN KEY ("SenderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageGB" ADD CONSTRAINT "MessageGB_SenderId_fkey" FOREIGN KEY ("SenderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageGB" ADD CONSTRAINT "MessageGB_id_fkey" FOREIGN KEY ("id") REFERENCES "Groupchat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
