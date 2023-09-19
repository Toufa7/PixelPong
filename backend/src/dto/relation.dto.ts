import { IsInt, IsString } from 'class-validator';

export class FriendrequestDto {
  @IsInt()
  id: number;

  @IsString()
  userId: string;

  @IsString()
  friendId: string;

  @IsString()
  status: string;

  createdAt: string;

  updatedAt: string;
}
