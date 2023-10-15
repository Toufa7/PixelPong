import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/guards/jwt.guards';


@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {

    constructor(private readonly ChatService: ChatService ) {}

    //get old messages from dmschat
    @Get('getOldMessages/:idrecever')
    async getOldMessages(@Req() req: any ,@Param('idrecever') idrecever: string) {
        return await this.ChatService.getOldMessages(req.user.id, idrecever);
    }

}