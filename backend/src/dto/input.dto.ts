import { Optional } from '@nestjs/common';
import { IsDateString, IsInt, IsString } from 'class-validator';
export class inputDto {
    @Optional()
    @IsString()
    readonly otp: string;
    
}