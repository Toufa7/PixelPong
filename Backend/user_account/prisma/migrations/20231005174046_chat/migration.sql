-- AlterTable
ALTER TABLE "Stats" ALTER COLUMN "wins" DROP NOT NULL,
ALTER COLUMN "loses" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstlogin" DROP NOT NULL;
