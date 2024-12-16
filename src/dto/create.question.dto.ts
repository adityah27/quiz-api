import { IsString, IsArray, IsInt, IsOptional, IsUUID } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsInt()
  correct_option: number;
}
