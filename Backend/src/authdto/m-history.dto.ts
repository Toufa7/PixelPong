import { IsDateString, IsInt, IsString } from 'class-validator';

export class MatchHistoryDto {
  @IsInt()
  numberOfMatches: number;

  @IsString()
  userId: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
