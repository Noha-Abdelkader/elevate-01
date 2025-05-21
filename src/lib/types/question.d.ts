declare type Question = {
  answers: Answer[];
  type: string;
  _id: string;
  question: string;
  correct: string;
  subject: Quiz;
  exam: QuizDetails;
  createdAt: string;
};

declare type Answer = {
  answer: string;
  key: string;
};

declare type CheckQuestions = {
  QID: string;
  Question: string;
  correctAnswer: string;
  answers: unkown;
};

declare type CheckQuestionsResponse = {
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: checkQuestions[];
  correctQuestions: checkQuestions[];
};
