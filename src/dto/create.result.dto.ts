import { IsUUID, IsInt, IsArray } from 'class-validator';
import { AnswerDto } from './answer.dto';

export class CreateResultDto {
  @IsUUID()
  quiz_id: string;

  @IsUUID()
  user_id: string;
}
