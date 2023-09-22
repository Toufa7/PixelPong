import { IsBoolean, IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsOptional()
  readonly id: string;

  @IsOptional()
  @IsString()
  readonly username: string | null;

  @IsOptional()
  @IsEmail()
  readonly email: string | null;

  @IsOptional()
  @IsString()
  readonly token: string | null;

  @IsOptional()
  @IsString()
  readonly twofasecret: string | null;

  @IsOptional()
  @IsString()
  readonly twofatoken: string | null;

  @IsOptional()
  @IsString()
  readonly profileImage: string | null;

  @IsOptional()
  @IsBoolean()
  readonly twofa: boolean | null;

  // @IsDateString()
  readonly createdAt: string;

  // @IsDateString()
  readonly updatedAt: string;
}
