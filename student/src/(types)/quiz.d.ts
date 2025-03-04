interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizData {
  _id: string;
  title: string;
  time: number; // it hostd like 10 then 10 minuts so mkaek a afunction to run a counter of 10 and show hrs minuts and second 
  questions: Question[];
}
