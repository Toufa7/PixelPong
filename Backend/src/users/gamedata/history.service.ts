// import { StatsUncheckedUpdateInput } from '@prisma/client';
import {Injectable,  HttpException,   HttpStatus} from '@nestjs/common';
import { Type } from '@prisma/client';
import { PrismaService } from 'src/auth/prisma.service';
import { achievementService } from './acheievement.service';






@Injectable()
export class HistoryService {
    constructor(private readonly prisma: PrismaService,
        private readonly achiev: achievementService){
    }

async addMatchHistory(userId:string){
    try{

        let stats = null;
        const find = await this.prisma.stats.findFirst({
            where: {
                userId: userId,
            }
        });
        
        if(!find)
        {
            stats = await this.prisma.stats.create({
                data: {
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            }); 
        } 
        else
        stats = find;
    return stats
    }   
    catch(error){
     throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
}
 async updateMatchHistory(winnerId:string, loserId:string){
    try{

        const winner = await this.prisma.user.findUnique({
            where: {
                id: winnerId,
            },
        })
        const loser = await this.prisma.user.findUnique({
            where: {
                id: loserId,
            },
        });
        await this.prisma.$transaction([
            this.prisma.matchHistory.create({
                data: {
                    user: {
                        connect: {
                            id: winnerId,
                        },
                    },
                    other: loser.username,
                    otherid: loser.id,
                    message: `WIN`,
                },
            }),
            this.prisma.stats.updateMany({
                where: {
                    userId: winnerId,
                },
                data: {
                    wins: {
                        increment: 1,
                    },
                    numberOfMatches:{
                        increment: 1,
                    }
                },
            }),
            this.prisma.matchHistory.create({
                data: {
                    user: {
                        connect: {
                            id: loserId,
                        },
                    },
                    other:winner.username,
                    otherid: winner.id, 
                    message: `LOSE`,
                },
            }),
            this.prisma.stats.updateMany({
                where: {
                    userId: loserId,
                },
                data: {
                    loses: {  
                        increment: 1,
                    },
                    numberOfMatches:{
                        increment: 1,
                    }
                },
            }),
        ])
        await this.achiev.updateAchievement(winnerId, null);
        await this.achiev.updateAchievement(loserId, null);
    }
    catch(error){
        throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
}
    async getMatchHistory(userId:string){
    try{

        const matchHistory = await this.prisma.matchHistory.findMany({
            where: {
                userId: userId,
            },
        });
        return matchHistory;
    }
    catch(error){
        throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
    }
}
async getStats(id:string){
    try{
    const stats = await this.prisma.stats.findUnique({
        where: {
            userId: id,
        },
    });
    if (stats)
    {
        if (stats.wins * 20 >= 100){
            await this.prisma.stats.updateMany({
                where : {
                    id : stats.id,
                },
                data : {
                    level : (((stats.wins * 20) / 10) / 10) as number
                }
            });
        }
    }
    return stats;
    }
    catch(error){
        throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
        } 
    }
}