// import { StatsUncheckedUpdateInput } from '@prisma/client';
import {Injectable} from '@nestjs/common';
import { PrismaService } from 'src/auth/prisma.service';






@Injectable()
export class HistoryService {
    constructor(private readonly prisma: PrismaService){
    }

async addMatchHistory(userId:string, loserId:string){

    const newMatchHistory = await this.prisma.matchHistory.create({
        data: {
            user: {
                connect: {
                    id: userId,
                },
            },
            loser: {
                connect: {
                    id: loserId,
                },
            },
            message: `${userId  } won against ${  loserId}}`
        },
    });
    return newMatchHistory;
}
async createStats(userId:string){
    const newStats = await this.prisma.stats.create({
        data: {
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
    return newStats;
}
async updateStats(userId:string, loserId:string){
    const stats = await this.prisma.stats.findUnique({
        where: {
            userId: userId,
        },
    });
    const loserStats = await this.prisma.stats.findUnique({
        where: {
            userId: loserId,
        },
    });
    const newStats = await this.prisma.stats.update({
        where: {
            userId: userId,
        },
        data: {
            wins: stats.wins + 1,
        },
    });
    const newLoserStats = await this.prisma.stats.update({
        where: {
            userId: loserId,
        },
        data: {
            loses: loserStats.loses + 1,
        },
    });
    return newStats;
}
}