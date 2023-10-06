import { Controller, Post, Patch, Query, Req } from '@nestjs/common';
import { RelationService } from './relation.service';
import { FriendrequestDto } from 'src/dto/relation.dto';
import { io } from 'socket.io-client';
import { SocketGateway } from 'src/socket/socket.gateway';
import { User } from '@prisma/client';

@Controller('relation')
export class RelationController {
  constructor(
    private Relationservice: RelationService,
    private event: SocketGateway,
    private user: User,
  ) {}
  @Post('sendFriendRequest')
  async sendFriendRequest(@Req() req, @Query() query: FriendrequestDto) {
    const friendrequest = await this.Relationservice.sendFriendRequest(
      req.user.id,
      query.friendId,
    );
    this.event.hanldleSendNotification(query.userId, query.friendId, {
      userId: req.user.id,
      type: 'friendrequest',
      to: query.friendId,
      avatar: this.user.profileImage,
      message: `${this.user.username} sent friend request`,
    });
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
