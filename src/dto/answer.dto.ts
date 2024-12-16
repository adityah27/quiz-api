import {
  IsUUID,
  IsInt,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class AnswerDto {
  @IsUUID()
  quiz_id: string;

  @IsUUID()
  question_id: string;

  @IsInt()
  selected_option: number;

  @IsOptional()
  @IsBoolean()
  is_correct: boolean;

  @IsNumber()
  user_id: number;
}
