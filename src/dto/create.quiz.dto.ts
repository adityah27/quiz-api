import {
  IsString,
  IsArray,
  IsInt,
  IsOptional,
  ArrayNotEmpty,
  IsUUID,
} from 'class-validator';
import { CreateQuestionDto } from './create.question.dto';

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  questions: CreateQuestionDto[];
}
