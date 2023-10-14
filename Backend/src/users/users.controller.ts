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
import { UserDto } from 'src/authdto/user.dto';
import { FriendrequestDto } from 'src/authdto/relation.dto';
import { SocketGateway } from 'src/socket/socket.gateway';
import { User } from '@prisma/client';
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
    try{
    const users = this.usersService.findAll();
    if (!users) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    return users;
  }
  catch(error){
    console.log(error.message)
  }
  }

  @Get('profil')
  async findOne(@Req() req) {
    try
    {
    console.log("wtf : ",req.user.id) 
    const user = await this.usersService.findOne(req.user.id);
    if (!user) {
      console.log("im herererererer 3678")
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  catch(error){
    console.log(error.message);
  }
  }

 @Patch('remove')
async removeFriend(
  @Body('friendId', ParseUUIDPipe) body: FriendrequestDto,
  @Req() req: any
): Promise<void> {
  try {
    await this.usersService.removefriend(req.user.id, body.from);
  } catch (error) {
    console.error(error.message); // Log the error for debugging
  }
}

@Delete('delete')
async deleteOne(@Req() req: any): Promise<void> {
  try {
    const user = await this.usersService.DeleteOne(req.user.id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  } catch (error) {
    console.error(error.message);
  }
}

@Put('update')
async updateOne(@Req() req: any, @Body() body: UserDto): Promise<User | null> {
  try {
    const { username } = body;
    return await this.usersService.UpdateforOne(req.user.id, username);
  } catch (error) {
    console.error(error.message); // Log the error for debugging
  }
}

@Patch('blocked')
async blockFriend(
  @Req() req: any,
  @Body('friendId', ParseUUIDPipe) body: FriendrequestDto
): Promise<void> {
  try {
    await this.usersService.blockfriend(req.user.id, body.from);
  } catch (error) {
    console.error(error.message); // Log the error for debuggin
  }
}

@Get('profil/:username')
async findOneByUsername(@Param('username') username: string){
  try {
    const user = await this.usersService.findByName(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  } catch (error) {
    console.error(error.message); // Log the error for debugging
  }
}

@Get('profile/:id')
async findOneByid(@Param('id') id: string){
  try {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  } catch (error) {
    console.error(error.message); // Log the error for debugging
    // throw new HttpException('Failed to fetch user', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@Patch('unblocked')
async unblockFriend(
  @Req() req: any,
  @Body('friendId', ParseUUIDPipe) body: FriendrequestDto
): Promise<void> {
  try {
    await this.usersService.unblockfriend(req.user.id, body.from);
  } catch (error) {
    console.error(error); // Log the error for debugging
  }
}

@Get('friends')
async getFriends(@Req() req: any) {
  try {
    return await this.usersService.getFriends(req.user.id);
  } catch (error) {
    console.error(error); // Log the error for debugging
  }
}

@Get('friends/:id')
async getFriendsOfOther(@Param('id') id: string) {
  try {
    return await this.usersService.getFriends(id);
  } catch (error) {
    console.error(error); // Log the error for debugging
  }
}

@Post('sendFriendRequest')
async sendFriendRequest(@Req() req: any, @Body() body: FriendrequestDto) {
  try {
    const notification = await this.usersService.sendFriendRequest(req.user.id, body.userId);
    const user = await this.usersService.findOne(req.user.id);
    this.socket.hanldleSendNotification(body.userId, req.user.id, {
      userId: req.user.id,
      type: 'friendrequestreceived',
      photo: user.profileImage,
      message: `${req.user.username} sent you a friend request`,
      from: body.userId,
      username: user.username,
    });
    return notification;
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw new HttpException('Failed to send friend request', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

@Patch('acceptFriendRequest')
async acceptFriendRequest(@Body() body: FriendrequestDto) {
  try {
    const friendrequest = await this.usersService.findFriendRequestIdBySenderReceiver(body.userId, body.from);
    console.log('Bodyyyy', body);
    const find = await this.usersService.acceptFriendRequest(friendrequest, body.userId, body.from);
    return find;
  } catch (error) {
    console.error(error); // Log the error for debugging
  }
}

@Patch('refuseFriendRequest/')
async refuseFriendRequest(@Body() body: FriendrequestDto): Promise<void> {
  try {
    const friendrequest = await this.usersService.findFriendRequestIdBySenderReceiver(body.userId, body.from);
    return await this.usersService.refuseFriendRequest(friendrequest);
  } catch (error) {
    console.error(error); // Log the error for debugging
  }
}

}
