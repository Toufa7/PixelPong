import { Injectable } from '@nestjs/common';
import { PrismaService } from '../auth/prisma.service';
import { User, UserStatus } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }
  async DeleteOne(id: string) {
    const user = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  }

  // async addfriend(userId: string, friendId: string): Promise<void> {
  // }
  async removefriend(userId: string, friendId: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          disconnect: {
            id: friendId,
          },
        },
      },
    }),
      this.prisma.user.update({
        where: {
          id: friendId,
        },
        data: {
          friends: {
            disconnect: {
              id: userId,
            },
          },
        },
      });
  }
  async blockfriend(userId: string, blockedId: string): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          friends: {
            disconnect: {
              id: blockedId,
            },
          },
        },
      }),
      this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          blocked: {
            connect: {
              id: blockedId,
            },
          },
        },
      }),
    ]);
  }
  async UpdateforOne(id: string, username: string) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username,
      },
    });
    return user;
  }
  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }
  async findByName(username: string) {
    // console.log(username);
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        profileImage: true,
        achievements: true,
        stats: true,
        status: true,
      },
    });
    return user;
  }

  async search(query: string) {
    const users = await this.prisma.user.findMany({
      where: {
        username: {
          contains: query,
        },
      },
    });
    return users;
  }
  async unblockfriend(userId: string, unblockedId: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          connect: {
            id: unblockedId,
          },
        },
      },
    });
  }
  getFriends(id: string) {
    return this.prisma.user
      .findUnique({
        where: {
          id: id,
        },
        select: {
          friends: true,
        },
      })
      .friends({
        select: {
          username: true,
          profileImage: true,
          status: true,
        },
      });
  }
  async updatestatus(user, status) {
    await this.prisma.user.updateMany({
      where: {
        id: user.id,
      },
      data: {
        firstlogin: false,
        status: status,
      },
    });
  }
}
