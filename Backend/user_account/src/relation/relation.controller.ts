import {
  Controller,
  Post,
  Patch,
  Query,
  Req,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common';
import { RelationService } from './relation.service';
import { FriendrequestDto } from 'src/dto/relation.dto';
import { SocketGateway } from 'src/socket/socket.gateway';
import { JwtGuard } from 'src/guards/jwt.guards';

@Controller('aa')
@UseGuards(JwtGuard)
export class RelationController {
  constructor(
    private Relationservice: RelationService,
    private readonly socket: SocketGateway,
  ) {}
  @Get('a')
  name() {
    console.log('hhhhhhhhh');
  }
  @Post('sendFriendRequest')
  async sendFriendRequest(@Req() req, @Body() body: FriendrequestDto) {
    const notification = await this.Relationservice.sendFriendRequest(
      req.user.id,
      body.friendId,
    );
    console.log('abas;go;oguaho;sgu');
    this.socket.hanldleSendNotification(body.friendId, req.user.id, {
      userId: req.user.id,
      type: 'friendrequestrecieved',
      to: body.friendId,
      photo: req.user.profileImage,
      message: `${req.user.username} sent you a friend request`,
    });
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
