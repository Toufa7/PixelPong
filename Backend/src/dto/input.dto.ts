import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';
export class inputDto {
  @Optional()
  @IsString()
  readonly otp: string;
}
