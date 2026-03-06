import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator'

export class CreateAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
