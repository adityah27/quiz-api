import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizMemoryService } from './local-database/quiz.local.memory.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,QuizMemoryService],
})
export class AppModule {}
