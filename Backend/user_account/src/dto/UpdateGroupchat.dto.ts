import { IsString } from 'class-validator';
import { CreateGroupchatDto } from './CreateGroupchat.dto';
import { PartialType } from '@nestjs/mapped-types';


export class updateGroupchatDto extends PartialType (CreateGroupchatDto){
    
}