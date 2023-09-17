import { Injectable } from "@nestjs/common";
import { Status } from "@prisma/client";
import { PrismaService } from "src/auth/prisma.service";


@Injectable()
export class achievementService {
    constructor(private prisma: PrismaService) {}
    // async gameAchivement(UserId: string, wins: )
    // {

    // }
    // async relationAchievement(){
        
    // }
}
//chekc with khalil how we will do this
