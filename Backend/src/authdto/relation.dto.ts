import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class  FriendrequestDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  from: string;

  // @IsOptional()
  // @IsString()
  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  to: string;

  @IsOptional()
  @IsString()  
  status?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
