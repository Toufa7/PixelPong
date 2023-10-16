import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/auth/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GroupchatService {

    constructor(
        private readonly prisma: PrismaService,
        private jwtService: JwtService,
      ) {}
    



      
    //get all groupchat of a user
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
    //get all groupchat of a useradmin
    async findgpadmin(iduser: string) {
        const data = await this.prisma.groupchat.findMany(
            {
                where: {
                    admins : {some : {id : iduser}},
                },
            }
        );
        console.log(data);
        return data;
    }

    // get one groupchat
    async findOne(id: string) {
        return await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
        });
    }
    
    //get all users of a groupchat
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

     //get all admins of a groupchat
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

    //get all messages of a groupchat
    async findAllMessages(id: string) {
        return await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                messagesgb : true,
            },
        });
    }
    //get superuser of a groupchat
    async findSuperUser(id: string) {
        return await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                superadmin: true,
            },
        });
    }

    //get userban of a groupchat
    async findUserBan(id: string) {
        return await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                usersblock: true,
            },
        });
    }

    //get usermute of a groupchat
    async findUserMute(id: string) {
        return await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                usersmute: true,
            },
        });
    }

    //create a groupchat
    async create(createGroupchatDto: any, iduser : string) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(createGroupchatDto.password, saltOrRounds);
        return await this.prisma.groupchat.create({
            data:{
                namegb : createGroupchatDto.namegb,
                usersgb : {connect : [{id : iduser} ]},
                admins : {connect : [{id : iduser} ]},
                superadmin : {connect : {id : iduser} },
                grouptype : createGroupchatDto.grouptype,
                password : hash,
            },
        });
    }

    //upload a image to a groupchat
    async uploadimage(filename : string, id: string, iduserconnected : string) {
        //get sueperadmin of the groupchat
        const superadmin = await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                superadmin: true,
            },
        });
        if (superadmin.superadmin.id == iduserconnected)
        {
            return await this.prisma.groupchat.update({
                where: {
                    id: id,
                },
                data: {
                    image : filename,
                },
            });
        }
        else{
            return "You are not the superadmin of this groupchat";
        }
    }
    
    //update a groupchat
    async update(filename : string, id: string, updateGroupchatDto: any, iduserconnected : string) {
        const saltOrRounds = 10;
        const hash : string = await bcrypt.hash(updateGroupchatDto.password, saltOrRounds);
        //get all admins of the groupchat
        const admins = await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                admins: true,
            },
        });
        //check if the user is an admin of the groupchat
        var admin = false;
        admins.admins.forEach(element => {
            if(element.id == iduserconnected){
                admin = true;
            }
        });
        if(admin)
        {
            return await this.prisma.groupchat.update({
                where: {
                    id: id,
                },
                data: {
                    namegb : updateGroupchatDto.namegb,
                    grouptype : updateGroupchatDto.grouptype,
                    password : hash,
                    image : filename,
                },
            });
        }
        else{
            return "You are not an admin of this groupchat";
        }
    }

    //ban a user from a groupchat
    async banuser(id: string, iduser : string, iduserconnected : string) {
        const admins = await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                admins: true,
            },
        });
        //check if the user is an admin of the groupchat
        var admin = false;
        admins.admins.forEach(element => {
            if(element.id == iduserconnected){
                admin = true;
            }
        });
        if (admin)
        {
            return await this.prisma.groupchat.update({
                where: {
                    id: id,
                },
                data: {
                    usersblock : {connect : [{id : iduser} ]},
                    usersgb : {disconnect : [{id : iduser} ]},
                },
            });
        }
        else{
            return "You are not the admin of this groupchat";
        }
    }

    //mute a user from a groupchat
    async muteuser(id: string, iduser : string, iduserconnected : string) {
        const admins = await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                admins: true,
            },
        });
        //check if the user is an admin of the groupchat
        var admin = false;
        admins.admins.forEach(element => {
            if(element.id == iduserconnected){
                admin = true;
            }
        });
        if (admin)
        {
            return await this.prisma.groupchat.update({
                where: {
                    id: id,
                },
                data: {
                    usersmute : {connect : [{id : iduser} ]},
                },
            });
        }
        else{
            return "You are not the admin of this groupchat";
        }
    }

    ////// not working now ///////
    //add a user to a groupchat public

    async adduser(id: string, iduser : string, iduserconnected : string) {
            return await this.prisma.groupchat.update({
                where: {
                    id: id,
                },
                data: {
                    usersgb : {connect : {id : iduser}} ,
                },
            });
    }

    //add a user to a groupchat protected
    async adduserprotected(id: string, iduser : string, iduserconnected : string) {
        const groupchat = await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                password: true,
            },
        });
        const validPassword = await bcrypt.compare(iduser, groupchat.password);
        if(validPassword)
        {
            return await this.prisma.groupchat.update({
                where: {
                    id: id,
                },
                data: {
                    usersgb : {connect : {id : iduser}} ,
                },
            });
        }
        else{
            return "Wrong password";
        }
    }
    ////////////////////////////////////////////////




    //add an admin to a groupchat
    async addadmin(id: string, iduser : string, iduserconnected : string) {
        //get sueperadmin of the groupchat
        const superadmin = await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                superadmin: true,
            },
        });
        if (superadmin.superadmin.id == iduserconnected)
        {
            return await this.prisma.groupchat.update({
                where: {
                    id: id,
                },
                data: {
                    admins : {connect : [{id : iduser} ]},
                },
            });
        }
        else{
            return "You are not the superadmin of this groupchat";
        }
    }

    //delete a groupchat
    async remove(id: string, iduserconnected : string) {
        const superadmin = await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                superadmin: true,
            },
        });
        if (superadmin.superadmin.id == iduserconnected)
        {
            return await this.prisma.groupchat.delete({
                where: {
                    id: id,
                },
            });
        }
        else{
            return "You are not the superadmin of this groupchat";
        }
    }

    //delete a user from a groupchat
    async removeuser(id: string, iduser : string, iduserconnected : string) {
         //get all admins of the groupchat
         const admins = await this.prisma.groupchat.findUnique({
            where: {
                id: id,
            },
            select: {
                admins: true,
            },
        });
        //check if the userconnected  is an admin of the groupchat
        var admin = false;
        admins.admins.forEach(element => {
            if(element.id == iduserconnected){
                admin = true;
            }
        });
        //check if the user not an admin of the groupchat
        var notadmin = true;
        admins.admins.forEach(element => {
            if(element.id == iduser){
                notadmin = false;
            }
        });
        if(admin || iduserconnected == iduser || notadmin)
        {
            return await this.prisma.groupchat.update({
                where: {
                    id: id,
                },
                data: {
                    usersgb : {disconnect : [{id : iduser} ]},
                },
            });
        }
    }

    //delete an admin from a groupchat
    async removeadmin(id: string, iduser : string,  iduserconnected : string) {
        //get sueperadmin of the groupchat
        const superadmin = await this.prisma.groupchat.findUnique({
        where: {
            id: id,
        },
        select: {
            superadmin: true,
        },
    });
    if ((superadmin.superadmin.id == iduserconnected || iduserconnected == iduser) && iduserconnected != superadmin.superadmin.id)
    {
            return await this.prisma.groupchat.update({
                where: {
                    id: id,
                },
                data: {
                    admins : {disconnect : [{id : iduser} ]},
                },
            });
        }
        else{
            return "You are not the superadmin of this groupchat";
        }
    }
}

