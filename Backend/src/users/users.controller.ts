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
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../guards/jwt.guards';
import { UserDto } from 'src/authdto/user.dto';
import { FriendrequestDto } from 'src/authdto/relation.dto';
import { SocketGateway } from 'src/socket/socket.gateway';
import { User } from '@prisma/client';
import { HistoryService } from './gamedata/history.service';
import { achievementService } from './gamedata/acheievement.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
// import { User } from '@prisma/client';


@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(
	private readonly usersService: UsersService,
	private readonly socket: SocketGateway,
	private readonly history: HistoryService,
	private readonly achievement : achievementService
  ) {}
  @Get('all')
  findAll() {
	try {
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
  @Body() body: FriendrequestDto,
  @Req() req
): Promise<void> {
console.log("boooodyyyyy : ", body);
  try {
	await this.usersService.removefriend(req.user.id, body.to);
  } catch (error) {
	throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
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
	throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}

@Put('update')
async updateOne(@Req() req, @Body() body: UserDto): Promise<User | null> {
  try {
	const { username } = body;
	return await this.usersService.UpdateforOne(req.user.id, username);
  } catch (error) {
	throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}

@Patch('blocked')
async blockFriend(
  @Req() req,
  @Body() body: FriendrequestDto
): Promise<void> {
  try {
	console.log("body", body);
	await this.usersService.blockfriend(req.user.id, body.to);
  } catch (error) {
	throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}


@Get('profil/:username')
async findOneByUsername(@Param('username') username: string, @Req() req){
  try {
	const user = await this.usersService.findByName(username);
	if (!user) {
	  throw new HttpException('User not found', HttpStatus.NOT_FOUND);
	}
	//console.log("im herererererer 3678", user)

	return user;
  } catch (error) {
	throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}

@Get('profile/:id')
async findOneByid(@Param('id') id: string){
  try {
	if(typeof id !== 'string')
		throw ExceptionsHandler
	const user = await this.usersService.findById(id);
	if (!user) {
	  throw new HttpException('User not found', HttpStatus.NOT_FOUND);
	}
	return user;
  } catch (error) {
		throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}

@Patch('unblocked')
async unblockFriend(
  @Req() req,
  @Body() body: FriendrequestDto
): Promise<void> {
  try {
	await this.usersService.unblockfriend(req.user.id, body.to);
  } catch (error) {
	throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}

@Get('friends')
async getFriends(@Req() req) {
  try {
	return await this.usersService.getFriends(req.user.id);
  } catch (error) {
	throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}

@Get('friends/:id')
async getFriendsOfOther(@Param('id') id: string) {
  try {
	return await this.usersService.getFriends(id);
  } catch (error) {
	throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}

@Get('notifications')
async getallNotifications(@Req() req: any){
  try {
	const not = await this.usersService.getallNotifications(req.user.id);
	return not;	
  } catch (error) {
	throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}

@Post('sendFriendRequest') 
async sendFriendRequest(@Req() req: any, @Body() body: FriendrequestDto) {
  console.log("body", body.to)
  try {
	const already = await this.usersService.findFriendRequestIdBySenderReceiver(req.user.id, body.to);
	if(already)
		throw new HttpException('Failed to send friend request', HttpStatus.BAD_REQUEST);
	const user = await this.usersService.findOne(req.user.id);
	const data : FriendrequestDto =  {
	  userId: req.user.id,
	  type: 'friendrequestreceived',
	  photo: user.profileImage,
	  message: `${req.user.username} sent you a friend request`,
	  to: body.to,
	  from: user.username,
	}
	await this.socket.hanldleSendNotification(body.to, req.user.id,data);
	const notification = await this.usersService.sendFriendRequest(req.user.id, data);
	return notification;
  } catch (error) {		
	throw new HttpException('Failed to send friend request', HttpStatus.BAD_REQUEST);
  }
}

@Patch('acceptFriendRequest')
async acceptFriendRequest(@Req() req, @Body() body: FriendrequestDto) {
  try {
	const friendrequest = await this.usersService.findFriendRequestIdBySenderReceiver(body.userId, body.to);
	console.log('Bodyyyy', body);
	const find = await this.usersService.acceptFriendRequest(friendrequest.id, body.userId, body.to);
	return find;
  } catch (error) {
	throw new HttpException('Failed to add friend', HttpStatus.BAD_REQUEST);
  }
}

@Patch('refuseFriendRequest')
async refuseFriendRequest(@Req() req,	@Body() body: FriendrequestDto): Promise<any> {
  try {
	  const friendrequest = await this.usersService.findFriendRequestIdBySenderReceiver(body.userId, body.to);
	  console.log('Bodyyyyyyyy failed ', body);
	 const find = await this.usersService.refuseFriendRequest(friendrequest);
	 return find;
  } catch (error) {
	console.log(error.message);
	throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
  }
}

@Get('blocklist')
async getBlocklist(@Req() req)
{
	try{
		return await this.usersService.getBlocklist(req.user.id);
	}
	catch(error){
		throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
	}
}
@Get('blockme')
async getwhoBlockme(@Req() req)
{
	try{
	return await this.usersService.getwhoBlockme(req.user.id);
	}
	catch(error){
		throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
	
	}
}

@Get('history')
async getHistory(@Req() req)
{
	try{

		return await this.history.getMatchHistory(req.user?.id);
	}
	catch(error){
		throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
	
	}
}

@Get('achievements')
async getAchievement(@Req() req)
{
	try{
		return await this.achievement.getAchievement(req.user?.id)
	}
	catch(error){
		throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
	
	}
}
@Get('stats')
async getStats(@Req() req)
{
	try
	{
		return await this.history.getStats(req.user?.id);
	}
	catch(error){
		throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
	
	}
}

@Get('history/:id')
async getotherHistory(@Req() req,@Param() id: string)
{
	try{

		return await this.history.getMatchHistory(id);
	}
	catch(error){
		throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
	
	}
}

@Get('achievements/:id')
async getotherAchievement(@Req() req,@Param() id: any)
{
	try{

		return await this.achievement.getAchievement(id.id)
	}
	catch(error){
		throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
	
	}
}
@Get('stats/:id')
async getotherStats(@Req() req,@Param() param: any)
{
	try{

		return await this.history.getStats(param.id);
	}
	catch(e)
	{
		throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
	
	}
}


@Post('checkfriend')
async checkfriend(@Req() req, @Body() body: FriendrequestDto){
	try{
		const friends = await this.usersService.getFriends(req.user.id);
		const find = friends.find((item) => item.id === body.to);
		if(find)
			return true;
		return false;
	}
	catch(error){
		throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
	
	}
}
// check if user in blocklist
@Post('checkblock')//chk if you blocked smone
async checkblock(@Req() req, @Body() body: FriendrequestDto){
	try{

		const blocked = await this.usersService.getblocked(req.user.id);
		const find = blocked.blocked.find((item) => item.id === body.to);
		if(find)
			return true;
		return false;
	}
	catch(error){
		throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
	
	}
}

@Post('checkblockme')//chk if smone blocked you
async checkblockme(@Req() req, @Body() body: FriendrequestDto){
	try{

		const blocked = await this.usersService.getwhoBlockme(req.user.id);
		const find = blocked.find((item) => item.id === body.to);
		if(find)
			return true;
		return false;
	}
	catch(error)
	{
		throw new HttpException('Failed to remove friend', HttpStatus.BAD_REQUEST);
	}
}
}