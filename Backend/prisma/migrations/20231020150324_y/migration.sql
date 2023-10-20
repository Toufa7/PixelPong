-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "message" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
