interface Question {
  _id?: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionFormProps {
  questionData: Question;
  index: number;
  onUpdate: (index: number, updatedQuestion: Question) => void;
  onRemove: () => void;
  canRemove: boolean;
}
