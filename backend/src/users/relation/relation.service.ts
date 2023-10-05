import { Injectable } from '@nestjs/common';
import { Status, Type } from '@prisma/client';
import { PrismaService } from 'src/auth/prisma.service';

@Injectable()
export class RelationService {
  constructor(private prisma: PrismaService) {}

  async sendFriendRequest(senderId: string, receiverId: string) {
    try {
      const friendRequest = await this.prisma.friendrequest.create({
        data: {
          sender: { connect: { id: senderId } },
          receiver: { connect: { id: receiverId } },
          status: Status.PENDING,
        },
      });

      return friendRequest;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async acceptFriendRequest(id: number, senderId: string, receiverId: string) {
    try {
      await this.prisma.$transaction([
        this.prisma.friendrequest.update({
          where: { id: id },
          data: { status: Status.ACCEPTED },
        }),
        this.prisma.user.update({
          where: { username: senderId },
          data: { friends: { connect: { id: receiverId } } },
        }),
        this.prisma.user.update({
          where: { username: receiverId },
          data: { friends: { connect: { id: senderId } } },
        }),
      ]);

      await this.prisma.friendrequest.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async refuseFriendRequest(id: number) {
    try {
      await this.prisma.friendrequest.update({
        where: { id: id },
        data: { status: Status.DECLINED },
      });
      await this.prisma.friendrequest.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
