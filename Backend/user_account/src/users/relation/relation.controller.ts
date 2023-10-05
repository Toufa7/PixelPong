import { Controller, Post, Patch, Query } from '@nestjs/common';
import { RelationService } from './relation.service';
import { FriendrequestDto } from 'src/dto/relation.dto';
import { io } from 'socket.io-client';

@Controller('relation')
export class RelationController {
  constructor(private Relationservice: RelationService) {}
  @Post('sendFriendRequest')
  async sendFriendRequest(@Query() query: FriendrequestDto) {
    const friendrequest = await this.Relationservice.sendFriendRequest(
      query.userId,
      query.friendId,
    );
  
    // Assuming you have a user's socket ID or some identifier for the recipient

  }

    @Patch('acceptFriendRequest/:id')
  async acceptFriendRequest(@Query() query: FriendrequestDto) {
    return await this.Relationservice.acceptFriendRequest(
      query.id,
      query.userId,
      query.friendId,
    );
  }
  // @Patch('refuseFriendRequest/:id')
  // async refuseFriendRequest(@Query() query: FriendrequestDto) {
  //   return await this.Relationservice.refuseFriendRequest(query.id);
  // }
}
