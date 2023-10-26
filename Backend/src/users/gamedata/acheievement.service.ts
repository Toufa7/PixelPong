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
  async updateAchievement(userId: string, type: Type){
    const achievement = await this.prisma.achievements.findFirst({
      where: {
        userId: userId,
      },
    })

    if(achievement)
    {
      for(let i = 0; i < achievement?.achievementType.length; i++)
      {
        if(achievement.achievementType[i] === type)
          return;
      }
    }
    const update = await this.prisma.achievements.update({
      where: {
        id: achievement.id,
        },
      data: {
        achievementType: {
          set: [...achievement.achievementType, type],
        }
      }
  })
}}
//chekc with khalil how we will do this
  