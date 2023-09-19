import { IsInt, IsString } from 'class-validator';

export class MatchHistoryDto {
  @IsInt()
  numberOfMatches: number;

  @IsString()
  userId: string;

  createdAt: string;

  updatedAt: string;
}
