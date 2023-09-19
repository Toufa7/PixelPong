import { IsDateString, IsInt, IsString } from 'class-validator';

export class StatsDto {
  @IsInt()
  level: number;

  @IsString()
  userId: string;

  @IsInt()
  wins: number;

  @IsInt()
  loses: number;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
