import { Injectable } from '@nestjs/common';
import { Type } from '@prisma/client';
import { PrismaService } from 'src/auth/prisma.service';

@Injectable()
export class achievementService {
  constructor(private prisma: PrismaService) {}
  async createAchievement(userId: string, type: Type){
    let achievement = await this.prisma.achievements.findFirst({
      where: {
        userId: userId,
      },
    })
    if(!achievement)
  {
    achievement = await this.prisma.achievements.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        achievementType: [type],
      },
    });
    return achievement;
  }
  }

  async getAchievement(id: string)
  {
    const achievemnet = await this.prisma.achievements.findFirst({
      where: {
          userId: id,
      },
  });
  return achievemnet;
  }
  async updateAchievement(userId: string, type: Type){
    const find = await this.prisma.stats.findFirst({
        where: {
            userId: userId,
        }
      });
      let acheievement : Type  = type;
      if(find)
      {
        if(find.wins === 5)
            acheievement = Type.WIN5;
        else if(find.wins === 10)
            acheievement = Type.WIN10;
        else if(find.wins === 1)
            acheievement = Type.FIRSTWIN;
        else if(find.loses === 1)
            acheievement = Type.FIRSTLOSE;
        else
            acheievement = type;
      }
    const achievement = await this.prisma.achievements.findFirst({
      where: {
        userId: userId,
      },
    })
    if(acheievement)
    {
      for(let i = 0; i < achievement?.achievementType.length; i++)
      {
        if(achievement.achievementType[i] === acheievement)
          return;
      }
      const update = await this.prisma.achievements.update({
        where: {
          id: achievement?.id,
        },
        data: {
          achievementType: {
            set: [...achievement?.achievementType, acheievement],
          }
        }
      })
    }

}}
//chekc with khalil how we will do this
  