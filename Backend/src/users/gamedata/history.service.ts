// import { StatsUncheckedUpdateInput } from '@prisma/client';
import {Injectable} from '@nestjs/common';
import { PrismaService } from 'src/auth/prisma.service';






@Injectable()
export class HistoryService {
    constructor(private readonly prisma: PrismaService){
    }

async addMatchHistory(winnerId:string, loserId:string){
    const loser = await this.prisma.user.findUnique({
        where: {
            id: loserId,
        },
    })
    const winner = await this.prisma.user.findUnique({
        where: {
            id: winnerId,
        },
    })

    console.log("userid " + winnerId, " loserid" + loserId);
    const newMatchHistory = await this.prisma.matchHistory.create({
        data: {
            user: {
                connect: {
                    id: winnerId,
                },
            },
            loser: {
                connect: {
                    id: loserId,
                },
            },
            message: `${winner.username  } won against ${  loser.username}}`
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