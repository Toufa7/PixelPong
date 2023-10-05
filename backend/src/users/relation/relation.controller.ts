import { Controller, Post, Patch, Query } from '@nestjs/common';
import { RelationService } from './relation.service';
import { FriendrequestDto } from 'src/dto/relation.dto';

@Controller('relation')
export class RelationController {
  constructor(private Relationservice: RelationService) {}
  @Post('sendFriendRequest')
  async sendFriendRequest(@Query() query: FriendrequestDto) {
    return await this.Relationservice.sendFriendRequest(
      query.userId,
      query.friendId,
    );
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
