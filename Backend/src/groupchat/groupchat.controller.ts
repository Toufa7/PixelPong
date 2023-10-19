import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GroupchatService } from './groupchat.service';
import { updateGroupchatDto } from 'src/dto/UpdateGroupchat.dto';
import { CreateGroupchatDto } from 'src/dto/CreateGroupchat.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guards';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { join } from 'path';
import { createReadStream } from 'fs';
import { promises as fsPromises } from 'fs';
import { GroupchatGateway } from './groupchat.gateway';

@UseGuards(JwtGuard)
@Controller('groupchat')
export class GroupchatController {
    constructor(private readonly GroupchatService : GroupchatService, private readonly  GroupchatGateway : GroupchatGateway) {}

    //get number user of a groupchat
    @Get(":id/numberuser")
    numberuser(@Param('id') id: string): any {
        return this.GroupchatService.numberuser(id);
    }
    //get a all groupchat
    @Get("all")
    findallGp(): any {
        return this.GroupchatService.findAllGp();
    }

    //get a all groupchat is not member
    @Get("notmember")
    findallGpnotmember(@Req() req : any): any {
        return this.GroupchatService.findAllGpnotmember(req.user.id);
    }


    // @Get(":id/info")
    // findOne(@Param('id') id: string): any {
        //     return this.GroupchatService.findOne(id);
        // }
        //get all groupchat of a user
    @Get()
    findAll(@Req() Request : any): any {
        return this.GroupchatService.findAll(Request.user.id);
    }
    
    //get a groupchat
    @Get(":id/groupinfo")
    findOne(@Param() id : any) : any {
        console.log(id, " id")
        return this.GroupchatService.findOne(id.id);
    }
    //get all groupchat of a useradmin
    @Get("lifihomanaadmin/:id")
    findgpadmin(@Param('id') id: string): any {
        return this.GroupchatService.findgpadmin(id);
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

    //get userban of a groupchat
    @Get(":id/userban")
    findUserBan(@Param('id') id: string): any {
        return this.GroupchatService.findUserBan(id);
    }

    //get usermute of a groupchat
    @Get(":id/usermute")
    findUserMute(@Param('id') id: string): any {
        return this.GroupchatService.findUserMute(id);
    }
    
    
    
    //get image of a groupchat
    @Get('getimage/:id')
    @UseGuards(JwtGuard)
    async getImage(@Param('id') id: string, @Res() res) {
      try {
        const { image } = await this.GroupchatService.findOne(id);
        const path = join('./uploads/', image);
        await fsPromises.access(path, fsPromises.constants.F_OK);
        const file = createReadStream(path);
        const extension = image.split('.')[1];
        res.setHeader('Content-Type', 'image/' + extension);
        return file.pipe(res);
        
      } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(HttpStatus.NOT_FOUND).json('file not found');
      }
    }

    //crear a groupchat
    @Post()
    create(@Body() createGroupchatDto: CreateGroupchatDto , @Req() req : any): any {
        return this.GroupchatService.create(createGroupchatDto, req.user.id);
    }

    //upload a image to a groupchat
    @Post(":id/uploadimage")
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
    uploadimage(@UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Req() req : any): any {
        return this.GroupchatService.uploadimage(file.filename ,id, req.user.id);
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

    // ban a user from a groupchat
    @Patch(":id/:iduser/ban")
    ban(@Param('id') id: string, @Param('iduser') iduser : string, @Req() req : any): any {
        return this.GroupchatService.banuser(id, iduser, req.user.id);
    }

    // mute a user from a groupchat
    @Post(":id/:iduser/mute")
    mute(@Param('id') id: string, @Param('iduser') iduser : string, @Req() req : any): any {
        return this.GroupchatService.muteuser(id, iduser, req.user.id);
    }

    ///////// not working now  /////////
    //add a user to a groupchat public
    @Patch(':id/userpublic')
    adduser(@Param('id') id: string , @Req() req : any): any {
        return this.GroupchatService.adduser(id, req.user.id);
    }

    //add a user to a groupchat protected
    @Patch(":id/userprotected")
    adduserprotected(@Param('id') id: string,  @Req() req : any, @Body() pass : string): any {
        return this.GroupchatService.adduserprotected(id ,pass, req.user.id);
    }

    /////////////////////-------add an user to a groupchat private----////////////////////


    //send request to join a groupchat
    @Get(":id/request")
    sendrequest(@Param('id') id: string, @Req() req : any): any {
        console.log("sendrequest");
        this.GroupchatGateway.sendrequest(id, req.user.id);
    }
    //accept a request to join a groupchat
    @Patch(":id/:iduser/accept")
    acceptrequest(@Param('id') id: string, @Param('iduser') iduser : string, @Req() req : any): any {
        return this.GroupchatService.acceptrequest(id, iduser, req.user.id);
    }
    //refuse a request to join a groupchat
    @Patch(":id/:iduser/refuse")
    refuserequest(@Param('id') id: string, @Param('iduser') iduser : string, @Req() req : any): any {
        return this.GroupchatService.refuserequest(id, iduser, req.user.id);
    }
    //////////////////////////////////////-------------------////////////////////////////////////



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
    //exit a groupchat
    @Delete(":id/exit")
    exit(@Param('id') id: string, @Req() req : any): any {
        return this.GroupchatService.exit(id, req.user.id);
    }
    //delete an admin from a groupchat
    @Delete(":id/:iduser/admin")
    removeadmin(@Param('id') id: string, @Param('iduser') iduser : string, @Req() req : any): any {
        return this.GroupchatService.removeadmin(id, iduser, req.user.id);
    }
}
