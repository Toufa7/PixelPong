import { Controller, Get, Param, Req, UseGuards , Patch, Body} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/guards/jwt.guards';
import { ChatGateway } from './chat.gateway';


@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {

    constructor(private readonly ChatService: ChatService, private readonly ChatGateway : ChatGateway) {}

    //get old messages from dmschat
    @Get('getOldMessages/:idrecever')
    async getOldMessages(@Req() req: any ,@Param('idrecever') idrecever: string) {
        return await this.ChatService.getOldMessages(req.user.id, idrecever);
    }
    //send request to join game
    @Get(':idrecever/requestjoingame')
    async requestjoingame(@Req() req: any ,@Param('idrecever') idrecever: string) {
        return await this.ChatGateway.requestjoingame(req.user.username ,req.user.id, idrecever);
    }
    // accept request to join game
    @Patch('acceptrequestjoingame')
    async acceptrequestjoingame(@Req() req: any , @Body() data : any) {
        return await this.ChatService.acceptrequestjoingame(req.user.id, data.token);
    }
    // refuse request to join game
    @Patch('refuserequestjoingame')
    async refuserequestjoingame(@Req() req: any) {
        return await this.ChatService.refuserequestjoingame(req.user.id);
    }
}