import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/auth/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { async } from 'rxjs';
import { group } from 'console';
import e from 'express';


@Injectable()
export class GroupchatService {

    constructor(
        private readonly prisma: PrismaService,
        private jwtService: JwtService,
      ) {}

    async findAll(iduser: string) {
        const data = await this.prisma.groupchat.findMany(
            {
                where: {
                    usersgb : {some : {id : iduser}},
                },
            }
        );
        console.log(data);
        return data;
    }

    async findOne(id: string) {
        return await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
        });
    }

    async create(createGroupchatDto: any , iduser : string) {
        return await this.prisma.groupchat.create({
            data:{
                namegb : createGroupchatDto.namegb,
                usersgb : {connect : [{id : iduser} ]},
                admins : {connect : [{id : iduser} ]},
                grouptype : createGroupchatDto.grouptype,
                password : createGroupchatDto.password,
                image : createGroupchatDto.image,
            },
        });
    }
    async update(id: string, updateGroupchatDto: any) {
        return await this.prisma.groupchat.update({
            where: {
                id: id,
            },
            data: {
                namegb : updateGroupchatDto.namegb,
                grouptype : updateGroupchatDto.grouptype,
                password : updateGroupchatDto.password,
                image : updateGroupchatDto.image,
            },
        });
    }

    async remove(id: string) {
        return await this.prisma.groupchat.delete({
            where: {
                id: id,
            },
        });
    }

    async adduser(id: string, iduser : string) {
        return await this.prisma.groupchat.update({
            where: {
                id: id,
            },
            data: {
                usersgb : {connect : [{id : iduser} ]},
            },
        });
    }

    async findAllUsers(id: string) {
        return await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                usersgb: true,
            },
        });
    }

    async findAllAdmins(id: string) {
        return await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                admins: true,
            },
        });
    }
    async addadmin(id: string, iduser : string) {
        return await this.prisma.groupchat.update({
            where: {
                id: id,
            },
            data: {
                admins : {connect : [{id : iduser} ]},
            },
        });
    }

    async removeuser(id: string, iduser : string) {
        return await this.prisma.groupchat.update({
            where: {
                id: id,
            },
            data: {
                usersgb : {disconnect : [{id : iduser} ]},
            },
        });
    }

    async removeadmin(id: string, iduser : string) {
        return await this.prisma.groupchat.update({
            where: {
                id: id,
            },
            data: {
                admins : {disconnect : [{id : iduser} ]},
            },
        });
    }

    removeadminuser(id: string, iduser : string , iduserconnected : string) { 
        const admins = this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                admins: true,
            },
        });
        // if (admins == iduserconnected) {
        //     return this.prisma.groupchat.update({
        //         where: {
        //             id: id,
        //         },
        //         data: {
        //             usersgb : {disconnect : [{id : iduser} ]},
        //         },
        //     });
        // }
        // else {
        //     return "you are not an admin";
        // }
    }
}
