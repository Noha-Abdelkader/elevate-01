declare type Quiz = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
};

declare type QuizDetails = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};

declare type QuizForm={
  name: string;
  icon: string
}
