/* eslint-disable */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { GroupchatService } from './groupchat.service';
import { updateGroupchatDto } from 'src/dto/UpdateGroupchat.dto';
import { CreateGroupchatDto } from 'src/dto/CreateGroupchat.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guards';

@UseGuards(JwtGuard)
@Controller('groupchat')
export class GroupchatController {
    constructor(private readonly GroupchatService : GroupchatService ) {}

    //get all groupchat of a user
    @Get()
    findAll(@Req() Request : any): any {
        return this.GroupchatService.findAll(Request.user.id);
    }

    // get one groupchat
    @Get(":id")
    findOne(@Param('id') id: string): any {
        return this.GroupchatService.findOne(id);
    }

    //get all users of a groupchat
    @Get(":id/users")
    findAllUsers(@Param('id') id: string): any {
        return this.GroupchatService.findAllUsers(id);
    }

    //get all admins of a groupchat
    @Get(":id/admins")
    findAllAdmins(@Param('id') id: string): any {
        return this.GroupchatService.findAllAdmins(id);
    }

    //create a groupchat
    @Post()
    create(@Body() createGroupchatDto: CreateGroupchatDto, @Req()  req : any): any {
        console.log("=================");
        return this.GroupchatService.create(createGroupchatDto, req.user.id);
    }


    //update a groupchat
    @Patch(":id")
    update(@Param('id') id: string, @Body() updateGroupchatDto: updateGroupchatDto): any { 
        return this.GroupchatService.update(id, updateGroupchatDto);
    }

    //add a user to a groupchat
    @Patch(":id/:iduser")
    adduser(@Param('id') id: string, @Param('iduser') iduser : string): any {
        return this.GroupchatService.adduser(id, iduser);
    }

    //add an admin to a groupchat
    @Patch(":id/:iduser")
    addadmin(@Param('id') id: string, @Param('iduser') iduser : string) : any {
        return this.GroupchatService.addadmin(id, iduser);
    }

    //delete a groupchat
    @Delete(":id")
    remove(@Param('id') id: string): any {
        return this.GroupchatService.remove(id);
    }

    //delete a user from a groupchat
    @Delete(":id/:iduser")
    removeuser(@Param('id') id: string, @Param('iduser') iduser : string): any {
        return this.GroupchatService.removeuser(id, iduser);
    }

    //delete an admin from a groupchat
    @Delete(":id/:iduser")
    removeadmin(@Param('id') id: string, @Param('iduser') iduser : string): any {
        return this.GroupchatService.removeadmin(id, iduser);
    }

    //delete a user from a groupchat if you are an admin
    @Delete(":id/:iduser")
    removeuseradmin(@Param('id') id: string, @Param('iduser') iduser : string, @Req() req : any): any {
        return this.GroupchatService.removeadminuser(id, iduser, req.user.id);
    }
}
