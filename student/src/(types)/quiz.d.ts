interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizData {
  _id: string;
  title: string;
  time: number;
  questions: Question[];
}
