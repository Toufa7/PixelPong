import { IsDateString, IsString } from 'class-validator';

export class AchievementsDto {
  @IsString()
  name: string;

  @IsString()
  userId: string;

  @IsString()
  achievementType: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
