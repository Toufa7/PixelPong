import { Injectable } from '@nestjs/common';
import { Status, Type } from '@prisma/client';
import { PrismaService } from 'src/auth/prisma.service';

@Injectable()
export class RelationService {
  constructor(private prisma: PrismaService) {}
  async sendFriendRequest(senderId: string, recieverId: string) {
    return await this.prisma.friendrequest.create({
      data: {
        sender: { connect: { id: senderId } },
        receiver: { connect: { id: recieverId } },
        status: Status.PENDING,
      },
    });
  }
  async acceptFriendRequest(id: number, senderId: string, recieverId: string) {
    await this.prisma.$transaction([
      this.prisma.friendrequest.update({
        where: { id: id },
        data: { status: Status.ACCEPTED },
      }),
      this.prisma.user.update({
        where: {
          username: senderId,
        },
        data: {
          friends: {
            connect: {
              id: recieverId,
            },
          },
        },
      }),
      this.prisma.user.update({
        where: {
          username: recieverId,
        },
        data: {
          friends: {
            connect: {
              id: senderId,
            },
          },
        },
      }),
    ]);
    this.prisma.achievements.create({
      data: {
        userId: senderId,
        name: 'Add First friend',
        achievementType: Type.ADDFRIEND,
      },
    });
  }

  async refuseFriendRequest(id: number) {
    await this.prisma.friendrequest.update({
      where: { id: id },
      data: { status: Status.DECLINED },
    });
  }
}

//
