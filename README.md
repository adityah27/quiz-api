# Quiz Application API

This project is a **Quiz Application API** built with **NestJS**. It provides endpoints to create quizzes, retrieve quizzes by their ID, submit answers to quizzes, and process the results. The application is containerized using **Docker** and can be easily run with **Docker Compose**.


## Prerequisites

Before running the project, ensure you have the following installed:

- **Docker**: [Install Docker](https://www.docker.com/get-started)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)



## Features

- **Create a Quiz**: Allows users to create a new quiz.
```http
POST /api/quiz HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 1026

{
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
}
```

- **Get Quiz**: Fetches a quiz by its unique ID.
```http
GET /api/quiz/a342fb0c-897e-40ed-987b-8f449008d0f0 HTTP/1.1
Host: localhost:3000
```
- **Submit Answer**: Submits answers to a quiz.
```http
POST /api/quiz/submit HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 161

{
    "quiz_id":"c1e1c471-26fd-4073-83c3-17ce9f789b82",
    "question_id":"bf72665e-f522-4736-827b-895fa8beb19b",
    "user_id":1,
    "selected_option":2
}
```
- **Get Results**: Processes and retrieves quiz results.
```http
POST /api/quiz/result HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 76

{
    "quiz_id":"c1e1c471-26fd-4073-83c3-17ce9f789b82",
    "user_id":1
}
```

