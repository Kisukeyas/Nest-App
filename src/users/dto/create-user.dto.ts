import { IsString, MinLength, MaxLength, IsInt } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    readonly screenName: string;
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    readonly password: string;
}