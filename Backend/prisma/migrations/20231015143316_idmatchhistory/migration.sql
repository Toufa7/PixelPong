-- AlterTable
ALTER TABLE "MatchHistory" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MatchHistory_pkey" PRIMARY KEY ("id");
