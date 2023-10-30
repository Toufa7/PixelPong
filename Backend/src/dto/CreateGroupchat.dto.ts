import { IsNotEmpty, IsString, NotContains, notContains } from "class-validator";


export class CreateGroupchatDto {
    @IsNotEmpty()
    @NotContains(' ', { message: 'Field must not contain only spaces' })
    @IsString()
    namegb : string;

    @IsNotEmpty()
    @IsString()
    grouptype: string;

    password? : string;
}

