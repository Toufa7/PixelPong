import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe, 
    UseGuards,
    Put,
    ParseFloatPipe,
    ParseUUIDPipe,
    Req,
    Res,
    HttpException,
    HttpStatus,
    Query,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { JwtGuard } from  '../guards/jwt.guards';
  import { AuthGuard } from '@nestjs/passport';
  import { UserDto } from 'src/dto/user.dto';
import { FriendrequestDto } from 'src/dto/relation.dto';
  
  @Controller('users') 
  @UseGuards(JwtGuard)  
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get('all')
    async findAll() {
        const users = await this.usersService.findAll();
        if(!users){
          throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
        }
        return users;
    }

    @Get('/:id')
    findOne(@Param('id') params: UserDto ) {
      console.log(params.username)
        const user = this.usersService.findOne(params.username);
        if(!user){
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    @Patch(':userId/remove/:friendId')
    async removeFriend(@Param() params: FriendrequestDto)
    : Promise<void> {
      await this.usersService.removefriend(params.userId, params.friendId);
    }

    @Delete(':id')
    DeleteOne(@Param() params: UserDto ) {
        const user = this.usersService.DeleteOne(params.id);
        if(!user){
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }
 
   
    @Put(':id')
    UpdateOne(@Param() params: UserDto, @Body() body: any) {
        return this.usersService.UpdateforOne(params.id, body);
    }

    @Patch(':userId/blocked/:blockedId')
    async blockFriend(@Param() params: FriendrequestDto): Promise<void> {
      await this.usersService.blockfriend(params.userId, params.friendId);
    }
    @Get('profile/:username')
    async findOneByEmail(@Param() params: UserDto) {
       const user = await this.usersService.findByName(params.username);
        if(!user){
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);}
        console.log(user)
        return user;
    }
    @Patch(':userId/unblocked/:unblockedId')
    async unblockFriend(@Param() params: FriendrequestDto): Promise<void> {
      await this.usersService.unblockfriend(params.userId , params.friendId);
    }

    @Get(':UserId/Friends')
    async getFriends(@Param() params: UserDto)
    {await this.usersService.getFriends(params.id);}
  }

