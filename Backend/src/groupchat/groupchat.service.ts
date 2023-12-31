import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/auth/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Cron } from '@nestjs/schedule';
import { Groupchat, Messagegb, Requestjoingroup, User, usermute } from '@prisma/client';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { errorMonitor } from 'events';
import { updateGroupchatDto } from 'src/dto/UpdateGroupchat.dto';

@Injectable()
export class GroupchatService {

    constructor(
        private readonly prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    //get number user of a groupchat
    async numberuser(id: string): Promise<number> {
        try {
            const data = await this.prisma.groupchat.findUnique({
                where: {
                    id: id,
                },
                select: {
                    usersgb: true,
                },
            });
            return data.usersgb.length;
        }
        catch (error) {
            return 0;
        }
    }

    //check if a user is a superuser of a groupchat
    async checksuperuser(id: string, iduserconnected: string): Promise<boolean> {
        try {
            const data = await this.prisma.groupchat.findUnique({
                where: {
                    id: id,
                },
                select: {
                    superadmin: true,
                },
            });
            if (data && data.superadmin.id == iduserconnected) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            return false;
        }
    }


    //check if a user is a adminuser of a groupchat
    async checkadminuser(id: string, iduserconnected: string): Promise<boolean> {
        try {
            const data = await this.prisma.groupchat.findUnique({
                where: {
                    id: id,
                },
                select: {
                    admins: true
                },
            });
            let check = false
            data.admins.forEach((admin) => {
                if (admin.id == iduserconnected) {
                    check = true;
                }
            });
            return check;
        }
        catch (error) {
            return false;
        }
    }


    // get one groupchat
    async findOne(id: string): Promise<Groupchat> {
        try {
            return await this.prisma.groupchat.findUnique({
                where: {
                    id: id,
                },
            });
        }
        catch (error) {
            return ;
        }
    }

    //get a all groupchat
    async findAllGp(): Promise<Groupchat[]> {
        try {
            return await this.prisma.groupchat.findMany();
        }
        catch (error) {
            return [];
        }
    }

    //get a all groupchat is not member
    async findAllGpnotmember(iduser: string): Promise<Groupchat[]> {
        try {
            return await this.prisma.groupchat.findMany(
                {
                    where: {
                        usersgb: { none: { id: iduser } },
                    },
                }
            );
        }
        catch (error) {
            return [];
        }
    }
    //get groupchats of a user pasing  iduser
    async findAllGpuser(iduser: string): Promise<Groupchat[]> {
        try {
            return await this.prisma.groupchat.findMany(
                {
                    where: {
                        usersgb: { some: { id: iduser } },
                    },
                }
            );
        }
        catch (error) {
            return [];
        }
    }

    //get all groupchat of a user
    async findAll(iduser: string): Promise<Groupchat[]> {
        try {

            return await this.prisma.groupchat.findMany(
                {
                    where: {
                        usersgb: { some: { id: iduser } },
                    },
                }
            );
        }
        catch (error) {
            return [];
        }
    }


    //get all groupchat of a useradmin
    async findgpadmin(iduser: string): Promise<Groupchat[]> {
        try {
            //get all groupchat where user is admin
            const data = await this.prisma.groupchat.findMany(
                {
                    where: {
                        admins: { some: { id: iduser } },
                    },
                }
            );
            if (data)
                return data;
            else
                return null;
        }
        catch (error) {
            return [];
        }
    }

    //get all users of a groupchat if not admin
    async findAllUsers(id: string): Promise<User[]> {
        try {
            const data = await this.prisma.groupchat.findUnique({
                where: {
                    id: id,
                },
                select: {
                    usersgb: true,
                    admins: true,
                },
            });
            if (data) {
                var users = [];
                data.usersgb.forEach(user => {
                    let check = true;
                    data.admins.forEach(admin => {
                        if (user.id == admin.id) {
                            check = false;
                        }
                    });
                    if (check) {
                        users.push(user);
                    }
                });
                return users;
            }
            else
                return [];
        }
        catch (error) {
            return [];
        }
    }

    //get all admins of a groupchat
    async findAllAdmins(id: string): Promise<User[]> {
        try {
            const data = await this.prisma.groupchat.findUnique({
                where: {
                    id: id,
                },
                select: {
                    admins: true,
                },
            });
            return data.admins;
        }
        catch (error) {
            return [];
        }
    }

    //get all messages of a groupchat
    async findAllMessages(id: string, iduserconnected: string): Promise<Messagegb[]> {
        try {
            //get user is blocked
            const userblock = await this.prisma.user.findUnique({
                where: {
                    id: iduserconnected,
                },
                select: {
                    blocked: true,
                    blockedby: true,
                },
            });
            const messages = await this.prisma.groupchat.findUnique({
                where: {
                    id: id,
                },
                select: {
                    messagesgb: true,
                },
            });
            var messagessend = [];
            if (messages && userblock) {
                messages.messagesgb.forEach(element => {
                    let check = true;
                    userblock.blocked.forEach(user => {
                        if (element.senderid == user.id)
                            check = false;
                    });
                    userblock.blockedby.forEach(user => {
                        if (element.senderid == user.id)
                            check = false;
                    });
                    if (check) {
                        messagessend.push(element);
                    }
                });
            }
            return messagessend;

        }
        catch (error) {
            return [];
        }
    }
    //get superuser of a groupchat
    async findSuperUser(id: string): Promise<User> {
        try {
            const data = await this.prisma.groupchat.findUnique({
                where: {
                    id: id,
                },
                select: {
                    superadmin: true,
                },
            });
            return data.superadmin;
        }
        catch (error) {
            return null;
        }
    }

    //get userban of a groupchat
    async findUserBan(id: string): Promise<User[]> {
        try {
            const data = await this.prisma.groupchat.findUnique({
                where: {
                    id: id,
                },
                select: {
                    usersblock: true,
                },
            });
            return data.usersblock;
        }
        catch (error) {
            return [];
        }
    }

    //get usermute of a groupchat
    async findUserMute(id: string): Promise<usermute[]> {

        try {
            const data = await this.prisma.groupchat.findUnique({
                where: {
                    id: id,
                },
                select: {
                    usersmute: true,
                },
            });
            return data.usersmute;
        }
        catch (error) {
            return [];
        }
    }


    //get Requestjoingroup of a groupchat
    async findRequestjoingroup(id: string): Promise<Requestjoingroup[]> {

        try {
            return await this.prisma.requestjoingroup.findMany({
                where: {
                    receiverId: id,
                },
            });
        }
        catch (error) {
            return [];
        }
    }



    //create a groupchat
    async create(createGroupchatDto: any, iduser: string): Promise<Groupchat> {
        
        try {
            const namegp = await this.prisma.groupchat.findUnique({
                where: {
                    namegb: createGroupchatDto.namegb,
                },
            });
            
            if (namegp == null) {
                if (createGroupchatDto.password && createGroupchatDto.password.length >= 8) {
                    const saltOrRounds = 10;
                    createGroupchatDto.password = await bcrypt.hash(createGroupchatDto.password, saltOrRounds);
                }
                else if (createGroupchatDto.grouptype == 'PROTECTED') {
                    console.log("here is create groupchat ===>>>");
                    throw new HttpException('Password must be at least 8 characters', HttpStatus.OK);
                }
                console.log("here is create groupchat");
                return await this.prisma.groupchat.create({
                    data: {
                        namegb: createGroupchatDto.namegb,
                        usersgb: { connect: [{ id: iduser }] },
                        admins: { connect: [{ id: iduser }] },
                        superadmin: { connect: { id: iduser } },
                        grouptype: createGroupchatDto.grouptype,
                        password: createGroupchatDto.password,
                    },
                });
            }
            else {
                throw new HttpException('name of Groupchat already exist', HttpStatus.OK);
            }
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    //upload a image to a groupchat
    async uploadimage(filename: string, id: string, iduserconnected: string) :  Promise<void> {
        //get sueperadmin of the groupchat

        try {
            const superadmin = await this.findSuperUser(id);
            if (superadmin.id == iduserconnected) {
                await this.prisma.groupchat.update({
                    where: {
                        id: id,
                    },
                    data: {
                        image: filename,
                    },
                });
                throw new HttpException('Image upload ', HttpStatus.ACCEPTED);

            }
            else {
                throw new HttpException('Image not upload ', HttpStatus.OK);
            }
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    //update a groupchat
    async update(id: string, updateGroupchatDto: updateGroupchatDto, iduserconnected: string): Promise<void> {
        try {
            if (updateGroupchatDto.password) {
                const saltOrRounds = 10;
                updateGroupchatDto.password = await bcrypt.hash(updateGroupchatDto.password, saltOrRounds);
            }
            //get all admins of the groupchat
            const admins = await this.findAllAdmins(id);
            //check if the user is an admin of the groupchat
            var admin = false;
            admins.forEach(element => {
                if (element.id == iduserconnected) {
                    admin = true;
                }
            });
            if (admin) {
                const data = await this.prisma.groupchat.update({
                    where: {
                        id: id,
                    },
                    data: {
                        namegb: updateGroupchatDto.namegb,
                        grouptype : updateGroupchatDto.grouptype,
                        password: updateGroupchatDto.password,
                    },
                });
                if (data)
                    throw new HttpException('Groupchat updated', HttpStatus.ACCEPTED);
            }
            else {
                throw new HttpException('You are not the admin of this groupchat', HttpStatus.OK);
            }
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    //ban a user from a groupchat
    async banuser(id: string, iduser: string, iduserconnected: string): Promise<void> {
        try {
            const admins = await this.findAllAdmins(id);
            //check if the user is an admin of the groupchat
            var admin = false;
            admins.forEach(element => {
                if (element.id == iduserconnected) {
                    admin = true;
                }
            });
            if (admin) {
                const data = await this.prisma.groupchat.update({
                    where: {
                        id: id,
                    },
                    data: {
                        usersblock: { connect: [{ id: iduser }] },
                        usersgb: { disconnect: [{ id: iduser }] },
                    },
                });
                if (data)
                    throw new HttpException('User banned', HttpStatus.OK);
            }
            else {
                throw new HttpException('You are not the admin of this groupchat', HttpStatus.OK);
            }
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    //mute a user from a groupchat
    async muteuser(id: string, iduser: string, iduserconnected: string, time: number): Promise<void> {
        try {
            const admins = await this.findAllAdmins(id);
            //check if the user is an admin of the groupchat
            var admin = false;
            admins.forEach(element => {
                if (element.id == iduserconnected) {
                    admin = true;
                }
            });
            if (admin) {
                const data = await this.prisma.usermute.create({
                    data: {
                        user: { connect: { id: iduser } },
                        groupchat: { connect: { id: id } },
                        expiresAt: new Date(Date.now() + time),
                    },
                });
                if (data)
                    throw new HttpException('User muted', HttpStatus.CREATED);
            }
            else {
                throw new HttpException('You are not the admin of this groupchat', HttpStatus.OK);
            }
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    //add a user to a groupchat public

    async adduser(id: string, iduserconnected: string): Promise<void> {
        try {   //get user ban of the groupchat
            const userban = await this.findUserBan(id);
            //check if the user is not banned
            var notban = true;
            userban.forEach(element => {
                if (element.id == iduserconnected) {
                    notban = false;
                }
            });
            if (notban) {
                const data = await this.prisma.groupchat.update({
                    where: {
                        id: id,
                    },
                    data: {
                        usersgb: { connect: { id: iduserconnected } },
                    },
                });
                if (data)
                    throw new HttpException('User added', HttpStatus.CREATED);
            }
            else {
                throw new HttpException('You are banned from this groupchat', HttpStatus.OK);
            }
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    //add a user to a groupchat protected
    async adduserprotected(id: string, pass: string, iduserconnected: string): Promise<void> {
        try {

            //get user ban of the groupchat
            const userban = await this.findUserBan(id);
            //check if the user is not banned
            var notban = true;
            userban.forEach(element => {
                if (element.id == iduserconnected) {
                    notban = false;
                }
            });
            if (notban) {
                const groupchat = await this.prisma.groupchat.findUnique({
                    where: {
                        id: id,
                    },
                    select: {
                        password: true,
                    },
                });
                const validPassword = await bcrypt.compare(pass, groupchat.password);
                if (validPassword) {
                    const data = await this.prisma.groupchat.update({
                        where: {
                            id: id,
                        },
                        data: {
                            usersgb: { connect: { id: iduserconnected } },
                        },
                    });
                    if (data)
                        throw new HttpException('User added', HttpStatus.CREATED);
                }
                else {
                    throw new HttpException('Password is incorrect', HttpStatus.OK);
                }
            }
            else {
                throw new HttpException('You are banned from this groupchat', HttpStatus.OK);
            }
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }

    }

    //accept a request to join a groupchat
    async acceptrequest(id: string, iduser: string, iduserconnected: string): Promise<void> {
        try {
            const superadmin = await this.findSuperUser(id);
            //select the request
            const request = await this.prisma.requestjoingroup.findFirst({
                where: {
                    AND: [
                        { senderId: iduser },
                        { receiverId: superadmin.id },
                    ],
                },
            });
            //delete the request
            await this.prisma.requestjoingroup.delete({
                where: {
                    id: request.id,
                },
            });
            if (superadmin.id == iduserconnected) {
                await this.prisma.requestjoingroup
                const data = await this.prisma.groupchat.update({
                    where: {
                        id: id,
                    },
                    data: {
                        usersgb: { connect: [{ id: iduser }] },
                    },
                });
                if (data)
                    throw new HttpException('User added', HttpStatus.CREATED);
            }
            else {
                throw new HttpException('You are not the admin of this groupchat', HttpStatus.OK);
            }
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    //refuse a request to join a groupchat
    async refuserequest(id: string, iduser: string, iduserconnected: string): Promise<void> {

        try {
            const superadmin = await this.findSuperUser(id);

            //select the request
            const request = await this.prisma.requestjoingroup.findFirst({
                where: {
                    AND: [
                        { senderId: iduser },
                        { receiverId: superadmin.id },
                    ],
                },
            });
            //delete the request
            await this.prisma.requestjoingroup.delete({
                where: {
                    id: request.id,
                },
            });
            if (superadmin.id == iduserconnected) {
                throw new HttpException('User refused', HttpStatus.CREATED);
            }
            else {
                throw new HttpException('You are not the admin of this groupchat', HttpStatus.OK);
            }
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    ////////////////////////////////////////////////
    //add an admin to a groupchat
    async addadmin(id: string, iduser: string, iduserconnected: string): Promise<void> {
        try {        //get sueperadmin of the groupchat
            const superadmin = await this.findSuperUser(id);
            if (superadmin.id == iduserconnected) {
                const data = await this.prisma.groupchat.update({
                    where: {
                        id: id,
                    },
                    data: {
                        admins: { connect: [{ id: iduser }] },
                    },
                });
                if (data)
                    throw new HttpException('User added in admins', HttpStatus.CREATED);
            }
            else {
                throw new HttpException('You are not the superadmin of this groupchat', HttpStatus.OK);
            }
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    //delete a groupchat
    async remove(id: string, iduserconnected: string) {
        try {
            const superadmin = await this.findSuperUser(id);
            //delete all messages of the groupchat
            await this.prisma.messagegb.deleteMany({
                where: {
                    idgp: id,
                },
            });
            //delete all useersmute of the groupchat
            await this.prisma.usermute.deleteMany({
                where: {
                    groupchatId: id,
                },
            });
            if (superadmin.id == iduserconnected) {
                const data = await this.prisma.groupchat.delete({
                    where: {
                        id: id,
                    },
                });
                if (data)
                    throw new HttpException('Groupchat deleted', HttpStatus.ACCEPTED);
            }
            else {
                throw new HttpException('You are not the superadmin of this groupchat', HttpStatus.OK);
            }
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    //delete a user from a groupchat
    async removeuser(id: string, iduser: string, iduserconnected: string): Promise<void> {
        try { //get all admins of the groupchat
            const admins = await this.findAllAdmins(id);

            //check if the userconnected  is an admin of the groupchat
            var admin = false;
            admins.forEach(element => {
                if (element.id == iduserconnected) {
                    admin = true;
                }
            });

            //check if the user not an admin of the groupchat
            var notadmin = true;
            admins.forEach(element => {
                if (element.id == iduser) {
                    notadmin = false;
                }
            });

            if (admin || iduserconnected == iduser || notadmin) {
                const data = await this.prisma.groupchat.update({
                    where: {
                        id: id,
                    },
                    data: {
                        usersgb: { disconnect: [{ id: iduser }] },
                    },
                });
                if (data)
                    throw new HttpException('User Kicked', HttpStatus.ACCEPTED);
            }
        }
        catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    //exit a groupchat
    async exit(id: string, iduserconnected: string): Promise<void> {
        try {

            //check if the userconnected  is a superadmin of the groupchat
            const superadmin = await this.findSuperUser(id);
            if (superadmin.id == iduserconnected) {
                //delete all messages of the groupchat
                await this.prisma.messagegb.deleteMany({
                    where: {
                        idgp: id,
                    },
                });
                await this.prisma.groupchat.delete({
                    where: {
                        id: id,
                    },
                });
                throw new HttpException('Groupchat deleted', HttpStatus.ACCEPTED);
            }

            // get all admins of the groupchat
            const admins = await this.findAllAdmins(id);
            //check if the userconnected  is an admin of the groupchat
            if (admins.some(admin => admin.id == iduserconnected)) {
                await this.prisma.groupchat.update({
                    where: {
                        id: id,
                    },
                    data: {
                        admins: { disconnect: [{ id: iduserconnected }] },
                        usersgb: { disconnect: [{ id: iduserconnected }] },
                    },
                });
            }


            const data = await this.prisma.groupchat.update({
                where: {
                    id: id,
                },
                data: {
                    usersgb: { disconnect: [{ id: iduserconnected }] },
                },
            });
            if (data)
                throw new HttpException('User exit', HttpStatus.ACCEPTED);
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    //delete an admin from a groupchat
    async removeadmin(id: string, iduser: string, iduserconnected: string): Promise<void> {

        try { //get sueperadmin of the groupchat
            const superadmin = await this.findSuperUser(id);
            if ((superadmin.id == iduserconnected || iduserconnected == iduser) && iduser != superadmin.id) {
                const data = await this.prisma.groupchat.update({
                    where: {
                        id: id,
                    },
                    data: {
                        admins: { disconnect: [{ id: iduser }] },
                    },
                });
                if (data)
                    throw new HttpException('User deleted from admins', HttpStatus.ACCEPTED);
            }
            else {
                throw new HttpException('You are not the superadmin of this groupchat', HttpStatus.OK);
            }
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }


    //////check if user is expired mute ///////

    @Cron('*/5 * * * * *')
    async expiremute() {
        try {
            const usermute = await this.prisma.usermute.findMany({
                where: {
                    expiresAt: { lte: new Date() },
                },
            });
            usermute.forEach(element => {
                const data = this.prisma.usermute.delete({
                    where: {
                        id: element.id,
                    },
                });
            });
        }
        catch (error) {
            return;
        }
    }
}

