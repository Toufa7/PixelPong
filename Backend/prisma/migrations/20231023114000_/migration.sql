/*
  Warnings:

  - The values [ADDFRIEND,FIRSTMATCH,STRIKES,LEVEL1,LEVEL5,LEVEL10] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.
  - Changed the column `achievementType` on the `Achievements` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Type_new" AS ENUM ('WELCOME', 'FIRSTWIN', 'FIRSTLOSE', 'WINSTRIKE', 'WIN5', 'WIN10');
ALTER TABLE "Achievements" ALTER COLUMN "achievementType" TYPE "Type_new"[] USING ("achievementType"::text::"Type_new"[]);
ALTER TYPE "Type" RENAME TO "Type_old";
ALTER TYPE "Type_new" RENAME TO "Type";
DROP TYPE "Type_old";
COMMIT;

-- AlterTable
ALTER TABLE "Achievements" ALTER COLUMN "achievementType" SET DATA TYPE "Type"[];
