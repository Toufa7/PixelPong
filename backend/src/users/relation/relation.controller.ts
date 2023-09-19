import { Body, Controller, Post, ParseIntPipe, ParseUUIDPipe, ParseArrayPipe, Param, Patch, Query } from "@nestjs/common";
import { RelationService } from "./relation.service";
import { UserDto } from 'src/dto/user.dto';
import { FriendrequestDto } from 'src/dto/relation.dto'
import { query } from "express";

@Controller('relation')
export class RelationController {
    constructor(private Relationservice : RelationService) {}
    @Post('sendFriendRequest')
    async sendFriendRequest(@Query() query : FriendrequestDto) {
        return await this.Relationservice.sendFriendRequest(query.userId, query.friendId);
    }
    @Patch('acceptFriendRequest/:id')
    async acceptFriendRequest(@Query() query : FriendrequestDto){
        return await this.Relationservice.acceptFriendRequest(query.id, query.userId, query.friendId);
    }
    @Patch('refuseFriendRequest/:id')
    async refuseFriendRequest(@Query() query : FriendrequestDto){
        return await this.Relationservice.refuseFriendRequest(query.id);
    }
    // @Get('')
}

