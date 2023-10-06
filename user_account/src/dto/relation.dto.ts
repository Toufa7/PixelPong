import { IsDateString, IsInt, IsString } from 'class-validator';

export class FriendrequestDto {
  @IsInt()
  id: number;

  @IsString()
  userId: string;

  @IsString()
  friendId: string;

  @IsString()
  status: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
