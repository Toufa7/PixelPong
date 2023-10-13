import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class FriendrequestDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  userId: string;
  @IsOptional()
  @IsString()
  from: string;
  @IsOptional()
  @IsString()
  status: string;
  @IsOptional()
  @IsDateString()
  createdAt: string;
  @IsOptional()
  @IsDateString()
  updatedAt: string;
}
