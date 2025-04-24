declare type UserHistory = {
  history: {
    _id: string;
    checkAnswer: string;
    QID: {
      answers: Answer[];
      type: string;
      _id: string;
      question: string;
      correct: string;
      subject: string;
      exam: string;
      createdAt: string;
    };
    user: string;
    chosenAnswer: string;
    avgAnswerTime: string;
    createdAt: string;
  };
};
