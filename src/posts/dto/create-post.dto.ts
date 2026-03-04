import { IsString, Length } from "class-validator";

export class CreatePostDto {
    @IsString()
    title: string;
    
    @IsString()
    lead: string;
    
    @IsString()
    content: string;
}
