-- DropForeignKey
ALTER TABLE "Achievements" DROP CONSTRAINT "Achievements_userId_fkey";

-- DropForeignKey
ALTER TABLE "Friendrequest" DROP CONSTRAINT "Friendrequest_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Friendrequest" DROP CONSTRAINT "Friendrequest_senderId_fkey";

-- DropForeignKey
ALTER TABLE "MatchHistory" DROP CONSTRAINT "MatchHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_userId_fkey";

-- AddForeignKey
ALTER TABLE "Friendrequest" ADD CONSTRAINT "Friendrequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendrequest" ADD CONSTRAINT "Friendrequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievements" ADD CONSTRAINT "Achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchHistory" ADD CONSTRAINT "MatchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
