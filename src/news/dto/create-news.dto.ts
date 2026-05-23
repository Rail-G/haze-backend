import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateNewsRequest {
    @IsString()
    @IsNotEmpty()
    @MinLength(4, {message: 'Слишком короткий заголовок'})
    @MaxLength(50, {message: 'Слишком длинный заголовок'})
    title!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4, {message: 'Слишком короткая категория'})
    @MaxLength(20, {message: 'Слишком длинная ктегория'})
    category!: string

    @IsString()
    @MinLength(100, {message: 'Слишком короткий текст'})
    text!: string
}

export class DeleteImageDto {
    @IsString()
    imagePath!: string
}