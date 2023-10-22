import { Injectable } from '@nestjs/common';
import { PrismaService } from '../auth/prisma.service';
import { Status, Type, User, UserStatus } from '@prisma/client';

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
    // //console.log(username);
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        profileImage: true,
        achievements: true,
        // stats: true,
        status: true,
      },
    });
    return user;
  }

  async findById(id: string) {
    // //console.log(username);
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        profileImage: true,
        achievements: true,
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
          id: true,
          username: true,
          profileImage: true,
          status: true,
        },
      });
  }
  async updatestatus(user, status) {
    console.log("123 :: : :: ",status)
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
  async sendFriendRequest(senderId: string, data: any) {
    console.log(senderId  +"  ...    "+ data)
    console.log(data);
    return await this.prisma.notification.create({
      data: {
        user: { connect: { id: senderId } },
        receiver: { connect: { id: data.to } },
        status: Status.PENDING,
        name: data.type,
        message: data.message,
        from:data.from,
      },
    });
  }
  
  async acceptFriendRequest(id: number, senderId: string, recieverId: string) {
    console.log(id +" "+ senderId+" "+ recieverId)
    await this.prisma.$transaction([
      this.prisma.notification.updateMany({
        where: { id: id },
        data: { status: Status.ACCEPTED },
      }),
      this.prisma.user.update({
        where: {
          id: senderId,
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
          id: recieverId,
        },
      data: {
        friends: {
          connect: {
            id: senderId,
          },
        },
      },
    }),
    this.prisma.notification.delete({
      where:{
        id:id,
      },
    })
  ]);
  console.log("its delete : : : : :: : : : : : ",id);
  }
  

  async getallNotifications(id: string){
    const notifications = await this.prisma.notification.findMany({
      where:{
        to: id,
      },
    });
    return notifications;   

  }

async refuseFriendRequest(id: number) {
  await this.prisma.$transaction([
  this.prisma.notification.update({
    where: { id: id },
    data: { status: Status.DECLINED },
  }),
  this.prisma.notification.delete({
    where:{
      id: id,
    },
  })
])
}


async findFriendRequestIdBySenderReceiver(senderId: string, receiverId: string): Promise<any> {
  console.log("seeeender ", senderId, " rec   ", receiverId);
  const friendrequest = await this.prisma.notification.findFirst({
    where: {
      userId :senderId  ,
      to: receiverId,
    },
    select: {
      id: true,
    },
  });

  return friendrequest;
}

async ChangeStateInGame(id: string, ingame: boolean)  //Chaning The State of Player in Game
{
  await this.prisma.user.update({
    where: {
      id,
    },
    data:{
      ingame: ingame,
    }
  })
}

async isauthenticated(id: string, isauth: boolean)
{
  await this.prisma.user.update({
    where:{id : id},
    data:{authenticated: isauth}
  })
} 
}