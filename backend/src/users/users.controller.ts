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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../guards/jwt.guards';
import { UserDto } from 'src/dto/user.dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
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
  @Get('profile/:username')
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
  async getFriends(@Param('id', ParseUUIDPipe) id: string) {
    await this.usersService.getFriends(id);
  }
}
