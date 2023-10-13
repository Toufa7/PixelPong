import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GroupchatService } from './groupchat.service';
import { updateGroupchatDto } from 'src/dto/UpdateGroupchat.dto';
import { CreateGroupchatDto } from 'src/dto/CreateGroupchat.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guards';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

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

    //get all messages of a groupchat
    @Get(":id/messages")
    findAllMessages(@Param('id') id: string): any {
        return this.GroupchatService.findAllMessages(id);
    }

    //get superuser of a groupchat
    @Get(":id/superuser")
    findSuperUser(@Param('id') id: string): any {
        return this.GroupchatService.findSuperUser(id);
    }

    //create a groupchat
    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
              const filename: string = file.originalname.split('.')[0] + Date.now();
              const extension = file.originalname.split('.')[1];
              cb(null, `${filename}.${extension}`);
            },
          }),
        }),
      )
    create(@UploadedFile() file: Express.Multer.File, @Body() createGroupchatDto: CreateGroupchatDto , @Req() req : any): any {
        return this.GroupchatService.create(file.filename ,createGroupchatDto, req.user.id);
    }


    //update a groupchat
    @Patch(":id")
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
              const filename: string = file.originalname.split('.')[0] + Date.now();
              const extension = file.originalname.split('.')[1];
              cb(null, `${filename}.${extension}`);
            },
          }),
        }),
      )
    update(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Body() updateGroupchatDto: updateGroupchatDto , @Req() req : any): any { 
        return this.GroupchatService.update(file.filename ,id, updateGroupchatDto, req.user.id);
    }




    ///////// not working now  /////////
    //add a user to a groupchat
    @Patch(":id/:iduser/user")
    adduser(@Param('id') id: string, @Param('iduser') iduser : string , @Req() req : any): any {
        return this.GroupchatService.adduser(id, iduser, req.user.id);
    }
    //////////////////////////////////////




    //add an admin to a groupchat
    @Patch(":id/:iduser/admin")
    addadmin(@Param('id') id: string, @Param('iduser') iduser : string, @Req() req : any) : any {
        return this.GroupchatService.addadmin(id, iduser, req.user.id);
    }

    //delete a groupchat
    @Delete(":id")
    remove(@Param('id') id: string, @Req() req : any): any {
        return this.GroupchatService.remove(id, req.user.id);
    }

    //delete a user from a groupchat
    @Delete(":id/:iduser/user")
    removeuser(@Param('id') id: string, @Param('iduser') iduser : string, @Req() req : any): any {
        return this.GroupchatService.removeuser(id, iduser, req.user.id);
    }

    //delete an admin from a groupchat
    @Delete(":id/:iduser/admin")
    removeadmin(@Param('id') id: string, @Param('iduser') iduser : string, @Req() req : any): any {
        return this.GroupchatService.removeadmin(id, iduser, req.user.id);
    }
}
