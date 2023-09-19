import { IsString } from 'class-validator';

export class AchievementsDto {
  @IsString()
  name: string;

  @IsString()
  userId: string;

  @IsString()
  achievementType: string;

  createdAt: string;

  updatedAt: string;
}
