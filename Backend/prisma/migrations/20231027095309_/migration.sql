-- CreateEnum
CREATE TYPE "Grouptype" AS ENUM ('PUBLIC', 'PRIVATE', 'PROTECTED');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACCEPTED', 'PENDING', 'DECLINED');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ONLINE', 'OFFLINE', 'AWAY', 'BUSY');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('WELCOME', 'FIRSTWIN', 'FIRSTLOSE', 'WINSTRIKE', 'WIN5', 'WIN10');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "token" TEXT,
    "twofasecret" TEXT,
    "twofatoken" TEXT,
    "profileImage" TEXT,
    "ingame" BOOLEAN DEFAULT false,
    "twofa" BOOLEAN DEFAULT false,
    "status" "UserStatus",
    "authenticated" BOOLEAN NOT NULL DEFAULT false,
    "tokenjoingame" TEXT,
    "firstlogin" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dmschat" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "messageDMs" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dmschat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groupchat" (
    "id" TEXT NOT NULL,
    "namegb" TEXT NOT NULL,
    "idsuperadmin" TEXT NOT NULL,
    "grouptype" "Grouptype" NOT NULL,
    "password" TEXT,
    "image" TEXT,

    CONSTRAINT "Groupchat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usermute" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "groupchatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usermute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messagegb" (
    "id" TEXT NOT NULL,
    "senderid" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "idgp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Messagegb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "name" TEXT,
    "from" TEXT,
    "message" TEXT,
    "status" "Status" DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "level" INTEGER DEFAULT 0,
    "wins" INTEGER DEFAULT 0,
    "loses" INTEGER DEFAULT 0,
    "numberOfMatches" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requestjoingroup" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "groupchatId" TEXT NOT NULL,
    "namegp" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Requestjoingroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievements" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "achievementType" "Type"[],
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchHistory" (
    "id" SERIAL NOT NULL,
    "message" TEXT,
    "userId" TEXT NOT NULL,
    "other" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_friends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_blocked" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
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

-- CreateTable
CREATE TABLE "_block" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_twofasecret_key" ON "User"("twofasecret");

-- CreateIndex
CREATE UNIQUE INDEX "Dmschat_id_key" ON "Dmschat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Groupchat_id_key" ON "Groupchat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Groupchat_namegb_key" ON "Groupchat"("namegb");

-- CreateIndex
CREATE UNIQUE INDEX "Messagegb_id_key" ON "Messagegb"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Stats_id_key" ON "Stats"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Requestjoingroup_id_key" ON "Requestjoingroup"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Achievements_id_key" ON "Achievements"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Achievements_userId_achievementType_key" ON "Achievements"("userId", "achievementType");

-- CreateIndex
CREATE UNIQUE INDEX "MatchHistory_id_key" ON "MatchHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_friends_AB_unique" ON "_friends"("A", "B");

-- CreateIndex
CREATE INDEX "_friends_B_index" ON "_friends"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_blocked_AB_unique" ON "_blocked"("A", "B");

-- CreateIndex
CREATE INDEX "_blocked_B_index" ON "_blocked"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupChat_AB_unique" ON "_GroupChat"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupChat_B_index" ON "_GroupChat"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_adminsGroupChat_AB_unique" ON "_adminsGroupChat"("A", "B");

-- CreateIndex
CREATE INDEX "_adminsGroupChat_B_index" ON "_adminsGroupChat"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_block_AB_unique" ON "_block"("A", "B");

-- CreateIndex
CREATE INDEX "_block_B_index" ON "_block"("B");

-- AddForeignKey
ALTER TABLE "Dmschat" ADD CONSTRAINT "Dmschat_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dmschat" ADD CONSTRAINT "Dmschat_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groupchat" ADD CONSTRAINT "Groupchat_idsuperadmin_fkey" FOREIGN KEY ("idsuperadmin") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usermute" ADD CONSTRAINT "usermute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usermute" ADD CONSTRAINT "usermute_groupchatId_fkey" FOREIGN KEY ("groupchatId") REFERENCES "Groupchat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messagegb" ADD CONSTRAINT "Messagegb_senderid_fkey" FOREIGN KEY ("senderid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messagegb" ADD CONSTRAINT "Messagegb_idgp_fkey" FOREIGN KEY ("idgp") REFERENCES "Groupchat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_to_fkey" FOREIGN KEY ("to") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requestjoingroup" ADD CONSTRAINT "Requestjoingroup_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requestjoingroup" ADD CONSTRAINT "Requestjoingroup_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requestjoingroup" ADD CONSTRAINT "Requestjoingroup_groupchatId_fkey" FOREIGN KEY ("groupchatId") REFERENCES "Groupchat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievements" ADD CONSTRAINT "Achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchHistory" ADD CONSTRAINT "MatchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blocked" ADD CONSTRAINT "_blocked_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blocked" ADD CONSTRAINT "_blocked_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupChat" ADD CONSTRAINT "_GroupChat_A_fkey" FOREIGN KEY ("A") REFERENCES "Groupchat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupChat" ADD CONSTRAINT "_GroupChat_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adminsGroupChat" ADD CONSTRAINT "_adminsGroupChat_A_fkey" FOREIGN KEY ("A") REFERENCES "Groupchat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adminsGroupChat" ADD CONSTRAINT "_adminsGroupChat_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_block" ADD CONSTRAINT "_block_A_fkey" FOREIGN KEY ("A") REFERENCES "Groupchat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_block" ADD CONSTRAINT "_block_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
