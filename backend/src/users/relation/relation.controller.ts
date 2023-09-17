import { Body, Controller, Post, ParseIntPipe, ParseUUIDPipe, ParseArrayPipe, Param, Patch } from "@nestjs/common";
import { RelationService } from "./relation.service";


@Controller('relation')
export class RelationController {
    constructor(private Relationservice : RelationService) {}
    @Post('sendFriendRequest')
    async sendFriendRequest(
        @Body('senderId', ParseUUIDPipe,) senderId: string, 
        @Body('recieverId', ParseUUIDPipe,) recieverId: string, ) {
        return await this.Relationservice.sendFriendRequest(senderId, recieverId);
    }
    @Patch('acceptFriendRequest/:id')
    async acceptFriendRequest(@Param('id', ParseIntPipe) id: number,
    @Body('senderId', ParseUUIDPipe,) senderId: string,
    @Body('recieverId', ParseUUIDPipe,) recieverId: string,){
        return await this.Relationservice.acceptFriendRequest(id, senderId, recieverId);
    }
    @Patch('refuseFriendRequest/:id')
    async refuseFriendRequest(@Param('id', ParseIntPipe) id: number){
        return await this.Relationservice.refuseFriendRequest(id);
    }
    // @Get('')
}

