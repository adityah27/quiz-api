import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from 'src/dto/create.quiz.dto';
import { CreateResultDto } from 'src/dto/create.result.dto';
import { AnswerDto } from '../dto/answer.dto';

@Injectable()
export class QuizMemoryService {
  private quizzes = [];
  private results = [];

  async createQuiz(createQuizDto: CreateQuizDto) {
    //push the quiz obj to array
    this.quizzes.push(createQuizDto);
    return createQuizDto;
  }

  async getQuizById(id: string) {
    //get quiz by id
    return this.quizzes.find((quiz) => quiz.id === id);
  }

  async submitAnswer(answerDto: AnswerDto) {
    const { user_id, quiz_id, question_id, selected_option } = answerDto;
    // Find the quiz to get the particular quiz id that will help to find the questions
    const quiz = this.quizzes.find((q) => q.id === quiz_id);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    //Find the question by id recived from the quiz obj
    const question = quiz.questions.find((q) => q.id === question_id);
    if (!question) {
      throw new Error('Question not found');
    }

    // Check if the selected answer is correct
    const isCorrect = selected_option === question.correct_option;

    const submissionObj = {
      user_id: user_id,
      quiz_id: quiz_id,
      question: question,
      submission: {
        is_correct: isCorrect,
        selected_option: selected_option,
      },
    };

    this.results.push(submissionObj);

    return {
      isCorrect,
      correct_option: question.correct_option,
      selected_option,
    };
  }

  createResult(createResultDto: CreateResultDto) {
    // variable to store the result for the specific user_id
    const userResults = {
      user_id: createResultDto.user_id,
      score: 0, // Initial score
      answers: [],
    };

    // Loop through each result to process them
    this.results.forEach((result) => {
      // Check if the result belongs to the user_id provided in the payload
      if (result.user_id === createResultDto.user_id) {
        const { submission } = result;

        // Update the user's score based on whether the answer is correct
        if (submission.is_correct) {
          userResults.score += 1;
        }

        // Store the user's individual answers
        userResults.answers.push({
          question: result.question.text,
          correct_option:
            result.question.options[result.question.correct_option],
          selected_option: result.question.options[submission.selected_option],
          is_correct: submission.is_correct,
        });
      }
    });

    // Return the result for the specific user
    return userResults;
  }
}
