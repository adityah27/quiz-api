import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateQuizDto } from './dto/create.quiz.dto';
import { AnswerDto } from './dto/answer.dto';
import { CreateResultDto } from './dto/create.result.dto';

@Controller('api/quiz')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    try {
      const result = await this.appService.createQuiz(createQuizDto);
      if (!result) {
        throw new HttpException(
          'Error creating quiz',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return { success: true, message: 'Quiz created successfully', result };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error creating quiz',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getQuiz(@Param('id') id: string) {
    try {
      const result = await this.appService.getQuizById(id);
      if (!result) {
        throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, message: 'Quiz fetched successfully', result };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error fetching quiz',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('submit')
  async submitAnswer(@Body() answerDto: AnswerDto) {
    try {
      const result = await this.appService.submitAnswer(answerDto);
      if (!result) {
        throw new HttpException(
          'Error submitting answer',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        success: true,
        message: 'Answer submitted successfully',
        result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error submitting answer',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('result')
  async getResults(@Body() createResultDto: CreateResultDto) {
    try {
      const result = await this.appService.submitQuiz(createResultDto);
      if (!result) {
        throw new HttpException(
          'Error processing result',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        success: true,
        message: 'Results processed successfully',
        result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error processing result',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
