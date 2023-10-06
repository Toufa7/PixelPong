import { Controller, Post, Patch, Query, Req, Body } from '@nestjs/common';
import { RelationService } from './relation.service';
import { FriendrequestDto } from 'src/dto/relation.dto';
import { SocketGateway } from 'src/socket/socket.gateway';

@Controller('relation')
export class RelationController {
  constructor(private Relationservice: RelationService,private readonly socket: SocketGateway) {}
  @Post('sendFriendRequest')
  async sendFriendRequest(@Req() req, @Body() body: FriendrequestDto) {
     const  notification = await this.Relationservice.sendFriendRequest(
      req.user.id,
      body.friendId,
    )
      this.socket.hanldleSendNotification(body.friendId, req.user.id, {
        userId: req.user.id,
        type: 'friendrequestrecieved',
        to: body.friendId,
        photo: req.user.profileImage,
        message: `${req.user.username} sent you a friend request`,
    }
    )
    return notification;
  }
  @Patch('acceptFriendRequest/:id')
  async acceptFriendRequest(@Query() query: FriendrequestDto) {
    return await this.Relationservice.acceptFriendRequest(
      query.id,
      query.userId,
      query.friendId,
    );
  }
  @Patch('refuseFriendRequest/:id')
  async refuseFriendRequest(@Query() query: FriendrequestDto) {
    return await this.Relationservice.refuseFriendRequest(query.id);
  }
  // @Get('')
}
