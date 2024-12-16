import { Injectable } from '@nestjs/common';
import { QuizMemoryService } from './local-database/quiz.local.memory.service';
import { CreateQuizDto } from './dto/create.quiz.dto';
import { CreateResultDto } from './dto/create.result.dto';
import { AnswerDto } from './dto/answer.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(private readonly localService: QuizMemoryService) {}

  async createQuiz(createQuizDto: CreateQuizDto) {
    const newQuizId = uuidv4(); // Generate a new UUID for the quiz
    const questionsWithIds = createQuizDto.questions.map((question) => {
      return {
        ...question,
        id: uuidv4(), // Generate a new UUID for each question
      };
    });

    // Construct the quiz object with the generated UUID
    const newQuiz = {
      id: newQuizId,
      title: createQuizDto.title,
      questions: questionsWithIds,
    };

    return this.localService.createQuiz(newQuiz);
  }

  async getQuizById(id: string) {
    return this.localService.getQuizById(id);
  }

  async submitAnswer(answerDto: AnswerDto) {
    return this.localService.submitAnswer(answerDto);
  }

  async submitQuiz(createResultDto: CreateResultDto) {
    return this.localService.createResult(createResultDto);
  }
}
