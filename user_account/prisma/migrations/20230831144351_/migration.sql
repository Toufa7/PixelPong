/*
  Warnings:

  - The values [WIN10MATCHES] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('ADDFRIEND', 'FIRSTWIN', 'FIRSTLOSE', 'FIRSTMATCH', 'STRIKES', 'LEVEL1', 'LEVEL5', 'LEVEL10');
ALTER TABLE "Achievements" ALTER COLUMN "achievementType" TYPE "Type_new" USING ("achievementType"::text::"Type_new");
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
COMMIT;
