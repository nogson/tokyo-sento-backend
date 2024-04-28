import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  content: string;
}
