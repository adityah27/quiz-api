import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateQuizDto } from './dto/create.quiz.dto';
import { AnswerDto } from './dto/answer.dto';
import { CreateResultDto } from './dto/create.result.dto';
import { CreateQuestionDto } from './dto/create.question.dto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const mockAppService = {
      createQuiz: jest.fn(),
      getQuizById: jest.fn(),
      submitAnswer: jest.fn(),
      submitQuiz: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('createQuiz', () => {
    it('should return success message when quiz is created successfully', async () => {
      const questions: Partial<CreateQuestionDto> = {}
      const createQuizDto: CreateQuizDto = {
        "title": "Quiz 1",
        "questions": [
          {
            "text": "What is the capital of France?",
            "options": ["Berlin", "Madrid", "Paris", "Rome"],
            "correct_option": 2
          },
          {
            "text": "Which element has the chemical symbol 'O'?",
            "options": ["Oxygen", "Osmium", "Ozone", "Oxygenium"],
            "correct_option": 0
          },
          {
            "text": "What is the largest planet in our solar system?",
            "options": ["Earth", "Jupiter", "Saturn", "Mars"],
            "correct_option": 1
          },
          {
            "text": "Who wrote the play 'Romeo and Juliet'?",
            "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            "correct_option": 1
          },
          {
            "text": "Which country is known as the Land of the Rising Sun?",
            "options": ["China", "India", "Japan", "Thailand"],
            "correct_option": 2
          }
        ]
      };

      const result = { id: '1', ...createQuizDto };
      jest.spyOn(appService, 'createQuiz').mockResolvedValue(result);

      const response = await appController.createQuiz(createQuizDto);
      expect(response).toEqual({
        success: true,
        message: 'Quiz created successfully',
        result,
      });
    });
    
  });

  describe('getQuiz', () => {
    it('should return quiz details when quiz is found', async () => {
      const quizId = '1';
      const quiz = { id: quizId, title: 'Test Quiz', questions: ['Q1', 'Q2'] };
      jest.spyOn(appService, 'getQuizById').mockResolvedValue(quiz);

      const response = await appController.getQuiz(quizId);
      expect(response).toEqual({
        success: true,
        message: 'Quiz fetched successfully',
        result: quiz,
      });
    });
  });

  describe('submitAnswer', () => {
    it('should return success message when answer is submitted successfully', async () => {
      const answerDto: any = {
        quiz_id: 'c1e1c471-26fd-4073-83c3-17ce9f789b82',
        question_id: '82d218e7-790f-41f7-bc22-9116a1604aa7',
        user_id: 1,
        selected_option: 0,
      };
      const result = {
        //question: "What is the capital of France?",
        isCorrect: false,
        correct_option: 2,
        selected_option: 2,
      };
      jest.spyOn(appService, 'submitAnswer').mockResolvedValue(result);

      const response = await appController.submitAnswer(answerDto);
      expect(response).toEqual({
        success: true,
        message: 'Answer submitted successfully',
        result,
      });
    });
  });

  describe('getResults', () => {
    it('should return success message when results are processed successfully', async () => {
      const createResultDto: CreateResultDto = { quiz_id: '1', user_id: '123' };

      // Mocked results array as expected by the service method
      const results = [
        {
          user_id: '123',
          question: {
            text: "Which element has the chemical symbol 'O'?",
            options: ['Oxygen', 'Ozone'],
            correct_option: 0, // Oxygen is correct
          },
          submission: {
            selected_option: 1, // User selected Ozone
            is_correct: false,   // The answer is incorrect
          }
        }
      ];

      // Mock the `this.results` array inside the service
      jest.spyOn(appService, 'submitQuiz').mockImplementation(() => {
        // Returning a Promise that resolves to the result object
        return Promise.resolve({
          user_id: createResultDto.user_id,
          score: 0,
          answers: [
            {
              question: "Which element has the chemical symbol 'O'?",
              correct_option: "Oxygen",
              selected_option: "Ozone",
              is_correct: false, // Incorrect answer
            }
          ]
        });
      });

      // Call the controller method
      const response = await appController.getResults(createResultDto);

      // Expected response format
      expect(response).toEqual({
        success: true,
        message: 'Results processed successfully',
        result: {
          user_id: '123',
          score: 0, // Correct score
          answers: [
            {
              question: "Which element has the chemical symbol 'O'?",
              correct_option: "Oxygen",
              selected_option: "Ozone",
              is_correct: false,
            }
          ],
        },
      });
    });
  });
});
