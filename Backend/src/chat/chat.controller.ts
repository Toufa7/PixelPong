import { Controller, Get, Param, Req, UseGuards , Patch, Body, HttpStatus, HttpException} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/guards/jwt.guards';
import { ChatGateway } from './chat.gateway';
import { Dmschat } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {

    constructor(private readonly ChatService: ChatService, private readonly ChatGateway : ChatGateway) {}

    //get old messages from dmschat
    @Get('getOldMessages/:idrecever')
    async getOldMessages(@Req() req: any ,@Param('idrecever') idrecever: string): Promise<Dmschat[]>  {
        return await this.ChatService.getOldMessages(req.user.id, idrecever);
    }
    //send request to join game
    @Get(':idrecever/requestjoingame')
    async requestjoingame(@Req() req: any ,@Param('idrecever') idrecever: string) {
        return await this.ChatGateway.requestjoingame(req.user.username ,req.user.id, idrecever);
    }
    // accept request to join game
    @Patch(':idrecever/acceptrequestjoingame')
    async acceptrequestjoingame(@Req() req , @Body() data , @Param('idrecever') idrecever: string) {
        return await this.ChatGateway.acceptrequestjoingame(req.user.id, data.token, idrecever);
    }
    // refuse request to join game
    @Patch(':idrecever/refuserequestjoingame')
    async refuserequestjoingame(@Req() req, @Param('idrecever') idrecever: string) {
        return await this.ChatGateway.refuserequestjoingame(req.user, idrecever);
    }
}