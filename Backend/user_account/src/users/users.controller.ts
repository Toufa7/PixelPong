import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  ParseUUIDPipe,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../guards/jwt.guards';
import { UserDto } from 'src/dto/user.dto';
import { FriendrequestDto } from 'src/dto/relation.dto';
import { SocketGateway } from 'src/socket/socket.gateway';
// import { User } from '@prisma/client';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly socket: SocketGateway,
  ) {}
  @Get('all')
  findAll() {
    const users = this.usersService.findAll();
    if (!users) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  @Get('/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id);
    console.log(user.authenticated) 
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  
  @Patch(':userId/remove/:friendId')
  async removeFriend(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('friendId', ParseUUIDPipe) friendId: string,
  ): Promise<void> {
    await this.usersService.removefriend(userId, friendId);
  }

  @Delete(':id')
  DeleteOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.usersService.DeleteOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  UpdateOne(@Param('id', ParseUUIDPipe) id: string, @Body() body: UserDto) {
    const { username } = body;
    return this.usersService.UpdateforOne(id, username);
  }

  @Patch(':userId/blocked/:blockedId')
  async blockFriend(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('blockedId', ParseUUIDPipe) blockedId: string,
  ): Promise<void> {
    await this.usersService.blockfriend(userId, blockedId);
  }
  @Get('profil/:username')
  async findOneByEmail(@Param('username') username: string) {
    const user = await this.usersService.findByName(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  @Patch(':userId/unblocked/:unblockedId')
  async unblockFriend(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('unblockedId', ParseUUIDPipe) blockedId: string,
  ): Promise<void> {
    await this.usersService.unblockfriend(userId, blockedId);
  }

  @Get(':UserId/Friends')
  async getFriends(@Param('UserId') id: string) {
    return await this.usersService.getFriends(id);
  }

  @Post('sendFriendRequest')
  async sendFriendRequest(@Req() req, @Body() body: FriendrequestDto) {
    const notification = await this.usersService.sendFriendRequest(
      req.user.id,
      body.userId,
    );
    //console.log('req', req.user);
    const user = await this.usersService.findOne(req.user.id)
    this.socket.hanldleSendNotification(body.userId, req.user.id, {
      userId: req.user.id,
      type: 'friendrequestrecieved',
      photo: user.profileImage,
      message: `${req.user.username} sent you a friend request`,
      from: body.userId,
      username: user.username,
    });
    return notification;
  }

  @Patch('acceptFriendRequest')
  async acceptFriendRequest(@Body() body: FriendrequestDto) {
    const friendrequest = await  this.usersService.findFriendRequestIdBySenderReceiver(
      body.userId,
      body.from)
      console.log("Bodyyyy", body)
    const find = await  this.usersService.acceptFriendRequest(
      friendrequest,
      body.userId,
      body.from,
    );
    return find;
  }
  @Patch('refuseFriendRequest/')
  async refuseFriendRequest(@Body() body: FriendrequestDto) {
    const friendrequest = await  this.usersService.findFriendRequestIdBySenderReceiver(
      body.userId,
      body.from)
    return await this.usersService.refuseFriendRequest(friendrequest);
  }
}
