import { Optional } from '@nestjs/common';
import { IsDateString, IsInt, IsString } from 'class-validator';

export class FriendrequestDto {
  @Optional()
  @IsInt()
  id: number;

  @IsString()
  userId: string;

  @IsString()
  friendId: string;

  // @Optional()
  // @IsString()
  // status: string;

  // @Optional()
  // @IsDateString()
  // createdAt: string;

  // @Optional()
  // @IsDateString()
  // updatedAt: string;
}
