import { Injectable,  HttpException,   HttpStatus } from '@nestjs/common';
import { PrismaService } from '../auth/prisma.service';
import { Status, Type, User, UserStatus } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    try{

      const users = await this.prisma.user.findMany();
      return users;
    }
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }
  async findOne(id: string) {
    try{

      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    }
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }
  async DeleteOne(id: string) {
    try{

      const user = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return user;
    }
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }

  // async addfriend(userId: string, friendId: string): Promise<void> {
  // }
  async removefriend(userId: string, friendId: string): Promise<void> {
    try{

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
      await this.prisma.user.update({
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
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }
  async blockfriend(userId: string, blockedId: string): Promise<void> {
    try {
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
            id: blockedId,
          },
          data: {
            friends: {
              disconnect: {
                id: userId,
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
    } catch (error) {
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }
  
  async UpdateforOne(id: string, username: string) {
    try{
      
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
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }
  async findOneByEmail(email: string): Promise<User | null> {
    try{

      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    }
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }
  async findByName(username: string) {
    // //console.log(username);
    try{

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
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string) {
    // //console.log(username);
    try{

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
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }
  async unblockfriend(userId: string, unblockedId: string): Promise<void> {
    try{

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
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }
  getFriends(id: string) {
    try{

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
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }
  async updatestatus(user, status) {
    // console.log("123 :: : :: ",status)
    try{

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
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }
  async sendFriendRequest(senderId: string, data: any) {
    try{

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
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }
  
  async acceptFriendRequest(id: number, senderId: string, recieverId: string) {
    try{
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
    }
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
  }
  

  async getallNotifications(id: string){
    try{

      const notifications = await this.prisma.notification.findMany({
        where:{
          to: id,
        },
      });
      return notifications;   
    }
    catch(error){
      throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }

  }

async refuseFriendRequest(id: number) {
  try{

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
  }catch(error){
    throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}


async findFriendRequestIdBySenderReceiver(senderId: string, receiverId: string): Promise<any> {
  try{

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
  catch(error){
    throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}

async ChangeStateInGame(id: string, ingame: boolean)  //Chaning The State of Player in Game
{
  try{

    await this.prisma.user.update({
      where: {
        id,
      },
      data:{
        ingame: ingame,
      }
    })
  }
  catch(error){
    throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}

async isauthenticated(id: string, isauth: boolean)
{
  try{

    await this.prisma.user.update({
    where:{id : id},
      data:{authenticated: isauth}
    })
  }
  catch(error){
    throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}

async getBlocklist(id: string){
  try{

    const data =  await this.prisma.user.findUnique({
      where:{
        id: id,
      },
      select:
      {
        blocked: true,
      }
      
    });
    return  data?.blocked;
  }
  catch(error){
    throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}
async getwhoBlockme(id: string){
  try{

    const data =  await this.prisma.user.findUnique({
      where:{
        id: id,
      },
      select:
      {
        blockedby: true,
      }
      
    });
    return  data?.blockedby;
  }
  catch(error){
    throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  
  }
}
async getblocked(id: string)
{
  try{

    const blocked = await this.prisma.user.findUnique({
      where:{
        id: id,
      },
      select:{
        blocked: true,
      }
    })
    return blocked;
  }
  catch(error){
    throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  
  }
}
}